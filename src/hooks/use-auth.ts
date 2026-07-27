import { useQueryClient } from "@tanstack/react-query";
import { type AuthProvider, authClient } from "@/lib/auth-client";
import { guestbookKeys } from "@/lib/guestbook";

export type GuestbookUser = { name: string; image: string | null };

export function useAuth() {
	const queryClient = useQueryClient();
	const session = authClient.useSession();

	function login(provider: AuthProvider) {
		const returnTo = window.location.pathname + window.location.search;
		// Denying/canceling consent → come back to the page instead of better-auth's
		// error page. The ?error param is stripped on load by useClearAuthError().
		authClient.signIn.social({ provider, callbackURL: returnTo, errorCallbackURL: returnTo });
	}

	async function signOut() {
		await authClient.signOut();
		queryClient.invalidateQueries({ queryKey: guestbookKeys.feed() });
	}

	const raw = session.data?.user;
	const user: GuestbookUser | null = raw ? { name: raw.name, image: raw.image ?? null } : null;

	return { user, isPending: session.isPending, login, signOut };
}
