export const PROJECTS = [
	{ key: "mayarin", name: "Mayarin", href: "https://mayarin.xyz" },
	{ key: "lanjut", name: "Lanjut", href: "https://lanjut.org" },
	{
		key: "trymorrow",
		name: "Trymorrow",
		href: "https://github.com/playriglabs/trymorrow",
	},
	{ key: "absqir", name: "Absqir", href: "https://absqir.rimzzlabs.com" },
] as const;

export const PROJECT_NOTES: Partial<
	Record<(typeof PROJECTS)[number]["key"], string>
> = {
	mayarin: "/notes/my-first-trip-abroad-was-a-hackathon-at-ntu",
	lanjut: "/notes/introducing-lanjut",
};
