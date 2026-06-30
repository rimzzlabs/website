import { RestrictToWindow } from "@dnd-kit/dom/modifiers";
import { useDraggable } from "@dnd-kit/react";
import { Grip, HomeIcon, NotebookText, Radio } from "lucide-react";
import { motion } from "motion/react";
import { useMotionEnabled } from "@/hooks/use-motion";
import { INSTANT, SPRING } from "@/lib/motion";
import type { DockPosition } from "@/lib/stores/dock";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { HIDE_BTN_CLASS, HIDE_ICON, itemClass, POSITION_CLASS, TOGGLE_BASE } from "./constants";
import { DockLink } from "./dock-link";
import { DockMenuConnect } from "./dock-menu-connect";
import { DockMenuPages } from "./dock-menu-pages";
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

	/** Roving arrow-key navigation across the dock controls; Escape leaves the dock. */
	function handleNavKeyDown(event: React.KeyboardEvent<HTMLElement>) {
		if (event.key === "Escape") {
			(document.activeElement as HTMLElement | null)?.blur();
			return;
		}
		if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

		const items = Array.from(
			event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
		).filter((el) => el.offsetParent !== null);
		const current = items.indexOf(document.activeElement as HTMLElement);
		if (current === -1) return;

		event.preventDefault();
		const delta = event.key === "ArrowRight" ? 1 : -1;
		const next = Math.min(Math.max(current + delta, 0), items.length - 1);
		items[next]?.focus();
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
				onKeyDown={handleNavKeyDown}
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

					<li className="sm:hidden">
						<DockMenuPages pathname={pathname} />
					</li>

					<li className="max-sm:hidden">
						<DockLink href="/notes" label="Notes" current={pathname.startsWith("/notes")}>
							<NotebookText className="size-4" />
						</DockLink>
					</li>

					<li className="max-sm:hidden">
						<DockLink href="/now" label="Now" current={pathname.startsWith("/now")}>
							<Radio className="size-4" />
						</DockLink>
					</li>

					<li>
						<DockMenuConnect />
					</li>

					<li>
						<DockMenuPreference />
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
