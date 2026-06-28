import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDownIcon } from "lucide-react";
import { type HTMLMotionProps, motion } from "motion/react";
import { createContext, useContext, useEffect, useState } from "react";
import { INSTANT, SPRING } from "@/lib/motion";
import { useMotionEnabled } from "@/lib/stores/motion";
import { cn } from "@/lib/utils";

const AccordionItemOpenContext = createContext(false);

/**
 * Read the enclosing accordion item's open state from within its trigger or
 * content. Useful for shared-layout (`layoutId`) animations that move an element
 * between the trigger and the panel as the item opens/closes.
 */
export function useAccordionItemOpen() {
	return useContext(AccordionItemOpenContext);
}

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
	return (
		<AccordionPrimitive.Root
			data-slot="accordion"
			className={cn("flex w-full flex-col", className)}
			{...props}
		/>
	);
}

function AccordionItem({ className, children, ...props }: AccordionPrimitive.Item.Props) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn("not-last:border-b", className)}
			{...props}
			render={(itemProps, state) => {
				const { children: _ignored, ...rest } = itemProps;
				return (
					<div {...rest}>
						<AccordionItemOpenContext.Provider value={state.open}>
							{children}
						</AccordionItemOpenContext.Provider>
					</div>
				);
			}}
		/>
	);
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
	const motionEnabled = useMotionEnabled();

	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"group/accordion-trigger relative flex flex-1 items-start justify-between rounded-md border border-transparent py-4 text-left text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
					className,
				)}
				{...props}
				render={(triggerProps, state) => {
					const { children: _ignored, ...rest } = triggerProps;
					return (
						<button type="button" {...rest}>
							{children}
							<motion.span
								data-slot="accordion-trigger-icon"
								className="pointer-events-none ml-auto flex shrink-0"
								animate={{ rotate: state.open ? 180 : 0 }}
								transition={motionEnabled ? SPRING : INSTANT}
							>
								<ChevronDownIcon className="size-4 text-muted-foreground" />
							</motion.span>
						</button>
					);
				}}
			/>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
	const motionEnabled = useMotionEnabled();

	return (
		<AccordionPrimitive.Panel
			data-slot="accordion-content"
			keepMounted
			{...props}
			render={(panelProps, state) => (
				<AccordionContentPanel
					panelProps={panelProps}
					open={state.open}
					motionEnabled={motionEnabled}
					className={typeof className === "function" ? className(state) : className}
				>
					{children}
				</AccordionContentPanel>
			)}
		/>
	);
}

interface AccordionContentPanelProps {
	panelProps: React.HTMLAttributes<HTMLDivElement> & { hidden?: boolean };
	open: boolean;
	motionEnabled: boolean;
	className?: string;
	children?: React.ReactNode;
}

/**
 * Renders the base-ui panel as a `motion.div` that animates its height. The inner
 * content's own entrance (fades, slides, stagger) is left to the consumer.
 *
 * base-ui drives unmount/`hidden` off CSS animation-end events, which never fire
 * for a JS animation — so we use `keepMounted`, strip its `hidden` attribute, and
 * re-apply `hidden` ourselves only after the collapse finishes (deferred hidden).
 * This keeps collapsed content out of the a11y tree and tab order without cutting
 * the animation short.
 */
function AccordionContentPanel({
	panelProps,
	open,
	motionEnabled,
	className,
	children,
}: AccordionContentPanelProps) {
	const { hidden: _baseHidden, style, ...rest } = panelProps;
	const [collapsed, setCollapsed] = useState(!open);

	useEffect(() => {
		if (open) setCollapsed(false);
	}, [open]);

	return (
		<motion.div
			{...(rest as HTMLMotionProps<"div">)}
			hidden={collapsed || undefined}
			initial={false}
			animate={{ height: open ? "auto" : 0 }}
			transition={motionEnabled ? SPRING : INSTANT}
			onAnimationComplete={() => {
				if (!open) setCollapsed(true);
			}}
			style={{ overflow: "hidden", ...style }}
			className="text-sm"
		>
			<div
				className={cn(
					"pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:pb-2.5",
					className,
				)}
			>
				{children}
			</div>
		</motion.div>
	);
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
