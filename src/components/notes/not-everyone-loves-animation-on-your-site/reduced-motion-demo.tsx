import { useRef, useState, useSyncExternalStore } from "react";

import { Playground, PlaygroundChoice, PlaygroundCode } from "@/components/notes/playground";
import type { Lang } from "@/i18n/config";
import { cn } from "@/lib/utils";

type MotionSetting = "normal" | "reduced";

interface Copy {
	title: string;
	hint: string;
	settingLabel: string;
	settingOptions: Record<MotionSetting, string>;
	osNotice: string;
	showLabel: string;
	toastTitle: string;
	toastBody: string;
	codeLabel: string;
}

const COPY: Record<Lang, Copy> = {
	en: {
		title: "What prefers-reduced-motion actually changes",
		hint: "The toggle simulates the OS-level Reduce Motion setting. Fire the toast in both modes: the information always arrives, only the movement is dropped.",
		settingLabel: "Simulated OS setting",
		settingOptions: { normal: "Motion on", reduced: "Reduce Motion" },
		osNotice:
			"Your own system has Reduce Motion turned on, so this demo already runs the calm version.",
		showLabel: "Show notification",
		toastTitle: "Payment received",
		toastBody: "Your tickets are safe.",
		codeLabel: "The CSS the browser applies right now",
	},
	id: {
		title: "Yang benar-benar diubah prefers-reduced-motion",
		hint: "Toggle di bawah mensimulasikan setting Reduce Motion di sistem operasi. Munculkan notifikasinya di kedua mode: informasinya selalu sampai, cuma gerakannya yang dikurangi.",
		settingLabel: "Simulasi setting OS",
		settingOptions: { normal: "Gerakan normal", reduced: "Reduce Motion" },
		osNotice:
			"Sistem kamu sendiri sedang menyalakan Reduce Motion, jadi demo ini otomatis memakai versi kalem.",
		showLabel: "Munculkan notifikasi",
		toastTitle: "Pembayaran diterima",
		toastBody: "Tiket kamu aman.",
		codeLabel: "CSS yang dipakai browser sekarang",
	},
};

const NORMAL_CSS = `.toast {
  transition:
    translate 200ms ease-out,
    opacity 150ms ease-out;
}`;

const REDUCED_CSS = `@media (prefers-reduced-motion: reduce) {
  .toast {
    transition: opacity 150ms ease-out;
    translate: none;
  }
}`;

const ACTIVE_CSS: Record<MotionSetting, string> = {
	normal: NORMAL_CSS,
	reduced: REDUCED_CSS,
};

const TOAST_HIDDEN: Record<MotionSetting, string> = {
	normal: "translate-y-3 opacity-0",
	reduced: "opacity-0",
};

const TOAST_TRANSITION: Record<MotionSetting, string> = {
	normal: "transition-[translate,opacity] duration-200 ease-out",
	reduced: "transition-opacity duration-150 ease-out",
};

function subscribeToMotionPreference(onChange: () => void) {
	const query = window.matchMedia("(prefers-reduced-motion: reduce)");
	query.addEventListener("change", onChange);
	return () => query.removeEventListener("change", onChange);
}

function readMotionPreference() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useOsReducedMotion() {
	return useSyncExternalStore(subscribeToMotionPreference, readMotionPreference, () => false);
}

export function ReducedMotionDemo(props: { lang: Lang }) {
	const [setting, setSetting] = useState<MotionSetting>("normal");
	const [toastVisible, setToastVisible] = useState(false);
	const hideTimerRef = useRef<number | null>(null);
	const replayTimerRef = useRef<number | null>(null);

	const osReduced = useOsReducedMotion();
	const copy = COPY[props.lang];
	const effective: MotionSetting = osReduced ? "reduced" : setting;

	function scheduleHide() {
		hideTimerRef.current = window.setTimeout(() => setToastVisible(false), 2600);
	}

	function handleShowToast() {
		if (hideTimerRef.current !== null) window.clearTimeout(hideTimerRef.current);
		if (replayTimerRef.current !== null) window.clearTimeout(replayTimerRef.current);

		// Re-triggering while visible replays the entrance: exit first, wait for
		// the 200ms exit transition, then enter again.
		if (toastVisible) {
			setToastVisible(false);
			replayTimerRef.current = window.setTimeout(() => {
				setToastVisible(true);
				scheduleHide();
			}, 240);
			return;
		}

		setToastVisible(true);
		scheduleHide();
	}

	return (
		<Playground title={copy.title} hint={copy.hint}>
			<PlaygroundChoice
				label={copy.settingLabel}
				options={[
					{ value: "normal", label: copy.settingOptions.normal },
					{ value: "reduced", label: copy.settingOptions.reduced },
				]}
				value={effective}
				onSelect={setSetting}
			/>

			{osReduced && (
				<p className="rounded-lg border border-primary/40 bg-primary/5 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
					{copy.osNotice}
				</p>
			)}

			<div className="relative h-32 overflow-hidden rounded-lg border border-border bg-background">
				<button
					type="button"
					onClick={handleShowToast}
					className="absolute left-1/2 top-4 -translate-x-1/2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-transform duration-100 active:scale-95 motion-reduce:transition-none"
				>
					{copy.showLabel}
				</button>

				<div
					role="status"
					aria-hidden={!toastVisible}
					className={cn(
						"absolute inset-x-4 bottom-3 rounded-lg border border-border bg-card px-3 py-2 shadow-sm motion-reduce:transition-opacity",
						TOAST_TRANSITION[effective],
						!toastVisible && TOAST_HIDDEN[effective],
						!toastVisible && "motion-reduce:translate-y-0",
					)}
				>
					<p className="text-xs font-semibold">{copy.toastTitle}</p>
					<p className="text-[11px] text-muted-foreground">{copy.toastBody}</p>
				</div>
			</div>

			<PlaygroundCode label={copy.codeLabel}>{ACTIVE_CSS[effective]}</PlaygroundCode>
		</Playground>
	);
}
