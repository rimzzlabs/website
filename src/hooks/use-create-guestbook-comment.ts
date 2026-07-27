import { type InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { guestbookKeys, postGuestbookComment } from "@/lib/guestbook";
import type { GuestbookPage } from "@/lib/guestbook-schema";

export function useCreateGuestbookComment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postGuestbookComment,
		onSuccess: (comment) => {
			queryClient.setQueryData<InfiniteData<GuestbookPage, number>>(guestbookKeys.feed(), (old) => {
				if (!old || old.pages.length === 0) return old;
				const [first, ...rest] = old.pages;
				const items = [comment, ...first.items.filter((c) => c.id !== comment.id)];
				return { ...old, pages: [{ ...first, items }, ...rest] };
			});
		},
	});
}
