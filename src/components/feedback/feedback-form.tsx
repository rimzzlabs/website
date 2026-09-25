import { zodResolver } from "@hookform/resolvers/zod";
import {
	ArrowCounterClockwiseIcon,
	CheckCircleIcon,
	PaperPlaneTiltIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/i18n/en";
import { fill } from "@/i18n/fill";
import { describedBy } from "@/lib/aria";
import {
	createFeedbackSchema,
	FEEDBACK_TOPICS,
	type FeedbackInput,
	type FeedbackTopic,
	MAX_ATTACHMENT_BYTES,
	MAX_ATTACHMENTS,
} from "@/lib/feedback";
import { useTurnstile } from "@/lib/hooks/use-turnstile";
import { FeedbackAttachments } from "./feedback-attachments";
import {
	FeedbackAttachmentsProvider,
	useFeedbackAttachments,
} from "./feedback-attachments-context";

interface FeedbackFormProps {
	copy: Dictionary["feedback"];
}

type SubmitStatus = "idle" | "error" | "success";

const DEFAULT_VALUES: FeedbackInput = {
	topic: "bug",
	page: "",
	message: "",
	environment: "",
	name: "",
	email: "",
	company: "",
};

function RequiredMark() {
	return (
		<span aria-hidden="true" className="-ml-1.5 text-destructive">
			*
		</span>
	);
}

function isTopic(value: string | null): value is FeedbackTopic {
	return FEEDBACK_TOPICS.some((topic) => topic === value);
}

function readPrefill() {
	const params = new URLSearchParams(window.location.search);
	const referrer = document.referrer.startsWith(window.location.origin)
		? document.referrer
		: "";
	return {
		topic: params.get("topic"),
		page: params.get("page") ?? referrer,
	};
}

export function FeedbackForm(props: FeedbackFormProps) {
	return (
		<FeedbackAttachmentsProvider copy={props.copy.attachmentErrors}>
			<FeedbackFormFields copy={props.copy} />
		</FeedbackAttachmentsProvider>
	);
}

function FeedbackFormFields(props: FeedbackFormProps) {
	const [status, setStatus] = useState<SubmitStatus>("idle");
	const successRef = useRef<HTMLParagraphElement>(null);
	const attachments = useFeedbackAttachments();
	const turnstile = useTurnstile({ enabled: status !== "success" });
	const form = useForm<FeedbackInput>({
		resolver: zodResolver(createFeedbackSchema(props.copy.validation)),
		defaultValues: DEFAULT_VALUES,
	});

	useEffect(() => {
		const prefill = readPrefill();
		if (isTopic(prefill.topic)) form.setValue("topic", prefill.topic);
		if (prefill.page) form.setValue("page", prefill.page);
	}, [form]);

	useEffect(() => {
		if (status === "success") successRef.current?.focus();
	}, [status]);

	const onSubmit = async (values: FeedbackInput) => {
		setStatus("idle");
		const body = new FormData();
		for (const [key, value] of Object.entries(values)) {
			body.append(key, value ?? "");
		}
		for (const item of attachments.items) {
			body.append("attachments", item.file);
		}
		body.append("token", await turnstile.getToken());

		const response = await fetch("/api/feedback", {
			method: "POST",
			body,
		}).catch(() => null);
		turnstile.reset();

		if (!response?.ok) {
			setStatus("error");
			return;
		}

		form.reset(DEFAULT_VALUES);
		attachments.clear();
		setStatus("success");
	};

	const handlePaste = (event: React.ClipboardEvent<HTMLFormElement>) => {
		const files = Array.from(event.clipboardData.files);
		if (files.length === 0) return;
		event.preventDefault();
		attachments.add(files);
	};

	if (status === "success") {
		return (
			<div
				role="status"
				className="flex flex-col items-center gap-3 py-10 text-center"
			>
				<CheckCircleIcon aria-hidden="true" className="size-10 text-primary" />
				<p
					ref={successRef}
					tabIndex={-1}
					className="font-serif text-lg font-semibold outline-none"
				>
					{props.copy.successTitle}
				</p>
				<p className="max-w-sm text-sm text-pretty text-muted-foreground">
					{props.copy.successBody}
				</p>
				<Button
					type="button"
					variant="outline"
					className="mt-2"
					onClick={() => setStatus("idle")}
				>
					<ArrowCounterClockwiseIcon aria-hidden="true" />
					{props.copy.sendAnother}
				</Button>
			</div>
		);
	}

	const errors = form.formState.errors;

	return (
		<form
			noValidate
			aria-label={props.copy.formLabel}
			onSubmit={form.handleSubmit(onSubmit)}
			onPaste={handlePaste}
			className="flex flex-col gap-6"
		>
			<p className="text-xs text-muted-foreground">{props.copy.requiredHint}</p>

			<FieldGroup>
				<FieldSet className="gap-0">
					<FieldLegend variant="label">
						{props.copy.topic}
						<span aria-hidden="true" className="ml-0.5 text-destructive">
							*
						</span>
					</FieldLegend>
					<div className="flex flex-wrap gap-2">
						{FEEDBACK_TOPICS.map((topic) => (
							<label
								key={topic}
								className="cursor-pointer rounded-full border border-input bg-background px-3.5 py-1.5 text-sm transition-colors hover:bg-muted has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
							>
								<input
									type="radio"
									value={topic}
									className="sr-only"
									{...form.register("topic")}
								/>
								{props.copy.topics[topic]}
							</label>
						))}
					</div>
				</FieldSet>

				<Field data-invalid={Boolean(errors.message)}>
					<FieldLabel htmlFor="feedback-message">
						{props.copy.message}
						<RequiredMark />
					</FieldLabel>
					<Textarea
						id="feedback-message"
						rows={6}
						aria-required="true"
						placeholder={props.copy.messagePlaceholder}
						aria-invalid={Boolean(errors.message)}
						aria-describedby={describedBy([
							Boolean(errors.message) && "feedback-message-error",
						])}
						className="min-h-36 resize-y"
						{...form.register("message")}
					/>
					<FieldError id="feedback-message-error" errors={[errors.message]} />
				</Field>

				<Field data-invalid={Boolean(errors.page)}>
					<FieldLabel htmlFor="feedback-page">{props.copy.page}</FieldLabel>
					<Input
						id="feedback-page"
						type="url"
						inputMode="url"
						placeholder={props.copy.pagePlaceholder}
						aria-invalid={Boolean(errors.page)}
						aria-describedby={describedBy([
							"feedback-page-hint",
							Boolean(errors.page) && "feedback-page-error",
						])}
						{...form.register("page")}
					/>
					<FieldDescription id="feedback-page-hint">
						{props.copy.pageHint}
					</FieldDescription>
					<FieldError id="feedback-page-error" errors={[errors.page]} />
				</Field>

				<Field data-invalid={Boolean(errors.environment)}>
					<FieldLabel htmlFor="feedback-environment">
						{props.copy.environment}
					</FieldLabel>
					<Input
						id="feedback-environment"
						placeholder={props.copy.environmentPlaceholder}
						aria-invalid={Boolean(errors.environment)}
						aria-describedby={describedBy([
							"feedback-environment-hint",
							Boolean(errors.environment) && "feedback-environment-error",
						])}
						{...form.register("environment")}
					/>
					<FieldDescription id="feedback-environment-hint">
						{props.copy.environmentHint}
					</FieldDescription>
					<FieldError
						id="feedback-environment-error"
						errors={[errors.environment]}
					/>
				</Field>

				<Field>
					<FieldLabel htmlFor="feedback-attachments">
						{props.copy.attachments}
					</FieldLabel>
					<FieldDescription id="feedback-attachments-hint">
						{fill(props.copy.attachmentsHint, {
							count: MAX_ATTACHMENTS,
							size: MAX_ATTACHMENT_BYTES / 1024 / 1024,
						})}
					</FieldDescription>
					<FeedbackAttachments
						copy={props.copy}
						id="feedback-attachments"
						hintId="feedback-attachments-hint"
						errorId="feedback-attachments-error"
					/>
				</Field>

				<div className="grid gap-6 sm:grid-cols-2">
					<Field data-invalid={Boolean(errors.name)}>
						<FieldLabel htmlFor="feedback-name">{props.copy.name}</FieldLabel>
						<Input
							id="feedback-name"
							autoComplete="name"
							placeholder={props.copy.namePlaceholder}
							aria-invalid={Boolean(errors.name)}
							aria-describedby={describedBy([
								"feedback-contact-hint",
								Boolean(errors.name) && "feedback-name-error",
							])}
							{...form.register("name")}
						/>
						<FieldError id="feedback-name-error" errors={[errors.name]} />
					</Field>

					<Field data-invalid={Boolean(errors.email)}>
						<FieldLabel htmlFor="feedback-email">{props.copy.email}</FieldLabel>
						<Input
							id="feedback-email"
							type="email"
							inputMode="email"
							autoComplete="email"
							placeholder={props.copy.emailPlaceholder}
							aria-invalid={Boolean(errors.email)}
							aria-describedby={describedBy([
								"feedback-contact-hint",
								Boolean(errors.email) && "feedback-email-error",
							])}
							{...form.register("email")}
						/>
						<FieldError id="feedback-email-error" errors={[errors.email]} />
					</Field>

					<FieldDescription
						id="feedback-contact-hint"
						className="sm:col-span-2"
					>
						{props.copy.contactHint}
					</FieldDescription>
				</div>

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

			<div className="flex flex-col">
				<div
					ref={turnstile.containerRef}
					data-interactive={turnstile.interactive}
					className="data-[interactive=true]:pb-4"
				/>
				<Button
					type="submit"
					disabled={form.formState.isSubmitting}
					className="self-start"
				>
					<PaperPlaneTiltIcon aria-hidden="true" />
					{form.formState.isSubmitting ? props.copy.sending : props.copy.send}
				</Button>
			</div>
		</form>
	);
}
