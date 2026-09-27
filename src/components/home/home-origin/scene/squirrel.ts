import {
	CircleGeometry,
	Color,
	DoubleSide,
	Group,
	MathUtils,
	Mesh,
	ShaderMaterial,
	Shape,
	ShapeGeometry,
	Vector3,
} from "three";

// A squirrel drawn flat, in the same cut-paper style as the owl, seen in
// profile facing left. One unit long, standing on the origin.

const COLORS = {
	body: "#8a5a34",
	belly: "#e3c190",
	tail: "#7a4b2a",
	tailEdge: "#b98552",
	dark: "#2a1d14",
};

const VERTEX = /* glsl */ `
	varying vec2 vPos;
	void main() {
		vPos = position.xy;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`;

// Flat color with short fur strokes, like the owl's feathers.
const FRAGMENT = /* glsl */ `
	uniform vec3 uColor;
	uniform float uFur;
	varying vec2 vPos;
	void main() {
		float stroke = smoothstep(0.82, 0.95, fract(vPos.x * 16.0 + vPos.y * 9.0));
		vec3 color = uColor * (1.0 - stroke * 0.18 * uFur);
		gl_FragColor = vec4(color, 1.0);
		#include <colorspace_fragment>
	}
`;

function fur(color: string, strokes: number) {
	return new ShaderMaterial({
		side: DoubleSide,
		vertexShader: VERTEX,
		fragmentShader: FRAGMENT,
		uniforms: { uColor: { value: new Color(color) }, uFur: { value: strokes } },
	});
}

function ellipse(params: { x: number; y: number; rx: number; ry: number }) {
	const shape = new Shape();
	shape.absellipse(
		params.x,
		params.y,
		params.rx,
		params.ry,
		0,
		Math.PI * 2,
		false,
		0,
	);
	return new ShapeGeometry(shape, 16);
}

// The bushy tail curls up and over the back, the way a running squirrel
// carries it.
function createTailShape() {
	const shape = new Shape();
	shape.moveTo(-0.04, -0.04);
	shape.bezierCurveTo(0.5, 0.0, 0.56, 0.62, 0.28, 0.9);
	shape.bezierCurveTo(0.1, 1.02, -0.08, 0.86, 0.04, 0.72);
	shape.bezierCurveTo(0.22, 0.58, 0.2, 0.28, -0.06, 0.12);
	return shape;
}

function createEarShape() {
	const shape = new Shape();
	shape.moveTo(-0.34, 0.64);
	shape.lineTo(-0.28, 0.8);
	shape.lineTo(-0.22, 0.63);
	return shape;
}

function createLegShape(width: number) {
	const shape = new Shape();
	shape.moveTo(-width / 2, 0);
	shape.lineTo(width / 2, 0);
	shape.lineTo(width * 0.3, -0.2);
	shape.lineTo(-width * 0.9, -0.22);
	shape.lineTo(-width * 0.6, -0.17);
	return shape;
}

export interface SquirrelStops {
	start: Vector3;
	treeBase: Vector3;
	treeTop: Vector3;
	limb: Vector3;
	exit: Vector3;
}

interface Leg {
	pivot: Group;
	phase: number;
}

function createSquirrelBody() {
	const group = new Group();
	const body = new Group();
	group.add(body);

	const tail = new Group();
	tail.position.set(0.3, 0.4, -0.01);
	const tailEdge = new Mesh(
		new ShapeGeometry(createTailShape(), 16),
		fur(COLORS.tailEdge, 0),
	);
	tailEdge.scale.setScalar(1.08);
	tailEdge.position.set(-0.01, -0.02, -0.001);
	tail.add(
		tailEdge,
		new Mesh(new ShapeGeometry(createTailShape(), 16), fur(COLORS.tail, 1)),
	);
	body.add(tail);

	const legs: Array<Leg> = [
		{ x: 0.2, y: 0.26, width: 0.14, phase: 0 },
		{ x: -0.22, y: 0.22, width: 0.09, phase: Math.PI },
	].map((spec) => {
		const pivot = new Group();
		pivot.position.set(spec.x, spec.y, 0.002);
		pivot.add(
			new Mesh(
				new ShapeGeometry(createLegShape(spec.width)),
				fur(COLORS.body, 1),
			),
		);
		body.add(pivot);
		return { pivot, phase: spec.phase };
	});

	const coat = fur(COLORS.body, 1);
	const belly = fur(COLORS.belly, 0.4);
	const dark = fur(COLORS.dark, 0);
	const parts: Array<[Mesh, number]> = [
		[new Mesh(ellipse({ x: 0, y: 0.35, rx: 0.34, ry: 0.19 }), coat), 0.003],
		[new Mesh(ellipse({ x: 0.2, y: 0.34, rx: 0.15, ry: 0.15 }), coat), 0.004],
		[
			new Mesh(ellipse({ x: -0.04, y: 0.27, rx: 0.24, ry: 0.09 }), belly),
			0.005,
		],
		[new Mesh(ellipse({ x: -0.36, y: 0.52, rx: 0.16, ry: 0.14 }), coat), 0.006],
		[
			new Mesh(ellipse({ x: -0.49, y: 0.48, rx: 0.08, ry: 0.065 }), belly),
			0.007,
		],
		[new Mesh(new ShapeGeometry(createEarShape()), coat), 0.006],
		[new Mesh(new CircleGeometry(0.032, 12), dark), 0.008],
		[new Mesh(new CircleGeometry(0.02, 8), dark), 0.008],
	];
	parts[6][0].position.set(-0.41, 0.56, 0);
	parts[7][0].position.set(-0.565, 0.5, 0);
	for (const [mesh, depth] of parts) {
		mesh.position.z = depth;
		body.add(mesh);
	}

	return { group, body, tail, legs };
}

export interface Squirrel {
	group: Group;
	update: (params: { delta: number; night: number }) => void;
}

// One daytime run, repeated every CYCLE seconds: in from the right across the
// field, up the mango trunk, a hop onto a limb, a short look around, and a
// leap out to the left. It never shows at night or in a still frame.
const CYCLE = 26;
const LEGS = [
	{ until: 3, kind: "run" },
	{ until: 3.9, kind: "climb" },
	{ until: 4.4, kind: "hop" },
	{ until: 5, kind: "pause" },
	{ until: 5.9, kind: "leap" },
] as const;

export function createSquirrel(params: {
	stops: SquirrelStops;
	size: number;
}): Squirrel {
	const parts = createSquirrelBody();
	const group = parts.group;
	group.scale.setScalar(params.size);
	const stops = params.stops;
	let clock = 0;

	const positionAt = (t: number) => {
		const leg = LEGS.findIndex((entry) => t < entry.until);
		if (leg === -1) return null;
		const start = leg === 0 ? 0 : LEGS[leg - 1].until;
		const u = (t - start) / (LEGS[leg].until - start);
		const kind = LEGS[leg].kind;
		if (kind === "run")
			return { point: stops.start.clone().lerp(stops.treeBase, u), kind, u };
		if (kind === "climb")
			return {
				point: stops.treeBase
					.clone()
					.lerp(stops.treeTop, MathUtils.smoothstep(u, 0, 1)),
				kind,
				u,
			};
		if (kind === "pause") return { point: stops.limb.clone(), kind, u };
		const from = kind === "hop" ? stops.treeTop : stops.limb;
		const to = kind === "hop" ? stops.limb : stops.exit;
		const height = kind === "hop" ? 0.5 : 0.9;
		return {
			point: from
				.clone()
				.lerp(to, u)
				.add(new Vector3(0, height * 4 * u * (1 - u), 0)),
			kind,
			u,
		};
	};

	const update = (frame: { delta: number; night: number }) => {
		if (frame.delta === 0 || frame.night > 0.5) {
			group.visible = false;
			return;
		}
		clock += frame.delta;
		const t = clock % CYCLE;
		const now = positionAt(t);
		group.visible = now !== null;
		if (!now) return;

		group.position.copy(now.point);
		const ahead = positionAt(Math.min(t + 0.04, 5.89));
		const heading =
			ahead && ahead.kind !== "pause"
				? ahead.point.clone().sub(now.point)
				: new Vector3(-1, 0, 0);
		// The head (at -X) points where it is going.
		parts.body.rotation.z = Math.atan2(heading.y, heading.x) - Math.PI;
		if (now.kind === "pause") parts.body.rotation.z = 0;

		const moving = now.kind === "pause" ? 0 : 1;
		const stride = t * 22;
		parts.body.position.y =
			now.kind === "run" ? Math.abs(Math.sin(stride)) * 0.08 : 0;
		for (const leg of parts.legs)
			leg.pivot.rotation.z = Math.sin(stride + leg.phase) * 0.7 * moving;
		// The tail streams behind while running and flicks while it pauses.
		parts.tail.rotation.z = moving
			? -0.35 + Math.sin(stride * 0.5) * 0.12
			: Math.sin(t * 14) * 0.25;
	};

	return { group, update };
}
