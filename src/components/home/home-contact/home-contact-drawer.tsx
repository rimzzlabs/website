import { ChatCircleTextIcon } from "@phosphor-icons/react";

import {
	CONTACT_DESCRIPTION,
	CONTACT_TITLE,
	CONTACT_TRIGGER,
} from "@/components/home/home-contact/home-contact-copy";
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

export function HomeContactDrawer() {
	return (
		<Drawer showSwipeHandle>
			<DrawerTrigger render={<Button />}>
				<ChatCircleTextIcon />
				{CONTACT_TRIGGER}
			</DrawerTrigger>

			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{CONTACT_TITLE}</DrawerTitle>
					<DrawerDescription>{CONTACT_DESCRIPTION}</DrawerDescription>
				</DrawerHeader>

				<div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
					<HomeContactForm
						actionsClassName="flex flex-col gap-2"
						closeButton={
							<DrawerClose render={<Button variant="ghost" />}>
								Close
							</DrawerClose>
						}
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
