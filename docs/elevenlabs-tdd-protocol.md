# ElevenLabs Text to Dialogue — realtime WebSocket

Working notes on the protocol this extension targets. Source of truth is the
[official documentation](https://elevenlabs.io/docs/eleven-api/guides/how-to/websockets/realtime-tdd);
re-check it before relying on anything below.

## Endpoint

```
wss://api.elevenlabs.io/v1/text-to-dialogue/stream-input
```

### Query parameters

| Parameter | Notes |
| --- | --- |
| `model_id` | Must start with `eleven_v3`. |
| `output_format` | e.g. `mp3_44100_128`. |
| `sync_alignment` | Optional. `true` adds timing alignment objects to audio frames. |

### Authentication

Either an `xi-api-key` header, or `xi_api_key` inside the first JSON message. Browsers cannot set
headers on a `WebSocket` handshake, so this extension sends the key in the init frame.

## Frames

**Init** — must be first. Registers the voices for the session.

```json
{
  "voices": ["voice_id"],
  "xi_api_key": "your_api_key"
}
```

**Input** — one or more lines of dialogue.

```json
{
  "inputs": [
    { "text": "dialogue text", "voice_id": "voice_id", "new_turn": false }
  ]
}
```

**Control**

| Frame | Effect |
| --- | --- |
| `{"flush": true}` | Generate buffered audio without closing. |
| `{"keep_alive": true}` | Reset the inactivity timer. |
| `{"close_socket": true}` | Flush, send remaining audio, then close. |

**Server → client**

```json
{ "audio": "base64_encoded_chunk", "is_final": false }
```

## Constraints that shape the design

- **Voice registration is up front.** Voices are fixed by the init frame, so the character → voice map
  must be resolved before connecting. A character joining mid-scene needs a new session.
- **Voice count depends on the model.** `eleven_v3_conversational` allows exactly one registered voice;
  `eleven_v3` allows up to ten.
- **20 second inactivity timeout.** Send `keep_alive` on an interval below that (see
  `KEEP_ALIVE_INTERVAL_MS`) for any session held open between messages.
- **Audio arrives base64-encoded and chunked**, so playback needs an ordered queue — the decode path
  differs between `mp3_*` and `pcm_*` output formats.
