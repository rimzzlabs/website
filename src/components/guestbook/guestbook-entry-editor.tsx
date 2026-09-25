import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/i18n/en";
import { describedBy } from "@/lib/aria";
import { GUESTBOOK_QUERY_KEY, updateGuestbookEntry } from "@/lib/guestbook/api";
import {
	createGuestbookEditSchema,
	type GuestbookEditInput,
	type GuestbookEntry,
} from "@/lib/guestbook/schema";
import { getQueryClient } from "@/lib/query-client";

interface GuestbookEntryEditorProps {
	copy: Dictionary["guestbook"];
	entry: GuestbookEntry;
	onDone: () => void;
}

export function GuestbookEntryEditor(props: GuestbookEntryEditorProps) {
	const queryClient = getQueryClient();
	const fieldId = `guestbook-edit-${props.entry.id}`;
	const form = useForm<GuestbookEditInput>({
		resolver: zodResolver(createGuestbookEditSchema(props.copy.validation)),
		defaultValues: { message: props.entry.message },
	});

	const mutation = useMutation(
		{
			mutationFn: (values: GuestbookEditInput) =>
				updateGuestbookEntry(props.entry.id, values),
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: GUESTBOOK_QUERY_KEY });
				props.onDone();
			},
		},
		queryClient,
	);

	const error = form.formState.errors.message;

	return (
		<form
			noValidate
			onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
			className="flex flex-col gap-2 pt-2"
		>
			<Field data-invalid={Boolean(error)}>
				<label htmlFor={fieldId} className="sr-only">
					{props.copy.editLabel}
				</label>
				<Textarea
					id={fieldId}
					rows={3}
					autoFocus
					aria-invalid={Boolean(error)}
					aria-describedby={describedBy([Boolean(error) && `${fieldId}-error`])}
					className="min-h-20 resize-none"
					{...form.register("message")}
				/>
				<FieldError id={`${fieldId}-error`} errors={[error]} />
			</Field>

			{mutation.isError && (
				<p role="alert" className="text-sm text-destructive">
					{props.copy.editError}
				</p>
			)}

			<div className="flex gap-2">
				<Button type="submit" size="sm" disabled={mutation.isPending}>
					{mutation.isPending ? props.copy.saving : props.copy.save}
				</Button>
				<Button type="button" size="sm" variant="ghost" onClick={props.onDone}>
					{props.copy.cancel}
				</Button>
			</div>
		</form>
	);
}
