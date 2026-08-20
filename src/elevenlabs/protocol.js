/**
 * Frame shapes for the ElevenLabs Text to Dialogue realtime WebSocket.
 * Definitions only — no serialization logic yet.
 *
 * @see docs/elevenlabs-tdd-protocol.md
 * @see https://elevenlabs.io/docs/eleven-api/guides/how-to/websockets/realtime-tdd
 */

/**
 * First frame on the socket. Registers the voices used for the session and,
 * when the key was not sent as an `xi-api-key` header, authenticates.
 * @typedef {object} InitFrame
 * @property {string[]} voices    Voice ids; 1 for `eleven_v3_conversational`, up to 10 for `eleven_v3`.
 * @property {string} [xi_api_key]
 */

/**
 * A single line of dialogue.
 * @typedef {object} DialogueInput
 * @property {string} text
 * @property {string} voice_id  Must be one of the voices sent in the init frame.
 * @property {boolean} [new_turn] True when this input starts a new speaker turn.
 */

/**
 * @typedef {object} InputFrame
 * @property {DialogueInput[]} inputs
 */

/**
 * Control frames.
 * @typedef {{ flush: true }} FlushFrame          Generate buffered audio, keep the socket open.
 * @typedef {{ keep_alive: true }} KeepAliveFrame Reset the 20s inactivity timer.
 * @typedef {{ close_socket: true }} CloseFrame   Flush, drain remaining audio, then close.
 */

/**
 * @typedef {object} AudioFrame
 * @property {string|null} audio   Base64 audio chunk in the negotiated output format.
 * @property {boolean} is_final    True on the last chunk of the stream.
 * @property {object} [alignment]  Present only when `sync_alignment=true`.
 */

export const CONTROL = Object.freeze({
    FLUSH: { flush: true },
    KEEP_ALIVE: { keep_alive: true },
    CLOSE: { close_socket: true },
});

export {};
