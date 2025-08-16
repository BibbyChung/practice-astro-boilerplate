// Astro types, not necessary if you already have a `tsconfig.json`
/// <reference path="../.astro/types.d.ts" />

interface ImportMeta {
	readonly env: ImportMetaEnv
}
interface ImportMetaEnv {
	readonly BASE_URL: string
	readonly MODE: string

	readonly DB_PASSWORD: string
	readonly PUBLIC_GIT_SHORT_VER: string
	readonly PUBLIC_GIT_TIME: string
}
