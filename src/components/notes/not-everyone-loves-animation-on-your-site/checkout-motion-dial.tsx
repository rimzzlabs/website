import { useRef, useState } from "react";

import { Playground, PlaygroundChoice } from "@/components/notes/playground";
import type { Lang } from "@/i18n/config";
import { cn } from "@/lib/utils";

type MotionLevel = "none" | "subtle" | "lebay";
type CheckoutStep = "cart" | "paying" | "done";

interface CartItem {
	id: string;
	label: string;
	price: number;
}

interface Copy {
	title: string;
	hint: string;
	dialLabel: string;
	dialOptions: Record<MotionLevel, string>;
	orderLabel: string;
	totalLabel: string;
	payLabel: string;
	payingLabel: string;
	doneTitle: string;
	doneBody: string;
	elapsedLabel: string;
	resetLabel: string;
	items: readonly CartItem[];
}

const COPY: Record<Lang, Copy> = {
	en: {
		title: "The same checkout, three motion budgets",
		hint: "The flow and the fake payment delay are identical in all three. Pay in each mode and compare how long the confirmation takes to become readable. If your OS has Reduce Motion on, even the over-animated mode calms down, exactly as it should.",
		dialLabel: "Motion budget",
		dialOptions: { none: "No motion", subtle: "Just enough", lebay: "Way too much" },
		orderLabel: "Your order",
		totalLabel: "Total",
		payLabel: "Pay now",
		payingLabel: "Processing payment…",
		doneTitle: "Payment received",
		doneBody: "Your tickets are safe.",
		elapsedLabel: "From click to readable confirmation",
		resetLabel: "Try again",
		items: [
			{ id: "ticket", label: "Concert ticket, CAT 8 × 2", price: 3_800_000 },
			{ id: "fee", label: "Service fee", price: 80_000 },
		],
	},
	id: {
		title: "Checkout yang sama, tiga porsi animasi",
		hint: "Alur dan jeda pembayarannya sama persis di ketiga mode. Coba bayar di tiap mode, lalu bandingkan berapa lama sampai konfirmasinya kebaca. Kalau Reduce Motion di sistemmu menyala, mode paling lebay pun ikut kalem, persis seperti seharusnya.",
		dialLabel: "Porsi animasi",
		dialOptions: { none: "Tanpa animasi", subtle: "Secukupnya", lebay: "Kebanyakan" },
		orderLabel: "Pesanan kamu",
		totalLabel: "Total",
		payLabel: "Bayar sekarang",
		payingLabel: "Memproses pembayaran…",
		doneTitle: "Pembayaran diterima",
		doneBody: "Tiket kamu aman.",
		elapsedLabel: "Dari klik sampai konfirmasi kebaca",
		resetLabel: "Ulangi",
		items: [
			{ id: "ticket", label: "Tiket konser, CAT 8 × 2", price: 3_800_000 },
			{ id: "fee", label: "Biaya layanan", price: 80_000 },
		],
	},
};

// The fake payment always takes the same time. Every extra millisecond after
// this is pure choreography, which is the point of the comparison.
const PROCESS_MS = 600;
const CHOREO_MS: Record<MotionLevel, number> = { none: 0, subtle: 150, lebay: 1400 };
const ENTRY_MS: Record<MotionLevel, number> = { none: 0, subtle: 150, lebay: 900 };

const OVERLAY_TRANSITION: Record<MotionLevel, string> = {
	none: "",
	subtle: "transition-opacity duration-150 ease-out",
	lebay: "transition-[translate,opacity] duration-700 ease-out",
};

const OVERLAY_HIDDEN: Record<MotionLevel, string> = {
	none: "opacity-0",
	subtle: "opacity-0",
	lebay: "translate-y-full opacity-0",
};

const PAY_BUTTON: Record<MotionLevel, string> = {
	none: "",
	subtle: "transition-transform duration-100 active:scale-95",
	lebay: "animate-pulse shadow-lg shadow-primary/40 motion-reduce:animate-none",
};

function formatIdr(value: number) {
	return `Rp${value.toLocaleString("id-ID")}`;
}

function formatElapsed(ms: number) {
	return `${(ms / 1000).toFixed(1)}s`;
}

export function CheckoutMotionDial(props: { lang: Lang }) {
	const [level, setLevel] = useState<MotionLevel>("lebay");
	const [step, setStep] = useState<CheckoutStep>("cart");
	const [elapsedMs, setElapsedMs] = useState<number | null>(null);
	const timersRef = useRef<number[]>([]);

	const copy = COPY[props.lang];
	const total = copy.items.reduce((sum, item) => sum + item.price, 0);

	function clearTimers() {
		for (const id of timersRef.current) window.clearTimeout(id);
		timersRef.current = [];
	}

	function handleSelectLevel(next: MotionLevel) {
		clearTimers();
		setLevel(next);
		setStep("cart");
		setElapsedMs(null);
	}

	function handlePay() {
		if (step !== "cart") return;
		const started = Date.now();
		setStep("paying");
		const doneTimer = window.setTimeout(() => {
			setStep("done");
			const settleTimer = window.setTimeout(() => {
				setElapsedMs(Date.now() - started);
			}, ENTRY_MS[level]);
			timersRef.current.push(settleTimer);
		}, PROCESS_MS + CHOREO_MS[level]);
		timersRef.current.push(doneTimer);
	}

	function handleReset() {
		clearTimers();
		setStep("cart");
		setElapsedMs(null);
	}

	return (
		<Playground title={copy.title} hint={copy.hint}>
			<PlaygroundChoice
				label={copy.dialLabel}
				options={[
					{ value: "none", label: copy.dialOptions.none },
					{ value: "subtle", label: copy.dialOptions.subtle },
					{ value: "lebay", label: copy.dialOptions.lebay },
				]}
				value={level}
				onSelect={handleSelectLevel}
			/>

			<div className="relative overflow-hidden rounded-lg border border-border bg-background">
				<div className="space-y-3 p-4">
					<p className="text-xs font-medium text-muted-foreground">{copy.orderLabel}</p>
					<ul className="space-y-1.5">
						{copy.items.map((item) => (
							<li key={item.id} className="flex items-baseline justify-between gap-3 text-xs">
								<span>{item.label}</span>
								<span className="font-mono tabular-nums text-muted-foreground">
									{formatIdr(item.price)}
								</span>
							</li>
						))}
					</ul>
					<div className="flex items-baseline justify-between gap-3 border-t border-border pt-2 text-xs font-semibold">
						<span>{copy.totalLabel}</span>
						<span className="font-mono tabular-nums">{formatIdr(total)}</span>
					</div>
					<button
						type="button"
						disabled={step !== "cart"}
						onClick={handlePay}
						className={cn(
							"w-full rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-50 motion-reduce:transition-none",
							PAY_BUTTON[level],
						)}
					>
						{copy.payLabel}
					</button>
				</div>

				<div
					aria-hidden={step !== "paying"}
					className={cn(
						"absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/95 motion-reduce:transition-none motion-reduce:translate-y-0",
						OVERLAY_TRANSITION[level],
						step !== "paying" && OVERLAY_HIDDEN[level],
						step !== "paying" && "pointer-events-none",
					)}
				>
					<span
						className={cn(
							"size-6 rounded-full border-2 border-primary border-t-transparent",
							level !== "none" && "animate-spin motion-reduce:animate-none",
						)}
					/>
					<p className="text-xs font-medium text-muted-foreground">{copy.payingLabel}</p>
				</div>

				<div
					aria-hidden={step !== "done"}
					className={cn(
						"absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-background/95 motion-reduce:transition-none motion-reduce:translate-y-0",
						OVERLAY_TRANSITION[level],
						step !== "done" && OVERLAY_HIDDEN[level],
						step !== "done" && "pointer-events-none",
					)}
				>
					<span
						className={cn(
							"flex size-8 items-center justify-center rounded-full bg-emerald-500/15 text-base text-emerald-700 dark:text-emerald-400",
							step === "done" && level === "lebay" && "animate-bounce motion-reduce:animate-none",
						)}
					>
						✓
					</span>
					<p className="text-sm font-semibold">{copy.doneTitle}</p>
					<p className="text-xs text-muted-foreground">{copy.doneBody}</p>
					{elapsedMs !== null && (
						<p className="mt-1 rounded-md border border-border bg-muted/40 px-2 py-1 font-mono text-[11px] tabular-nums text-muted-foreground">
							{copy.elapsedLabel}: {formatElapsed(elapsedMs)}
						</p>
					)}
					<button
						type="button"
						onClick={handleReset}
						className="mt-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
					>
						{copy.resetLabel}
					</button>
				</div>
			</div>
		</Playground>
	);
}
