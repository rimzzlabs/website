import { zodResolver } from "@hookform/resolvers/zod";
import {
	ArrowCounterClockwiseIcon,
	PaperPlaneTiltIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
	FormResult,
	type FormResultStatus,
} from "@/components/forms/form-result";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/i18n/en";
import { describedBy } from "@/lib/aria";
import { type ContactInput, createContactSchema } from "@/lib/contact";
import { useTurnstile } from "@/lib/hooks/use-turnstile";
import { morph } from "@/lib/view-transition";

interface HomeContactFormProps {
	copy: Dictionary["contact"];
	closeButton: React.ReactNode;
	actionsClassName: string;
}

function RequiredMark() {
	return (
		<span aria-hidden="true" className="-ml-1.5 text-destructive">
			*
		</span>
	);
}

type SubmitStatus = "idle" | FormResultStatus;

const CONTACT_ACTION_TRANSITION = "contact-action";

function toResultCopy(copy: Dictionary["contact"]) {
	return {
		success: { title: copy.successTitle, body: copy.successBody },
		error: { title: copy.errorTitle, body: copy.error },
	} satisfies Record<FormResultStatus, Record<string, string>>;
}

export function HomeContactForm(props: HomeContactFormProps) {
	const [status, setStatus] = useState<SubmitStatus>("idle");
	const turnstile = useTurnstile({ enabled: status === "idle" });
	const form = useForm<ContactInput>({
		resolver: zodResolver(createContactSchema(props.copy.validation)),
		defaultValues: { name: "", email: "", message: "", company: "" },
	});

	const onSubmit = async (values: ContactInput) => {
		setStatus("idle");
		const token = await turnstile.getToken();
		const response = await fetch("/api/contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...values, token }),
		}).catch(() => null);
		turnstile.reset();

		if (!response?.ok) {
			morph(() => setStatus("error"));
			return;
		}

		morph(() => {
			form.reset();
			setStatus("success");
		});
	};

	const RESULT_PRIMARY: Record<FormResultStatus, React.ReactNode> = {
		success: props.closeButton,
		error: (
			<Button type="button" onClick={() => morph(() => setStatus("idle"))}>
				<ArrowCounterClockwiseIcon aria-hidden="true" />
				{props.copy.tryAgain}
			</Button>
		),
	};
	const RESULT_SECONDARY: Record<FormResultStatus, React.ReactNode> = {
		success: null,
		error: props.closeButton,
	};

	if (status !== "idle") {
		return (
			<FormResult
				status={status}
				title={toResultCopy(props.copy)[status].title}
				body={toResultCopy(props.copy)[status].body}
				actionTransitionName={CONTACT_ACTION_TRANSITION}
				actionsClassName={props.actionsClassName}
				primaryAction={RESULT_PRIMARY[status]}
				secondaryAction={RESULT_SECONDARY[status]}
			/>
		);
	}

	const errors = form.formState.errors;

	return (
		<form
			noValidate
			onSubmit={form.handleSubmit(onSubmit)}
			className="flex flex-1 flex-col gap-6"
		>
			<p className="text-xs text-muted-foreground">{props.copy.requiredHint}</p>

			<FieldGroup>
				<Field data-invalid={Boolean(errors.name)}>
					<FieldLabel htmlFor="contact-name">
						{props.copy.name}
						<RequiredMark />
					</FieldLabel>
					<Input
						id="contact-name"
						aria-required="true"
						autoComplete="name"
						placeholder={props.copy.namePlaceholder}
						aria-invalid={Boolean(errors.name)}
						aria-describedby={describedBy([
							Boolean(errors.name) && "contact-name-error",
						])}
						{...form.register("name")}
					/>
					<FieldError id="contact-name-error" errors={[errors.name]} />
				</Field>

				<Field data-invalid={Boolean(errors.email)}>
					<FieldLabel htmlFor="contact-email">
						{props.copy.email}
						<RequiredMark />
					</FieldLabel>
					<Input
						id="contact-email"
						aria-required="true"
						type="email"
						autoComplete="email"
						inputMode="email"
						placeholder={props.copy.emailPlaceholder}
						aria-invalid={Boolean(errors.email)}
						aria-describedby={describedBy([
							Boolean(errors.email) && "contact-email-error",
						])}
						{...form.register("email")}
					/>
					<FieldError id="contact-email-error" errors={[errors.email]} />
				</Field>

				<Field data-invalid={Boolean(errors.message)}>
					<FieldLabel htmlFor="contact-message">
						{props.copy.message}
						<RequiredMark />
					</FieldLabel>
					<Textarea
						id="contact-message"
						aria-required="true"
						rows={5}
						placeholder={props.copy.messagePlaceholder}
						aria-invalid={Boolean(errors.message)}
						aria-describedby={describedBy([
							Boolean(errors.message) && "contact-message-error",
						])}
						className="min-h-32 resize-none"
						{...form.register("message")}
					/>
					<FieldError id="contact-message-error" errors={[errors.message]} />
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

			<div className="mt-auto flex flex-col">
				<div
					ref={turnstile.containerRef}
					data-interactive={turnstile.interactive}
					className="data-[interactive=true]:pb-4"
				/>
				<div className={props.actionsClassName}>
					<Button
						type="submit"
						disabled={form.formState.isSubmitting}
						style={{
							viewTransitionName: CONTACT_ACTION_TRANSITION,
							viewTransitionClass: "form",
						}}
					>
						<PaperPlaneTiltIcon />
						{form.formState.isSubmitting ? props.copy.sending : props.copy.send}
					</Button>
					{props.closeButton}
				</div>
			</div>
		</form>
	);
}
