module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "react/prop-types": 0,
    quotes: ["error", "double"],
    "jsx-quotes": ["error", "prefer-double"],
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
};
