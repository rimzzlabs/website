import { cn } from "cn";

import {
	ImageLightbox,
	type LightboxCopy,
	type LightboxImage,
} from "@/components/media/image-lightbox/image-lightbox";
import { supportsViewTransition } from "@/components/media/image-lightbox/use-lightbox-transition";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";

interface ImageLightboxDialogProps {
	copy: LightboxCopy;
	images: ReadonlyArray<LightboxImage>;
	openIndex: number | null;
	title: string;
	onClose: () => void;
	onSelectedIndexChange?: (index: number) => void;
}

export function ImageLightboxDialog(props: ImageLightboxDialogProps) {
	return (
		<Dialog
			open={props.openIndex !== null}
			onOpenChange={(open) => {
				if (!open) props.onClose();
			}}
		>
			<DialogContent
				showCloseButton={false}
				overlayClassName={cn(
					supportsViewTransition() &&
						"data-open:animate-none data-closed:hidden",
				)}
				className={cn(
					"block h-dvh w-screen max-w-none gap-0 rounded-none border-0 bg-background/95 p-0 ring-0 sm:max-w-none",
					supportsViewTransition() &&
						"data-open:animate-none data-closed:hidden",
				)}
			>
				<DialogTitle className="sr-only">{props.title}</DialogTitle>
				<DialogDescription className="sr-only">
					{props.copy.help}
				</DialogDescription>
				{props.openIndex !== null && (
					<ImageLightbox
						copy={props.copy}
						images={props.images}
						startIndex={props.openIndex}
						onSelectedIndexChange={props.onSelectedIndexChange}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
}
