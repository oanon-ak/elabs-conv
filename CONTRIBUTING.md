# Contributing

Thanks for taking an interest. This project is early — the foundation is in place and the streaming
pipeline is not, so most contributions right now are about filling in `src/`.

## Setup

Clone the repo into the "install for all users" extension directory of a SillyTavern install so you
can reload and test:

```bash
git clone https://github.com/oanon-ak/elabs-conv public/scripts/extensions/third-party/elabs-conv
cd public/scripts/extensions/third-party/elabs-conv
npm install
```

The folder name must stay `elabs-conv`; it forms the `third-party/elabs-conv` template path passed to
`renderExtensionTemplateAsync`.

## Before opening a PR

```bash
npm run lint
npm run check:manifest
```

There is no build step and no test suite yet. Verify changes by loading the extension in SillyTavern
and checking the browser console — set `localStorage.elabsConvDebug = '1'` for verbose output.

## Conventions

- ES modules only. No bundler, no transpilation; write what the browser runs.
- Four-space indent, single quotes, semicolons. `.editorconfig` and ESLint enforce this.
- Reach SillyTavern only through `SillyTavern.getContext()`, and only from `index.js`. Deep relative
  imports into `script.js`/`extensions.js` are brittle; keep `src/` free of SillyTavern globals entirely.
- Protocol frame shapes belong in `src/elevenlabs/protocol.js`, documented against the
  [official docs](https://elevenlabs.io/docs/eleven-api/guides/how-to/websockets/realtime-tdd).
- Add an entry under `## [Unreleased]` in `CHANGELOG.md` for anything user-visible.

## Commits

Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`) — not enforced by CI, but it keeps the
changelog easy to assemble.

## Never commit

API keys, voice ids tied to a paid account, or exported SillyTavern settings. See [SECURITY.md](SECURITY.md).
