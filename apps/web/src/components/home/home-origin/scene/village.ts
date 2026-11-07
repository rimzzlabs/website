import {
	BoxGeometry,
	BufferGeometry,
	CatmullRomCurve3,
	Color,
	CylinderGeometry,
	Float32BufferAttribute,
	PlaneGeometry,
	Vector3,
} from "three";

import { createLeaf, merge, paint, place, setSway } from "./geometry";
import { PALETTE } from "./palette";

function triangles(points: ReadonlyArray<Point>, color: string) {
	const geometry = new BufferGeometry();
	geometry.setAttribute(
		"position",
		new Float32BufferAttribute(points.flat(), 3),
	);
	return paint(geometry, color);
}

type Point = [number, number, number];

function box(params: {
	size: Point;
	at: Point;
	color: string;
	glow?: boolean;
}) {
	const geometry = paint(new BoxGeometry(...params.size), params.color);
	geometry.translate(...params.at);
	if (params.glow) {
		const count = geometry.getAttribute("position").count;
		geometry.setAttribute(
			"glow",
			new Float32BufferAttribute(new Float32Array(count).fill(1), 1),
		);
	}
	return geometry;
}

// A hip roof over a length x depth footprint: two trapezoids and two
// triangles meeting at a ridge.
function hipRoof(params: {
	length: number;
	depth: number;
	eave: number;
	peak: number;
	ridge: number;
	z: number;
}) {
	const halfL = params.length / 2;
	const halfD = params.depth / 2;
	const halfR = params.ridge / 2;
	const z = params.z;
	const e = params.eave;
	const p = params.peak;
	const front: Array<Point> = [
		[-halfL, e, z + halfD],
		[halfL, e, z + halfD],
		[halfR, p, z],
		[-halfL, e, z + halfD],
		[halfR, p, z],
		[-halfR, p, z],
	];
	const back = front
		.map((point): Point => [point[0], point[1], 2 * z - point[2]])
		.toReversed();
	const sides: Array<Point> = [
		[halfL, e, z + halfD],
		[halfL, e, z - halfD],
		[halfR, p, z],
		[-halfL, e, z - halfD],
		[-halfL, e, z + halfD],
		[-halfR, p, z],
	];
	return triangles([...front, ...back, ...sides], PALETTE.schoolRoof);
}

// One classroom block: white walls over a mint dado, a porch with red
// pillars, dark barred windows, and a red-brown hip roof.
function classroomBlock(length: number) {
	const depth = 2.2;
	const wall = 1.3;
	const parts = [
		box({
			size: [length, wall, depth],
			at: [0, wall / 2, 0],
			color: PALETTE.schoolWall,
		}),
		box({
			size: [length + 0.02, 0.5, depth + 0.02],
			at: [0, 0.25, 0],
			color: PALETTE.schoolDado,
		}),
		box({
			size: [length + 0.3, 0.1, 0.9],
			at: [0, 0.05, depth / 2 + 0.45],
			color: PALETTE.wallShade,
		}),
		hipRoof({
			length: length + 0.9,
			depth: depth + 1.7,
			eave: wall + 0.05,
			peak: wall + 1.05,
			ridge: length * 0.55,
			z: 0.35,
		}),
	];
	const bays = Math.round(length / 1.15);
	for (let i = 0; i <= bays; i += 1) {
		const x = -length / 2 + (i / bays) * length;
		parts.push(
			box({
				size: [0.13, wall + 0.05, 0.13],
				at: [x, (wall + 0.05) / 2, depth / 2 + 0.8],
				color: PALETTE.schoolPillar,
			}),
		);
		parts.push(
			box({
				size: [0.12, wall, 0.04],
				at: [x, wall / 2, depth / 2 + 0.01],
				color: PALETTE.schoolPillar,
			}),
		);
		if (i === bays) continue;
		const middle = x + length / bays / 2;
		const isDoor = i % 3 === 1;
		parts.push(
			box({
				size: isDoor ? [0.42, 0.9, 0.04] : [0.62, 0.42, 0.04],
				at: [middle, isDoor ? 0.45 : 0.82, depth / 2 + 0.02],
				color: PALETTE.schoolWindow,
				glow: !isDoor,
			}),
		);
	}
	return merge(parts);
}

// The light blue fence in front of the school, with the dark name panel and
// the navy leaves painted on it.
function schoolFence() {
	const parts = [
		box({ size: [5.2, 0.75, 0.16], at: [0, 0.375, 0], color: PALETTE.fence }),
		box({
			size: [5.24, 0.22, 0.2],
			at: [0, 0.11, 0],
			color: PALETTE.fencePanel,
		}),
		box({
			size: [1.3, 0.5, 0.04],
			at: [-1.6, 0.46, 0.09],
			color: PALETTE.fencePanel,
		}),
		box({
			size: [0.24, 1.05, 0.24],
			at: [-2.62, 0.52, 0],
			color: PALETTE.schoolPillar,
		}),
	];
	const leaves = [
		[0.2, 0.3, 0.7],
		[0.55, 0.42, 0.3],
		[0.9, 0.3, 0.9],
		[1.3, 0.45, 0.4],
		[1.7, 0.32, 0.8],
		[2.1, 0.44, 0.35],
		[2.4, 0.3, 1.0],
	].map((leaf) =>
		place(
			createLeaf({
				length: 0.34,
				width: 0.07,
				lift: 0.05,
				droop: 0.08,
				color: PALETTE.fenceLeaf,
				segments: 4,
			}),
			{ rx: Math.PI / 2, rz: leaf[2], x: leaf[0], y: leaf[1], z: 0.09 },
		),
	);
	return merge([...parts, ...leaves]);
}

export function createSchoolGeometry() {
	const front = classroomBlock(7);
	const wing = place(classroomBlock(4.6), {
		ry: -Math.PI / 2,
		x: 5.6,
		z: -2.4,
	});
	const fence = place(schoolFence(), { x: -0.6, z: 3.1 });
	const pole = paint(new CylinderGeometry(0.035, 0.05, 4.2, 6), PALETTE.pole);
	pole.translate(-4.1, 2.1, 2.2);
	return merge([front, wing, fence, pole]);
}

// The Indonesian flag on the school's pole: red over white. Each half is its
// own strip, so the colors meet at a clean edge instead of blending. Sway
// grows away from the pole, so the wind ripples the free edge.
export function createFlagGeometry() {
	const stripes = [
		{ color: PALETTE.flagRed, y: 0.15 },
		{ color: PALETTE.flagWhite, y: -0.15 },
	].map((stripe) => {
		const geometry = paint(new PlaneGeometry(0.9, 0.3, 10, 1), stripe.color);
		geometry.translate(0.45, stripe.y, 0);
		return geometry;
	});
	const flag = setSway(merge(stripes), (x) => x / 0.9);
	flag.translate(-4.1, 3.9, 2.2);
	return flag;
}

// The narrow village road from photo 1: a ribbon laid on the ground that
// winds from the foreground to the school. Edges are a darker sandy tone.
export function createRoadGeometry() {
	const curve = new CatmullRomCurve3([
		new Vector3(8.5, 0, 16),
		new Vector3(6.2, 0, 8),
		new Vector3(7.8, 0, 1),
		new Vector3(6, 0, -6),
		new Vector3(8, 0, -13),
	]);
	const steps = 60;
	const lanes = [-1, -0.82, 0.82, 1];
	const center = new Color(PALETTE.road);
	const edge = new Color(PALETTE.roadEdge);

	const positions: Array<number> = [];
	const colors: Array<number> = [];
	const up = new Vector3(0, 1, 0);

	const ribbonPoint = (t: number, lane: number) => {
		const point = curve.getPointAt(t);
		const side = curve.getTangentAt(t).cross(up).normalize();
		const width = 0.9 - t * 0.25;
		return point.addScaledVector(side, lane * width).setY(0.03);
	};

	for (let i = 0; i < steps; i += 1) {
		const t0 = i / steps;
		const t1 = (i + 1) / steps;
		for (let lane = 0; lane < lanes.length - 1; lane += 1) {
			const a = ribbonPoint(t0, lanes[lane]);
			const b = ribbonPoint(t0, lanes[lane + 1]);
			const c = ribbonPoint(t1, lanes[lane]);
			const d = ribbonPoint(t1, lanes[lane + 1]);
			const tint = lane === 1 ? center : edge;
			for (const vertex of [a, c, b, b, c, d]) {
				positions.push(vertex.x, vertex.y, vertex.z);
				colors.push(tint.r, tint.g, tint.b);
			}
		}
	}

	const geometry = new BufferGeometry();
	geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
	geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
	geometry.setAttribute(
		"sway",
		new Float32BufferAttribute(new Float32Array(positions.length / 3), 1),
	);
	geometry.computeVertexNormals();
	return geometry;
}
