import { QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 30_000 } },
	});
}

let browserClient: QueryClient | null = null;

// One client shared across islands in the browser so a post from one island
// updates queries in another; a throwaway client per server render.
export function getQueryClient() {
	if (typeof window === "undefined") return makeQueryClient();
	if (!browserClient) browserClient = makeQueryClient();
	return browserClient;
}
