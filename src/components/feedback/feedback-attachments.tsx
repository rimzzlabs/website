import { ImageIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/i18n/en";
import { fill } from "@/i18n/fill";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/feedback";
import { useFeedbackAttachments } from "./feedback-attachments-context";

interface FeedbackAttachmentsProps {
	copy: Dictionary["feedback"];
	id: string;
	hintId: string;
	errorId: string;
}

export function FeedbackAttachments(props: FeedbackAttachmentsProps) {
	const attachments = useFeedbackAttachments();
	const [dragging, setDragging] = useState(false);

	const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
		event.preventDefault();
		setDragging(false);
		attachments.add(Array.from(event.dataTransfer.files));
	};

	return (
		<div className="flex flex-col gap-3">
			<label
				htmlFor={props.id}
				data-dragging={dragging}
				onDragOver={(event) => {
					event.preventDefault();
					setDragging(true);
				}}
				onDragLeave={() => setDragging(false)}
				onDrop={handleDrop}
				className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-input px-4 py-6 text-center text-sm text-muted-foreground transition-colors hover:border-ring hover:bg-background/60 has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50 data-[dragging=true]:border-ring data-[dragging=true]:bg-background/60"
			>
				<ImageIcon aria-hidden="true" className="size-6" />
				<span>
					{props.copy.attachmentsDrop.split("{browse}")[0]}
					<span className="font-medium text-foreground underline underline-offset-4">
						{props.copy.attachmentsBrowse}
					</span>
					{props.copy.attachmentsDrop.split("{browse}")[1]}
				</span>
				<input
					id={props.id}
					type="file"
					multiple
					accept={ACCEPTED_IMAGE_TYPES}
					aria-describedby={`${props.hintId} ${props.errorId}`}
					className="sr-only"
					onChange={(event) => {
						attachments.add(Array.from(event.currentTarget.files ?? []));
						event.currentTarget.value = "";
					}}
				/>
			</label>

			<div id={props.errorId} role="alert" className="empty:hidden">
				{attachments.errors.length > 0 && (
					<ul className="flex flex-col gap-1 text-sm text-destructive">
						{attachments.errors.map((error) => (
							<li key={error}>{error}</li>
						))}
					</ul>
				)}
			</div>

			{attachments.items.length > 0 && (
				<ul className="grid grid-cols-3 gap-3">
					{attachments.items.map((item) => (
						<li
							key={item.id}
							className="relative overflow-hidden rounded-lg border bg-background"
						>
							<img
								src={item.url}
								alt={item.file.name}
								className="aspect-square w-full object-cover"
							/>
							<Button
								type="button"
								size="icon-sm"
								variant="secondary"
								onClick={() => attachments.remove(item.id)}
								className="absolute top-1.5 right-1.5 rounded-full shadow-sm"
							>
								<XIcon aria-hidden="true" />
								<span className="sr-only">
									{fill(props.copy.attachmentRemove, { name: item.file.name })}
								</span>
							</Button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
