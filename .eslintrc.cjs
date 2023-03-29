module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended"
  ],

  "overrides": [
  ],
  // "parser": "vue-eslint-parser",
  // "parser": "babel-eslint",
  // "parser": "@typescript-eslint/parser",   
  "parser": "vue-eslint-parser",
  "parserOptions": {
    // "ecmaVersion": 2017
    // "ecmaVersion": "latest",
    // "sourceType": "module"
    "ecmaVersion": "latest",
    "sourceType": "module",
    "parser": "@typescript-eslint/parser"
  },
  "plugins": [
    "vue",
    "@typescript-eslint"
  ],
  "rules": {
    "vue/multi-word-component-names": "off",
    "indent": ['error', 2],//缩进
    "vue/comment-directive": "off",
    'vue/attributes-order': [//属性名顺序
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT'
        ],
        alphabetical: false
      }
    ],
    "no-extra-parens": "error",//禁止非必要的括号
    'no-undef': "off",
    // "no-extra-semi": 2,//禁止多余的冒号
  }
}
