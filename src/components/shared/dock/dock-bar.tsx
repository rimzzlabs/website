import { RestrictToWindow } from "@dnd-kit/dom/modifiers";
import { useDraggable } from "@dnd-kit/react";
import { Grip, HomeIcon } from "lucide-react";
import { motion } from "motion/react";
import { useMotionEnabled } from "@/hooks/use-motion";
import { INSTANT, SPRING } from "@/lib/motion";
import type { DockPosition } from "@/lib/stores/dock";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { HIDE_BTN_CLASS, HIDE_ICON, itemClass, POSITION_CLASS, TOGGLE_BASE } from "./constants";
import { DockLink } from "./dock-link";
import { DockMenuConnect } from "./dock-menu-connect";
import { DockMenuPreference } from "./dock-menu-preference";

export function DockBar({
	pathname,
	position,
	folded,
	onCollapse,
}: {
	pathname: string;
	position: DockPosition;
	folded: boolean;
	onCollapse: () => void;
}) {
	const motionEnabled = useMotionEnabled();
	const isHome = pathname === "/";
	const HideIcon = HIDE_ICON[position];

	const { ref, handleRef, isDragging } = useDraggable({
		id: "dock",
		modifiers: [RestrictToWindow],
		disabled: folded,
	});

	function handleHomeClick(event: React.MouseEvent<HTMLAnchorElement>) {
		if (!isHome) return;
		event.preventDefault();
		window.scrollTo({ top: 0, behavior: motionEnabled ? "smooth" : "auto" });
	}

	return (
		<div
			ref={ref}
			inert={folded || undefined}
			className={cn(
				"pointer-events-auto absolute bottom-6 lg:bottom-10",
				POSITION_CLASS[position],
				folded && "pointer-events-none",
			)}
		>
			<motion.nav
				aria-label="Primary"
				initial={motionEnabled && !isDragging ? { opacity: 0, y: 16 } : false}
				animate={folded ? { opacity: 0, y: 32 } : { opacity: 1, y: 0 }}
				transition={motionEnabled ? SPRING : INSTANT}
			>
				<ul className="flex items-center gap-1 rounded-2xl border bg-background p-1.5 shadow-lg backdrop-blur-md">
					<li className="border-r">
						<Tooltip>
							<TooltipTrigger
								render={
									<button
										ref={handleRef}
										type="button"
										aria-label="Drag to reposition the dock"
										className={cn(itemClass, "cursor-grab touch-none active:cursor-grabbing")}
									>
										<Grip className="size-4" />
									</button>
								}
							/>
							<TooltipContent>Drag to move</TooltipContent>
						</Tooltip>
					</li>

					<li>
						<DockLink href="/" label="Home" current={isHome} onClick={handleHomeClick}>
							<HomeIcon className="size-4" />
						</DockLink>
					</li>

					<li>
						<DockMenuPreference />
					</li>

					<li>
						<DockMenuConnect />
					</li>
				</ul>

				<button
					type="button"
					aria-label="Hide dock"
					onClick={onCollapse}
					className={cn("absolute", TOGGLE_BASE, HIDE_BTN_CLASS[position])}
				>
					<HideIcon className="size-4" />
				</button>
			</motion.nav>
		</div>
	);
}
