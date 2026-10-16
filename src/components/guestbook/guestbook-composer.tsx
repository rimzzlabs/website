import { GithubLogoIcon, UserCircleDashedIcon } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

import {
	GUESTBOOK_ACTION_TRANSITION,
	GuestbookForm,
} from "@/components/guestbook/guestbook-form";
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
	const anonymousButtonRef = useRef<HTMLButtonElement>(null);
	const returnFocusRef = useRef(false);

	useEffect(() => {
		if (anonymous || !returnFocusRef.current) return;
		returnFocusRef.current = false;
		anonymousButtonRef.current?.focus();
	}, [anonymous]);

	if (session.isPending) {
		return (
			<div className="flex flex-col gap-2 sm:flex-row">
				<Skeleton className="h-9 w-full sm:w-44" />
				<Skeleton className="h-9 w-full sm:w-44" />
			</div>
		);
	}

	const user = session.data?.user;

	if (user) {
		return (
			<GuestbookForm
				copy={props.copy}
				user={{ name: user.name, image: user.image ?? null }}
			/>
		);
	}

	if (anonymous) {
		return (
			<GuestbookForm
				copy={props.copy}
				user={null}
				autoFocus
				onCancel={() => {
					returnFocusRef.current = true;
					morph(() => setAnonymous(false));
				}}
			/>
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
				ref={anonymousButtonRef}
				variant="outline"
				style={{ viewTransitionName: GUESTBOOK_ACTION_TRANSITION }}
				onClick={() => morph(() => setAnonymous(true))}
			>
				<UserCircleDashedIcon />
				{props.copy.writeAnonymously}
			</Button>
		</div>
	);
}
