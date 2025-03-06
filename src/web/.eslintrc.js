module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react-refresh", "check-file"],
  rules: {
    "check-file/filename-naming-convention": [
      "error",
      {
        "**/*.{ts,tsx}": "KEBAB_CASE",
      },
      {
        // ignore the middle extensions of the filename to support filename like bable.config.js or smoke.spec.ts
        ignoreMiddleExtensions: true,
      },
    ],
    "check-file/folder-naming-convention": [
      "error",
      {
        // all folders within src (except __tests__)should be named in kebab-case
        "src/**/!(__tests__)": "KEBAB_CASE",
      },
    ],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExports: true },
    ],
  },
};
