module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: "module"
  },
  plugins: ["react", "react-hooks", "prettier"],
  rules: {
    "react/prop-types": 0,
    "react/no-unescaped-entities": 0,
    "camelcase": 0,
    "no-var": 2,
    "array-bracket-spacing": ["warn", "never"],
    "array-bracket-newline": ["warn", "consistent"],
    "eol-last": ["warn", "always"],
    "indent": ["warn", 2],
    "no-prototype-builtins": "off",
    "no-trailing-spaces": ["warn", {
      "ignoreComments": true
    }],
    "no-unused-vars": "warn",
    "object-curly-spacing": ["warn", "always"],
    "padded-blocks": ["warn", "never"],
    "quotes": ["warn", "double"],
    "semi": ["warn", "always"],
    "space-in-parens": ["warn", "never"],
    "object-property-newline": ["warn", {
    }],
    "object-curly-newline": ["warn", "always"]
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src/"]
      }
    },
    "react": {
      "version": "detect"
    }
  }
};
