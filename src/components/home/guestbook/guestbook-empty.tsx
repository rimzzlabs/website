import { Inbox } from "lucide-react";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

export function GuestbookEmpty(props: { lang: Lang }) {
	const t = getDictionary(props.lang).guestbook;

	return (
		<Empty className="h-full">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<Inbox />
				</EmptyMedia>

				<EmptyTitle>{t.empty.title}</EmptyTitle>
				<EmptyDescription>{t.empty.description}</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
