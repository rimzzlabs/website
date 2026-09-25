import { QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: 1,
				refetchOnWindowFocus: import.meta.env.PROD,
				staleTime: 30_000,
			},
		},
	});
}

let browserClient: QueryClient | null = null;

export function getQueryClient() {
	if (typeof window === "undefined") return makeQueryClient();
	if (!browserClient) browserClient = makeQueryClient();
	return browserClient;
}
