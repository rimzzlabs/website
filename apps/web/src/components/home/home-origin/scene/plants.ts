import { CircleGeometry, Color, CylinderGeometry, PlaneGeometry } from "three";

import {
	branchTop,
	createBranch,
	createFoliage,
	createLeaf,
	merge,
	paint,
	place,
	setSway,
} from "./geometry";
import { PALETTE } from "./palette";
import { createRandom } from "./random";

// All plants are built one unit tall, standing on the origin. The scene
// scales them per instance.

// Where a point on a leaf's curve lands, for a leaf built by createLeaf with
// the same length, lift, and droop.
function leafPoint(
	leaf: { length: number; lift: number; droop: number },
	s: number,
) {
	return { x: s * leaf.length, y: leaf.lift * s - leaf.droop * s * s };
}

// A coconut palm frond: an arching midrib with narrow leaflets fanning out
// from both sides, which is what makes it look like coconut, not oil palm.
function createFrond(tint: string) {
	const frond = { length: 0.5, lift: 0.34, droop: 0.62 };
	const midrib = createLeaf({
		...frond,
		width: 0.008,
		color: PALETTE.coconutTrunk,
		tip: tint,
		segments: 8,
	});
	const leaflets = Array.from({ length: 10 }, (_, i) => {
		const s = 0.12 + (i / 10) * 0.84;
		const point = leafPoint(frond, s);
		const reach = 0.2 * (1 - s * 0.5);
		return [1, -1].map((side) =>
			place(
				createLeaf({
					length: reach,
					width: 0.013,
					lift: 0.02,
					droop: 0.07,
					color: PALETTE.frond,
					tip: tint,
					segments: 2,
				}),
				// Leaflets reach out and slightly up from the midrib, so the frond
				// reads as a stiff feather, not a weeping willow.
				{ rz: 0.12, ry: side * (Math.PI / 2 - 0.55), x: point.x, y: point.y },
			),
		);
	});
	return merge([midrib, ...leaflets.flat()]);
}

// Tall, slender, and curved, with a round crown of drooping fronds.
export function createCoconutGeometry() {
	const trunk = paint(
		new CylinderGeometry(0.014, 0.024, 1, 6, 14, true),
		PALETTE.coconutTrunk,
	);
	trunk.translate(0, 0.5, 0);
	const position = trunk.getAttribute("position");
	const colors = trunk.getAttribute("color");
	const ring = new Color(PALETTE.coconutTrunk).multiplyScalar(0.8);
	for (let i = 0; i < position.count; i += 1) {
		const y = position.getY(i);
		position.setX(i, position.getX(i) + 0.2 * y * y);
		if (Math.floor(y * 22) % 2 === 0) colors.setXYZ(i, ring.r, ring.g, ring.b);
	}
	trunk.computeVertexNormals();

	const fronds = Array.from({ length: 12 }, (_, i) =>
		place(createFrond(i % 2 === 0 ? PALETTE.frondLight : PALETTE.frond), {
			rz: i % 3 === 0 ? 0.25 : 0,
			ry: (i / 12) * Math.PI * 2 + (i % 4) * 0.12,
			x: 0.2,
			y: 0.99,
		}),
	);

	const palm = merge([trunk, ...fronds]);
	return setSway(palm, (x, y, z) => {
		if (y < 0.9) return y * y * 0.1;
		return 0.1 + Math.min(1, Math.hypot(x - 0.2, z) / 0.4) * 0.9;
	});
}

type Point = [number, number, number];

interface TreeShape {
	trunk: Point;
	branches: ReadonlyArray<Point>;
	crowns: ReadonlyArray<{ at: Point; radius: number }>;
	flatten: number;
	seed: number;
}

// Broadleaf trees for the tree line, each a trunk that splits into branches
// with a leafy crown at every branch end. "round" is a common shade tree,
// "wide" a spreading rain tree, and "tall" the lanky kind from photo 2.
const TREE_SHAPES: Record<"round" | "wide" | "tall", TreeShape> = {
	round: {
		trunk: [0.02, 0.45, 0],
		branches: [
			[-0.17, 0.66, 0.04],
			[0.19, 0.64, -0.05],
			[0.03, 0.78, 0.12],
			[0.04, 0.8, -0.12],
		],
		crowns: [
			{ at: [-0.18, 0.7, 0.04], radius: 0.2 },
			{ at: [0.2, 0.68, -0.05], radius: 0.21 },
			{ at: [0.03, 0.86, 0.08], radius: 0.22 },
			{ at: [0.03, 0.84, -0.12], radius: 0.19 },
			{ at: [0, 0.68, 0.18], radius: 0.17 },
		],
		flatten: 0.85,
		seed: 11,
	},
	wide: {
		trunk: [0, 0.36, 0],
		branches: [
			[-0.36, 0.56, 0.05],
			[0.38, 0.55, -0.04],
			[-0.1, 0.62, -0.2],
			[0.12, 0.64, 0.18],
		],
		crowns: [
			{ at: [-0.36, 0.6, 0.05], radius: 0.22 },
			{ at: [0.38, 0.6, -0.04], radius: 0.22 },
			{ at: [-0.1, 0.68, -0.2], radius: 0.2 },
			{ at: [0.12, 0.7, 0.18], radius: 0.2 },
			{ at: [0.01, 0.72, 0], radius: 0.24 },
		],
		flatten: 0.6,
		seed: 23,
	},
	tall: {
		trunk: [0.04, 0.72, 0],
		branches: [
			[-0.2, 0.86, 0.03],
			[0.24, 0.84, -0.02],
			[0.05, 0.96, 0],
		],
		crowns: [
			{ at: [-0.2, 0.88, 0.03], radius: 0.13 },
			{ at: [0.25, 0.86, -0.02], radius: 0.14 },
			{ at: [0.05, 0.98, 0], radius: 0.13 },
		],
		flatten: 0.7,
		seed: 37,
	},
};

export function createTreeGeometry(variant: "round" | "wide" | "tall") {
	const shape = TREE_SHAPES[variant];
	const random = createRandom(shape.seed);
	const top = shape.trunk;
	const trunk = createBranch({
		points: [[0, 0, 0], [top[0] - 0.02, top[1] * 0.5, top[2] + 0.01], top],
		radius: [0.042, 0.026],
		color: PALETTE.treeTrunk,
		segments: 6,
		sides: 6,
	});
	// Each branch bows outward on its way up instead of running straight.
	const branches = shape.branches.map((end) =>
		createBranch({
			points: [
				top,
				[
					top[0] + (end[0] - top[0]) * 0.6,
					top[1] + (end[1] - top[1]) * 0.35,
					top[2] + (end[2] - top[2]) * 0.6,
				],
				end,
			],
			radius: [0.022, 0.009],
			color: PALETTE.treeTrunk,
			segments: 5,
			sides: 5,
		}),
	);
	const crowns = shape.crowns.map((crown) =>
		createFoliage({
			center: crown.at,
			radius: crown.radius,
			leaves: Math.round(crown.radius * 520),
			leafSize: 0.045,
			colors: PALETTE.canopy,
			random,
			flatten: shape.flatten,
		}),
	);
	const tree = merge([trunk, ...branches, ...crowns]);
	return setSway(tree, (_x, y) => Math.max(0, y - shape.trunk[1]) * 0.3);
}

// The owl's perch: a limb that leaves the trunk low, dips, then rises toward
// the camera in a gentle S-curve, like a real branch rather than a stick.
const PERCH_BRANCH = {
	points: [
		[0.02, 0.27, 0.02],
		[0.11, 0.3, 0.09],
		[0.22, 0.3, 0.18],
		[0.34, 0.31, 0.27],
		[0.45, 0.35, 0.33],
		[0.53, 0.42, 0.36],
	] as Array<Point>,
	radius: [0.032, 0.008] as [number, number],
};

// Where the owl stands: on top of the perch, a little past halfway out.
export function mangoPerchTop() {
	return branchTop(PERCH_BRANCH, 0.55);
}

// The squirrel's route through the mango tree, in the tree's own units: the
// front of the trunk at the ground, the fork, and the first left limb.
export const MANGO_SQUIRREL_STOPS = {
	treeBase: [0, 0.01, 0.1] as Point,
	treeTop: [0.02, 0.34, 0.08] as Point,
	limb: [-0.19, 0.55, 0.01] as Point,
};

export const MANGO_PERCH_RADIUS = 0.032 + (0.008 - 0.032) * 0.55;

interface Limb {
	angle: number;
	reach: number;
	rise: number;
	bend: number;
}

// Five main limbs, fanned around the trunk. Each one bends out and up, and
// splits into two twigs; a leaf cluster sits at every tip.
const MANGO_LIMBS: ReadonlyArray<Limb> = [
	{ angle: -2.7, reach: 0.4, rise: 0.66, bend: 0.06 },
	{ angle: -1.55, reach: 0.34, rise: 0.74, bend: -0.05 },
	{ angle: -0.35, reach: 0.42, rise: 0.64, bend: 0.07 },
	{ angle: 0.95, reach: 0.36, rise: 0.72, bend: -0.06 },
	{ angle: 2.05, reach: 0.4, rise: 0.66, bend: 0.05 },
];

// A mango tree: a stout, slightly leaning trunk with flared roots, forking
// into curved limbs and twigs under a wide dome of long drooping leaves.
// Fresh leaves at the tips are a brighter lime, as in the photo.
export function createMangoGeometry() {
	const random = createRandom(83);
	const bark = PALETTE.treeTrunk;
	const fork: Point = [0.03, 0.38, -0.01];

	const trunk = createBranch({
		points: [[0, -0.02, 0], [0.025, 0.12, 0.01], [0.005, 0.26, -0.01], fork],
		radius: [0.07, 0.048],
		color: bark,
	});
	const roots = [0.4, 2.3, 4.2].map((angle) =>
		createBranch({
			points: [
				[0, 0.08, 0],
				[Math.cos(angle) * 0.07, 0.03, Math.sin(angle) * 0.07],
				[Math.cos(angle) * 0.13, -0.01, Math.sin(angle) * 0.13],
			],
			radius: [0.04, 0.008],
			color: bark,
			segments: 6,
		}),
	);

	const limbs: Array<ReturnType<typeof createBranch>> = [];
	const crowns: Array<{ at: Point; radius: number }> = [];
	for (const limb of MANGO_LIMBS) {
		const out = [Math.cos(limb.angle), Math.sin(limb.angle)];
		const side = [-out[1], out[0]];
		const along = (distance: number, height: number, sway: number): Point => [
			fork[0] + out[0] * distance + side[0] * sway,
			height,
			fork[2] + out[1] * distance + side[1] * sway,
		];
		const tip = along(limb.reach, limb.rise, limb.bend);
		const elbow = along(limb.reach * 0.55, limb.rise * 0.78, -limb.bend);
		limbs.push(
			createBranch({
				points: [
					fork,
					along(limb.reach * 0.2, fork[1] + 0.1, limb.bend * 0.5),
					elbow,
					tip,
				],
				radius: [0.034, 0.012],
				color: bark,
			}),
		);
		const twigs: Array<Point> = [
			along(limb.reach * 1.1, limb.rise + 0.12, limb.bend + 0.15),
			along(limb.reach * 1.05, limb.rise + 0.02, limb.bend - 0.16),
		];
		for (const twig of twigs) {
			limbs.push(
				createBranch({
					points: [
						elbow,
						[
							(elbow[0] + twig[0]) / 2,
							(elbow[1] + twig[1]) / 2 + 0.04,
							(elbow[2] + twig[2]) / 2,
						],
						twig,
					],
					radius: [0.014, 0.004],
					color: bark,
					segments: 8,
					sides: 5,
				}),
			);
			crowns.push({ at: twig, radius: 0.13 + random() * 0.04 });
		}
		crowns.push({ at: tip, radius: 0.17 });
	}
	crowns.push(
		{ at: [0.02, 0.98, 0], radius: 0.2 },
		{ at: [-0.1, 0.9, 0.12], radius: 0.16 },
		{ at: [0.12, 0.9, -0.12], radius: 0.16 },
	);

	const perch = createBranch({ ...PERCH_BRANCH, color: bark });
	const perchTwig = createBranch({
		points: [PERCH_BRANCH.points[4], [0.5, 0.44, 0.3], [0.55, 0.5, 0.26]],
		radius: [0.008, 0.003],
		color: bark,
		segments: 6,
		sides: 5,
	});
	crowns.push({ at: [0.56, 0.52, 0.25], radius: 0.07 });

	const leaves = crowns.map((crown) =>
		createFoliage({
			center: crown.at,
			radius: crown.radius,
			leaves: Math.round(crown.radius * 620),
			leafSize: 0.07,
			aspect: 0.2,
			hang: 0.72,
			colors: PALETTE.mangoLeaves,
			random,
			flatten: 0.8,
		}),
	);

	const tree = merge([trunk, ...roots, ...limbs, perch, perchTwig, ...leaves]);
	// Only the crown moves; the trunk and the owl's perch stay still.
	return setSway(tree, (_x, y) => Math.max(0, y - 0.6) * 0.35);
}

export function createBananaGeometry() {
	const stem = paint(
		new CylinderGeometry(0.045, 0.07, 0.5, 6, 1, true),
		PALETTE.banana,
	);
	stem.translate(0, 0.25, 0);

	const leaves = Array.from({ length: 6 }, (_, i) =>
		place(
			createLeaf({
				length: 0.62,
				width: 0.15,
				lift: 0.62,
				droop: 0.8,
				color: PALETTE.banana,
				tip: PALETTE.bananaLight,
				segments: 10,
			}),
			{ ry: (i / 6) * Math.PI * 2 + 0.4, y: 0.44 },
		),
	);

	return merge([stem, ...leaves]);
}

// A leafy shrub: a few foliage clusters close to the ground. Leaves are pale
// greys, so each instance takes its color from the scene.
export function createBushGeometry() {
	const random = createRandom(51);
	const shades = ["#ffffff", "#e6ebe2", "#cfd8cc"];
	const clusters: ReadonlyArray<{ at: Point; radius: number }> = [
		{ at: [0, 0.5, 0], radius: 0.5 },
		{ at: [-0.45, 0.36, 0.08], radius: 0.38 },
		{ at: [0.44, 0.38, -0.06], radius: 0.4 },
	];
	const bush = merge(
		clusters.map((cluster) =>
			createFoliage({
				center: cluster.at,
				radius: cluster.radius,
				leaves: Math.round(cluster.radius * 170),
				leafSize: 0.12,
				colors: shades,
				random,
				flatten: 0.8,
			}),
		),
	);
	return setSway(bush, (_x, y) => y * 0.15);
}

// A rice clump: thin leaves fanning up from one root, and golden panicles
// whose stems arch over so the grains hang down. That hanging head is what
// tells rice apart from wheat.
export function createRiceClumpGeometry(panicles: number) {
	const leaves = Array.from({ length: 12 }, (_, i) =>
		place(
			createLeaf({
				length: 0.75 + (i % 4) * 0.07,
				width: 0.013,
				lift: 0.05,
				droop: 0.18 + (i % 3) * 0.08,
				color: PALETTE.riceDeep,
				tip: i % 2 === 0 ? PALETTE.rice : PALETTE.riceGreen,
				segments: 4,
			}),
			{ rz: 1.05 + (i % 5) * 0.09, ry: (i / 12) * Math.PI * 2 },
		),
	);

	const heads = Array.from({ length: panicles }, (_, i) => {
		const stem = { length: 0.55, lift: 2.7, droop: 2.2 };
		const turn = 0.6 + (i / Math.max(1, panicles)) * Math.PI * 2;
		const grains = Array.from({ length: 12 }, (_, g) => {
			const s = 0.6 + (g / 12) * 0.4;
			const point = leafPoint(stem, s);
			return place(
				createLeaf({
					length: 0.045,
					width: 0.014,
					lift: 0,
					droop: 0,
					color: PALETTE.panicle,
					tip: PALETTE.riceGoldDeep,
					segments: 2,
				}),
				{
					rz: -Math.PI / 2 + (g % 2 === 0 ? 0.35 : -0.35),
					x: point.x,
					y: point.y,
				},
			);
		});
		const body = merge([
			createLeaf({
				...stem,
				width: 0.006,
				color: PALETTE.rice,
				tip: PALETTE.panicle,
				segments: 8,
			}),
			...grains,
		]);
		// Tilt the stem up first, then turn it around the clump.
		return place(body, { rz: 0.35, ry: turn });
	});

	const clump = merge([...leaves, ...heads]);
	return setSway(clump, (_x, y) => Math.max(0, y) ** 1.3);
}

// A small young rice tuft for the nearer paddies: leaves only.
export function createRiceTuftGeometry() {
	const leaves = Array.from({ length: 7 }, (_, i) =>
		place(
			createLeaf({
				length: 0.9,
				width: 0.02,
				lift: 0.1,
				droop: 0.3,
				color: PALETTE.riceDeep,
				tip: PALETTE.rice,
				segments: 3,
			}),
			{ rz: 1.0 + (i % 3) * 0.15, ry: (i / 7) * Math.PI * 2 },
		),
	);
	return setSway(merge(leaves), (_x, y) => Math.max(0, y));
}

// Flat flowers facing the camera: five petals around a yellow center.
export function createFlowerGeometry(color: string) {
	const petals = Array.from({ length: 5 }, (_, i) => {
		const angle = (i / 5) * Math.PI * 2;
		const petal = paint(new CircleGeometry(0.07, 10), color);
		petal.scale(1, 0.55, 1);
		petal.translate(0.07, 0, 0);
		petal.rotateZ(angle);
		return petal;
	});
	const center = paint(new CircleGeometry(0.035, 10), PALETTE.flowerCenter);
	center.translate(0, 0, 0.004);
	const stem = paint(new PlaneGeometry(0.012, 1), PALETTE.stalk);
	stem.translate(0, -0.5, -0.002);

	const flower = merge([...petals, center, stem]);
	flower.translate(0, 1, 0);
	return setSway(flower, (_x, y) => Math.max(0, y) ** 1.4);
}
