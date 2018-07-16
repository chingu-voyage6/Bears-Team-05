module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true,
    'mocha': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  parser: 'babel-eslint', 
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true
    },
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'no-console': 0,
    'indent': [
      'error',
      2,
      { 'SwitchCase': 1 }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'react/jsx-uses-vars': [2]
  }
};