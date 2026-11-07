import { HTML_LANG, type Locale } from "@rimzzlabs/i18n/config";
import { z } from "zod";

// Relative imports only: functions/_middleware.ts bundles this file too.
// datetime.ts uses the "@/" alias, so the time zone is repeated here.
const SITE_TIME_ZONE = "Asia/Jakarta";

export const PRESENCE_ENDPOINT = "/api/presence";

// The Mac pings every 2 minutes. Two missed pings mean the Mac sleeps.
export const ONLINE_WINDOW_MS = 5 * 60 * 1000;

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;
const RELATIVE_LIMIT_MS = 90 * DAY_MS;

export const presenceStatusSchema = z.enum(["online", "away", "offline"]);

export const presenceSchema = z.object({
	status: presenceStatusSchema,
	lastActiveAt: z.iso.datetime().nullable(),
});

// The POST /api/presence response. "enabled" is the toggle on the Mac.
export const presenceUpdateSchema = presenceSchema.extend({
	enabled: z.boolean(),
});

export type PresenceStatus = z.infer<typeof presenceStatusSchema>;
export type Presence = z.infer<typeof presenceSchema>;
export type PresenceUpdate = z.infer<typeof presenceUpdateSchema>;

export interface PresenceRow {
	enabled: number;
	last_seen_at: number | null;
}

export interface PresenceCopy {
	online: string;
	lastActive: string;
	offline: string;
}

export function toPresence(row: PresenceRow | null, now: number): Presence {
	if (!row?.last_seen_at) return { status: "offline", lastActiveAt: null };

	const lastActiveAt = new Date(row.last_seen_at).toISOString();
	if (!row.enabled) return { status: "offline", lastActiveAt };
	if (now - row.last_seen_at < ONLINE_WINDOW_MS) {
		return { status: "online", lastActiveAt };
	}
	return { status: "away", lastActiveAt };
}

// Under 24 hours: minutes or hours. Under 3 months: days.
// Older: the full date and time.
export function formatLastActive(
	lastActiveAt: string,
	now: number,
	locale: Locale,
) {
	const elapsed = Math.max(0, now - new Date(lastActiveAt).getTime());
	const lang = HTML_LANG[locale];

	if (elapsed >= RELATIVE_LIMIT_MS) {
		return new Intl.DateTimeFormat(lang, {
			dateStyle: "long",
			timeStyle: "short",
			timeZone: SITE_TIME_ZONE,
		}).format(new Date(lastActiveAt));
	}

	const relative = new Intl.RelativeTimeFormat(lang, { numeric: "always" });
	if (elapsed >= DAY_MS) {
		return relative.format(-Math.floor(elapsed / DAY_MS), "day");
	}
	if (elapsed >= HOUR_MS) {
		return relative.format(-Math.floor(elapsed / HOUR_MS), "hour");
	}
	return relative.format(
		-Math.max(1, Math.floor(elapsed / MINUTE_MS)),
		"minute",
	);
}

export function formatExactTime(lastActiveAt: string, locale: Locale) {
	return new Intl.DateTimeFormat(HTML_LANG[locale], {
		dateStyle: "full",
		timeStyle: "long",
		timeZone: SITE_TIME_ZONE,
	}).format(new Date(lastActiveAt));
}

export function presenceLabel(params: {
	presence: Presence;
	now: number;
	locale: Locale;
	copy: PresenceCopy;
}) {
	if (params.presence.status === "online") return params.copy.online;
	if (!params.presence.lastActiveAt) return params.copy.offline;
	const time = formatLastActive(
		params.presence.lastActiveAt,
		params.now,
		params.locale,
	);
	return params.copy.lastActive.replace("{time}", time);
}
