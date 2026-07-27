import { type InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGuestbookComment, guestbookKeys } from "@/lib/guestbook";
import type { GuestbookPage } from "@/lib/guestbook-schema";

export function useDeleteGuestbookComment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => deleteGuestbookComment(id),
		onSuccess: (_result, id) => {
			queryClient.setQueryData<InfiniteData<GuestbookPage, number>>(guestbookKeys.feed(), (old) => {
				if (!old) return old;
				return {
					...old,
					pages: old.pages.map((page) => ({
						...page,
						items: page.items.filter((c) => c.id !== id),
					})),
				};
			});
		},
	});
}
