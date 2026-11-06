import {
	Color,
	getPreferenceValues,
	Icon,
	MenuBarExtra,
	open,
	showHUD,
} from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

type Action = "on" | "off" | "ping";

interface PresenceState {
	enabled: boolean;
	status: "online" | "away" | "offline";
	lastActiveAt: string | null;
}

interface Preferences {
	token: string;
	endpoint: string;
}

const SITE_URL = "https://rimzzlabs.com";

async function send(action: Action): Promise<PresenceState> {
	const preferences = getPreferenceValues<Preferences>();
	const response = await fetch(preferences.endpoint, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${preferences.token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ action }),
	});
	if (!response.ok) throw new Error(`Presence API: ${response.status}`);
	return (await response.json()) as PresenceState;
}

function toIcon(state: PresenceState | undefined) {
	if (state?.status === "online") {
		return { source: Icon.CircleFilled, tintColor: Color.Green };
	}
	return { source: Icon.Circle, tintColor: Color.SecondaryText };
}

// Raycast runs this command every 2 minutes in the background. Each run sends
// a ping. The server ignores the ping while the status is off.
export default function Command() {
	const presence = useCachedPromise(send, ["ping"]);
	const enabled = presence.data?.enabled ?? false;

	async function toggle() {
		const next = enabled ? "off" : "on";
		await presence.mutate(send(next), {
			optimisticUpdate: (state) => state && { ...state, enabled: !enabled },
			shouldRevalidateAfter: false,
		});
		await showHUD(next === "on" ? "You are online" : "You are offline");
	}

	return (
		<MenuBarExtra
			icon={toIcon(presence.data)}
			isLoading={presence.isLoading}
			tooltip={enabled ? "Online on rimzzlabs.com" : "Offline on rimzzlabs.com"}
		>
			{presence.error && (
				<MenuBarExtra.Item title={presence.error.message} icon={Icon.Warning} />
			)}
			<MenuBarExtra.Item
				title={enabled ? "Go Offline" : "Go Online"}
				icon={enabled ? Icon.Pause : Icon.Play}
				onAction={toggle}
			/>
			<MenuBarExtra.Item
				title="Open rimzzlabs.com"
				icon={Icon.Globe}
				onAction={() => open(SITE_URL)}
			/>
		</MenuBarExtra>
	);
}
