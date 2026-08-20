# Security Policy

## Reporting a vulnerability

Open a [security advisory](https://github.com/oanon-ak/elabs-conv/security/advisories/new) rather than a
public issue. Expect an initial response within a week.

## API key handling

This extension needs an ElevenLabs API key to authenticate the WebSocket connection.

- Browsers cannot set request headers on a WebSocket handshake, so the key is sent in the first JSON
  frame over the (TLS-encrypted) socket.
- The key is stored in SillyTavern's `extension_settings`, which is persisted as plain JSON in the
  server's user data directory. Anyone with access to that machine or its backups can read it.
- Use a scoped ElevenLabs key with the minimum permissions needed, and rotate it if you share logs,
  settings exports, or screenshots.
- Never attach a key to an issue or pull request. `.gitignore` covers `.env*` and `secrets.json`, but
  it cannot protect a key pasted into a comment.
