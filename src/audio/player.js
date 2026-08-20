/**
 * Consumes base64 audio chunks from a DialogueSession and plays them in order.
 *
 * The decode path depends on the negotiated output format: `mp3_*` chunks can
 * be fed through MediaSource, `pcm_*` chunks go straight to an AudioContext
 * buffer queue. Neither path is implemented yet.
 */
export class ChunkPlayer {
    /** @param {{ outputFormat: string }} options */
    constructor(options) {
        this.options = options;
        this.queue = [];
    }

    /**
     * @param {string} _base64Chunk
     * @param {boolean} _isFinal
     */
    enqueue(_base64Chunk, _isFinal) {
        throw new Error('not implemented');
    }

    /** Stops playback and drops anything still queued. */
    stop() {
        throw new Error('not implemented');
    }
}
