module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        '@typescript-eslint/prefer-namespace-keyword': 'off',
        '@typescript-eslint/no-namespace': 'off',
    },
    overrides: [
        {
            files: [
                '**/.eslintrc.js',
                '**/babel.config.js',
                '**/webpack.config.js',
            ],
            env: { node: true },
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
};
