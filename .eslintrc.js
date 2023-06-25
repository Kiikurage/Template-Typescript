module.exports = {
    extends: ['eslint:recommended', 'prettier'],
    root: true,
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            extends: ['plugin:@typescript-eslint/recommended'],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            rules: {
                '@typescript-eslint/prefer-namespace-keyword': 'off',
                '@typescript-eslint/no-namespace': 'off',
            },
        },
        {
            files: ['**/.eslintrc.js', '**/babel.config.js', '**/webpack.config.js'],
            env: { node: true, es6: true },
        },
    ],
    ignorePatterns: [
        '**/build/**/*'
    ],
};
