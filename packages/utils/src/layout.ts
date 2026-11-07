export const LAYOUT_SETTINGS = ["default", "wide", "wider"] as const;
export type LayoutSetting = (typeof LAYOUT_SETTINGS)[number];

export const LAYOUT_STORAGE_KEY = "rimzzlabs:layout";

export function isLayoutSetting(value: unknown): value is LayoutSetting {
	return LAYOUT_SETTINGS.includes(value as LayoutSetting);
}

export function readLayoutSetting(): LayoutSetting {
	try {
		const value = localStorage.getItem(LAYOUT_STORAGE_KEY);
		if (isLayoutSetting(value)) return value;
	} catch {}
	return "default";
}

export function applyLayoutSetting(setting: LayoutSetting) {
	try {
		localStorage.setItem(LAYOUT_STORAGE_KEY, setting);
	} catch {}
	document.documentElement.dataset.layout = setting;
}
