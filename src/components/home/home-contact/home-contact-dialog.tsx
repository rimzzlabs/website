import { ChatCircleTextIcon } from "@phosphor-icons/react";

import {
	CONTACT_DESCRIPTION,
	CONTACT_TITLE,
	CONTACT_TRIGGER,
} from "@/components/home/home-contact/home-contact-copy";
import { HomeContactForm } from "@/components/home/home-contact/home-contact-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export function HomeContactDialog() {
	return (
		<Dialog>
			<DialogTrigger render={<Button />}>
				<ChatCircleTextIcon />
				{CONTACT_TRIGGER}
			</DialogTrigger>

			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>{CONTACT_TITLE}</DialogTitle>
					<DialogDescription>{CONTACT_DESCRIPTION}</DialogDescription>
				</DialogHeader>

				<HomeContactForm
					actionsClassName="flex flex-row-reverse justify-start gap-2"
					closeButton={
						<DialogClose render={<Button variant="ghost" />}>Close</DialogClose>
					}
				/>
			</DialogContent>
		</Dialog>
	);
}
