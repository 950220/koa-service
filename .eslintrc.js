/** @format */

module.exports = {
    parser: 'babel-eslint',
    extends: ['plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
    },
}
