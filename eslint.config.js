import astro from "eslint-plugin-astro";

// Oxlint (via `vp lint`) owns every .js/.ts file in the repository. ESLint is
// kept only for `.astro` components, which Oxlint cannot parse yet.
export default [
  {
    ignores: ["**/dist/**", "**/.astro/**", "**/node_modules/**"],
  },
  ...astro.configs.recommended,
  {
    files: ["**/*.astro"],
    rules: {
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];
