import { zodResolver } from "@hookform/resolvers/zod";
import {
	ArrowCounterClockwiseIcon,
	PaperPlaneTiltIcon,
} from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	FormResult,
	type FormResultStatus,
} from "@/components/forms/form-result";
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
import { describedBy } from "@/lib/aria";
import { authClient } from "@/lib/auth-client";
import { GUESTBOOK_QUERY_KEY, postGuestbookEntry } from "@/lib/guestbook/api";
import {
	createGuestbookAnonymousSchema,
	type GuestbookInput,
} from "@/lib/guestbook/schema";
import { useTurnstile } from "@/lib/hooks/use-turnstile";
import { getQueryClient } from "@/lib/query-client";
import { morph } from "@/lib/view-transition";

const RESULT_VARIANTS: Record<FormResultStatus, "default" | "outline"> = {
	success: "outline",
	error: "default",
};

export interface GuestbookUser {
	name: string;
	image: string | null;
}

interface GuestbookFormProps {
	copy: Dictionary["guestbook"];
	user: GuestbookUser | null;
	onCancel?: () => void;
	autoFocus?: boolean;
}

export const GUESTBOOK_ACTION_TRANSITION = "guestbook-action";

type SubmitStatus = "idle" | FormResultStatus;

function toResultCopy(copy: Dictionary["guestbook"]) {
	return {
		success: {
			title: copy.successTitle,
			body: copy.success,
			action: copy.writeAnother,
		},
		error: { title: copy.errorTitle, body: copy.error, action: copy.tryAgain },
	} satisfies Record<FormResultStatus, Record<string, string>>;
}

export function GuestbookForm(props: GuestbookFormProps) {
	const queryClient = getQueryClient();
	const [status, setStatus] = useState<SubmitStatus>("idle");
	const turnstile = useTurnstile({
		enabled: props.user === null && status === "idle",
	});
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
				morph(() => {
					form.reset();
					setStatus("success");
				});
				return queryClient.invalidateQueries({
					queryKey: GUESTBOOK_QUERY_KEY,
				});
			},
			onError: () => morph(() => setStatus("error")),
		},
		queryClient,
	);

	if (status !== "idle") {
		const copy = toResultCopy(props.copy)[status];
		return (
			<FormResult
				status={status}
				title={copy.title}
				body={copy.body}
				actionTransitionName={GUESTBOOK_ACTION_TRANSITION}
				primaryAction={
					<Button
						type="button"
						variant={RESULT_VARIANTS[status]}
						onClick={() =>
							morph(() => {
								mutation.reset();
								setStatus("idle");
							})
						}
					>
						<ArrowCounterClockwiseIcon aria-hidden="true" />
						{copy.action}
					</Button>
				}
				secondaryAction={
					props.onCancel && (
						<Button type="button" variant="outline" onClick={props.onCancel}>
							{props.copy.back}
						</Button>
					)
				}
			/>
		);
	}

	const errors = form.formState.errors;

	return (
		<form
			noValidate
			onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
			className="flex flex-col gap-6"
		>
			<p className="text-xs text-muted-foreground">{props.copy.requiredHint}</p>

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
							variant="outline"
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
							autoFocus={props.autoFocus}
							autoComplete="name"
							placeholder={props.copy.namePlaceholder}
							aria-invalid={Boolean(errors.name)}
							aria-describedby={describedBy([
								"guestbook-name-hint",
								Boolean(errors.name) && "guestbook-name-error",
							])}
							{...form.register("name")}
						/>
						<FieldDescription id="guestbook-name-hint">
							{props.copy.optional}
						</FieldDescription>
						<FieldError id="guestbook-name-error" errors={[errors.name]} />
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
						aria-describedby={describedBy([
							"guestbook-site-hint",
							Boolean(errors.site) && "guestbook-site-error",
						])}
						{...form.register("site")}
					/>
					<FieldDescription id="guestbook-site-hint">
						{props.copy.websiteHint}
					</FieldDescription>
					<FieldError id="guestbook-site-error" errors={[errors.site]} />
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
						aria-describedby={describedBy([
							Boolean(errors.message) && "guestbook-message-error",
						])}
						className="min-h-28 resize-none"
						{...form.register("message")}
					/>
					<FieldError id="guestbook-message-error" errors={[errors.message]} />
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

			<div className="flex flex-col">
				<div
					ref={turnstile.containerRef}
					data-interactive={turnstile.interactive}
					className="data-[interactive=true]:pb-4"
				/>
				<div className="flex flex-col gap-2 sm:flex-row">
					<Button
						type="submit"
						disabled={mutation.isPending}
						style={{
							viewTransitionName: GUESTBOOK_ACTION_TRANSITION,
							viewTransitionClass: "form",
						}}
					>
						<PaperPlaneTiltIcon />
						{mutation.isPending ? props.copy.submitting : props.copy.submit}
					</Button>
					{props.onCancel && (
						<Button type="button" variant="outline" onClick={props.onCancel}>
							{props.copy.back}
						</Button>
					)}
				</div>
			</div>
		</form>
	);
}
