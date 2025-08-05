import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...pluginReact.configs.recommended.languageOptions?.globals
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    plugins: {
      react: pluginReact
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      "react/prop-types": "off",
      "no-unused-vars": "warn",
      "no-console": "warn"
    }
  }
];
