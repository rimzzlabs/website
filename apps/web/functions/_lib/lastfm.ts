import { z } from "zod";

import type { NowPlayingTrack } from "../../src/lib/now-playing";

export interface LastfmEnv {
	LASTFM_API_KEY?: string;
	LASTFM_USERNAME?: string;
}

const API_URL = "https://ws.audioscrobbler.com/2.0/";
const COVER_SIZE = "large";
const PLACEHOLDER_COVER = "2a96cbd8b46e442fc41c2b86b821562f";

const trackSchema = z.object({
	name: z.string(),
	url: z.url(),
	artist: z.object({ "#text": z.string() }),
	image: z.array(z.object({ size: z.string(), "#text": z.string() })),
	"@attr": z.object({ nowplaying: z.literal("true") }).optional(),
});

const recentTracksSchema = z.object({
	recenttracks: z.object({
		track: z.union([z.array(trackSchema), trackSchema]),
	}),
});

type LastfmTrack = z.infer<typeof trackSchema>;

function pickCover(track: LastfmTrack) {
	const cover = track.image.find((image) => image.size === COVER_SIZE)?.[
		"#text"
	];
	if (!cover || cover.includes(PLACEHOLDER_COVER)) return null;
	return cover;
}

function toTrack(track: LastfmTrack): NowPlayingTrack {
	return {
		title: track.name,
		artist: track.artist["#text"],
		url: track.url,
		cover: pickCover(track),
		isPlaying: track["@attr"]?.nowplaying === "true",
	};
}

function firstTrack(tracks: LastfmTrack | Array<LastfmTrack>) {
	if (Array.isArray(tracks)) return tracks[0] ?? null;
	return tracks;
}

function hasCredentials(env: LastfmEnv): env is Required<LastfmEnv> {
	return Boolean(env.LASTFM_API_KEY && env.LASTFM_USERNAME);
}

export async function readNowPlaying(env: LastfmEnv) {
	if (!hasCredentials(env)) return null;

	const url = new URL(API_URL);
	url.search = new URLSearchParams({
		method: "user.getrecenttracks",
		user: env.LASTFM_USERNAME,
		api_key: env.LASTFM_API_KEY,
		format: "json",
		limit: "1",
	}).toString();

	const response = await fetch(url);
	if (!response.ok) throw new Error(`Last.fm: ${response.status}`);

	const recent = recentTracksSchema.parse(await response.json());
	const track = firstTrack(recent.recenttracks.track);
	if (!track) return null;
	return toTrack(track);
}
