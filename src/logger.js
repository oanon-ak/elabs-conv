import { MODULE_NAME } from './constants.js';

const PREFIX = `[${MODULE_NAME}]`;

export const log = (...args) => console.log(PREFIX, ...args);
export const warn = (...args) => console.warn(PREFIX, ...args);
export const error = (...args) => console.error(PREFIX, ...args);

/** Enabled by setting `localStorage.elabsConvDebug = '1'`. */
export const debug = (...args) => {
    if (localStorage.getItem('elabsConvDebug') === '1') {
        console.debug(PREFIX, ...args);
    }
};
