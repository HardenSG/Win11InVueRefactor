module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  bracketSpacing: true,
  trailingComma: 'all',
  printWidth: 100,
  semi: false,
  endOfLine: 'lf',
  arrowParens: 'always',
  overrides: [{ files: '.prettierrc', options: { parser: 'typescript' } }],
}
