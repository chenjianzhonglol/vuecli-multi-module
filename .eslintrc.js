module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  globals: {
    BRAND_CONFIG: 'readonly'
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 0,
    'no-empty': 0,
    'vue/no-unused-components': 1,
    'no-unused-vars': 1,
    'vue/no-unused-vars':1,
    'vue/order-in-components': 0,
    'vue/require-default-prop': 0,
    'vue/no-v-html': 0,
    'no-useless-escape': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/require-v-for-key': 1
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
