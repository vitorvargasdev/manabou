module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'vue/setup-compiler-macros': true
  },
  'extends': [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 2021
  },
  'plugins': [
  ],
  'rules': {
    indent: ['error', 2],
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'never'],
    quotes: ['error', 'single'],
    'arrow-parens': ['error', 'as-needed'],
    semi: ['error', 'never'],
    'space-before-function-paren': ['error', 'always'],
    'vue/no-v-html': ['off'],
    'vue/multi-word-component-names': ['off']
  }
}
