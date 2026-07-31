import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Turnstile } from "@/components/shared/turnstile";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { useCreateGuestbookComment } from "@/hooks/use-create-guestbook-comment";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { type GuestbookInput, guestbookInputSchema } from "@/lib/guestbook-schema";
import { GuestbookFields } from "./guestbook-fields";

type GuestbookFormProps = { lang: Lang; siteKey: string; onSuccess: () => void };

export function GuestbookForm(props: GuestbookFormProps) {
	const t = getDictionary(props.lang).guestbook;
	const mutation = useCreateGuestbookComment();
	const schema = useMemo(() => guestbookInputSchema(t.validation), [t]);

	const methods = useForm<GuestbookInput>({
		resolver: zodResolver(schema),
		defaultValues: { name: "", site: "", message: "", token: "" },
	});
	const { handleSubmit, setValue, watch, reset, formState } = methods;

	const hasToken = Boolean(watch("token"));
	const submitting = mutation.isPending;

	const onSubmit = handleSubmit((values) => {
		mutation.mutate(values, {
			onSuccess: () => {
				reset();
				props.onSuccess();
			},
		});
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit} noValidate>
				<FieldGroup className="pb-4 gap-4">
					<GuestbookFields lang={props.lang} idPrefix="guestbook-create" showName />

					<Field>
						<Turnstile
							siteKey={props.siteKey}
							onToken={(token) =>
								setValue("token", token, { shouldValidate: Boolean(formState.errors.token) })
							}
						/>
						{mutation.isError && <FieldError>{t.errorBody}</FieldError>}
					</Field>
				</FieldGroup>

				<DialogFooter>
					<Button type="submit" className="sm:order-2" disabled={submitting || !hasToken}>
						{submitting ? t.sending : t.send}
					</Button>
					<DialogClose render={<Button variant="outline" />}>{t.close}</DialogClose>
				</DialogFooter>
			</form>
		</FormProvider>
	);
}
