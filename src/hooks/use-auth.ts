import { useQueryClient } from "@tanstack/react-query";
import { type AuthProvider, authClient } from "@/lib/auth-client";
import { guestbookKeys } from "@/lib/guestbook";

export type GuestbookUser = { name: string; image: string | null };

export function useAuth() {
	const queryClient = useQueryClient();
	const session = authClient.useSession();

	function login(provider: AuthProvider) {
		authClient.signIn.social({
			provider,
			callbackURL: window.location.pathname + window.location.search,
		});
	}

	async function signOut() {
		await authClient.signOut();
		queryClient.invalidateQueries({ queryKey: guestbookKeys.feed() });
	}

	const raw = session.data?.user;
	const user: GuestbookUser | null = raw ? { name: raw.name, image: raw.image ?? null } : null;

	return { user, isPending: session.isPending, login, signOut };
}
