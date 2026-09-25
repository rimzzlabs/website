import { ArrowRightIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import { type RouteCandidate, suggestRoutes } from "@/lib/suggest-route";

interface NotFoundSuggestionsProps {
	candidates: ReadonlyArray<RouteCandidate>;
}

export function NotFoundSuggestions(props: NotFoundSuggestionsProps) {
	const [suggestions, setSuggestions] = useState<Array<RouteCandidate>>([]);

	useEffect(() => {
		setSuggestions(suggestRoutes(window.location.pathname, props.candidates));
	}, [props.candidates]);

	if (suggestions.length === 0) return null;

	return (
		<section aria-labelledby="did-you-mean" className="pt-10">
			<h2
				id="did-you-mean"
				className="pb-3 font-mono text-xs text-muted-foreground"
			>
				Did you mean
			</h2>
			<ul>
				{suggestions.map((suggestion) => (
					<li
						key={suggestion.href}
						className="group/suggestion relative border-b py-3 transition first-of-type:border-t hover:bg-muted-foreground/2"
					>
						<a
							href={suggestion.href}
							className="inline-flex items-center gap-1.5 font-serif text-[1.05em] font-medium after:absolute after:inset-0"
						>
							{suggestion.label}
							<ArrowRightIcon
								aria-hidden="true"
								className="size-4 text-muted-foreground transition group-hover/suggestion:translate-x-0.5"
							/>
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
