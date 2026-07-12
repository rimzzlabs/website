import { useStore } from "@nanostores/react";
import { lazy, Suspense } from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-is-mobile";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { $contactOpen } from "@/lib/stores/contact";

// Lazy so the heavy rich-text editor (Tiptap + ProseMirror, ~0.5 MB) is only
// fetched when the dialog first opens, not eagerly on every page via client:idle.
const ContactForm = lazy(() => import("./contact-form").then((m) => ({ default: m.ContactForm })));

// Roughly the form's height, so opening doesn't jump while the chunk loads.
const FormFallback = () => <div className="min-h-72 animate-pulse rounded-lg bg-muted/40" />;

/**
 * Single shared "Send me an email" dialog, mounted once in `app-layout.astro`.
 * Opened from the hero `TalkButton` and the dock connect menu via `$contactOpen`.
 */
export function ContactDialog({ lang, siteKey }: { lang: Lang; siteKey: string }) {
	const open = useStore($contactOpen);
	const isMobile = useIsMobile();
	const t = getDictionary(lang).contact;

	function close() {
		$contactOpen.set(false);
	}

	if (isMobile) {
		return (
			<Drawer open={open} onOpenChange={$contactOpen.set}>
				<DrawerContent>
					<DrawerHeader className="text-left">
						<DrawerTitle>{t.title}</DrawerTitle>
						<DrawerDescription className="text-balance">{t.description}</DrawerDescription>
					</DrawerHeader>
					<div className="px-4 pb-2">
						<Suspense fallback={<FormFallback />}>
							<ContactForm lang={lang} siteKey={siteKey} onClose={close} />
						</Suspense>
					</div>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<AlertDialog open={open} onOpenChange={$contactOpen.set}>
			<AlertDialogContent className="max-h-[85vh] overflow-y-auto">
				<AlertDialogHeader>
					<AlertDialogTitle>{t.title}</AlertDialogTitle>
					<AlertDialogDescription>{t.description}</AlertDialogDescription>
				</AlertDialogHeader>
				<Suspense fallback={<FormFallback />}>
					<ContactForm lang={lang} siteKey={siteKey} onClose={close} />
				</Suspense>
			</AlertDialogContent>
		</AlertDialog>
	);
}
