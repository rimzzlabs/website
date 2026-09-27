// Seeded PRNG (mulberry32), so the scene is laid out the same on every load.
export function createRandom(seed: number) {
	let state = seed >>> 0;
	return function random() {
		state = (state + 0x6d2b79f5) >>> 0;
		let t = state;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

export type Random = ReturnType<typeof createRandom>;

export function between(random: Random, range: [number, number]) {
	return range[0] + random() * (range[1] - range[0]);
}

export function pick<T>(random: Random, list: ReadonlyArray<T>) {
	return list[Math.floor(random() * list.length)];
}
