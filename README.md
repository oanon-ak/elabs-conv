# elabs-conv

A [SillyTavern](https://github.com/SillyTavern/SillyTavern) extension that streams chat dialogue to the
ElevenLabs **Text to Dialogue** realtime WebSocket API and plays the returned audio.

> **Status: foundation only.** The repository scaffolding, settings panel, and module boundaries are in
> place. The streaming pipeline is not implemented — every method in `src/` throws `not implemented`.

## Why Text to Dialogue

The [realtime TDD endpoint](https://elevenlabs.io/docs/eleven-api/guides/how-to/websockets/realtime-tdd)
takes multiple speakers on a single socket, so a multi-character SillyTavern scene can be voiced as one
continuous dialogue rather than as separate per-message TTS calls. Turn boundaries are expressed with
`new_turn` on each input rather than by opening a new connection.

## Requirements

- SillyTavern (any version with third-party extension support)
- An ElevenLabs API key on a plan with access to `eleven_v3` models
- At least one ElevenLabs voice id per character you want voiced

## Install

Use SillyTavern's **Extensions → Install Extension** and paste the repository URL:

```
https://github.com/oanon-ak/elabs-conv
```

Or clone it manually into the "install for all users" extension directory of your SillyTavern install:

```bash
git clone https://github.com/oanon-ak/elabs-conv public/scripts/extensions/third-party/elabs-conv
```

The folder name must stay `elabs-conv` — it forms the `third-party/elabs-conv` template path used by
`renderExtensionTemplateAsync`.

## Layout

| Path | Purpose |
| --- | --- |
| `manifest.json` | SillyTavern extension manifest |
| `index.js` | Entry point: settings mount + message hooks (via `SillyTavern.getContext()`) |
| `settings.html` | Settings drawer markup |
| `style.css` | Settings panel styles |
| `src/constants.js` | Endpoint, model ids, output formats, default settings |
| `src/logger.js` | Prefixed console logging |
| `src/elevenlabs/protocol.js` | Frame type definitions and control frames |
| `src/elevenlabs/client.js` | `DialogueSession` — one WebSocket session |
| `src/audio/player.js` | `ChunkPlayer` — ordered playback of base64 chunks |
| `docs/` | Protocol notes and architecture |

## Development

```bash
npm install
npm run lint
npm run check:manifest
```

There is no build step; SillyTavern loads `index.js` as an ES module directly.

## Roadmap

- [ ] `DialogueSession.connect()` — URL params, init frame, keep-alive timer
- [ ] Message hook → text extraction and markup stripping
- [ ] Character → voice id mapping UI
- [ ] `ChunkPlayer` for `mp3_*` (MediaSource) and `pcm_*` (AudioContext)
- [ ] Interrupt / stop on new message or swipe
- [ ] Reconnect and error surfacing in the settings panel

## License

MIT — see [LICENSE](LICENSE).
