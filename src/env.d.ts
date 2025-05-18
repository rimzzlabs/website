interface ImportMetaEnv {
	readonly PUBLIC_CF_TURNSTILE_SITE_KEY: string
	readonly PUBLIC_EMAILJS_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
