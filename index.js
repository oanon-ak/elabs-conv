/**
 * ElevenLabs Realtime Dialogue — SillyTavern extension entry point.
 *
 * Scope of this file: register the extension with SillyTavern, mount the
 * settings panel, and wire the message hooks. The streaming pipeline itself
 * lives in ./src and is not implemented yet.
 *
 * All SillyTavern access goes through the `SillyTavern.getContext()` global
 * rather than deep relative imports, so nothing here breaks if the app moves
 * its internals around.
 * @see https://docs.sillytavern.app/for-contributors/writing-extensions/
 */
import { MODULE_NAME, TEMPLATE_PATH, defaultSettings } from './src/constants.js';
import { log, warn } from './src/logger.js';

/**
 * Merges stored settings with defaults so new keys land on existing installs.
 * @param {object} context Result of `SillyTavern.getContext()`.
 * @returns {typeof defaultSettings}
 */
function loadSettings(context) {
    context.extensionSettings[MODULE_NAME] = Object.assign(
        {},
        defaultSettings,
        context.extensionSettings[MODULE_NAME] ?? {},
    );
    return context.extensionSettings[MODULE_NAME];
}

/**
 * Binds the settings panel inputs to the stored settings object.
 * @param {object} _context
 * @param {typeof defaultSettings} _settings
 */
function bindSettingsUi(_context, _settings) {
    // TODO: bind each control in settings.html to its settings key, then call
    // context.saveSettingsDebounced() on change.
}

/**
 * Called for each rendered chat message. Decides whether the message should be
 * spoken and, if so, hands it to the dialogue pipeline.
 * @param {number} _messageId
 */
async function onMessageRendered(_messageId) {
    // TODO: resolve the message text + speaker, map the speaker to a voice id,
    // and forward the turn to the ElevenLabs dialogue session.
    warn('message hook fired, but the dialogue pipeline is not implemented yet');
}

jQuery(async () => {
    const context = SillyTavern.getContext();
    const settings = loadSettings(context);

    const html = await context.renderExtensionTemplateAsync(TEMPLATE_PATH, 'settings');
    $('#extensions_settings').append(html);

    bindSettingsUi(context, settings);

    const { eventSource, event_types } = context;
    eventSource.on(event_types.CHARACTER_MESSAGE_RENDERED, onMessageRendered);
    eventSource.on(event_types.USER_MESSAGE_RENDERED, onMessageRendered);

    log(`loaded (v${settings.version ?? '0.1.0'})`);
});
