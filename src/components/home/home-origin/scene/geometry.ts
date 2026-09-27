import {
	BufferGeometry,
	CatmullRomCurve3,
	Color,
	Float32BufferAttribute,
	Vector3,
} from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// Every part of a plant or house is prepared the same way before merging:
// non-indexed, no UVs, one color, and a "sway" weight for the wind shader.
export function paint(geometry: BufferGeometry, color: string | Color) {
	const prepared = geometry.index ? geometry.toNonIndexed() : geometry;
	prepared.deleteAttribute("uv");
	const tint = typeof color === "string" ? new Color(color) : color;
	const count = prepared.getAttribute("position").count;
	const colors = new Float32Array(count * 3);
	for (let i = 0; i < count; i += 1) tint.toArray(colors, i * 3);
	prepared.setAttribute("color", new Float32BufferAttribute(colors, 3));
	if (!prepared.getAttribute("sway")) {
		prepared.setAttribute(
			"sway",
			new Float32BufferAttribute(new Float32Array(count), 1),
		);
	}
	if (!prepared.getAttribute("normal")) prepared.computeVertexNormals();
	return prepared;
}

export function setSway(
	geometry: BufferGeometry,
	weight: (x: number, y: number, z: number) => number,
) {
	const position = geometry.getAttribute("position");
	const sway = geometry.getAttribute("sway");
	for (let i = 0; i < position.count; i += 1) {
		sway.setX(i, weight(position.getX(i), position.getY(i), position.getZ(i)));
	}
	return geometry;
}

export function merge(parts: ReadonlyArray<BufferGeometry>) {
	// mergeGeometries needs identical attribute sets, so fill in the optional
	// shader attributes with zeros where a part has none.
	for (const part of parts) {
		const count = part.getAttribute("position").count;
		for (const name of ["sway", "glow"]) {
			if (part.getAttribute(name)) continue;
			part.setAttribute(
				name,
				new Float32BufferAttribute(new Float32Array(count), 1),
			);
		}
	}
	const merged = mergeGeometries([...parts]);
	for (const part of parts) part.dispose();
	return merged;
}

export function place(
	geometry: BufferGeometry,
	transform: {
		x?: number;
		y?: number;
		z?: number;
		rx?: number;
		ry?: number;
		rz?: number;
		s?: number;
	},
) {
	geometry.rotateZ(transform.rz ?? 0);
	geometry.rotateX(transform.rx ?? 0);
	geometry.rotateY(transform.ry ?? 0);
	geometry.scale(transform.s ?? 1, transform.s ?? 1, transform.s ?? 1);
	geometry.translate(transform.x ?? 0, transform.y ?? 0, transform.z ?? 0);
	return geometry;
}

interface LeafOptions {
	length: number;
	width: number;
	lift: number;
	droop: number;
	color: string;
	tip?: string;
	segments?: number;
}

// A folded leaf strip along +X: a raised midrib with two blades, curving up
// by "lift" and falling by "droop". Sway grows from base to tip.
export function createLeaf(options: LeafOptions) {
	const segments = options.segments ?? 8;
	const base = new Color(options.color);
	const tip = new Color(options.tip ?? options.color);
	const positions: Array<number> = [];
	const colors: Array<number> = [];
	const sway: Array<number> = [];

	const row = (s: number) => {
		const x = s * options.length;
		const y = options.lift * s - options.droop * s * s;
		const half =
			options.width * Math.sin(Math.PI * Math.min(1, s * 1.08 + 0.02));
		return [
			[x, y - half * 0.25, -half],
			[x, y + half * 0.2, 0],
			[x, y - half * 0.25, half],
		];
	};

	for (let i = 0; i < segments; i += 1) {
		const s0 = i / segments;
		const s1 = (i + 1) / segments;
		const [l0, m0, r0] = row(s0);
		const [l1, m1, r1] = row(s1);
		const triangles = [l0, m0, l1, m0, m1, l1, m0, r0, m1, r0, r1, m1];
		for (const vertex of triangles) {
			positions.push(vertex[0], vertex[1], vertex[2]);
			const s = vertex[0] / options.length;
			const tint = base.clone().lerp(tip, s);
			colors.push(tint.r, tint.g, tint.b);
			sway.push(s);
		}
	}

	const geometry = new BufferGeometry();
	geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
	geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
	geometry.setAttribute("sway", new Float32BufferAttribute(sway, 1));
	geometry.computeVertexNormals();
	return geometry;
}

interface FoliageOptions {
	center: [number, number, number];
	radius: number;
	leaves: number;
	leafSize: number;
	colors: ReadonlyArray<string>;
	random: () => number;
	flatten?: number;
	// Share of leaves that hang down and outward, like mango leaves.
	hang?: number;
	// Leaf width as a share of its length.
	aspect?: number;
}

// A foliage cluster: many small diamond leaves scattered through a sphere.
// Every leaf takes the normal of the sphere at its position, so the cluster
// shades like one soft, leafy volume instead of a pile of flat cards.
export function createFoliage(options: FoliageOptions) {
	const random = options.random;
	const flatten = options.flatten ?? 1;
	const positions: Array<number> = [];
	const normals: Array<number> = [];
	const colors: Array<number> = [];
	const palette = options.colors.map((color) => new Color(color));

	// Plain loop: a tree has a few hundred leaves, each needing six vertices.
	for (let i = 0; i < options.leaves; i += 1) {
		const theta = random() * Math.PI * 2;
		const phi = Math.acos(2 * random() - 1);
		const reach = options.radius * (0.55 + 0.45 * Math.sqrt(random()));
		const out = [
			Math.sin(phi) * Math.cos(theta),
			Math.cos(phi),
			Math.sin(phi) * Math.sin(theta),
		];
		const center = [
			options.center[0] + out[0] * reach,
			options.center[1] + out[1] * reach * flatten,
			options.center[2] + out[2] * reach,
		];

		// Two axes in the leaf's plane: random, or hanging down and outward.
		const hangs = random() < (options.hang ?? 0);
		const turn = hangs
			? Math.atan2(out[2], out[0]) + (random() - 0.5) * 0.9
			: random() * Math.PI * 2;
		const tilt = hangs ? Math.PI * (0.6 + random() * 0.15) : random() * Math.PI;
		const along = [
			Math.cos(turn) * Math.sin(tilt),
			Math.cos(tilt),
			Math.sin(turn) * Math.sin(tilt),
		];
		const across = [-Math.sin(turn), 0, Math.cos(turn)];
		const length = options.leafSize * (0.7 + random() * 0.6);
		const width = length * (options.aspect ?? 0.45);

		const corner = (a: number, b: number) => [
			center[0] + along[0] * a + across[0] * b,
			center[1] + along[1] * a + across[1] * b,
			center[2] + along[2] * a + across[2] * b,
		];
		const tip = corner(length, 0);
		const base = corner(-length, 0);
		const left = corner(0, -width);
		const right = corner(0, width);

		const normal = [out[0], out[1] + 0.25, out[2]];
		const size = Math.hypot(normal[0], normal[1], normal[2]);
		const tint = palette[Math.floor(random() * palette.length)]
			.clone()
			.multiplyScalar(0.9 + random() * 0.2);

		for (const vertex of [tip, left, base, tip, base, right]) {
			positions.push(vertex[0], vertex[1], vertex[2]);
			normals.push(normal[0] / size, normal[1] / size, normal[2] / size);
			colors.push(tint.r, tint.g, tint.b);
		}
	}

	const geometry = new BufferGeometry();
	geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
	geometry.setAttribute("normal", new Float32BufferAttribute(normals, 3));
	geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
	return geometry;
}

interface BranchOptions {
	points: ReadonlyArray<[number, number, number]>;
	radius: [number, number];
	color: string;
	segments?: number;
	sides?: number;
}

function branchCurve(points: BranchOptions["points"]) {
	return new CatmullRomCurve3(points.map((point) => new Vector3(...point)));
}

// Where the top of a branch is at "t" (0 at its base, 1 at its tip).
export function branchTop(
	options: Pick<BranchOptions, "points" | "radius">,
	t: number,
) {
	const radius =
		options.radius[0] + (options.radius[1] - options.radius[0]) * t;
	return branchCurve(options.points)
		.getPointAt(t)
		.add(new Vector3(0, radius, 0));
}

// A natural branch: a tube that follows a curve through the given points and
// tapers from base to tip. Bark streaks run along it in two browns.
export function createBranch(options: BranchOptions) {
	const segments = options.segments ?? 14;
	const sides = options.sides ?? 7;
	const curve = branchCurve(options.points);
	const frames = curve.computeFrenetFrames(segments, false);
	const bark = new Color(options.color);
	const streak = bark.clone().multiplyScalar(0.72);

	const positions: Array<number> = [];
	const colors: Array<number> = [];
	const indices: Array<number> = [];
	for (let i = 0; i <= segments; i += 1) {
		const t = i / segments;
		const center = curve.getPointAt(t);
		const radius =
			options.radius[0] + (options.radius[1] - options.radius[0]) * t;
		for (let j = 0; j <= sides; j += 1) {
			const angle = (j / sides) * Math.PI * 2;
			const offset = frames.normals[i]
				.clone()
				.multiplyScalar(Math.cos(angle))
				.add(frames.binormals[i].clone().multiplyScalar(Math.sin(angle)))
				.multiplyScalar(radius);
			positions.push(
				center.x + offset.x,
				center.y + offset.y,
				center.z + offset.z,
			);
			const tint = Math.sin(angle * 3 + t * 9) > 0.55 ? streak : bark;
			colors.push(tint.r, tint.g, tint.b);
		}
	}
	for (let i = 0; i < segments; i += 1) {
		for (let j = 0; j < sides; j += 1) {
			const a = i * (sides + 1) + j;
			const b = a + sides + 1;
			indices.push(a, b, a + 1, b, b + 1, a + 1);
		}
	}

	const geometry = new BufferGeometry();
	geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
	geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
	geometry.setIndex(indices);
	geometry.computeVertexNormals();
	const branch = geometry.toNonIndexed();
	branch.setAttribute(
		"sway",
		new Float32BufferAttribute(
			new Float32Array(branch.getAttribute("position").count),
			1,
		),
	);
	return branch;
}
