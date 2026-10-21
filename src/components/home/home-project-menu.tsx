import { ArrowUpRightIcon, BookOpenTextIcon } from "@phosphor-icons/react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLinkItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Dictionary } from "@/i18n/en";
import { fill } from "@/i18n/fill";

interface HomeProjectMenuProps {
	copy: Dictionary["home"]["projectMenu"];
	name: string;
	href: string;
	note?: string;
}

export function HomeProjectMenu(props: HomeProjectMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				openOnHover
				className="absolute inset-0 focus-visible:outline-2 focus-visible:outline-ring"
			>
				<span className="sr-only">
					{fill(props.copy.label, { name: props.name })}
				</span>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-auto min-w-44"
				side="top"
				sideOffset={4}
			>
				<DropdownMenuGroup>
					<DropdownMenuLinkItem
						href={props.href}
						target="_blank"
						rel="noopener noreferrer"
						closeOnClick
					>
						<ArrowUpRightIcon aria-hidden="true" />
						{fill(props.copy.visit, { name: props.name })}
						<span className="sr-only">{props.copy.opensInNewTab}</span>
					</DropdownMenuLinkItem>

					{props.note && (
						<DropdownMenuLinkItem href={props.note} closeOnClick>
							<BookOpenTextIcon aria-hidden="true" />
							{props.copy.readStory}
						</DropdownMenuLinkItem>
					)}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
