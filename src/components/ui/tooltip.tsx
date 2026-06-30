import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { motion } from "motion/react";
import { useMotionEnabled } from "@/hooks/use-motion";
import { INSTANT, SPRING_FAST } from "@/lib/motion";
import { cn } from "@/lib/utils";

function TooltipProvider({ delay = 200, ...props }: TooltipPrimitive.Provider.Props) {
	return <TooltipPrimitive.Provider delay={delay} {...props} />;
}

function Tooltip(props: TooltipPrimitive.Root.Props) {
	return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
	className,
	sideOffset = 8,
	side = "top",
	...props
}: TooltipPrimitive.Popup.Props & {
	sideOffset?: TooltipPrimitive.Positioner.Props["sideOffset"];
	side?: TooltipPrimitive.Positioner.Props["side"];
}) {
	const motionEnabled = useMotionEnabled();

	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner className="z-50" side={side} sideOffset={sideOffset}>
				<TooltipPrimitive.Popup
					data-slot="tooltip-content"
					className={cn(
						"origin-(--transform-origin) rounded-md bg-foreground px-2.5 py-1 text-xs font-medium text-background shadow-md",
						className,
					)}
					render={
						<motion.div
							initial={motionEnabled ? { opacity: 0, scale: 0.95 } : false}
							animate={{ opacity: 1, scale: 1 }}
							transition={motionEnabled ? SPRING_FAST : INSTANT}
						/>
					}
					{...props}
				/>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
