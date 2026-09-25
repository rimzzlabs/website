import { levenshtein } from "@/lib/levenshtein";

export interface RouteCandidate {
	href: string;
	label: string;
	keys: ReadonlyArray<string>;
}

const MAX_SUGGESTIONS = 3;
const MAX_RELATIVE_DISTANCE = 0.4;
const MIN_PREFIX_LENGTH = 5;
const MIN_CONTAINED_LENGTH = 4;
const CONTAINED_SCORE = 0.1;

export function toRouteKey(value: string) {
	return decodeURIComponent(value)
		.toLowerCase()
		.replace(/\.html?$/, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

function scoreKey(input: string, key: string) {
	const whole = levenshtein(input, key) / Math.max(input.length, key.length);
	if (input.length >= MIN_CONTAINED_LENGTH && key.includes(input)) {
		return Math.min(whole, CONTAINED_SCORE);
	}
	if (input.length < MIN_PREFIX_LENGTH) return whole;

	const prefix = key.slice(0, input.length);
	return Math.min(whole, levenshtein(input, prefix) / input.length);
}

function scoreCandidate(input: string, candidate: RouteCandidate) {
	return Math.min(...candidate.keys.map((key) => scoreKey(input, key)));
}

export function suggestRoutes(
	pathname: string,
	candidates: ReadonlyArray<RouteCandidate>,
) {
	const input = toRouteKey(pathname.split("/").filter(Boolean).at(-1) ?? "");
	if (input.length === 0) return [];

	return candidates
		.map((candidate) => ({
			candidate,
			score: scoreCandidate(input, candidate),
		}))
		.filter((match) => match.score <= MAX_RELATIVE_DISTANCE)
		.sort((a, b) => a.score - b.score)
		.slice(0, MAX_SUGGESTIONS)
		.map((match) => match.candidate);
}
