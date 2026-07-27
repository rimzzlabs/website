import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import type { Lang } from "@/i18n/config";
import { GuestbookChoice } from "./guestbook-choice";
import { GuestbookForm } from "./guestbook-form";
import { GuestbookVerifiedForm } from "./guestbook-verified-form";

type GuestbookComposeProps = { lang: Lang; siteKey: string; onSuccess: () => void };

export function GuestbookCompose(props: GuestbookComposeProps) {
	const { user, isPending, login } = useAuth();
	const [anonymous, setAnonymous] = useState(false);

	if (isPending) {
		return <div className="h-40 animate-pulse rounded-lg bg-muted/40" />;
	}
	if (user) {
		return <GuestbookVerifiedForm lang={props.lang} user={user} onSuccess={props.onSuccess} />;
	}
	if (anonymous) {
		return <GuestbookForm lang={props.lang} siteKey={props.siteKey} onSuccess={props.onSuccess} />;
	}
	return (
		<GuestbookChoice
			lang={props.lang}
			onGithub={() => login("github")}
			onGoogle={() => login("google")}
			onAnonymous={() => setAnonymous(true)}
		/>
	);
}
