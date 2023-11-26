module.exports = {
    overrides: [
        {
            files: ['**/*.jsx', '**/*.tsx'],
            extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
            plugins: ['react', 'react-hooks'],
            rules: {
                'react-hooks/exhaustive-deps': 'error',
                'react/react-in-jsx-scope': 'off',
            },
        },
    ],
};
