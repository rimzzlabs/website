import { type InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { editGuestbookComment, guestbookKeys } from "@/lib/guestbook";
import type { GuestbookEditInput, GuestbookPage } from "@/lib/guestbook-schema";

export function useEditGuestbookComment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (vars: { id: number; input: GuestbookEditInput }) =>
			editGuestbookComment(vars.id, vars.input),
		onSuccess: (comment) => {
			queryClient.setQueryData<InfiniteData<GuestbookPage, number>>(guestbookKeys.feed(), (old) => {
				if (!old) return old;
				return {
					...old,
					pages: old.pages.map((page) => ({
						...page,
						items: page.items.map((c) => (c.id === comment.id ? comment : c)),
					})),
				};
			});
		},
	});
}
