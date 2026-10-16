import type { Dictionary } from "@/i18n/en";

export const NOW_UPDATED_AT = "10/16/2026";

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
				{ label: "lanjut.org", href: "https://lanjut.org" },
				{
					label: "github.com/rimzzlabs/absqir",
					href: "https://github.com/rimzzlabs/absqir",
				},
				{
					label: "github.com/rimzzlabs/ayawe",
					href: "https://github.com/rimzzlabs/ayawe",
				},
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
