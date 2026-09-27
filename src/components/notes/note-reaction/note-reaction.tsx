import { HeartIcon } from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cn } from "cn";
import { useState } from "react";

import { NoteReactionBurst } from "@/components/notes/note-reaction/note-reaction-burst";
import { Skeleton } from "@/components/ui/skeleton";
import type { Dictionary } from "@/i18n/en";
import { fill } from "@/i18n/fill";
import { isMotionReduced } from "@/lib/motion";
import { getQueryClient } from "@/lib/query-client";
import {
	fetchReaction,
	reactionQueryKey,
	toggleReaction,
} from "@/lib/reactions/api";
import type { ReactionState } from "@/lib/reactions/schema";

interface NoteReactionProps {
	slug: string;
	copy: Dictionary["notes"]["reaction"];
}

function flip(state: ReactionState): ReactionState {
	return {
		count: state.count + (state.reacted ? -1 : 1),
		reacted: !state.reacted,
	};
}

// A heart at the end of each note. Anyone can press it; the server keeps one
// heart per visitor. Liking plays a pop, a ring, and a burst of particles,
// unless the visitor prefers reduced motion.
export function NoteReaction(props: NoteReactionProps) {
	const queryClient = getQueryClient();
	const queryKey = reactionQueryKey(props.slug);
	const [burst, setBurst] = useState(0);

	const query = useQuery(
		{ queryKey, queryFn: () => fetchReaction(props.slug) },
		queryClient,
	);

	// Presses run one at a time, in order, and the screen only takes the
	// server's answer after the last one, so fast tapping never flickers.
	const mutation = useMutation(
		{
			mutationKey: queryKey,
			scope: { id: `reaction-${props.slug}` },
			mutationFn: () => toggleReaction(props.slug),
			onMutate: async () => {
				await queryClient.cancelQueries({ queryKey });
				const previous = queryClient.getQueryData<ReactionState>(queryKey);
				if (previous) queryClient.setQueryData(queryKey, flip(previous));
				return { previous };
			},
			onError: (_error, _variables, context) => {
				if (context?.previous)
					queryClient.setQueryData(queryKey, context.previous);
			},
			onSuccess: (state) => {
				if (queryClient.isMutating({ mutationKey: queryKey }) <= 1)
					queryClient.setQueryData(queryKey, state);
			},
		},
		queryClient,
	);

	if (query.isError) return null;
	const state = query.data;

	const press = () => {
		if (!state) return;
		if (!state.reacted && !isMotionReduced()) {
			setBurst((count) => count + 1);
			navigator.vibrate?.(12);
		}
		mutation.mutate();
	};

	const count = state ? fill(props.copy.count, { count: state.count }) : "";
	const message = mutation.isError
		? props.copy.failed
		: state?.reacted
			? props.copy.thanks
			: props.copy.prompt;

	return (
		<div className="not-typeset mt-16 flex flex-col items-center gap-3 border-t pt-10">
			<p aria-live="polite" className="text-sm text-muted-foreground">
				{message}
			</p>
			<button
				type="button"
				onClick={press}
				disabled={!state}
				aria-pressed={state?.reacted ?? false}
				aria-label={state ? `${props.copy.like}, ${count}` : props.copy.like}
				data-reacted={state?.reacted ?? false}
				className="inline-flex h-12 items-center gap-2.5 rounded-full border bg-background px-5 font-medium transition-[background-color,border-color,transform] duration-200 select-none hover:bg-muted active:scale-95 disabled:opacity-60 data-[reacted=true]:border-rose-500/40 data-[reacted=true]:bg-rose-500/10"
			>
				<span className="relative grid size-7 place-items-center">
					{burst > 0 && <NoteReactionBurst key={burst} />}
					<HeartIcon
						key={burst}
						aria-hidden="true"
						weight={state?.reacted ? "fill" : "regular"}
						className={cn(
							"relative size-6 transition-colors",
							state?.reacted ? "text-rose-500" : "text-muted-foreground",
							burst > 0 && "motion-ok:animate-heart-pop",
						)}
					/>
				</span>
				{state ? (
					<span
						key={state.count}
						className="tabular-nums motion-ok:animate-count-roll"
					>
						{state.count}
					</span>
				) : (
					<Skeleton className="h-4 w-5 rounded-sm" />
				)}
			</button>
		</div>
	);
}
