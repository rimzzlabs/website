import { zodResolver } from "@hookform/resolvers/zod";
import { PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { GUESTBOOK_QUERY_KEY, postGuestbookEntry } from "@/lib/guestbook/api";
import {
	type GuestbookInput,
	guestbookAnonymousSchema,
} from "@/lib/guestbook/schema";
import { useTurnstile } from "@/lib/hooks/use-turnstile";
import { getQueryClient } from "@/lib/query-client";

export interface GuestbookUser {
	name: string;
	image: string | null;
}

interface GuestbookFormProps {
	user: GuestbookUser | null;
	onCancel?: () => void;
}

export function GuestbookForm(props: GuestbookFormProps) {
	const queryClient = getQueryClient();
	const turnstile = useTurnstile({ enabled: props.user === null });
	const form = useForm<GuestbookInput>({
		resolver: zodResolver(guestbookAnonymousSchema),
		defaultValues: { name: "", site: "", message: "", company: "" },
	});

	const mutation = useMutation(
		{
			mutationFn: async (values: GuestbookInput) => {
				if (props.user) {
					await postGuestbookEntry(values);
					return;
				}

				const token = await turnstile.getToken();
				await postGuestbookEntry({ ...values, token });
			},
			onSettled: () => turnstile.reset(),
			onSuccess: () => {
				form.reset();
				return queryClient.invalidateQueries({
					queryKey: GUESTBOOK_QUERY_KEY,
				});
			},
		},
		queryClient,
	);

	const errors = form.formState.errors;

	return (
		<form
			noValidate
			onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
			className="flex flex-col gap-6"
		>
			<FieldGroup>
				{props.user ? (
					<div className="flex items-center gap-3">
						<Avatar size="lg">
							{props.user.image && (
								<AvatarImage src={props.user.image} alt="" />
							)}
							<AvatarFallback>{props.user.name.slice(0, 1)}</AvatarFallback>
						</Avatar>
						<div className="min-w-0 flex-1">
							<p className="truncate font-medium">{props.user.name}</p>
							<p className="text-xs text-muted-foreground">
								Signed in with GitHub
							</p>
						</div>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => authClient.signOut()}
						>
							Sign out
						</Button>
					</div>
				) : (
					<Field data-invalid={Boolean(errors.name)}>
						<FieldLabel htmlFor="guestbook-name">Name</FieldLabel>
						<Input
							id="guestbook-name"
							autoComplete="name"
							placeholder="Anonymous"
							aria-invalid={Boolean(errors.name)}
							{...form.register("name")}
						/>
						<FieldDescription>Optional.</FieldDescription>
						<FieldError errors={[errors.name]} />
					</Field>
				)}

				<Field data-invalid={Boolean(errors.site)}>
					<FieldLabel htmlFor="guestbook-site">Website</FieldLabel>
					<Input
						id="guestbook-site"
						type="url"
						inputMode="url"
						autoComplete="url"
						placeholder="yoursite.com"
						aria-invalid={Boolean(errors.site)}
						{...form.register("site")}
					/>
					<FieldDescription>
						Optional. Your name will link to it.
					</FieldDescription>
					<FieldError errors={[errors.site]} />
				</Field>

				<Field data-invalid={Boolean(errors.message)}>
					<FieldLabel htmlFor="guestbook-message">
						Message
						<span aria-hidden="true" className="-ml-1.5 text-destructive">
							*
						</span>
					</FieldLabel>
					<Textarea
						id="guestbook-message"
						rows={4}
						placeholder="Say hi, share a thought, or leave a note."
						aria-required="true"
						aria-invalid={Boolean(errors.message)}
						className="min-h-28 resize-none"
						{...form.register("message")}
					/>
					<FieldError errors={[errors.message]} />
				</Field>

				<input
					type="text"
					tabIndex={-1}
					autoComplete="off"
					aria-hidden="true"
					className="sr-only"
					{...form.register("company")}
				/>
			</FieldGroup>

			{mutation.isError && (
				<p role="alert" className="text-sm text-destructive">
					Your entry did not save. Please try again.
				</p>
			)}

			{mutation.isSuccess && (
				<p role="status" className="text-sm text-muted-foreground">
					Thanks! Your entry is on the list below.
				</p>
			)}

			<div className="flex flex-col">
				<div
					ref={turnstile.containerRef}
					data-interactive={turnstile.interactive}
					className="data-[interactive=true]:pb-4"
				/>
				<div className="flex flex-col gap-2 sm:flex-row">
					<Button type="submit" disabled={mutation.isPending}>
						<PaperPlaneTiltIcon />
						{mutation.isPending ? "Signing…" : "Sign the guestbook"}
					</Button>
					{props.onCancel && (
						<Button type="button" variant="ghost" onClick={props.onCancel}>
							Back
						</Button>
					)}
				</div>
			</div>
		</form>
	);
}
