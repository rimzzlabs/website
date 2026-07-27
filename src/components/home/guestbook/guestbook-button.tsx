import { QueryClientProvider } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useClearAuthError } from "@/hooks/use-clear-auth-error";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getQueryClient } from "@/lib/query-client";
import { cn } from "@/lib/utils";

const GuestbookCompose = lazy(() =>
	import("./guestbook-compose").then((m) => ({ default: m.GuestbookCompose })),
);

type GuestbookButtonProps = { lang: Lang; siteKey: string; className?: string };

export function GuestbookButton(props: GuestbookButtonProps) {
	const t = getDictionary(props.lang).guestbook;
	const [open, setOpen] = useState(false);
	useClearAuthError();

	return (
		<QueryClientProvider client={getQueryClient()}>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger render={<Button className={cn("max-sm:w-full", props.className)} />}>
					<Plus />
					{t.write}
				</DialogTrigger>

				<DialogContent showCloseButton={false}>
					<DialogHeader>
						<DialogTitle>{t.dialog.title}</DialogTitle>
						<DialogDescription className="text-balance">{t.dialog.description}</DialogDescription>
					</DialogHeader>

					<Suspense fallback={null}>
						<GuestbookCompose
							lang={props.lang}
							siteKey={props.siteKey}
							onSuccess={() => setOpen(false)}
						/>
					</Suspense>
				</DialogContent>
			</Dialog>
		</QueryClientProvider>
	);
}
