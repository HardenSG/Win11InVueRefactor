/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: ['standard', 'plugin:prettier/recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  // parser: '@typescript-eslint/parser',

  parserOptions: {
    requireConfigFile: false,
    sourceType: 'module',
    // parser: 'babel-eslint',
    parser: '@typescript-eslint/parser',

    // parser: "@babel/eslint-parser",
    // requireConfigFile: false,
  },

  plugins: ['prettier'],

  rules: {
    'comma-dangle': 'off',
    'vue/comment-directive': 'off',
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
    'no-undef': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Function: false,
        },
      },
    ],
  },

  overrides: [
    {
      files: ['*.vue'],
    },
  ],
}
