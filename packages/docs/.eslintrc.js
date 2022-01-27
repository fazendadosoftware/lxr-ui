module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  plugins: [],
  rules: {
    semi: ['error', 'never'],
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/one-component-per-file': 'off',
    'comma-dangle': 'error',
    'no-useless-escape': 'off'
  }
}
