# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Repository scaffolding: license, contribution guide, security policy, issue and PR templates, CI.
- SillyTavern extension manifest, settings panel markup and styles.
- Module skeleton for the Text to Dialogue WebSocket session and chunked audio playback.
- Protocol and architecture notes under `docs/`.
- Aligned the manifest and entry point with the official SillyTavern extension docs: dropped the
  deprecated `requires`/`optional` fields and moved to `SillyTavern.getContext()`.
