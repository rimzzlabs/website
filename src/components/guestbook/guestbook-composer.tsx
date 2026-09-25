import { GithubLogoIcon, UserCircleDashedIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { GuestbookForm } from "@/components/guestbook/guestbook-form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Dictionary } from "@/i18n/en";
import { authClient } from "@/lib/auth-client";

interface GuestbookComposerProps {
	copy: Dictionary["guestbook"];
}

export function GuestbookComposer(props: GuestbookComposerProps) {
	const session = authClient.useSession();
	const [anonymous, setAnonymous] = useState(false);

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
				onCancel={() => setAnonymous(false)}
			/>
		);
	}

	return (
		<div className="flex flex-col gap-2 sm:flex-row">
			<Button
				onClick={() =>
					authClient.signIn.social({
						provider: "github",
						callbackURL: "/guestbook",
					})
				}
			>
				<GithubLogoIcon />
				{props.copy.signIn}
			</Button>
			<Button variant="outline" onClick={() => setAnonymous(true)}>
				<UserCircleDashedIcon />
				{props.copy.writeAnonymously}
			</Button>
		</div>
	);
}
