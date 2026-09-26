import type { Dictionary } from "@/i18n/en";

export const NOW_UPDATED_AT = "09/25/2026";

export const NOW_INTRO_LINKS = {
	derek: { href: "https://sive.rs", label: "Derek Sivers" },
	nownownow: { href: "https://nownownow.com", label: "nownownow.com" },
};

export interface NowLink {
	label: string;
	href: string;
}

export interface NowItem {
	label: string;
	title: string;
	description: string;
	links: ReadonlyArray<NowLink>;
}

export function getNowItems(t: Dictionary): ReadonlyArray<NowItem> {
	return [
		{
			...t.now.work,
			links: [{ label: "kolosal.ai", href: "https://kolosal.ai" }],
		},
		{
			...t.now.building,
			links: [{ label: "mayarin.xyz", href: "https://mayarin.xyz" }],
		},
		{
			...t.now.sideProjects,
			links: [
				{ label: "lanjut.rimzzlabs.com", href: "https://lanjut.rimzzlabs.com" },
				{ label: "absqir.rimzzlabs.com", href: "https://absqir.rimzzlabs.com" },
			],
		},
		{
			label: t.now.site.label,
			title: t.now.site.title,
			description: t.now.site.description,
			links: [
				{
					label: t.now.site.sourceCode,
					href: "https://github.com/rimzzlabs/website",
				},
			],
		},
	];
}
