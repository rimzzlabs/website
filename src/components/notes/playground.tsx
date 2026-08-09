import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PlaygroundProps {
	title: string;
	hint: string;
	children: ReactNode;
}

export function Playground(props: PlaygroundProps) {
	return (
		<div className="not-prose my-8 overflow-hidden rounded-xl border border-border bg-card text-card-foreground">
			<div className="border-b border-border bg-muted/40 px-4 py-3">
				<p className="text-sm font-semibold">{props.title}</p>
				<p className="mt-1 text-xs leading-relaxed text-muted-foreground">{props.hint}</p>
			</div>
			<div className="space-y-4 p-4">{props.children}</div>
		</div>
	);
}

interface PlaygroundChoiceProps<T extends string> {
	label: string;
	options: ReadonlyArray<{ value: T; label: string }>;
	value: T;
	onSelect: (value: T) => void;
}

export function PlaygroundChoice<T extends string>(props: PlaygroundChoiceProps<T>) {
	return (
		<div>
			<p className="mb-2 text-xs font-medium text-muted-foreground">{props.label}</p>
			<div className="flex flex-wrap gap-2">
				{props.options.map((option) => (
					<button
						key={option.value}
						type="button"
						data-active={props.value === option.value}
						aria-pressed={props.value === option.value}
						onClick={() => props.onSelect(option.value)}
						className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active=true]:border-transparent data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
					>
						{option.label}
					</button>
				))}
			</div>
		</div>
	);
}

interface PlaygroundCodeProps {
	label: string;
	children: string;
}

export function PlaygroundCode(props: PlaygroundCodeProps) {
	return (
		<div>
			<p className="mb-2 text-xs font-medium text-muted-foreground">{props.label}</p>
			<pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs leading-relaxed">
				{props.children}
			</pre>
		</div>
	);
}

interface PlaygroundResultRowProps {
	label: string;
	code: string;
	output: string;
	tone: "ok" | "error" | "muted";
}

const TONE_CLASS: Record<PlaygroundResultRowProps["tone"], string> = {
	ok: "border-emerald-500/40 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400",
	error: "border-destructive/40 bg-destructive/5 text-destructive",
	muted: "border-border bg-muted/40 text-muted-foreground",
};

export function PlaygroundResultRow(props: PlaygroundResultRowProps) {
	return (
		<div className="rounded-lg border border-border">
			<p className="border-b border-border px-3 py-2 font-mono text-[11px] leading-relaxed wrap-break-word">
				{props.code}
			</p>
			<div className="flex flex-col gap-1 px-3 py-2">
				<span className="text-[11px] font-medium text-muted-foreground">{props.label}</span>
				<span
					className={cn(
						"rounded-md border px-2 py-1 font-mono text-xs wrap-break-word",
						TONE_CLASS[props.tone],
					)}
				>
					{props.output}
				</span>
			</div>
		</div>
	);
}
