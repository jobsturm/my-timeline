module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    rules: {
        indent: ['error', 4],
        'consistent-return': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-underscore-dangle': 'off',
        'import/no-cycle': 'off',
        'lines-between-class-members': 'off',
        'no-array-constructor': 'off',
        'no-param-reassign': 'off',
        'max-len': [
            'error',
            {
                code: 100,
                comments: 150,
                ignoreUrls: true,
                ignoreRegExpLiterals: true,
                ignoreTemplateLiterals: true,
                ignoreStrings: true,
                ignorePattern: 'd="([\\s\\S]*?)"',
            },
        ],
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: [
                    'state',
                    'acc',
                    'e',
                    'ctx',
                    'req',
                    'request',
                    'res',
                    'response',
                    '$scope',
                ],
            },
        ],
        'no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '[I]\\w+',
            },
        ],
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
};
