interface Sized {
	thumb: { width: number; height: number };
}

export interface MasonryEntry<T> {
	item: T;
	index: number;
}

export interface MasonryColumn<T> {
	key: string;
	entries: Array<MasonryEntry<T>>;
}

function relativeHeight(item: Sized) {
	return item.thumb.height / item.thumb.width;
}

function fillColumns<T extends Sized>(
	entries: ReadonlyArray<MasonryEntry<T>>,
	limit: number,
) {
	const columns: Array<Array<MasonryEntry<T>>> = [[]];
	let height = 0;

	for (const entry of entries) {
		const entryHeight = relativeHeight(entry.item);
		const current = columns[columns.length - 1];
		if (current.length > 0 && height + entryHeight > limit) {
			columns.push([entry]);
			height = entryHeight;
		} else {
			current.push(entry);
			height += entryHeight;
		}
	}

	return columns;
}

export function toMasonryColumns<T extends Sized>(
	items: ReadonlyArray<T>,
	count: number,
): Array<MasonryColumn<T>> {
	const entries = items.map((item, index) => ({ item, index }));
	const heights = entries.map((entry) => relativeHeight(entry.item));

	const limits = heights
		.flatMap((_, start) =>
			heights
				.slice(start)
				.map((__, length) =>
					heights
						.slice(start, start + length + 1)
						.reduce((sum, height) => sum + height, 0),
				),
		)
		.sort((a, b) => a - b);

	const limit =
		limits.find(
			(candidate) => fillColumns(entries, candidate).length <= count,
		) ?? Number.POSITIVE_INFINITY;

	const columns = fillColumns(entries, limit);
	return Array.from({ length: count }, (_, index) => ({
		key: `column-${index}`,
		entries: columns[index] ?? [],
	}));
}
