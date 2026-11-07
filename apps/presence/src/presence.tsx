import {
	Color,
	getPreferenceValues,
	Icon,
	MenuBarExtra,
	open,
	showHUD,
} from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

import { type PresenceUpdate, presenceUpdateSchema } from "@rimzzlabs/presence";

type Action = "on" | "off" | "ping";

const SITE_URL = "https://rimzzlabs.com";

const ONLINE_ICON = { source: Icon.CircleFilled, tintColor: Color.Green };
const OFFLINE_ICON = { source: Icon.Circle, tintColor: Color.SecondaryText };

async function send(action: Action) {
	const preferences = getPreferenceValues<Preferences.Presence>();
	const response = await fetch(preferences.endpoint, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${preferences.token.trim()}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ action }),
	});
	if (!response.ok) throw new Error(`Presence API: ${response.status}`);
	return presenceUpdateSchema.parse(await response.json());
}

function toIcon(state: PresenceUpdate | undefined) {
	if (state?.status === "online") return ONLINE_ICON;
	return OFFLINE_ICON;
}

// Raycast runs this command every 2 minutes in the background. Each run sends
// a ping. The server ignores the ping while the status is off.
export default function Command() {
	const presence = useCachedPromise(send, ["ping"]);
	const enabled = presence.data?.enabled ?? false;

	async function goOnline() {
		await presence.mutate(send("on"));
		await showHUD("You are online");
	}

	async function goOffline() {
		await presence.mutate(send("off"));
		await showHUD("You are offline");
	}

	return (
		<MenuBarExtra
			icon={toIcon(presence.data)}
			isLoading={presence.isLoading}
			tooltip={`rimzzlabs.com: ${presence.data?.status ?? "unknown"}`}
		>
			{presence.error && (
				<MenuBarExtra.Item title={presence.error.message} icon={Icon.Warning} />
			)}
			{enabled ? (
				<MenuBarExtra.Item
					title="Go Offline"
					icon={Icon.Pause}
					onAction={goOffline}
				/>
			) : (
				<MenuBarExtra.Item
					title="Go Online"
					icon={Icon.Play}
					onAction={goOnline}
				/>
			)}
			<MenuBarExtra.Item
				title="Open rimzzlabs.com"
				icon={Icon.Globe}
				onAction={() => open(SITE_URL)}
			/>
		</MenuBarExtra>
	);
}
