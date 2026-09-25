import {
	LaptopIcon,
	PowerIcon,
	SlidersHorizontalIcon,
	TranslateIcon,
} from "@phosphor-icons/react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface NavigationBarSettingsProps {
	side?: "top" | "bottom";
}

export function NavigationBarSettings(props: NavigationBarSettingsProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button size="icon" variant="ghost" />}>
				<SlidersHorizontalIcon />
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" side={props.side} className="min-w-40">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Language</DropdownMenuLabel>
					<DropdownMenuRadioGroup>
						<DropdownMenuRadioItem value="on">
							<TranslateIcon /> English
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="off" className="group">
							<TranslateIcon /> Indonesia
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>

				<DropdownMenuGroup>
					<DropdownMenuLabel>Animation</DropdownMenuLabel>
					<DropdownMenuRadioGroup>
						<DropdownMenuRadioItem value="system">
							<LaptopIcon /> System
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="on">
							<PowerIcon weight="fill" /> On
						</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="off" className="group">
							<PowerIcon /> Off
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
