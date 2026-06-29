import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { itemClass } from "./constants";

export function DockLink({
	href,
	label,
	external,
	current,
	onClick,
	children,
}: {
	href: string;
	label: string;
	external?: boolean;
	current?: boolean;
	onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
	children: React.ReactNode;
}) {
	const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<a
						href={href}
						aria-label={label}
						aria-current={current ? "page" : undefined}
						onClick={onClick}
						className={cn(itemClass, current && "bg-muted text-foreground")}
						{...externalProps}
					>
						{children}
					</a>
				}
			/>
			<TooltipContent>{label}</TooltipContent>
		</Tooltip>
	);
}
