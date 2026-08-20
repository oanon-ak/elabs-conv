/** Folder name under `public/scripts/extensions/third-party/`. */
export const MODULE_NAME = 'elabs-conv';

/** Path passed to `renderExtensionTemplateAsync`. */
export const TEMPLATE_PATH = `third-party/${MODULE_NAME}`;

/** Base endpoint for the ElevenLabs Text to Dialogue realtime WebSocket. */
export const TTD_WS_ENDPOINT = 'wss://api.elevenlabs.io/v1/text-to-dialogue/stream-input';

/**
 * Model ids valid for Text to Dialogue. The endpoint rejects any `model_id`
 * that does not start with `eleven_v3`.
 * @see docs/elevenlabs-tdd-protocol.md
 */
export const MODELS = Object.freeze({
    /** Up to 10 registered voices per session. */
    V3: 'eleven_v3',
    /** Exactly one registered voice per session. */
    V3_CONVERSATIONAL: 'eleven_v3_conversational',
});

/** Output formats surfaced in the settings UI. */
export const OUTPUT_FORMATS = Object.freeze([
    'mp3_44100_128',
    'mp3_44100_64',
    'pcm_16000',
    'pcm_22050',
    'pcm_24000',
    'pcm_44100',
]);

/** The server closes idle sockets after 20s; ping below that. */
export const KEEP_ALIVE_INTERVAL_MS = 15_000;

/** @type {Record<string, any>} */
export const defaultSettings = Object.freeze({
    enabled: false,
    /** Stored in SillyTavern settings; see SECURITY.md for the caveat. */
    apiKey: '',
    modelId: MODELS.V3,
    outputFormat: 'mp3_44100_128',
    syncAlignment: false,
    /** Map of SillyTavern character name -> ElevenLabs voice id. */
    voiceMap: {},
    /** Speak messages from the user as well as from characters. */
    narrateUser: false,
    /** Skip text inside asterisks / code fences before sending. */
    stripMarkup: true,
});
