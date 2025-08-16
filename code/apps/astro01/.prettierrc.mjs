/** @type {import("prettier").Config} */
export default {
	semi: false,
	useTabs: true,
	singleQuote: true,
	trailingComma: "all",
	printWidth: 100,
	plugins: [
		"prettier-plugin-astro",
		"prettier-plugin-svelte",
		"prettier-plugin-organize-imports",
		"prettier-plugin-tailwindcss",
	],
	overrides: [
		{
			files: ["**/*.astro"],
			options: {
				parser: "astro",
			},
		},
	],
};
