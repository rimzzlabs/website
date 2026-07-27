import type { Dictionary } from "@/i18n/dictionary";

export type ExperienceCompany = {
	key: keyof Dictionary["experience"]["items"];
	company: string;
	url: string;
};

// Shared by the experience section and the markdown (agent) variant of the
// homepage; the localized title/period/summary live in the dictionaries.
export const EXPERIENCE_COMPANIES: Array<ExperienceCompany> = [
	{ key: "kolosal", company: "Kolosal AI", url: "https://kolosal.ai" },
	{ key: "bitwyre", company: "Bitwyre", url: "https://bitwyre.com" },
	{ key: "skyshi-fe", company: "Skyshi Digital Indonesia", url: "https://skyshi.com" },
	{ key: "skyshi-intern", company: "Skyshi Digital Indonesia", url: "https://skyshi.com" },
];
