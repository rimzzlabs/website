import { useInfiniteQuery } from "@tanstack/react-query";
import { guestbookFeedOptions } from "@/lib/guestbook";

export function useGuestbookFeed() {
	return useInfiniteQuery(guestbookFeedOptions());
}
