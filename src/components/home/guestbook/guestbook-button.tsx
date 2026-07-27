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
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { useClearAuthError } from "@/hooks/use-clear-auth-error";
import { useIsMobile } from "@/hooks/use-is-mobile";
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
	const isMobile = useIsMobile();
	useClearAuthError();

	// The forms inside reuse DialogClose/DialogFooter in both branches — Base UI's
	// drawer is built on the dialog store, so DialogClose works inside a Drawer.
	const compose = (
		<Suspense fallback={null}>
			<GuestbookCompose
				lang={props.lang}
				siteKey={props.siteKey}
				onSuccess={() => setOpen(false)}
			/>
		</Suspense>
	);

	if (isMobile) {
		return (
			<QueryClientProvider client={getQueryClient()}>
				<Drawer open={open} onOpenChange={setOpen}>
					<DrawerTrigger render={<Button className={cn("max-sm:w-full", props.className)} />}>
						<Plus />
						{t.write}
					</DrawerTrigger>

					<DrawerContent>
						<DrawerHeader className="text-left">
							<DrawerTitle>{t.dialog.title}</DrawerTitle>
							<DrawerDescription className="text-balance">{t.dialog.description}</DrawerDescription>
						</DrawerHeader>
						<div className="px-4 pb-2">{compose}</div>
					</DrawerContent>
				</Drawer>
			</QueryClientProvider>
		);
	}

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
					{compose}
				</DialogContent>
			</Dialog>
		</QueryClientProvider>
	);
}
