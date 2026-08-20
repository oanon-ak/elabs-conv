export default [
    {
        files: ['**/*.js', '**/*.mjs'],
        languageOptions: {
            ecmaVersion: 2023,
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                fetch: 'readonly',
                WebSocket: 'readonly',
                AudioContext: 'readonly',
                MediaSource: 'readonly',
                Audio: 'readonly',
                atob: 'readonly',
                btoa: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                structuredClone: 'readonly',
                localStorage: 'readonly',
                jQuery: 'readonly',
                SillyTavern: 'readonly',
                $: 'readonly',
                toastr: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-undef': 'error',
            'prefer-const': 'warn',
            eqeqeq: ['warn', 'smart'],
            semi: ['warn', 'always'],
            quotes: ['warn', 'single', { avoidEscape: true }],
        },
    },
    {
        files: ['scripts/**/*.mjs'],
        languageOptions: {
            globals: {
                process: 'readonly',
                URL: 'readonly',
                console: 'readonly',
            },
        },
    },
    {
        ignores: ['node_modules/**', 'dist/**'],
    },
];
