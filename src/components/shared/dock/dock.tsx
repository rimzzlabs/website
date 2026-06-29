import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";
import { useDockPosition } from "@/hooks/use-dock-position";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useMotionEnabled } from "@/hooks/use-motion";
import { useThemeSync } from "@/hooks/use-theme";
import { $dockPosition, isDockPosition } from "@/lib/stores/dock";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "../../ui/tooltip";
import { DockBar } from "./dock-bar";
import { DockPill } from "./dock-pill";
import { DockZone } from "./dock-zone";

export function Dock({ pathname }: { pathname: string }) {
	useThemeSync();

	const position = useDockPosition();
	const isMobile = useIsMobile();
	const motionEnabled = useMotionEnabled();
	const [collapsed, setCollapsed] = useState(false);
	const folded = isMobile && collapsed;

	function handleDragEnd(
		event: Parameters<NonNullable<React.ComponentProps<typeof DragDropProvider>["onDragEnd"]>>[0],
	) {
		if (event.canceled) return;
		const targetId = event.operation.target?.id;
		if (isDockPosition(targetId)) $dockPosition.set(targetId);
	}

	return (
		<TooltipProvider>
			<DragDropProvider onDragEnd={handleDragEnd}>
				<header className="pointer-events-none fixed inset-x-0 bottom-0 z-50">
					<div className="relative h-32">
						<div
							aria-hidden="true"
							className={cn(
								"pointer-events-none absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent motion-safe:transition-opacity",
								folded && "opacity-0",
							)}
						/>
						<DockZone id="left" className="left-0" />
						<DockZone id="center" className="left-1/3" />
						<DockZone id="right" className="right-0" />
						<DockBar
							pathname={pathname}
							position={position}
							folded={folded}
							onCollapse={() => setCollapsed(true)}
						/>
					</div>
				</header>

				<DockPill
					position={position}
					folded={folded}
					motionEnabled={motionEnabled}
					onExpand={() => setCollapsed(false)}
				/>
			</DragDropProvider>
		</TooltipProvider>
	);
}
