import { ChatCircleTextIcon } from "@phosphor-icons/react";
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
import type { Dictionary } from "@/i18n/en";

interface HomeContactDialogProps {
	copy: Dictionary["contact"];
}

export function HomeContactDialog(props: HomeContactDialogProps) {
	return (
		<Dialog>
			<DialogTrigger render={<Button />}>
				<ChatCircleTextIcon />
				{props.copy.trigger}
			</DialogTrigger>

			<DialogContent
				className="sm:max-w-lg"
				closeLabel={props.copy.close}
				style={{
					viewTransitionName: "contact-card",
					viewTransitionClass: "form-card",
				}}
			>
				<DialogHeader>
					<DialogTitle>{props.copy.title}</DialogTitle>
					<DialogDescription>{props.copy.description}</DialogDescription>
				</DialogHeader>

				<HomeContactForm
					copy={props.copy}
					actionsClassName="flex flex-row-reverse justify-start gap-2"
					closeButton={
						<DialogClose render={<Button variant="ghost" />}>
							{props.copy.close}
						</DialogClose>
					}
				/>
			</DialogContent>
		</Dialog>
	);
}
