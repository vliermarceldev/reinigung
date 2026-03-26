// eslint.config.mjs
import eslintPluginAstro from "eslint-plugin-astro";
import tsEslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  // Basis TypeScript-Regeln
  ...tsEslint.configs.recommended,

  // Offizielle Astro-Regeln
  ...eslintPluginAstro.configs.recommended,

  // Ignorierte Verzeichnisse (ersetzt die alte .eslintignore)
  {
    ignores: [".astro/", "dist/", "build/", "node_modules/", "env.d.ts"],
  },

  // Benutzerdefinierte Regeln (z.B. Import-Sortierung & ungenutzte Variablen)
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // Erzwingt automatische Sortierung der Imports
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Fehler bei ungenutzten Variablen (außer sie starten mit _)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Astro-spezifische Anpassungen
      "astro/no-unused-css-selector": "error",
    },
  },
];
