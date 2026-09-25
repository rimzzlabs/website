import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { Dictionary } from "@/i18n/en";
import { deleteGuestbookEntry, GUESTBOOK_QUERY_KEY } from "@/lib/guestbook/api";
import { getQueryClient } from "@/lib/query-client";

interface GuestbookEntryDeleteProps {
	copy: Dictionary["guestbook"];
	entryId: number;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function GuestbookEntryDelete(props: GuestbookEntryDeleteProps) {
	const queryClient = getQueryClient();
	const mutation = useMutation(
		{
			mutationFn: () => deleteGuestbookEntry(props.entryId),
			onSuccess: async () => {
				props.onOpenChange(false);
				await queryClient.invalidateQueries({ queryKey: GUESTBOOK_QUERY_KEY });
			},
		},
		queryClient,
	);

	return (
		<Dialog
			open={props.open}
			onOpenChange={(open) => {
				if (!open) mutation.reset();
				props.onOpenChange(open);
			}}
		>
			<DialogContent showCloseButton={false} closeLabel={props.copy.cancel}>
				<DialogHeader>
					<DialogTitle>{props.copy.deleteTitle}</DialogTitle>
					<DialogDescription>{props.copy.deleteBody}</DialogDescription>
				</DialogHeader>

				{mutation.isError && (
					<p role="alert" className="text-sm text-destructive">
						{props.copy.deleteError}
					</p>
				)}

				<DialogFooter>
					<DialogClose render={<Button variant="outline" />}>
						{props.copy.cancel}
					</DialogClose>
					<Button
						type="button"
						disabled={mutation.isPending}
						onClick={() => mutation.mutate()}
					>
						{mutation.isPending ? props.copy.deleting : props.copy.delete}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
