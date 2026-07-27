import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { ISSUE_URL, PANEL_HEIGHT } from "./guestbook-constants";

type GuestbookErrorProps = { lang: Lang; onRetry: () => void };

export function GuestbookError(props: GuestbookErrorProps) {
	const t = getDictionary(props.lang).guestbook;

	return (
		<Empty className={PANEL_HEIGHT}>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<CircleAlert />
				</EmptyMedia>
				<EmptyTitle>{t.errorTitle}</EmptyTitle>
				<EmptyDescription>{t.loadError}</EmptyDescription>
			</EmptyHeader>

			<EmptyContent>
				<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
					<Button
						nativeButton={false}
						render={<a href={ISSUE_URL} rel="noopener" target="_blank" />}
						variant="outline"
					>
						{t.openIssue}
					</Button>
					<Button onClick={props.onRetry}>{t.retry}</Button>
				</div>
			</EmptyContent>
		</Empty>
	);
}
