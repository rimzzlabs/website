import { createContext, useContext, useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/i18n/en";
import { fill } from "@/i18n/fill";
import {
	checkAttachment,
	MAX_ATTACHMENT_BYTES,
	MAX_ATTACHMENTS,
} from "@/lib/feedback";

export interface FeedbackAttachment {
	id: string;
	file: File;
	url: string;
}

interface FeedbackAttachmentsValue {
	items: ReadonlyArray<FeedbackAttachment>;
	errors: ReadonlyArray<string>;
	add: (files: ReadonlyArray<File>) => Promise<void>;
	remove: (id: string) => void;
	clear: () => void;
}

const FeedbackAttachmentsContext =
	createContext<FeedbackAttachmentsValue | null>(null);

const MAX_SIZE_MB = MAX_ATTACHMENT_BYTES / 1024 / 1024;

interface FeedbackAttachmentsProviderProps {
	copy: Dictionary["feedback"]["attachmentErrors"];
	children: React.ReactNode;
}

export function FeedbackAttachmentsProvider(
	props: FeedbackAttachmentsProviderProps,
) {
	const [items, setItems] = useState<ReadonlyArray<FeedbackAttachment>>([]);
	const [errors, setErrors] = useState<ReadonlyArray<string>>([]);
	const itemsRef = useRef(items);
	itemsRef.current = items;

	useEffect(
		() => () => {
			for (const item of itemsRef.current) URL.revokeObjectURL(item.url);
		},
		[],
	);

	const add = async (files: ReadonlyArray<File>) => {
		const nextErrors: Array<string> = [];
		const accepted: Array<FeedbackAttachment> = [];
		let room = MAX_ATTACHMENTS - itemsRef.current.length;

		for (const file of files) {
			if (room <= 0) {
				nextErrors.push(fill(props.copy.count, { count: MAX_ATTACHMENTS }));
				break;
			}

			const check = await checkAttachment(file);
			if (!check.ok) {
				const template = props.copy[check.problem];
				nextErrors.push(fill(template, { name: file.name, size: MAX_SIZE_MB }));
				continue;
			}

			accepted.push({
				id: crypto.randomUUID(),
				file,
				url: URL.createObjectURL(file),
			});
			room -= 1;
		}

		setErrors(nextErrors);
		setItems((current) => [...current, ...accepted]);
	};

	const remove = (id: string) => {
		setErrors([]);
		setItems((current) =>
			current.filter((item) => {
				if (item.id === id) URL.revokeObjectURL(item.url);
				return item.id !== id;
			}),
		);
	};

	const clear = () => {
		for (const item of itemsRef.current) URL.revokeObjectURL(item.url);
		setErrors([]);
		setItems([]);
	};

	return (
		<FeedbackAttachmentsContext.Provider
			value={{ items, errors, add, remove, clear }}
		>
			{props.children}
		</FeedbackAttachmentsContext.Provider>
	);
}

export function useFeedbackAttachments() {
	const value = useContext(FeedbackAttachmentsContext);
	if (!value) {
		throw new Error(
			"useFeedbackAttachments must be used inside FeedbackAttachmentsProvider",
		);
	}
	return value;
}
