import { type PresenceUpdate, toPresence } from "@rimzzlabs/presence";
import { z } from "zod";
import {
	clearPresenceCache,
	type PresenceEnv,
	readPresence,
	writePresence,
} from "../_lib/presence";

interface PresenceContext {
	request: Request;
	env: PresenceEnv;
	waitUntil(promise: Promise<unknown>): void;
}

const CACHE_SECONDS = 30;

const actionSchema = z.object({ action: z.enum(["on", "off", "ping"]) });

const encoder = new TextEncoder();

async function digest(value: string) {
	return crypto.subtle.digest("SHA-256", encoder.encode(value));
}

// Hash both sides first, so the compare takes the same time for any length.
async function isAuthorized(request: Request, token: string | undefined) {
	if (!token) return false;
	const header = request.headers.get("authorization") ?? "";
	const given = header.replace(/^Bearer\s+/i, "");
	const subtle = crypto.subtle as SubtleCrypto & {
		timingSafeEqual(a: ArrayBuffer, b: ArrayBuffer): boolean;
	};
	return subtle.timingSafeEqual(await digest(given), await digest(token));
}

function noStore(body: unknown, status = 200) {
	return Response.json(body, {
		status,
		headers: { "Cache-Control": "no-store" },
	});
}

export async function onRequestGet(context: PresenceContext) {
	const presence = await readPresence(context);
	return Response.json(presence, {
		headers: { "Cache-Control": `public, max-age=${CACHE_SECONDS}` },
	});
}

// Called by the Raycast extension. "ping" changes nothing while the status
// is off, so the extension can also use it to read the current state.
export async function onRequestPost(context: PresenceContext) {
	if (!(await isAuthorized(context.request, context.env.PRESENCE_TOKEN))) {
		return noStore({ error: "Unauthorized." }, 401);
	}

	const body = actionSchema.safeParse(
		await context.request.json().catch(() => null),
	);
	if (!body.success) return noStore({ error: "Invalid action." }, 400);

	const now = Date.now();
	const row = await writePresence({
		db: context.env.DB,
		action: body.data.action,
		now,
	});
	if (body.data.action !== "ping") context.waitUntil(clearPresenceCache());

	const update: PresenceUpdate = {
		enabled: row?.enabled === 1,
		...toPresence(row, now),
	};
	return noStore(update);
}
