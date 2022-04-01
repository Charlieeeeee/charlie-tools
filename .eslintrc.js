module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'rules': {
    'indent': ['error', 2],
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
      'never'
    ],
    'no-trailing-spaces': 'error',
    'arrow-spacing': 'error',
    'eol-last': 'error', // 非空文件中跟踪换行符
    'keyword-spacing': 'error',
    'key-spacing': 'error',
    'space-infix-ops': 'error', // 这条规则旨在确保中缀操作员周围有空间。
  }
}
