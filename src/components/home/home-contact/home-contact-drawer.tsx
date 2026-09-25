import { ChatCircleTextIcon } from "@phosphor-icons/react";
import { HomeContactForm } from "@/components/home/home-contact/home-contact-form";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import type { Dictionary } from "@/i18n/en";

interface HomeContactDrawerProps {
	copy: Dictionary["contact"];
}

export function HomeContactDrawer(props: HomeContactDrawerProps) {
	return (
		<Drawer showSwipeHandle>
			<DrawerTrigger render={<Button />}>
				<ChatCircleTextIcon />
				{props.copy.trigger}
			</DrawerTrigger>

			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{props.copy.title}</DrawerTitle>
					<DrawerDescription>{props.copy.description}</DrawerDescription>
				</DrawerHeader>

				<div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
					<HomeContactForm
						copy={props.copy}
						actionsClassName="flex flex-col gap-2"
						closeButton={
							<DrawerClose render={<Button variant="ghost" />}>
								{props.copy.close}
							</DrawerClose>
						}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
