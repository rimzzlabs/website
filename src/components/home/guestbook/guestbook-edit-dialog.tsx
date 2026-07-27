import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { useEditGuestbookComment } from "@/hooks/use-edit-guestbook-comment";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import {
	type GuestbookComment,
	type GuestbookEditInput,
	guestbookEditSchema,
} from "@/lib/guestbook-schema";
import { GuestbookFields } from "./guestbook-fields";

type GuestbookEditDialogProps = {
	lang: Lang;
	comment: GuestbookComment;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function GuestbookEditDialog(props: GuestbookEditDialogProps) {
	const t = getDictionary(props.lang).guestbook;

	return (
		<Dialog open={props.open} onOpenChange={props.onOpenChange}>
			<DialogContent showCloseButton={false}>
				<DialogHeader>
					<DialogTitle>{t.editTitle}</DialogTitle>
				</DialogHeader>

				<GuestbookEditForm
					key={`${props.comment.id}-${props.comment.updatedAt ?? 0}`}
					lang={props.lang}
					comment={props.comment}
					onDone={() => props.onOpenChange(false)}
				/>
			</DialogContent>
		</Dialog>
	);
}

function GuestbookEditForm(props: { lang: Lang; comment: GuestbookComment; onDone: () => void }) {
	const t = getDictionary(props.lang).guestbook;
	const mutation = useEditGuestbookComment();
	const schema = useMemo(
		() => guestbookEditSchema({ name: t.validation.name, message: t.validation.message }),
		[t],
	);

	const methods = useForm<GuestbookEditInput>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: props.comment.name,
			site: props.comment.site ?? "",
			message: props.comment.message,
		},
	});

	const onSubmit = methods.handleSubmit((values) => {
		mutation.mutate({ id: props.comment.id, input: values }, { onSuccess: () => props.onDone() });
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit} noValidate>
				<FieldGroup className="pb-4 gap-4">
					<GuestbookFields lang={props.lang} idPrefix={`guestbook-edit-${props.comment.id}`} />
					{mutation.isError && <FieldError>{t.errorBody}</FieldError>}
				</FieldGroup>

				<DialogFooter>
					<Button type="submit" className="sm:order-2" disabled={mutation.isPending}>
						{mutation.isPending ? t.saving : t.save}
					</Button>
					<DialogClose render={<Button variant="outline" />}>{t.cancel}</DialogClose>
				</DialogFooter>
			</form>
		</FormProvider>
	);
}
