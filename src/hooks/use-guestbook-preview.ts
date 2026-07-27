import { useQuery } from "@tanstack/react-query";
import { fetchRecentComments, guestbookKeys } from "@/lib/guestbook";

export function useGuestbookPreview(limit: number) {
	return useQuery({
		queryKey: guestbookKeys.preview(limit),
		queryFn: () => fetchRecentComments(limit),
		staleTime: 30_000,
	});
}
