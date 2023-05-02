// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'plugin:@typescript-eslint/recommended'],
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
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', //关闭any类型警告
    'comma-dangle': 'off',
    'vue/comment-directive': 'off',
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Function: false,
        },
      },
    ],
  },
}
