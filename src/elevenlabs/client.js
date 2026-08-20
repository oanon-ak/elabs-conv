/**
 * Owns one WebSocket session against the Text to Dialogue realtime endpoint.
 *
 * Lifecycle: connect -> send init frame -> stream input frames -> flush ->
 * close_socket. Nothing here is implemented yet; the shape is fixed so the
 * player and the SillyTavern hooks can be built against it.
 */
import { TTD_WS_ENDPOINT } from '../constants.js';

/**
 * @typedef {object} DialogueSessionOptions
 * @property {string} apiKey
 * @property {string} modelId
 * @property {string} outputFormat
 * @property {string[]} voices
 * @property {boolean} [syncAlignment]
 * @property {(chunk: string, isFinal: boolean) => void} [onAudio] Base64 chunk callback.
 * @property {(err: Error) => void} [onError]
 * @property {() => void} [onClose]
 */

export class DialogueSession {
    /** @param {DialogueSessionOptions} options */
    constructor(options) {
        this.options = options;
        /** @type {WebSocket|null} */
        this.socket = null;
        this.keepAliveTimer = null;
    }

    /**
     * Builds the connection URL with its query parameters.
     * @returns {string}
     */
    buildUrl() {
        // TODO: append model_id, output_format and sync_alignment.
        return TTD_WS_ENDPOINT;
    }

    /** Opens the socket and sends the init frame. */
    async connect() {
        throw new Error('not implemented');
    }

    /**
     * Queues one line of dialogue.
     * @param {string} _text
     * @param {string} _voiceId
     * @param {boolean} [_newTurn]
     */
    send(_text, _voiceId, _newTurn) {
        throw new Error('not implemented');
    }

    /** Forces generation of buffered text without closing. */
    flush() {
        throw new Error('not implemented');
    }

    /** Flushes, waits for the final chunk, then closes. */
    async close() {
        throw new Error('not implemented');
    }
}
