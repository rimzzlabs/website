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
import type { Dictionary } from "@/i18n/en";
import { authClient } from "@/lib/auth-client";
import { GUESTBOOK_QUERY_KEY, postGuestbookEntry } from "@/lib/guestbook/api";
import {
	createGuestbookAnonymousSchema,
	type GuestbookInput,
} from "@/lib/guestbook/schema";
import { useTurnstile } from "@/lib/hooks/use-turnstile";
import { getQueryClient } from "@/lib/query-client";

export interface GuestbookUser {
	name: string;
	image: string | null;
}

interface GuestbookFormProps {
	copy: Dictionary["guestbook"];
	user: GuestbookUser | null;
	onCancel?: () => void;
}

export function GuestbookForm(props: GuestbookFormProps) {
	const queryClient = getQueryClient();
	const turnstile = useTurnstile({ enabled: props.user === null });
	const form = useForm<GuestbookInput>({
		resolver: zodResolver(
			createGuestbookAnonymousSchema(props.copy.validation),
		),
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
								{props.copy.signedInWith}
							</p>
						</div>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => authClient.signOut()}
						>
							{props.copy.signOut}
						</Button>
					</div>
				) : (
					<Field data-invalid={Boolean(errors.name)}>
						<FieldLabel htmlFor="guestbook-name">{props.copy.name}</FieldLabel>
						<Input
							id="guestbook-name"
							autoComplete="name"
							placeholder={props.copy.namePlaceholder}
							aria-invalid={Boolean(errors.name)}
							{...form.register("name")}
						/>
						<FieldDescription>{props.copy.optional}</FieldDescription>
						<FieldError errors={[errors.name]} />
					</Field>
				)}

				<Field data-invalid={Boolean(errors.site)}>
					<FieldLabel htmlFor="guestbook-site">{props.copy.website}</FieldLabel>
					<Input
						id="guestbook-site"
						type="url"
						inputMode="url"
						autoComplete="url"
						placeholder={props.copy.websitePlaceholder}
						aria-invalid={Boolean(errors.site)}
						{...form.register("site")}
					/>
					<FieldDescription>{props.copy.websiteHint}</FieldDescription>
					<FieldError errors={[errors.site]} />
				</Field>

				<Field data-invalid={Boolean(errors.message)}>
					<FieldLabel htmlFor="guestbook-message">
						{props.copy.message}
						<span aria-hidden="true" className="-ml-1.5 text-destructive">
							*
						</span>
					</FieldLabel>
					<Textarea
						id="guestbook-message"
						rows={4}
						placeholder={props.copy.messagePlaceholder}
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
					{props.copy.error}
				</p>
			)}

			{mutation.isSuccess && (
				<p role="status" className="text-sm text-muted-foreground">
					{props.copy.success}
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
						{mutation.isPending ? props.copy.submitting : props.copy.submit}
					</Button>
					{props.onCancel && (
						<Button type="button" variant="ghost" onClick={props.onCancel}>
							{props.copy.back}
						</Button>
					)}
				</div>
			</div>
		</form>
	);
}
