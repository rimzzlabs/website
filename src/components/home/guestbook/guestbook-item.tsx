import { ArrowUpRight, BadgeCheck, MoreHorizontal, Pencil, Quote, Trash2 } from "lucide-react";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useDeleteGuestbookComment } from "@/hooks/use-delete-guestbook-comment";
import { useTimestamp } from "@/hooks/use-timestamp";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { dateToISO } from "@/lib/date";
import type { GuestbookComment } from "@/lib/guestbook-schema";
import { GuestbookEditDialog } from "./guestbook-edit-dialog";

export function GuestbookItem(props: {
	lang: Lang;
	comment: GuestbookComment;
	readOnly?: boolean;
}) {
	const t = getDictionary(props.lang).guestbook;
	const deletion = useDeleteGuestbookComment();
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const comment = props.comment;
	const isVerified = comment.authorType !== "anon";
	const authorId = `gb-author-${comment.id}`;

	const timestamp = useTimestamp(comment.createdAt, props.lang);

	function handleDelete() {
		deletion.mutate(comment.id, { onSuccess: () => setDeleteOpen(false) });
	}

	return (
		<article className="relative rounded-lg border bg-card p-4 sm:p-5" aria-labelledby={authorId}>
			<div aria-hidden className="w-2 bg-primary/70 left-0 inset-y-0" />
			<div className="flex items-start gap-2">
				<Quote aria-hidden="true" className="size-5 fill-primary/20 text-primary/20" />

				{!props.readOnly && comment.isOwn && (
					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button
									variant="ghost"
									size="icon-xs"
									className="-my-1 ml-auto text-muted-foreground"
								/>
							}
						>
							<MoreHorizontal />
							<span className="sr-only">{t.actions}</span>
						</DropdownMenuTrigger>
						<DropdownMenuContent side="bottom" align="end" className="w-32">
							<DropdownMenuItem onClick={() => setEditOpen(true)}>
								<Pencil className="size-3.5" />
								{t.edit}
							</DropdownMenuItem>
							<DropdownMenuItem className="text-destructive" onClick={() => setDeleteOpen(true)}>
								<Trash2 className="size-3.5" />
								{t.delete}
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>

			<blockquote className="mt-1 text-sm leading-relaxed text-pretty italic text-foreground/85">
				{comment.message}
			</blockquote>

			<TooltipProvider>
				<footer className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
					<span aria-hidden="true" className="text-sm text-muted-foreground">
						—
					</span>

					{isVerified && comment.avatar && (
						<img
							src={comment.avatar}
							alt=""
							width={20}
							height={20}
							className="size-5 rounded-full"
						/>
					)}

					{comment.site ? (
						<Button
							id={authorId}
							nativeButton={false}
							render={<a href={comment.site} rel="noopener nofollow" target="_blank" />}
							variant="unstyled"
							className="h-auto p-0 text-sm font-semibold hover:underline"
						>
							<span className="sr-only">{t.writtenBy}</span>
							{comment.name} <ArrowUpRight className="size-3 align-text-top" />
						</Button>
					) : (
						<span className="text-sm font-semibold" id={authorId}>
							<span className="sr-only">{t.writtenBy}</span>
							{comment.name}
						</span>
					)}

					{isVerified && (
						<Tooltip>
							<TooltipTrigger className="cursor-help">
								<BadgeCheck role="img" aria-label={t.verified} className="size-4 text-primary" />
							</TooltipTrigger>

							<TooltipContent>{t.verifiedTooltip}</TooltipContent>
						</Tooltip>
					)}

					<span className="text-xs text-muted-foreground italic">
						<Tooltip>
							<TooltipTrigger className="cursor-help">
								<time dateTime={dateToISO(comment.createdAt)}>{timestamp.label}</time>
							</TooltipTrigger>

							<TooltipContent>{timestamp.full}</TooltipContent>
						</Tooltip>
						{comment.updatedAt && <span> · {t.edited}</span>}
					</span>
				</footer>
			</TooltipProvider>

			{!props.readOnly && comment.isOwn && (
				<GuestbookEditDialog
					lang={props.lang}
					comment={comment}
					open={editOpen}
					onOpenChange={setEditOpen}
				/>
			)}

			{!props.readOnly && comment.isOwn && (
				<AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>{t.deleteTitle}</AlertDialogTitle>
							<AlertDialogDescription>{t.deleteDescription}</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>{t.cancel}</AlertDialogCancel>
							<AlertDialogAction
								variant="destructive"
								disabled={deletion.isPending}
								onClick={handleDelete}
							>
								{deletion.isPending ? t.deleting : t.deleteConfirm}
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</article>
	);
}
