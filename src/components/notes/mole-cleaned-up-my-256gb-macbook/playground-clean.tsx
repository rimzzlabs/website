import { useState } from "react";

import { Playground } from "@/components/notes/playground";
import type { Lang } from "@/i18n/config";
import { cn } from "@/lib/utils";

type CleanItem = {
	id: string;
	label: string;
	sizeMb: number;
	items?: number;
};

type Copy = {
	title: string;
	hint: string;
	totalLabel: string;
	emptyLabel: string;
	itemsUnit: string;
};

// Real numbers from the first `mo clean` scan on my machine (see the screenshot in the note).
const SCAN_ITEMS: readonly CleanItem[] = [
	{ id: "user-app-cache", label: "User app cache", sizeMb: 3410, items: 28 },
	{ id: "geod-temp", label: "Geod temp files", sizeMb: 159.6, items: 1017 },
	{ id: "coredevice", label: "CoreDevice service cache", sizeMb: 134.5 },
	{ id: "media-analysis", label: "Media analysis cache", sizeMb: 90.8, items: 3 },
	{ id: "macos-help", label: "macOS Help system cache", sizeMb: 28.9, items: 5 },
	{ id: "wallpaper", label: "Wallpaper agent cache", sizeMb: 24.2 },
	{ id: "parsecd", label: "Parsecd cache", sizeMb: 17.1, items: 15 },
	{ id: "media-temp", label: "Media analysis temp files", sizeMb: 7.6, items: 5 },
	{ id: "media-services", label: "Apple Media Services cache", sizeMb: 2.5, items: 5 },
	{ id: "app-logs", label: "User app logs", sizeMb: 0.857, items: 12 },
];

const MAX_SIZE_MB = Math.max(...SCAN_ITEMS.map((item) => item.sizeMb));

const COPY: Record<Lang, Copy> = {
	en: {
		title: "What mo clean found on my first scan",
		hint: "Real numbers from the screenshot above. Toggle a category on or off and watch how much space you would get back. The visible part of the scan alone is almost 4GB.",
		totalLabel: "Space you get back",
		emptyLabel: "Nothing selected. Toggle a category to see its size.",
		itemsUnit: "items",
	},
	id: {
		title: "Hasil scan pertama mo clean di Mac saya",
		hint: "Angka asli dari tangkapan layar di atas. Nyalakan atau matikan sebuah kategori dan lihat berapa ruang yang balik. Yang terlihat di sini saja hampir 4GB.",
		totalLabel: "Ruang yang kamu dapat kembali",
		emptyLabel: "Belum ada yang dipilih. Nyalakan salah satu kategori untuk melihat ukurannya.",
		itemsUnit: "item",
	},
};

function formatSize(sizeMb: number) {
	if (sizeMb >= 1024) return `${(sizeMb / 1024).toFixed(2)}GB`;
	if (sizeMb >= 1) return `${sizeMb.toFixed(1)}MB`;
	return `${Math.round(sizeMb * 1024)}KB`;
}

export function PlaygroundClean(props: { lang: Lang }) {
	const [selected, setSelected] = useState<ReadonlySet<string>>(
		new Set(SCAN_ITEMS.map((item) => item.id)),
	);

	const copy = COPY[props.lang];
	const totalMb = SCAN_ITEMS.filter((item) => selected.has(item.id)).reduce(
		(total, item) => total + item.sizeMb,
		0,
	);

	function handleToggle(id: string) {
		setSelected((current) => {
			const next = new Set(current);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	}

	return (
		<Playground title={copy.title} hint={copy.hint}>
			<div className="flex items-baseline justify-between gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2">
				<span className="text-xs font-medium text-muted-foreground">{copy.totalLabel}</span>
				<span className="font-mono text-sm font-semibold tabular-nums">
					{totalMb > 0 ? formatSize(totalMb) : "0KB"}
				</span>
			</div>

			{totalMb === 0 && (
				<p className="text-xs leading-relaxed text-muted-foreground">{copy.emptyLabel}</p>
			)}

			<div className="space-y-1.5">
				{SCAN_ITEMS.map((item) => {
					const active = selected.has(item.id);
					return (
						<button
							key={item.id}
							type="button"
							aria-pressed={active}
							onClick={() => handleToggle(item.id)}
							className={cn(
								"block w-full rounded-lg border px-3 py-2 text-left transition-colors",
								active
									? "border-border bg-background hover:bg-muted"
									: "border-dashed border-border bg-muted/30 opacity-60 hover:opacity-80",
							)}
						>
							<span className="flex items-baseline justify-between gap-3">
								<span className={cn("text-xs font-medium", !active && "line-through")}>
									{item.label}
									{item.items && (
										<span className="ml-1.5 font-normal text-muted-foreground">
											{item.items} {copy.itemsUnit}
										</span>
									)}
								</span>
								<span className="font-mono text-[11px] tabular-nums text-muted-foreground">
									{formatSize(item.sizeMb)}
								</span>
							</span>
							<span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-muted">
								<span
									className={cn(
										"block h-full rounded-full transition-all",
										active ? "bg-primary" : "bg-transparent",
									)}
									style={{ width: `${Math.max((item.sizeMb / MAX_SIZE_MB) * 100, 1.5)}%` }}
								/>
							</span>
						</button>
					);
				})}
			</div>
		</Playground>
	);
}
