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
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "react-hooks", "prettier"],
  rules: {
    "react/prop-types": 0,
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src/"]
      }
    }
  }
};
