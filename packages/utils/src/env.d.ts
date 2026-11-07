// Vite and Astro replace import.meta.env at build time.
interface ImportMetaEnv {
	readonly PROD: boolean;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
