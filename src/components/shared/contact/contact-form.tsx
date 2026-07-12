import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send, XIcon } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useContactForm } from "@/hooks/use-contact-form";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import type { Dictionary } from "@/i18n/en";
import { cn } from "@/lib/utils";
import { RichTextEditor } from "./rich-text-editor";
import { Turnstile } from "./turnstile";

type ContactCopy = Dictionary["contact"];
type FormValues = z.infer<ReturnType<typeof buildSchema>>;

const fieldClass = cn(
	"h-8 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs outline-none",
	"transition-[color,box-shadow] placeholder:text-muted-foreground/70",
	"focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
	"aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
);
const labelClass = "text-sm font-medium";
const errorClass = "text-xs text-destructive";

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
				<div className="grid gap-1.5">
					<label htmlFor="contact-name" className={labelClass}>
						{t.nameLabel}
					</label>
					<input
						id="contact-name"
						placeholder={t.namePlaceholder}
						autoComplete="name"
						aria-invalid={errors.name ? true : undefined}
						className={fieldClass}
						{...register("name")}
					/>
					{errors.name && <p className={errorClass}>{errors.name.message}</p>}
				</div>

				<div className="grid gap-1.5">
					<label htmlFor="contact-email" className={labelClass}>
						{t.emailLabel}
					</label>
					<input
						id="contact-email"
						type="email"
						placeholder={t.emailPlaceholder}
						autoComplete="email"
						aria-invalid={errors.email ? true : undefined}
						className={fieldClass}
						{...register("email")}
					/>
					{errors.email && <p className={errorClass}>{errors.email.message}</p>}
				</div>
			</div>

			<div className="grid gap-1.5">
				<label htmlFor="contact-subject" className={labelClass}>
					{t.subjectLabel}
				</label>
				<input
					id="contact-subject"
					placeholder={t.subjectPlaceholder}
					aria-invalid={errors.subject ? true : undefined}
					className={fieldClass}
					{...register("subject")}
				/>
				{errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
			</div>

			<div className="grid gap-1.5">
				<span className={labelClass}>{t.messageLabel}</span>
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
				{errors.bodyText && <p className={errorClass}>{errors.bodyText.message}</p>}
			</div>

			<div className="grid gap-1.5">
				<Turnstile
					siteKey={siteKey}
					onToken={(token) => setValue("token", token, { shouldValidate: Boolean(errors.token) })}
				/>
				{status === "error" && <p className={errorClass}>{t.errorBody}</p>}
			</div>

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
