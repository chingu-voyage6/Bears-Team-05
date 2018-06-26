module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true,
    'jest': true
  },
  'extends': [
    'airbnb',
    'plugin:react/recommended'
  ],
  'plugins': [
    'react'
  ],
  'rules': {
    'import/first': [
      'error',
      'DISABLE-absolute-first'
    ],
    'indent': [
      'error',
      2,
      { 'SwitchCase': 1 }
    ],
    'no-console': 0,
    'padded-blocks': ['error', {
      'blocks': 'never',
      'classes': 'always',
      'switches': 'never'
    }],
    'react/jsx-filename-extension': [
      1,
      { 'extensions': ['.js', '.jsx'] }
    ],
    'react/jsx-uses-vars': [2],
    'linebreak-style': ["error",process.env.OS==='Windows_NT' ? "windows" : "unix"]
  }
};