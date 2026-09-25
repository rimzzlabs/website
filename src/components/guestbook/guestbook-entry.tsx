import { GithubLogoIcon, UserIcon } from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";
import { formatDate } from "@/lib/datetime";
import type { GuestbookEntry as GuestbookEntryData } from "@/lib/guestbook/schema";
import { toWebsiteLabel, toWebsiteUrl } from "@/lib/guestbook/website";

interface GuestbookEntryProps {
	copy: Dictionary["guestbook"];
	locale: Locale;
	entry: GuestbookEntryData;
}

export function GuestbookEntry(props: GuestbookEntryProps) {
	const name = props.entry.name || props.copy.anonymous;
	const formatEntryDate = formatDate(undefined, props.locale);
	const website = toWebsiteUrl(props.entry.site);
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
					{website ? (
						<Tooltip>
							<TooltipTrigger
								render={
									<a
										href={website}
										target="_blank"
										rel="ugc nofollow noopener noreferrer"
										className="font-medium link-underline"
									/>
								}
							>
								{name}
							</TooltipTrigger>
							<TooltipContent>{toWebsiteLabel(website)}</TooltipContent>
						</Tooltip>
					) : (
						<span className="font-medium">{name}</span>
					)}
					{props.entry.authorType === "github" && (
						<GithubLogoIcon
							role="img"
							aria-label={props.copy.signedInWith}
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
