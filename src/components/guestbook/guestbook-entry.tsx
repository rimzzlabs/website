import { GithubLogoIcon, UserIcon } from "@phosphor-icons/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/datetime";
import type { GuestbookEntry as GuestbookEntryData } from "@/lib/guestbook/schema";

const formatEntryDate = formatDate();

interface GuestbookEntryProps {
	entry: GuestbookEntryData;
}

export function GuestbookEntry(props: GuestbookEntryProps) {
	const name = props.entry.name || "Anonymous";
	const initial = props.entry.name.trim().slice(0, 1).toUpperCase();

	return (
		<li className="flex gap-3 border-b py-4 first:border-t">
			<Avatar>
				{props.entry.avatar && <AvatarImage src={props.entry.avatar} alt="" />}
				<AvatarFallback>
					{initial || <UserIcon aria-hidden="true" className="size-4" />}
				</AvatarFallback>
			</Avatar>

			<div className="min-w-0 flex-1">
				<div className="flex flex-wrap items-baseline gap-x-2">
					{props.entry.site ? (
						<a
							href={props.entry.site}
							target="_blank"
							rel="ugc nofollow noopener noreferrer"
							className="font-medium link-underline"
						>
							{name}
						</a>
					) : (
						<span className="font-medium">{name}</span>
					)}
					{props.entry.authorType === "github" && (
						<GithubLogoIcon
							role="img"
							aria-label="Signed in with GitHub"
							className="size-[0.9em] self-center text-muted-foreground"
						/>
					)}
					<time
						dateTime={new Date(props.entry.createdAt).toISOString()}
						className="ml-auto text-xs tabular-nums text-muted-foreground"
					>
						{formatEntryDate(props.entry.createdAt)}
					</time>
				</div>

				<p className="pt-1 text-sm/relaxed text-pretty whitespace-pre-line wrap-break-word">
					{props.entry.message}
				</p>
			</div>
		</li>
	);
}
