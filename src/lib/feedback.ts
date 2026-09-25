import { A, O, pipe } from "@mobily/ts-belt";
import { z } from "zod";

import type { Dictionary } from "@/i18n/en";

export const FEEDBACK_TOPICS = [
	"bug",
	"accessibility",
	"content",
	"idea",
	"other",
] as const;
export type FeedbackTopic = (typeof FEEDBACK_TOPICS)[number];

export const MAX_ATTACHMENTS = 3;
export const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;

export type FeedbackValidation = Dictionary["feedback"]["validation"];

export function createFeedbackSchema(messages: FeedbackValidation) {
	return z.object({
		topic: z.enum(FEEDBACK_TOPICS, messages.topic),
		page: z
			.string()
			.trim()
			.max(300, messages.pageMax)
			.refine(
				(value) => value === "" || /^https?:\/\/\S+$/.test(value),
				messages.page,
			),
		message: z
			.string()
			.trim()
			.min(10, messages.messageMin)
			.max(3000, messages.messageMax),
		environment: z.string().trim().max(200, messages.environmentMax),
		name: z.string().trim().max(100, messages.nameMax),
		email: z
			.string()
			.trim()
			.max(254)
			.refine(
				(value) => value === "" || z.email().safeParse(value).success,
				messages.email,
			),
		company: z.string().optional(),
	});
}

export type FeedbackInput = z.infer<ReturnType<typeof createFeedbackSchema>>;

export type ImageType = "png" | "jpeg" | "webp";

export const IMAGE_CONTENT_TYPES: Record<ImageType, string> = {
	png: "image/png",
	jpeg: "image/jpeg",
	webp: "image/webp",
};

export const ACCEPTED_IMAGE_TYPES =
	Object.values(IMAGE_CONTENT_TYPES).join(",");

interface Signature {
	type: ImageType;
	offset: number;
	bytes: ReadonlyArray<number>;
	extra?: { offset: number; bytes: ReadonlyArray<number> };
}

// Magic numbers. The file header decides the type, never the name or the
// browser's claimed MIME type, so an SVG or HTML file renamed to .png fails.
const SIGNATURES: ReadonlyArray<Signature> = [
	{
		type: "png",
		offset: 0,
		bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
	},
	{ type: "jpeg", offset: 0, bytes: [0xff, 0xd8, 0xff] },
	{
		type: "webp",
		offset: 0,
		bytes: [0x52, 0x49, 0x46, 0x46],
		extra: { offset: 8, bytes: [0x57, 0x45, 0x42, 0x50] },
	},
];

export const SIGNATURE_LENGTH = 12;

function matchesAt(
	header: Uint8Array,
	offset: number,
	bytes: ReadonlyArray<number>,
) {
	return bytes.every((byte, index) => header[offset + index] === byte);
}

export function detectImageType(header: Uint8Array) {
	return pipe(
		SIGNATURES,
		A.find(
			(signature) =>
				matchesAt(header, signature.offset, signature.bytes) &&
				(!signature.extra ||
					matchesAt(header, signature.extra.offset, signature.extra.bytes)),
		),
		O.map((signature) => signature.type),
	);
}

export type AttachmentProblem = "type" | "size" | "count";

export type AttachmentCheck =
	| { ok: true; type: ImageType }
	| { ok: false; problem: AttachmentProblem };

const WRONG_TYPE: AttachmentCheck = { ok: false, problem: "type" };
const WRONG_SIZE: AttachmentCheck = { ok: false, problem: "size" };

export async function checkAttachment(file: Blob): Promise<AttachmentCheck> {
	if (file.size === 0 || file.size > MAX_ATTACHMENT_BYTES) return WRONG_SIZE;

	const header = new Uint8Array(
		await file.slice(0, SIGNATURE_LENGTH).arrayBuffer(),
	);
	return pipe(
		detectImageType(header),
		O.mapWithDefault(
			WRONG_TYPE,
			(type): AttachmentCheck => ({ ok: true, type }),
		),
	);
}
