import { ArrowUpRight, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
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
import { useDeleteGuestbookComment } from "@/hooks/use-delete-guestbook-comment";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import type { GuestbookComment } from "@/lib/guestbook-schema";
import { GuestbookEditDialog } from "./guestbook-edit-dialog";

export function GuestbookItem(props: { lang: Lang; comment: GuestbookComment }) {
	const t = getDictionary(props.lang).guestbook;
	const deletion = useDeleteGuestbookComment();
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const formatter = useMemo(
		() => new Intl.DateTimeFormat(props.lang, { dateStyle: "medium", timeStyle: "short" }),
		[props.lang],
	);

	const comment = props.comment;

	function handleDelete() {
		deletion.mutate(comment.id, { onSuccess: () => setDeleteOpen(false) });
	}

	return (
		<article className="py-4">
			<div className="flex items-center gap-2 pb-2">
				{comment.site ? (
					<Button
						nativeButton={false}
						render={<a href={comment.site} rel="noopener nofollow" target="_blank" />}
						variant="unstyled"
						className="text-sm font-semibold hover:underline p-0 h-auto"
					>
						<span className="sr-only">{t.writtenBy}</span>
						{comment.name} <ArrowUpRight className="size-3 align-text-top" />
					</Button>
				) : (
					<span className="text-sm font-semibold">
						<span className="sr-only">{t.writtenBy}</span>
						{comment.name}
					</span>
				)}

				<span className="ml-auto text-xs text-muted-foreground">
					<time dateTime={new Date(comment.createdAt).toISOString()}>
						{formatter.format(comment.createdAt)}
					</time>
					{comment.updatedAt && <span> · {t.edited}</span>}
				</span>

				{comment.isOwn && (
					<DropdownMenu>
						<DropdownMenuTrigger
							render={
								<Button variant="ghost" size="icon-xs" className="-my-1 text-muted-foreground" />
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

			<blockquote className="text-sm border-l-4 pl-3 text-pretty">{comment.message}</blockquote>

			{comment.isOwn && (
				<GuestbookEditDialog
					lang={props.lang}
					comment={comment}
					open={editOpen}
					onOpenChange={setEditOpen}
				/>
			)}

			{comment.isOwn && (
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
