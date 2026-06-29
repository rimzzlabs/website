import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { CircleIcon } from "lucide-react";
import { motion } from "motion/react";
import { useMotionEnabled } from "@/hooks/use-motion";
import { INSTANT, SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";

function DropdownMenu(props: MenuPrimitive.Root.Props) {
	return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger({ className, ...props }: MenuPrimitive.Trigger.Props) {
	return (
		<MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" className={className} {...props} />
	);
}

function DropdownMenuContent({
	className,
	sideOffset = 8,
	align = "center",
	side = "top",
	...props
}: MenuPrimitive.Popup.Props & {
	sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
	align?: MenuPrimitive.Positioner.Props["align"];
	side?: MenuPrimitive.Positioner.Props["side"];
}) {
	const motionEnabled = useMotionEnabled();

	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner className="z-50" side={side} align={align} sideOffset={sideOffset}>
				<MenuPrimitive.Popup
					data-slot="dropdown-menu-content"
					className={cn(
						"min-w-56 origin-(--transform-origin) rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg outline-none",
						className,
					)}
					render={
						<motion.div
							initial={motionEnabled ? { opacity: 0, scale: 0.95 } : false}
							animate={{ opacity: 1, scale: 1 }}
							transition={motionEnabled ? SPRING : INSTANT}
						/>
					}
					{...props}
				/>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	);
}

const itemClassName = cn(
	"relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none select-none",
	"data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
);

function DropdownMenuItem({ className, ...props }: MenuPrimitive.Item.Props) {
	return (
		<MenuPrimitive.Item
			data-slot="dropdown-menu-item"
			className={cn(itemClassName, className)}
			{...props}
		/>
	);
}

function DropdownMenuLinkItem({ className, ...props }: MenuPrimitive.LinkItem.Props) {
	return (
		<MenuPrimitive.LinkItem
			data-slot="dropdown-menu-link-item"
			closeOnClick
			className={cn(itemClassName, className)}
			{...props}
		/>
	);
}

function DropdownMenuGroup(props: MenuPrimitive.Group.Props) {
	return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuLabel({ className, ...props }: MenuPrimitive.GroupLabel.Props) {
	return (
		<MenuPrimitive.GroupLabel
			data-slot="dropdown-menu-label"
			className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
			{...props}
		/>
	);
}

function DropdownMenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
	return (
		<MenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cn("-mx-1 my-1 h-px bg-border", className)}
			{...props}
		/>
	);
}

function DropdownMenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
	return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuRadioItem({ className, children, ...props }: MenuPrimitive.RadioItem.Props) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			className={cn(
				"relative flex cursor-default items-center gap-2 rounded-md py-1.5 pr-8 pl-2 text-sm outline-none select-none",
				"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				"data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{children}
			<span className="absolute right-2 flex size-3.5 items-center justify-center">
				<MenuPrimitive.RadioItemIndicator>
					<CircleIcon className="size-2 fill-current" />
				</MenuPrimitive.RadioItemIndicator>
			</span>
		</MenuPrimitive.RadioItem>
	);
}

export {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuLinkItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
};
