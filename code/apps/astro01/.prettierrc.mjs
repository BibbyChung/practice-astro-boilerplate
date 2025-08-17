/** @type {import("prettier").Config} */
export default {
  semi: false,
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  svelteBracketNewLine: true,
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-svelte',
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss',
  ],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
    {
      files: ['**/*.astro'],
      options: {
        parser: 'astro',
      },
    },
  ],
}
