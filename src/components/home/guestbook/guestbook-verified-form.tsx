import { zodResolver } from "@hookform/resolvers/zod";
import { LogOut } from "lucide-react";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { FieldError, FieldGroup } from "@/components/ui/field";
import { type GuestbookUser, useAuth } from "@/hooks/use-auth";
import { useCreateGuestbookComment } from "@/hooks/use-create-guestbook-comment";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { type GuestbookVerifiedInput, guestbookVerifiedSchema } from "@/lib/guestbook-schema";
import { GuestbookFields } from "./guestbook-fields";

type GuestbookVerifiedFormProps = { lang: Lang; user: GuestbookUser; onSuccess: () => void };

export function GuestbookVerifiedForm(props: GuestbookVerifiedFormProps) {
	const t = getDictionary(props.lang).guestbook;
	const { signOut } = useAuth();
	const mutation = useCreateGuestbookComment();
	const schema = useMemo(() => guestbookVerifiedSchema({ message: t.validation.message }), [t]);

	const methods = useForm<GuestbookVerifiedInput>({
		resolver: zodResolver(schema),
		defaultValues: { site: "", message: "" },
	});

	const onSubmit = methods.handleSubmit((values) => {
		mutation.mutate(values, {
			onSuccess: () => {
				methods.reset();
				props.onSuccess();
			},
		});
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={onSubmit} noValidate>
				<div className="mb-4 flex items-center gap-2 rounded-lg border bg-muted/40 p-2.5">
					{props.user.image && (
						<img
							src={props.user.image}
							alt=""
							width={28}
							height={28}
							className="size-7 rounded-full"
						/>
					)}
					<span className="text-sm">
						<span className="text-muted-foreground">{t.postingAs} </span>
						<span className="font-medium">{props.user.name}</span>
					</span>
					<Button
						type="button"
						variant="ghost"
						size="xs"
						className="ml-auto text-muted-foreground"
						onClick={signOut}
					>
						<LogOut />
						{t.signOut}
					</Button>
				</div>

				<FieldGroup className="pb-4 gap-4">
					<GuestbookFields lang={props.lang} idPrefix="guestbook-verified" showName={false} />
					{mutation.isError && <FieldError>{t.errorBody}</FieldError>}
				</FieldGroup>

				<DialogFooter>
					<Button type="submit" className="sm:order-2" disabled={mutation.isPending}>
						{mutation.isPending ? t.sending : t.send}
					</Button>
					<DialogClose render={<Button variant="outline" />}>{t.close}</DialogClose>
				</DialogFooter>
			</form>
		</FormProvider>
	);
}
