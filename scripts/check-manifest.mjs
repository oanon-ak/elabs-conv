/**
 * Validates manifest.json against the fields SillyTavern requires for a
 * third-party extension. Run via `npm run check:manifest`.
 * @see https://docs.sillytavern.app/for-contributors/writing-extensions/
 */
import { readFileSync } from 'node:fs';

const REQUIRED = ['display_name', 'js', 'author'];
const DEPRECATED = ['requires', 'optional'];

const manifest = JSON.parse(readFileSync(new URL('../manifest.json', import.meta.url), 'utf8'));

const missing = REQUIRED.filter((key) => !(key in manifest));
if (missing.length > 0) {
    console.error(`manifest.json is missing required field(s): ${missing.join(', ')}`);
    process.exit(1);
}

if (manifest.version && !/^\d+\.\d+\.\d+/.test(manifest.version)) {
    console.error(`manifest.json version "${manifest.version}" is not semver.`);
    process.exit(1);
}

const deprecated = DEPRECATED.filter((key) => key in manifest);
if (deprecated.length > 0) {
    console.warn(`manifest.json uses deprecated field(s): ${deprecated.join(', ')}`);
}

console.log(`manifest.json OK — ${manifest.display_name} v${manifest.version ?? '(unversioned)'}`);
