import { z } from "zod";

export const nowPlayingTrackSchema = z.object({
	title: z.string(),
	artist: z.string(),
	url: z.url(),
	cover: z.url().nullable(),
	isPlaying: z.boolean(),
});

export const nowPlayingSchema = z.object({
	track: nowPlayingTrackSchema.nullable(),
});

export type NowPlayingTrack = z.infer<typeof nowPlayingTrackSchema>;
export type NowPlaying = z.infer<typeof nowPlayingSchema>;

export const NOW_PLAYING_QUERY_KEY = ["now-playing"] as const;

export async function fetchNowPlaying(): Promise<NowPlaying> {
	const response = await fetch("/api/now-playing");
	if (!response.ok) throw new Error("Failed to load the current track.");
	return nowPlayingSchema.parse(await response.json());
}
