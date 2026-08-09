import { F, pipe, R } from "@mobily/ts-belt";
import { useState } from "react";
import { z } from "zod";

import type { Lang } from "@/i18n/config";

import { Playground, PlaygroundChoice, PlaygroundResultRow } from "../playground";

const searchArgsSchema = z.object({
	query: z.string(),
	limit: z.number().default(10),
});

type PresetKey = "valid" | "noLimit" | "noQuery" | "badLimit" | "malformed";

const PRESETS: Record<PresetKey, string> = {
	valid: '{ "query": "ts-belt", "limit": 5 }',
	noLimit: '{ "query": "ts-belt" }',
	noQuery: '{ "limit": 5 }',
	badLimit: '{ "query": "ts-belt", "limit": "five" }',
	malformed: '{ "query": "ts-belt", ',
};

type Copy = {
	title: string;
	hint: string;
	editLabel: string;
	step1: string;
	step2: string;
	step3: string;
	skipped: string;
	success: (query: string, limit: number) => string;
	failure: (message: string) => string;
	options: ReadonlyArray<{ value: PresetKey; label: string }>;
};

const COPY: Record<Lang, Copy> = {
	en: {
		title: "Playground 2 — parsing what the model asked for",
		hint: "Tool arguments arrive as a raw string. Edit it, or pick a preset, and watch where the pipeline stops.",
		editLabel: "Edit the arguments",
		step1: "Step 1",
		step2: "Step 2",
		step3: "What the user sees",
		skipped: "skipped, the error passed straight through",
		success: (query, limit) => `Searching for "${query}", ${limit} results`,
		failure: (message) => `Could not run the tool: ${message}`,
		options: [
			{ value: "valid", label: "Valid" },
			{ value: "noLimit", label: "No limit, so it defaults" },
			{ value: "noQuery", label: "No query" },
			{ value: "badLimit", label: "Limit is a string" },
			{ value: "malformed", label: "Malformed JSON" },
		],
	},
	id: {
		title: "Playground 2 — membaca permintaan dari model",
		hint: "Argumen tool datang sebagai string mentah. Ubah isinya, atau pilih preset, lalu lihat di mana pipeline-nya berhenti.",
		editLabel: "Ubah argumennya",
		step1: "Langkah 1",
		step2: "Langkah 2",
		step3: "Yang dilihat pengguna",
		skipped: "dilewati, error-nya diteruskan langsung ke bawah",
		success: (query, limit) => `Mencari "${query}", ${limit} hasil`,
		failure: (message) => `Tidak bisa menjalankan tool: ${message}`,
		options: [
			{ value: "valid", label: "Valid" },
			{ value: "noLimit", label: "Tanpa limit, jadi memakai default" },
			{ value: "noQuery", label: "Tanpa query" },
			{ value: "badLimit", label: "Limit berupa string" },
			{ value: "malformed", label: "JSON rusak" },
		],
	},
};

function parseArguments(raw: string): R.Result<unknown, Error> {
	return R.fromExecution(() => JSON.parse(raw) as unknown);
}

function toSearchArgs(value: unknown) {
	return R.fromExecution(() => searchArgsSchema.parse(value));
}

type StepView = { output: string; tone: "ok" | "error" | "muted" };

function toMessage(error: Error) {
	return F.ifElse(
		error,
		(value) => value instanceof z.ZodError,
		(value) => z.prettifyError(value as z.ZodError),
		(value) => value.message,
	);
}

function describe(result: R.Result<unknown, Error>) {
	return R.match(
		result,
		(value): StepView => ({ output: `Ok(${JSON.stringify(value)})`, tone: "ok" }),
		(error): StepView => ({ output: `Error(${toMessage(error)})`, tone: "error" }),
	);
}

export function PlaygroundResult(props: { lang: Lang }) {
	const [preset, setPreset] = useState<PresetKey>("valid");
	const [raw, setRaw] = useState(PRESETS.valid);

	function handlePreset(next: PresetKey) {
		setPreset(next);
		setRaw(PRESETS[next]);
	}

	const copy = COPY[props.lang];
	const parsed = parseArguments(raw);
	const validated = pipe(parsed, R.flatMap(toSearchArgs));

	const parsedView = describe(parsed);
	const validatedView = R.match(
		parsed,
		(): StepView => describe(validated),
		(): StepView => ({
			output: copy.skipped,
			tone: "muted",
		}),
	);

	const final = R.match(
		validated,
		(args) => copy.success(args.query, args.limit),
		(error) => copy.failure(toMessage(error)),
	);

	const finalTone = R.match(
		validated,
		(): StepView["tone"] => "ok",
		(): StepView["tone"] => "error",
	);

	return (
		<Playground title={copy.title} hint={copy.hint}>
			<PlaygroundChoice
				label="tool_call.function.arguments"
				options={copy.options}
				value={preset}
				onSelect={handlePreset}
			/>

			<div>
				<label
					htmlFor="playground-arguments"
					className="mb-2 block text-xs font-medium text-muted-foreground"
				>
					{copy.editLabel}
				</label>
				<textarea
					id="playground-arguments"
					value={raw}
					spellCheck={false}
					onChange={(event) => setRaw(event.target.value)}
					rows={3}
					className="w-full resize-y rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
				/>
			</div>

			<div className="space-y-3">
				<PlaygroundResultRow
					label={copy.step1}
					tone={parsedView.tone}
					code="R.fromExecution(() => JSON.parse(raw))"
					output={parsedView.output}
				/>
				<PlaygroundResultRow
					label={copy.step2}
					tone={validatedView.tone}
					code="R.flatMap(toSearchArgs)  // zod schema.parse"
					output={validatedView.output}
				/>
				<PlaygroundResultRow
					label={copy.step3}
					tone={finalTone}
					code="R.match(validated, onOk, onError)"
					output={final}
				/>
			</div>
		</Playground>
	);
}
