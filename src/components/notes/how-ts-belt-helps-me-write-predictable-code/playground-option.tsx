import { A, G, O, pipe, S } from "@mobily/ts-belt";
import { useState } from "react";

import type { Lang } from "@/i18n/config";

import { Playground, PlaygroundChoice, PlaygroundCode, PlaygroundResultRow } from "../playground";

type ToolCall = { id: string; function: { name: string; arguments: string } };

type ChatMessage = {
	role: "assistant";
	content: string | null;
	tool_calls?: Array<ToolCall>;
};

type ChatCompletion = {
	choices: Array<{ message?: ChatMessage; finish_reason: string }>;
};

type ScenarioKey = "text" | "toolCall" | "blank" | "noMessage" | "noChoices";

function scenarios(reply: string): Record<ScenarioKey, ChatCompletion> {
	return {
		text: {
			choices: [{ message: { role: "assistant", content: reply }, finish_reason: "stop" }],
		},
		toolCall: {
			choices: [
				{
					message: {
						role: "assistant",
						content: null,
						tool_calls: [
							{ id: "call_1", function: { name: "search", arguments: '{"query":"ts-belt"}' } },
						],
					},
					finish_reason: "tool_calls",
				},
			],
		},
		blank: {
			choices: [{ message: { role: "assistant", content: "   " }, finish_reason: "stop" }],
		},
		noMessage: {
			choices: [{ finish_reason: "content_filter" }],
		},
		noChoices: {
			choices: [],
		},
	};
}

type Copy = {
	title: string;
	hint: string;
	choiceLabel: string;
	payloadLabel: string;
	returnsLabel: string;
	none: string;
	stillSome: string;
	reply: string;
	options: ReadonlyArray<{ value: ScenarioKey; label: string }>;
};

const COPY: Record<Lang, Copy> = {
	en: {
		title: "Playground 1 — what the model actually returns",
		hint: "Pick a response shape. All three functions below run the real ts-belt build in your browser.",
		choiceLabel: "Response from the API",
		payloadLabel: "The payload",
		returnsLabel: "Returns",
		none: "undefined  (None)",
		stillSome: "null  (still Some!)",
		reply: "  ts-belt is a utility library.  ",
		options: [
			{ value: "text", label: "Text reply" },
			{ value: "toolCall", label: "Tool call (content: null)" },
			{ value: "blank", label: "Whitespace only" },
			{ value: "noMessage", label: "No message" },
			{ value: "noChoices", label: "No choices" },
		],
	},
	id: {
		title: "Playground 1 — apa yang sebenarnya dikembalikan model",
		hint: "Pilih bentuk responsnya. Ketiga fungsi di bawah menjalankan ts-belt yang asli di browser kamu.",
		choiceLabel: "Respons dari API",
		payloadLabel: "Isi payload-nya",
		returnsLabel: "Menghasilkan",
		none: "undefined  (None)",
		stillSome: "null  (masih dianggap Some!)",
		reply: "  ts-belt adalah utility library.  ",
		options: [
			{ value: "text", label: "Balasan teks" },
			{ value: "toolCall", label: "Tool call (content: null)" },
			{ value: "blank", label: "Hanya spasi" },
			{ value: "noMessage", label: "Tanpa message" },
			{ value: "noChoices", label: "Tanpa choices" },
		],
	},
};

function withOptionalChaining(completion: ChatCompletion) {
	return completion.choices[0]?.message?.content?.trim();
}

function withoutFromNullable(completion: ChatCompletion) {
	return pipe(
		completion.choices,
		A.head,
		O.flatMap((choice) => choice.message),
		O.flatMap((message) => message.content),
		O.map(S.trim),
		O.filter(S.isNotEmpty),
	);
}

function withFromNullable(completion: ChatCompletion) {
	return pipe(
		completion.choices,
		A.head,
		O.flatMap((choice) => O.fromNullable(choice.message)),
		O.flatMap((message) => O.fromNullable(message.content)),
		O.map(S.trim),
		O.filter(S.isNotEmpty),
	);
}

function toMessage(error: unknown) {
	if (G.isError(error)) return error.message;

	return String(error);
}

function runSafely(copy: Copy, fn: () => unknown) {
	try {
		const value = fn();

		if (value === undefined) return { output: copy.none, tone: "muted" as const };
		if (value === null) return { output: copy.stillSome, tone: "error" as const };

		return { output: JSON.stringify(value), tone: "ok" as const };
	} catch (error) {
		return { output: `TypeError: ${toMessage(error)}`, tone: "error" as const };
	}
}

export function PlaygroundOption(props: { lang: Lang }) {
	const [scenario, setScenario] = useState<ScenarioKey>("text");

	const copy = COPY[props.lang];
	const completion = scenarios(copy.reply)[scenario];

	const chained = runSafely(copy, () => withOptionalChaining(completion));
	const trap = runSafely(copy, () => withoutFromNullable(completion));
	const safe = runSafely(copy, () => withFromNullable(completion));

	return (
		<Playground title={copy.title} hint={copy.hint}>
			<PlaygroundChoice
				label={copy.choiceLabel}
				options={copy.options}
				value={scenario}
				onSelect={setScenario}
			/>

			<PlaygroundCode label={copy.payloadLabel}>
				{JSON.stringify(completion, null, 2)}
			</PlaygroundCode>

			<div className="space-y-3">
				<PlaygroundResultRow
					label={copy.returnsLabel}
					tone={chained.tone}
					code="choices[0]?.message?.content?.trim()"
					output={chained.output}
				/>
				<PlaygroundResultRow
					label={copy.returnsLabel}
					tone={trap.tone}
					code="O.flatMap((message) => message.content)"
					output={trap.output}
				/>
				<PlaygroundResultRow
					label={copy.returnsLabel}
					tone={safe.tone}
					code="O.flatMap((message) => O.fromNullable(message.content))"
					output={safe.output}
				/>
			</div>
		</Playground>
	);
}
