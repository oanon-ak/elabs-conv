# Architecture

## Flow

```
SillyTavern event  ──▶  index.js hook
                          │  resolve speaker + text
                          ▼
                    src/elevenlabs/client.js  (DialogueSession)
                          │  WebSocket frames
                          ▼
                    ElevenLabs TDD endpoint
                          │  base64 audio chunks
                          ▼
                    src/audio/player.js  (ChunkPlayer)
```

## Module boundaries

- **`index.js`** is the only file that touches SillyTavern, and it does so through
  `SillyTavern.getContext()` rather than relative imports into the app's internals. Everything under
  `src/` stays free of SillyTavern globals so it can be reasoned about (and eventually tested) in
  isolation.
- **`DialogueSession`** owns exactly one socket and knows nothing about playback; it hands base64 chunks
  to a callback.
- **`ChunkPlayer`** owns playback ordering and knows nothing about the wire protocol.
- **`protocol.js`** holds frame shapes as JSDoc typedefs plus the three control frames — no logic, so
  the wire format lives in one reviewable place.

## Manifest options not used yet

The [extension docs](https://docs.sillytavern.app/for-contributors/writing-extensions/) list a few
manifest fields worth revisiting once the pipeline exists:

- `generate_interceptor` — a global function called on generation requests. Could replace the
  message-rendered hooks if we ever want to speak text before it is committed to the chat.
- `hooks` — lifecycle hook function names, for cleaner setup/teardown than the current `jQuery(...)`
  bootstrap.
- `i18n` — locale files for the settings panel.
- `minimum_client_version` — set it once we depend on a specific SillyTavern release.

Note that `requires` and `optional` (Extras modules) are deprecated and deliberately absent from
`manifest.json`.

## Open questions

- **Session lifetime.** One socket per message is simple but pays connection latency per turn; one
  long-lived socket per chat needs keep-alives and re-connection on voice-map changes. Start with
  per-message, revisit once latency is measurable.
- **Streaming vs. complete messages.** SillyTavern can stream tokens as they generate. Forwarding
  partial text as it arrives is the point of a realtime endpoint, but it interacts badly with markup
  stripping (an unterminated `*action*` cannot be classified yet). Ship on complete messages first.
- **API key storage.** The key lives in SillyTavern's settings, which are plain JSON on the server. See
  [SECURITY.md](../SECURITY.md).
- **Interrupts.** Swipes and regenerations should cancel in-flight audio; that needs `close_socket`
  plus a `ChunkPlayer.stop()` that drops the queue.
