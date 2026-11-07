import type { NowPlaying } from "../../src/lib/now-playing";
import { type LastfmEnv, readNowPlaying } from "../_lib/lastfm";

interface NowPlayingContext {
	request: Request;
	env: LastfmEnv;
	waitUntil(promise: Promise<unknown>): void;
}

const CACHE_SECONDS = 60;
const CACHE_KEY = "https://now-playing.internal/v1";

function toResponse(body: NowPlaying) {
	return Response.json(body, {
		headers: { "Cache-Control": `public, max-age=${CACHE_SECONDS}` },
	});
}

export async function onRequestGet(context: NowPlayingContext) {
	const cache = (caches as unknown as { default: Cache }).default;
	const cached = await cache.match(CACHE_KEY);
	if (cached) return cached;

	const track = await readNowPlaying(context.env).catch(() => null);
	const response = toResponse({ track });
	context.waitUntil(cache.put(CACHE_KEY, response.clone()));
	return response;
}
