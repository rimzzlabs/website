export function levenshtein(source: string, target: string) {
	if (source === target) return 0;
	if (source.length === 0) return target.length;
	if (target.length === 0) return source.length;

	let previous = Array.from({ length: target.length + 1 }, (_, index) => index);

	for (let row = 1; row <= source.length; row += 1) {
		const current = [row];
		for (let column = 1; column <= target.length; column += 1) {
			const cost = source[row - 1] === target[column - 1] ? 0 : 1;
			current[column] = Math.min(
				previous[column] + 1,
				current[column - 1] + 1,
				previous[column - 1] + cost,
			);
		}
		previous = current;
	}

	return previous[target.length];
}
