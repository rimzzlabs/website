import { A, D, F, O, pipe, S } from "@mobily/ts-belt";
import { useState } from "react";

import type { Lang } from "@/i18n/config";

import { Playground, PlaygroundCode } from "../playground";

type RawMessage = {
	role: "system" | "user" | "assistant";
	content: string | null;
	created_at: number;
	trace_id: string;
};

type StepKey = "dropSystem" | "dropEmpty" | "selectKeys" | "take";

const STEPS = [
	{ key: "dropSystem", code: 'A.reject((m) => m.role === "system")' },
	{ key: "dropEmpty", code: "A.filterMap(toContent)" },
	{ key: "selectKeys", code: 'A.map(D.selectKeys(["role", "content"]))' },
	{ key: "take", code: "A.take(3)" },
] as const satisfies ReadonlyArray<{ key: StepKey; code: string }>;

type Copy = {
	title: string;
	hint: string;
	stepsLabel: string;
	result: (kept: number, total: number) => string;
	history: Array<RawMessage>;
};

const COPY: Record<Lang, Copy> = {
	en: {
		title: "Playground 3 — trimming a conversation before you send it",
		hint: "Every step is one line in a pipe. Turn them on and off to see what each one removes.",
		stepsLabel: "Steps in the pipe",
		result: (kept, total) => `Result — ${kept} of ${total} messages`,
		history: [
			{ role: "system", content: "You are a helpful assistant.", created_at: 1, trace_id: "t_01" },
			{ role: "user", content: "What is ts-belt?", created_at: 2, trace_id: "t_02" },
			{ role: "assistant", content: null, created_at: 3, trace_id: "t_03" },
			{
				role: "assistant",
				content: "  A functional utility library.  ",
				created_at: 4,
				trace_id: "t_04",
			},
			{ role: "user", content: "   ", created_at: 5, trace_id: "t_05" },
			{ role: "user", content: "Show me an example.", created_at: 6, trace_id: "t_06" },
		],
	},
	id: {
		title: "Playground 3 — merapikan percakapan sebelum dikirim",
		hint: "Setiap langkah adalah satu baris di dalam pipe. Nyalakan dan matikan untuk melihat apa yang dibuang.",
		stepsLabel: "Langkah di dalam pipe",
		result: (kept, total) => `Hasil — ${kept} dari ${total} pesan`,
		history: [
			{
				role: "system",
				content: "Kamu adalah asisten yang membantu.",
				created_at: 1,
				trace_id: "t_01",
			},
			{ role: "user", content: "Apa itu ts-belt?", created_at: 2, trace_id: "t_02" },
			{ role: "assistant", content: null, created_at: 3, trace_id: "t_03" },
			{
				role: "assistant",
				content: "  Sebuah utility library fungsional.  ",
				created_at: 4,
				trace_id: "t_04",
			},
			{ role: "user", content: "   ", created_at: 5, trace_id: "t_05" },
			{ role: "user", content: "Tunjukkan contohnya.", created_at: 6, trace_id: "t_06" },
		],
	},
};

function buildPrompt(history: Array<RawMessage>, enabled: Record<StepKey, boolean>) {
	const withoutSystem = F.ifElse(
		history,
		() => enabled.dropSystem,
		A.reject((message: RawMessage) => message.role === "system"),
		F.identity,
	);

	const withContent = F.ifElse(
		withoutSystem,
		() => enabled.dropEmpty,
		A.filterMap((message: RawMessage) =>
			pipe(
				O.fromNullable(message.content),
				O.map(S.trim),
				O.filter(S.isNotEmpty),
				O.map((content) => ({ ...message, content })),
			),
		),
		F.identity,
	);

	const narrowed = F.ifElse(
		withContent,
		() => enabled.selectKeys,
		A.map((message: RawMessage) => D.selectKeys(message, ["role", "content"])),
		F.identity,
	);

	return F.ifElse(narrowed, () => enabled.take, A.take(3), F.identity);
}

export function PlaygroundMessages(props: { lang: Lang }) {
	const [enabled, setEnabled] = useState<Record<StepKey, boolean>>({
		dropSystem: true,
		dropEmpty: true,
		selectKeys: true,
		take: false,
	});

	function toggle(key: StepKey) {
		setEnabled((current) => ({ ...current, [key]: !current[key] }));
	}

	const copy = COPY[props.lang];
	const output = buildPrompt(copy.history, enabled);

	return (
		<Playground title={copy.title} hint={copy.hint}>
			<div>
				<p className="mb-2 text-xs font-medium text-muted-foreground">{copy.stepsLabel}</p>
				<div className="flex flex-col gap-2">
					{STEPS.map((step) => (
						<button
							key={step.key}
							type="button"
							data-active={enabled[step.key]}
							aria-pressed={enabled[step.key]}
							onClick={() => toggle(step.key)}
							className="group/step flex items-center gap-2.5 rounded-lg border border-border bg-background px-2.5 py-2 text-left font-mono text-xs text-muted-foreground transition-colors hover:bg-muted data-[active=true]:border-transparent data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
						>
							<span
								aria-hidden
								className="size-2.5 shrink-0 rounded-full border border-current opacity-40 group-data-[active=true]/step:bg-current group-data-[active=true]/step:opacity-100"
							/>
							{step.code}
						</button>
					))}
				</div>
			</div>

			<PlaygroundCode label={copy.result(output.length, copy.history.length)}>
				{JSON.stringify(output, null, 2)}
			</PlaygroundCode>
		</Playground>
	);
}
