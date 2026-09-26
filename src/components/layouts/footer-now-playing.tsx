import { MusicNotesIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import type { Dictionary } from "@/i18n/en";
import {
	fetchNowPlaying,
	NOW_PLAYING_QUERY_KEY,
	type NowPlayingTrack,
} from "@/lib/now-playing";
import { getQueryClient } from "@/lib/query-client";

interface FooterNowPlayingProps {
	copy: Dictionary["footer"];
	opensInNewTab: string;
}

const REFRESH_MS = 60_000;
const BAR_DELAYS = ["0ms", "300ms", "150ms"];
const CARD_CLASS = "flex max-w-72 items-center gap-3";

function Equalizer() {
	return (
		<span aria-hidden="true" className="flex h-2.5 items-end gap-px">
			{BAR_DELAYS.map((delay) => (
				<span
					key={delay}
					style={{ animationDelay: delay }}
					className="h-full w-0.5 origin-bottom scale-y-60 rounded-full bg-primary motion-ok:animate-equalizer"
				/>
			))}
		</span>
	);
}

function CoverPlaceholder() {
	return (
		<span className="flex size-13 shrink-0 items-center justify-center rounded-md border bg-muted text-muted-foreground">
			<MusicNotesIcon aria-hidden="true" className="size-4" />
		</span>
	);
}

function Cover(props: { src: string | null }) {
	const [failedSrc, setFailedSrc] = useState<string | null>(null);
	if (!props.src || failedSrc === props.src) return <CoverPlaceholder />;

	return (
		<img
			src={props.src}
			alt=""
			width={40}
			height={40}
			onError={() => setFailedSrc(props.src)}
			className="size-13 shrink-0 rounded-md border object-cover"
		/>
	);
}

function TrackText(props: {
	label: React.ReactNode;
	title: string;
	detail: string;
}) {
	return (
		<span className="flex min-w-0 flex-col">
			<span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
				{props.label}
			</span>
			<span className="truncate text-sm font-medium transition-colors group-hover:text-primary">
				{props.title}
			</span>
			<span className="truncate text-xs text-muted-foreground">
				{props.detail}
			</span>
		</span>
	);
}

function TrackCard(props: FooterNowPlayingProps & { track: NowPlayingTrack }) {
	const label = props.track.isPlaying ? (
		<>
			<Equalizer />
			{props.copy.nowPlaying}
		</>
	) : (
		props.copy.lastPlayed
	);

	return (
		<a
			href={props.track.url}
			target="_blank"
			rel="noopener noreferrer"
			className={`group ${CARD_CLASS}`}
		>
			<Cover src={props.track.cover} />
			<TrackText
				label={label}
				title={props.track.title}
				detail={props.track.artist}
			/>
			<span className="sr-only">{props.opensInNewTab}</span>
		</a>
	);
}

function NotPlayingCard(props: FooterNowPlayingProps) {
	return (
		<div className={CARD_CLASS}>
			<CoverPlaceholder />
			<TrackText
				label={props.copy.notPlaying}
				title={props.copy.notPlayingBody}
				detail="Last.fm"
			/>
		</div>
	);
}

function LoadingCard(props: FooterNowPlayingProps) {
	return (
		<div
			role="status"
			aria-label={props.copy.loadingTrack}
			className={CARD_CLASS}
		>
			<Skeleton className="size-13 shrink-0" />
			<span className="flex flex-col">
				<Skeleton className="my-0.5 h-3 w-20" />
				<Skeleton className="my-1 h-3 w-36" />
				<Skeleton className="my-0.5 h-3 w-24" />
			</span>
		</div>
	);
}

export function FooterNowPlaying(props: FooterNowPlayingProps) {
	const query = useQuery(
		{
			queryKey: NOW_PLAYING_QUERY_KEY,
			queryFn: fetchNowPlaying,
			refetchInterval: REFRESH_MS,
		},
		getQueryClient(),
	);

	if (query.isPending) return <LoadingCard {...props} />;

	const track = query.data?.track;
	if (!track) return <NotPlayingCard {...props} />;
	return <TrackCard {...props} track={track} />;
}
