import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, CheckCircle2, Send, Tag, User2, XIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Turnstile } from "@/components/shared/turnstile";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useContactForm } from "@/hooks/use-contact-form";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import type { Dictionary } from "@/i18n/en";
import { RichTextEditor } from "./rich-text-editor";

type ContactCopy = Dictionary["contact"];
type FormValues = z.infer<ReturnType<typeof buildSchema>>;

function buildSchema(t: ContactCopy) {
	return z.object({
		name: z.string().trim().min(1, t.validation.name).max(100),
		email: z.email(t.validation.email),
		subject: z.string().trim().min(1, t.validation.subject).max(200),
		bodyHtml: z.string(),
		bodyText: z.string().trim().min(1, t.validation.message),
		token: z.string().min(1, t.turnstilePending),
	});
}

export function ContactForm({
	lang,
	siteKey,
	onClose,
}: {
	lang: Lang;
	siteKey: string;
	onClose: () => void;
}) {
	const t = getDictionary(lang).contact;
	const { status, submit } = useContactForm();
	const schema = useMemo(() => buildSchema(t), [t]);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { name: "", email: "", subject: "", bodyHtml: "", bodyText: "", token: "" },
	});

	useEffect(() => {
		register("bodyHtml");
		register("bodyText");
		register("token");
	}, [register]);

	const hasToken = Boolean(watch("token"));
	const submitting = status === "submitting";

	if (status === "success") {
		return (
			<div className="grid place-items-center gap-2 py-6 text-center">
				<span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
					<CheckCircle2 className="size-6" />
				</span>
				<p className="font-heading text-lg font-medium">{t.successTitle}</p>
				<p className="max-w-xs text-sm text-balance text-muted-foreground">{t.successBody}</p>
				<Button className="mt-3" onClick={onClose}>
					{t.understood}
				</Button>
			</div>
		);
	}

	const onSubmit = handleSubmit((values) => submit(values));

	return (
		<form onSubmit={onSubmit} noValidate className="grid gap-4">
			<div className="grid gap-4 sm:grid-cols-2">
				<Field data-invalid={errors.name ? true : undefined}>
					<FieldLabel htmlFor="contact-name">{t.nameLabel}</FieldLabel>
					<InputGroup>
						<InputGroupAddon>
							<User2 />
						</InputGroupAddon>
						<InputGroupInput
							id="contact-name"
							placeholder={t.namePlaceholder}
							autoComplete="name"
							aria-invalid={errors.name ? true : undefined}
							{...register("name")}
						/>
					</InputGroup>
					<FieldError errors={[errors.name]} />
				</Field>

				<Field data-invalid={errors.email ? true : undefined}>
					<FieldLabel htmlFor="contact-email">{t.emailLabel}</FieldLabel>
					<InputGroup>
						<InputGroupAddon>
							<AtSign />
						</InputGroupAddon>
						<InputGroupInput
							id="contact-email"
							type="email"
							placeholder={t.emailPlaceholder}
							autoComplete="email"
							aria-invalid={errors.email ? true : undefined}
							{...register("email")}
						/>
					</InputGroup>
					<FieldError errors={[errors.email]} />
				</Field>
			</div>

			<Field data-invalid={errors.subject ? true : undefined}>
				<FieldLabel htmlFor="contact-subject">{t.subjectLabel}</FieldLabel>
				<InputGroup>
					<InputGroupAddon>
						<Tag />
					</InputGroupAddon>
					<InputGroupInput
						id="contact-subject"
						placeholder={t.subjectPlaceholder}
						aria-invalid={errors.subject ? true : undefined}
						{...register("subject")}
					/>
				</InputGroup>
				<FieldError errors={[errors.subject]} />
			</Field>

			<Field data-invalid={errors.bodyText ? true : undefined}>
				<FieldLabel>{t.messageLabel}</FieldLabel>
				<RichTextEditor
					ariaLabel={t.messageLabel}
					placeholder={t.messagePlaceholder}
					labels={t.toolbar}
					invalid={Boolean(errors.bodyText)}
					onChange={({ html, text }) => {
						setValue("bodyHtml", html);
						setValue("bodyText", text, { shouldValidate: Boolean(errors.bodyText) });
					}}
				/>
				<FieldError errors={[errors.bodyText]} />
			</Field>

			<Field>
				<Turnstile
					siteKey={siteKey}
					onToken={(token) => setValue("token", token, { shouldValidate: Boolean(errors.token) })}
				/>
				{status === "error" && <FieldError>{t.errorBody}</FieldError>}
			</Field>

			<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
				<Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
					<XIcon />
					{t.cancel}
				</Button>
				<Button type="submit" disabled={submitting || !hasToken}>
					<Send />
					{submitting ? t.sending : t.send}
				</Button>
			</div>
		</form>
	);
}
