import {
	DotsThreeIcon,
	GithubLogoIcon,
	PencilSimpleIcon,
	TrashIcon,
	UserIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { GuestbookEntryDelete } from "@/components/guestbook/guestbook-entry-delete";
import { GuestbookEntryEditor } from "@/components/guestbook/guestbook-entry-editor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/en";
import { formatDate, formatRelative } from "@/lib/datetime";
import type { GuestbookEntry as GuestbookEntryData } from "@/lib/guestbook/schema";
import { toWebsiteLabel, toWebsiteUrl } from "@/lib/guestbook/website";

function formatEntryTime(
	createdAt: number,
	now: number | null,
	locale: Locale,
) {
	if (now === null) return formatDate(undefined, locale)(createdAt);
	return formatRelative(createdAt, now, locale);
}

interface GuestbookEntryProps {
	copy: Dictionary["guestbook"];
	locale: Locale;
	now: number | null;
	entry: GuestbookEntryData;
	own: boolean;
}

export function GuestbookEntry(props: GuestbookEntryProps) {
	const name = props.entry.name || props.copy.anonymous;
	const formatFullDate = formatDate(
		{ dateStyle: "long", timeStyle: "short" },
		props.locale,
	);
	const website = toWebsiteUrl(props.entry.site);
	const initial = props.entry.name.trim().slice(0, 1).toUpperCase();
	const [editing, setEditing] = useState(false);
	const [deleting, setDeleting] = useState(false);

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
								<span className="sr-only">{props.copy.opensInNewTab}</span>
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
						title={formatFullDate(props.entry.createdAt)}
						className="ml-auto text-xs tabular-nums text-muted-foreground"
					>
						{formatEntryTime(props.entry.createdAt, props.now, props.locale)}
						{props.entry.updatedAt !== null && ` · ${props.copy.edited}`}
					</time>
					{props.own && (
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<Button
										variant="ghost"
										size="icon-sm"
										className="-my-1 -mr-2 self-center"
									/>
								}
							>
								<DotsThreeIcon aria-hidden="true" weight="bold" />
								<span className="sr-only">{props.copy.entryActions}</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="min-w-36">
								<DropdownMenuItem onClick={() => setEditing(true)}>
									<PencilSimpleIcon aria-hidden="true" />
									{props.copy.edit}
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setDeleting(true)}>
									<TrashIcon aria-hidden="true" />
									{props.copy.delete}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>

				{editing ? (
					<GuestbookEntryEditor
						copy={props.copy}
						entry={props.entry}
						onDone={() => setEditing(false)}
					/>
				) : (
					<p className="pt-1 text-sm/relaxed text-pretty whitespace-pre-line wrap-break-word">
						{props.entry.message}
					</p>
				)}
			</div>

			{props.own && (
				<GuestbookEntryDelete
					copy={props.copy}
					entryId={props.entry.id}
					open={deleting}
					onOpenChange={setDeleting}
				/>
			)}
		</li>
	);
}
