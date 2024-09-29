import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default {
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["@typescript-eslint"],
  "files": ["**/*.{js,mjs,cjs,ts}"],
  "languageOptions": {
    "globals": globals.browser
  },
  "rules": {
    "prettier/prettier": "error",      // ESLint використовуватиме Prettier для форматування
    "no-console": "warn",              // Консольні команди будуть попередженням, а не помилкою
    "@typescript-eslint/no-unused-vars": "error" // Помилки для невикористаних змінних
  },
  "env": {
    "browser": true,
    "es2021": true
  }
};
