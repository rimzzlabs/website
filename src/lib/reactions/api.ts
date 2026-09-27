import { reactionStateSchema } from "@/lib/reactions/schema";

export function reactionQueryKey(slug: string) {
	return ["reactions", slug] as const;
}

// TanStack Query turns a thrown error into query or mutation error state.
export async function fetchReaction(slug: string) {
	const response = await fetch(`/api/reactions/${slug}`);
	if (!response.ok) throw new Error("Failed to load the reactions.");
	return reactionStateSchema.parse(await response.json());
}

export async function toggleReaction(slug: string) {
	const response = await fetch(`/api/reactions/${slug}`, { method: "POST" });
	if (!response.ok) throw new Error("Failed to save the reaction.");
	return reactionStateSchema.parse(await response.json());
}
