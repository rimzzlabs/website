import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import type * as React from "react";
import { useMotionEnabled } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

// Base UI's drawer is CSS-transition + gesture driven (the swipe updates
// `--drawer-swipe-*` CSS vars), so — unlike the dialog — it isn't a `motion.div`
// target. We honor the motion preference by killing the transitions with a class
// override when it's off, the same way the dialog's CSS variant used to.

function Drawer({ ...props }: DrawerPrimitive.Root.Props) {
	return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
	return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
	return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
	return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerBackdrop({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
	const motionEnabled = useMotionEnabled();
	return (
		<DrawerPrimitive.Backdrop
			data-slot="drawer-backdrop"
			className={cn(
				"fixed inset-0 z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:duration-0 data-starting-style:opacity-0 data-ending-style:opacity-0",
				!motionEnabled && "transition-none!",
				className,
			)}
			{...props}
		/>
	);
}

function DrawerContent({ className, children, ...props }: DrawerPrimitive.Popup.Props) {
	const motionEnabled = useMotionEnabled();
	return (
		<DrawerPortal>
			<DrawerBackdrop />
			<DrawerPrimitive.Viewport className="fixed inset-0 z-50 flex items-end justify-center">
				<DrawerPrimitive.Popup
					data-slot="drawer-content"
					className={cn(
						"group/drawer-content relative flex max-h-[80vh] w-full max-w-lg flex-col overflow-y-auto overscroll-contain rounded-t-xl border-t bg-popover pb-4 text-sm text-popover-foreground outline-none touch-auto transform-[translateY(var(--drawer-swipe-movement-y))] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] data-swiping:select-none data-swiping:duration-0 data-starting-style:transform-[translateY(100%)] data-ending-style:transform-[translateY(100%)]",
						!motionEnabled && "transition-none!",
						className,
					)}
					{...props}
				>
					<div className="mx-auto mt-4 h-1.5 w-[100px] shrink-0 rounded-full bg-muted" />
					<DrawerPrimitive.Content className="w-full">{children}</DrawerPrimitive.Content>
				</DrawerPrimitive.Popup>
			</DrawerPrimitive.Viewport>
		</DrawerPortal>
	);
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-header"
			className={cn("flex flex-col gap-0.5 p-4 text-center md:gap-1.5", className)}
			{...props}
		/>
	);
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="drawer-footer"
			className={cn("mt-auto flex flex-col gap-2 p-4", className)}
			{...props}
		/>
	);
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
	return (
		<DrawerPrimitive.Title
			data-slot="drawer-title"
			className={cn("font-heading font-medium text-foreground", className)}
			{...props}
		/>
	);
}

function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
	return (
		<DrawerPrimitive.Description
			data-slot="drawer-description"
			className={cn("text-sm text-muted-foreground", className)}
			{...props}
		/>
	);
}

export {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger,
};
