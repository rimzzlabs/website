import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleIcon, PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
import { type ContactInput, createContactSchema } from "@/lib/contact";
import { useTurnstile } from "@/lib/hooks/use-turnstile";

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

type SubmitStatus = "idle" | "error" | "success";

export function HomeContactForm(props: HomeContactFormProps) {
	const [status, setStatus] = useState<SubmitStatus>("idle");
	const turnstile = useTurnstile({ enabled: status !== "success" });
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
			setStatus("error");
			return;
		}

		form.reset();
		setStatus("success");
	};

	if (status === "success") {
		return (
			<div className="flex flex-1 flex-col gap-6">
				<div
					role="status"
					className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center"
				>
					<CheckCircleIcon className="size-10 text-primary" />
					<p className="font-serif text-lg font-semibold">
						{props.copy.successTitle}
					</p>
					<p className="max-w-xs text-sm text-pretty text-muted-foreground">
						Thanks for reaching out. I read every message and I will reply by
						email.
					</p>
				</div>
				<div className={props.actionsClassName}>{props.closeButton}</div>
			</div>
		);
	}

	const errors = form.formState.errors;

	return (
		<form
			noValidate
			onSubmit={form.handleSubmit(onSubmit)}
			className="flex flex-1 flex-col gap-6"
		>
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
						{...form.register("name")}
					/>
					<FieldError errors={[errors.name]} />
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
						{...form.register("email")}
					/>
					<FieldError errors={[errors.email]} />
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
						className="min-h-32 resize-none"
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

			{status === "error" && (
				<p role="alert" className="text-sm text-destructive">
					{props.copy.error}
				</p>
			)}

			<div className="mt-auto flex flex-col">
				<div
					ref={turnstile.containerRef}
					data-interactive={turnstile.interactive}
					className="data-[interactive=true]:pb-4"
				/>
				<div className={props.actionsClassName}>
					<Button type="submit" disabled={form.formState.isSubmitting}>
						<PaperPlaneTiltIcon />
						{form.formState.isSubmitting ? props.copy.sending : props.copy.send}
					</Button>
					{props.closeButton}
				</div>
			</div>
		</form>
	);
}
