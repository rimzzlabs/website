import { Button } from "@/components/ui/button";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

type GuestbookChoiceProps = {
	lang: Lang;
	onGithub: () => void;
	onGoogle: () => void;
	onAnonymous: () => void;
};

export function GuestbookChoice(props: GuestbookChoiceProps) {
	const t = getDictionary(props.lang).guestbook;

	return (
		<div className="flex flex-col gap-3 pb-2">
			<Button onClick={props.onGithub}>
				<GithubMark />
				{t.continueGithub}
			</Button>

			<Button variant="outline" onClick={props.onGoogle}>
				<GoogleMark />
				{t.continueGoogle}
			</Button>

			<div className="flex items-center gap-3 text-xs text-muted-foreground">
				<span className="h-px flex-1 bg-border" />
				{t.or}
				<span className="h-px flex-1 bg-border" />
			</div>

			<Button variant="ghost" onClick={props.onAnonymous}>
				{t.postAnon}
			</Button>
		</div>
	);
}

function GithubMark() {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
			<path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-1.98c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.69-1.3-1.69-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.42.36.8 1.08.8 2.18v3.23c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
		</svg>
	);
}

function GoogleMark() {
	return (
		<svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
			<path
				fill="#4285F4"
				d="M23.52 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.87Z"
			/>
			<path
				fill="#34A853"
				d="M12 24c3.24 0 5.96-1.08 7.95-2.91l-3.88-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24Z"
			/>
			<path
				fill="#FBBC05"
				d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z"
			/>
			<path
				fill="#EA4335"
				d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
			/>
		</svg>
	);
}
