import { X } from "lucide-react";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { ArchiveCarousel } from "./archive-carousel";
import type { Photo } from "./archive-photos";

const closeClass =
	"absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

const description = "Swipe or use the arrow buttons to browse the photos.";

/**
 * Lightbox for the photo carousel: a bottom drawer on mobile, a dialog on larger
 * screens. Controlled by the tapped photo index (`null` = closed).
 */
export function ArchiveCarouselPopup({
	open,
	photos,
	label,
	index,
	onClose,
}: {
	open: boolean;
	photos: Array<Photo>;
	label: string;
	index?: number;
	onClose: () => void;
}) {
	const isMobile = useIsMobile();

	function onOpenChange(next: boolean) {
		if (!next) onClose();
	}

	if (isMobile) {
		return (
			<Drawer open={open} onOpenChange={onOpenChange}>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle className="">{label} — photos</DrawerTitle>
						<DrawerDescription className="sr-only">{description}</DrawerDescription>
						<DrawerClose aria-label="Close" className={closeClass}>
							<X className="size-4" />
						</DrawerClose>
					</DrawerHeader>
					<div className="px-12 py-6">
						<ArchiveCarousel key={index ?? "closed"} photos={photos} startIndex={index} />
					</div>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="">{label} — photos</AlertDialogTitle>
					<AlertDialogDescription className="sr-only">{description}</AlertDialogDescription>
					<AlertDialogCancel aria-label="Close" className={closeClass}>
						<X className="size-4" />
					</AlertDialogCancel>
				</AlertDialogHeader>
				<div className="px-12 py-6">
					<ArchiveCarousel key={index ?? "closed"} photos={photos} startIndex={index} />
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
