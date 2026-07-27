import { TextInitial, User2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import type { GuestbookEditInput } from "@/lib/guestbook-schema";

export function GuestbookFields(props: { lang: Lang; idPrefix: string }) {
	const t = getDictionary(props.lang).guestbook;
	const {
		register,
		formState: { errors },
	} = useFormContext<GuestbookEditInput>();

	return (
		<>
			<Field data-invalid={errors.name ? true : undefined}>
				<FieldLabel htmlFor={`${props.idPrefix}-name`}>{t.nameLabel}</FieldLabel>
				<InputGroup>
					<InputGroupAddon>
						<User2 />
					</InputGroupAddon>
					<InputGroupInput
						id={`${props.idPrefix}-name`}
						placeholder={t.namePlaceholder}
						autoComplete="name"
						aria-invalid={errors.name ? true : undefined}
						{...register("name")}
					/>
				</InputGroup>
				<FieldError errors={[errors.name]} />
			</Field>

			<Field>
				<FieldLabel htmlFor={`${props.idPrefix}-site`}>{t.siteLabel}</FieldLabel>
				<InputGroup>
					<InputGroupAddon>
						<InputGroupText>https://</InputGroupText>
					</InputGroupAddon>
					<InputGroupInput
						id={`${props.idPrefix}-site`}
						className="pl-0"
						placeholder={t.sitePlaceholder}
						{...register("site")}
					/>
				</InputGroup>
			</Field>

			<Field data-invalid={errors.message ? true : undefined}>
				<FieldLabel htmlFor={`${props.idPrefix}-message`}>{t.messageLabel}</FieldLabel>
				<InputGroup>
					<InputGroupAddon align="block-start">
						<TextInitial />
					</InputGroupAddon>
					<InputGroupTextarea
						id={`${props.idPrefix}-message`}
						placeholder={t.messagePlaceholder}
						className="max-h-40"
						aria-invalid={errors.message ? true : undefined}
						{...register("message")}
					/>
				</InputGroup>
				<FieldError errors={[errors.message]} />
			</Field>
		</>
	);
}
