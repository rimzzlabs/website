import { getCollection } from "astro:content";
import { A, AR, pipe, S } from "@mobily/ts-belt";
import { parsePublishedAt } from "@/lib/datetime";

function getTime(publishedAt: string) {
	return parsePublishedAt(publishedAt).getTime();
}

export function getNotes(lang: "en" | "id" = "en") {
	return pipe(
		AR.make(getCollection("notes")),
		AR.map((res) =>
			pipe(
				res,
				A.filter((note) => note.id.startsWith(lang)),
				A.map((note) => ({
					...note,

					slug: pipe(note.id, S.split("/"), A.getUnsafe(1)),
					url: pipe(
						note.id,
						S.split("/"),
						A.getUnsafe(1),
						S.prepend("/notes/"),
					),
					dateISO: parsePublishedAt(note.data.publishedAt).toISOString(),
				})),
			),
		),
		AR.tapError((error) => {
			console.info("Failed to fetch collections", error);
		}),
		AR.match(
			A.sort(
				(x, y) => getTime(y.data.publishedAt) - getTime(x.data.publishedAt),
			),
			() => [],
		),
	);
}

export type Note = Awaited<ReturnType<typeof getNotes>>[number];
