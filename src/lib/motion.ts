export const MOTION_SETTINGS = ["system", "on", "off"] as const;
export type MotionSetting = (typeof MOTION_SETTINGS)[number];

export const MOTION_STORAGE_KEY = "rimzzlabs:motion";
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

export function isMotionSetting(value: unknown): value is MotionSetting {
	return MOTION_SETTINGS.includes(value as MotionSetting);
}

export function readMotionSetting(): MotionSetting {
	try {
		const value = localStorage.getItem(MOTION_STORAGE_KEY);
		if (isMotionSetting(value)) return value;
	} catch {}
	return "system";
}

function shouldReduce(setting: MotionSetting) {
	if (setting === "off") return true;
	if (setting === "on") return false;
	return window.matchMedia(REDUCE_QUERY).matches;
}

export function applyMotionSetting(setting: MotionSetting) {
	try {
		localStorage.setItem(MOTION_STORAGE_KEY, setting);
	} catch {}
	document.documentElement.dataset.motion = shouldReduce(setting)
		? "reduce"
		: "full";
}

export function isMotionReduced() {
	return document.documentElement.dataset.motion === "reduce";
}
