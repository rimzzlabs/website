import { GithubLogoIcon, UserCircleDashedIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";

import {
	GUESTBOOK_CARD_MORPH,
	GuestbookCard,
} from "@/components/guestbook/guestbook-card";
import { GuestbookForm } from "@/components/guestbook/guestbook-form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Dictionary } from "@/i18n/en";
import { authClient } from "@/lib/auth-client";
import { morph } from "@/lib/view-transition";

interface GuestbookComposerProps {
	copy: Dictionary["guestbook"];
}

export function GuestbookComposer(props: GuestbookComposerProps) {
	const session = authClient.useSession();
	const [anonymous, setAnonymous] = useState(false);
	const [signedOut, setSignedOut] = useState(false);
	const returnFocusRef = useRef(false);

	function focusOnReturn(button: HTMLButtonElement | null) {
		if (!button || !returnFocusRef.current) return;
		returnFocusRef.current = false;
		button.focus();
	}

	if (session.isPending) {
		return (
			<div className="flex flex-col gap-2 sm:flex-row">
				<Skeleton className="h-9 w-full sm:w-44" />
				<Skeleton className="h-9 w-full sm:w-44" />
			</div>
		);
	}

	const user = session.data?.user;

	function signOut() {
		returnFocusRef.current = true;
		morph(() => setSignedOut(true), "guestbook-close");
		authClient.signOut().then(
			(result) => {
				if (result.error) setSignedOut(false);
			},
			() => setSignedOut(false),
		);
	}

	if (user && !signedOut) {
		return (
			<GuestbookCard>
				<GuestbookForm
					copy={props.copy}
					user={{ name: user.name, image: user.image ?? null }}
					onSignOut={signOut}
				/>
			</GuestbookCard>
		);
	}

	if (anonymous) {
		return (
			<GuestbookCard>
				<GuestbookForm
					copy={props.copy}
					user={null}
					autoFocus
					onCancel={() => {
						returnFocusRef.current = true;
						morph(() => setAnonymous(false), "guestbook-close");
					}}
				/>
			</GuestbookCard>
		);
	}

	return (
		<div className="flex flex-col gap-2 sm:flex-row">
			<Button
				onClick={() =>
					authClient.signIn.social({
						provider: "github",
						callbackURL: window.location.pathname,
					})
				}
			>
				<GithubLogoIcon />
				{props.copy.signIn}
			</Button>
			<Button
				ref={focusOnReturn}
				variant="outline"
				style={GUESTBOOK_CARD_MORPH}
				onClick={() => morph(() => setAnonymous(true), "guestbook-open")}
			>
				<UserCircleDashedIcon />
				{props.copy.writeAnonymously}
			</Button>
		</div>
	);
}
