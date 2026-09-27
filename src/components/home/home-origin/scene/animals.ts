import {
	CatmullRomCurve3,
	Color,
	ConeGeometry,
	CylinderGeometry,
	Group,
	type Material,
	MathUtils,
	Mesh,
	SphereGeometry,
	TubeGeometry,
	Vector3,
} from "three";

import { merge, paint, place } from "./geometry";
import { PALETTE } from "./palette";

// A sphere squashed into a barrel, lighter underneath like a buffalo's belly.
function barrel(params: {
	size: [number, number, number];
	at: [number, number, number];
}) {
	const geometry = paint(new SphereGeometry(1, 14, 10), PALETTE.buffalo);
	const position = geometry.getAttribute("position");
	const colors = geometry.getAttribute("color");
	const belly = new Color(PALETTE.buffaloBelly);
	for (let i = 0; i < position.count; i += 1) {
		if (position.getY(i) < -0.45) colors.setXYZ(i, belly.r, belly.g, belly.b);
	}
	geometry.scale(...params.size);
	geometry.translate(...params.at);
	return geometry;
}

// Kerbau horns sweep out and back in a wide crescent.
function horn(side: number) {
	const curve = new CatmullRomCurve3([
		new Vector3(0, 0.12, side * 0.12),
		new Vector3(-0.05, 0.24, side * 0.42),
		new Vector3(-0.3, 0.3, side * 0.58),
		new Vector3(-0.48, 0.2, side * 0.46),
	]);
	const tube = paint(new TubeGeometry(curve, 12, 0.045, 5), PALETTE.horn);
	const position = tube.getAttribute("position");
	// Taper the horn toward its tip.
	for (let i = 0; i < position.count; i += 1) {
		const reach = Math.min(1, Math.abs(position.getZ(i)) / 0.58);
		const scale = 1 - reach * 0.35;
		position.setY(i, 0.2 + (position.getY(i) - 0.2) * scale);
	}
	tube.computeVertexNormals();
	return tube;
}

function createHeadGeometry() {
	const skull = barrel({ size: [0.4, 0.22, 0.2], at: [0.42, -0.02, 0] });
	const muzzle = paint(new SphereGeometry(1, 10, 8), PALETTE.buffaloBelly);
	muzzle.scale(0.15, 0.13, 0.15);
	muzzle.translate(0.78, -0.1, 0);
	const ears = [1, -1].map((side) =>
		place(paint(new ConeGeometry(0.06, 0.2, 5), PALETTE.buffalo), {
			rx: side * 1.8,
			x: 0.22,
			y: 0.08,
			z: side * 0.22,
		}),
	);
	const horns = [horn(1), horn(-1)].map((geometry) =>
		place(geometry, { x: 0.16 }),
	);
	return merge([skull, muzzle, ...ears, ...horns]);
}

function createBodyGeometry() {
	const body = barrel({ size: [0.95, 0.52, 0.46], at: [0, 1.05, 0] });
	const hump = barrel({ size: [0.45, 0.3, 0.36], at: [0.45, 1.3, 0] });
	return merge([body, hump]);
}

// One leg, hanging from a hip pivot at its top.
function createLegGeometry() {
	const leg = paint(new CylinderGeometry(0.1, 0.08, 0.85, 6), PALETTE.buffalo);
	leg.translate(0, -0.42, 0);
	return leg;
}

function createTailGeometry() {
	const tail = paint(
		new CylinderGeometry(0.025, 0.02, 0.7, 5),
		PALETTE.buffalo,
	);
	tail.translate(0, -0.35, 0);
	const tuft = paint(new SphereGeometry(0.07, 6, 5), PALETTE.fencePanel);
	tuft.translate(0, -0.72, 0);
	return merge([tail, tuft]);
}

export interface Buffalo {
	group: Group;
	update: (params: { time: number; delta: number; night: number }) => void;
}

interface BuffaloOptions {
	material: Material;
	phase: number;
	home: { x: number; z: number; rotation: number };
	barn: { x: number; z: number };
	size: number;
}

const WALK_SECONDS = 10;

// A water buffalo, facing +X. By day it grazes: the head dips to the rice and
// comes back up, and the tail swishes at flies. At night it walks off to the
// left, home to its pen, and walks back in the morning.
//
// "away" runs from 0 (grazing at home spot) to 1 (gone to the pen). It always
// eases toward the current theme at walking speed, so switching the theme
// mid-walk turns the buffalo around where it stands instead of jumping.
export function createBuffalo(options: BuffaloOptions): Buffalo {
	const group = new Group();
	group.scale.setScalar(options.size);
	group.add(new Mesh(createBodyGeometry(), options.material));

	const neck = new Group();
	neck.position.set(0.8, 1.08, 0);
	neck.add(new Mesh(createHeadGeometry(), options.material));
	group.add(neck);

	const tail = new Group();
	tail.position.set(-0.92, 1.25, 0);
	tail.add(new Mesh(createTailGeometry(), options.material));
	group.add(tail);

	const legGeometry = createLegGeometry();
	const legs = [
		[0.55, 0.22, 0],
		[0.55, -0.22, Math.PI],
		[-0.55, 0.22, Math.PI],
		[-0.55, -0.22, 0],
	].map((spot) => {
		const hip = new Group();
		hip.position.set(spot[0], 0.85, spot[1]);
		hip.add(new Mesh(legGeometry, options.material));
		group.add(hip);
		return { hip, phase: spot[2] };
	});

	const home = new Vector3(options.home.x, 0, options.home.z);
	const barn = new Vector3(options.barn.x, 0, options.barn.z);
	let away = 0;
	let heading = options.home.rotation;
	let stride = 0;
	let gait = 0;

	const update = (params: { time: number; delta: number; night: number }) => {
		const target = params.night > 0.5 ? 1 : 0;
		const before = away;
		if (params.delta === 0) away = target;
		else
			away +=
				Math.sign(target - away) *
				Math.min(Math.abs(target - away), params.delta / WALK_SECONDS);
		const moving = away !== before && params.delta > 0;

		group.position.lerpVectors(home, barn, MathUtils.smoothstep(away, 0, 1));
		group.visible = away < 0.995;

		// Face the way it walks; face its grazing direction when settled.
		const leaving = target > before;
		const walkHeading =
			Math.atan2(-(barn.z - home.z), barn.x - home.x) + (leaving ? 0 : Math.PI);
		const wanted = moving
			? walkHeading
			: away < 0.01
				? options.home.rotation
				: heading;
		const turn = Math.atan2(
			Math.sin(wanted - heading),
			Math.cos(wanted - heading),
		);
		heading += params.delta === 0 ? turn : turn * Math.min(1, params.delta * 3);
		group.rotation.y = heading;

		const time = params.time;
		const ease = params.delta === 0 ? 1 : Math.min(1, params.delta * 4);
		gait += ((moving ? 1 : 0) - gait) * ease;
		stride += params.delta * 5.5 * gait;
		const walking = gait;
		for (const leg of legs)
			leg.hip.rotation.z = Math.sin(stride + leg.phase) * 0.45 * walking;
		group.position.y = Math.abs(Math.sin(stride)) * 0.05 * walking;

		const cycle = (time * 0.18 + options.phase) % 1;
		// Grazing: mostly head down eating, then a short look up. Walking:
		// head up, nodding with each step.
		const down =
			1 -
			MathUtils.smoothstep(cycle, 0.7, 0.8) +
			MathUtils.smoothstep(cycle, 0.92, 1);
		const grazing =
			-0.1 - down * 0.95 + Math.sin(time * 3 + options.phase) * 0.03 * down;
		const walkingNeck = -0.15 + Math.sin(stride * 2) * 0.05;
		neck.rotation.z +=
			(MathUtils.lerp(grazing, walkingNeck, gait) - neck.rotation.z) * ease;
		tail.rotation.x = Math.sin(time * 2.2 + options.phase * 5) * 0.35;
		tail.rotation.z = 0.25 + Math.sin(time * 1.3 + options.phase) * 0.1;
	};

	return { group, update };
}
