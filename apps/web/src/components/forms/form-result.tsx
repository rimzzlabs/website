import { CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import { useEffect, useRef } from "react";

export type FormResultStatus = "success" | "error";

interface FormResultProps {
	status: FormResultStatus;
	title: string;
	body: string;
	primaryAction: React.ReactNode;
	secondaryAction?: React.ReactNode;
	actionTransitionName: string;
	actionsClassName?: string;
	className?: string;
}

const ICONS: Record<FormResultStatus, React.ReactNode> = {
	success: (
		<CheckCircleIcon
			aria-hidden="true"
			weight="duotone"
			className="size-10 text-primary"
		/>
	),
	error: (
		<WarningCircleIcon
			aria-hidden="true"
			weight="duotone"
			className="size-10 text-destructive"
		/>
	),
};

const ROLES: Record<FormResultStatus, "status" | "alert"> = {
	success: "status",
	error: "alert",
};

export function FormResult(props: FormResultProps) {
	const titleRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		titleRef.current?.focus();
	}, []);

	return (
		<div className={cn("flex flex-1 flex-col gap-6", props.className)}>
			<div
				role={ROLES[props.status]}
				className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center"
			>
				{ICONS[props.status]}
				<p
					ref={titleRef}
					tabIndex={-1}
					className="font-serif text-lg font-semibold outline-none"
				>
					{props.title}
				</p>
				<p className="max-w-sm text-sm text-pretty text-muted-foreground">
					{props.body}
				</p>
			</div>

			<div className={cn("flex justify-center gap-2", props.actionsClassName)}>
				<div
					className="inline-flex flex-col"
					style={{
						viewTransitionName: props.actionTransitionName,
						viewTransitionClass: "form",
					}}
				>
					{props.primaryAction}
				</div>
				{props.secondaryAction}
			</div>
		</div>
	);
}
