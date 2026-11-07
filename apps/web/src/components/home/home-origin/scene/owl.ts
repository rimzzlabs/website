import {
	AdditiveBlending,
	CatmullRomCurve3,
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

import type { SharedUniforms } from "./paint-material";

// The owl is drawn flat, like a cut-paper illustration: a dark silhouette
// with a moonlit outline, feathers drawn in the shader, and eyes that glow
// in the dark. It is one unit tall, standing on its claws, facing the camera.

const OWL_COLORS = {
	body: "#1b2133",
	feather: "#34405f",
	rimNight: "#8fa6dc",
	rimDay: "#c9b48e",
	beak: "#4a4f5c",
	iris: "#ffc83d",
	irisEdge: "#ff7a1a",
	halo: "#ffb13b",
};

function createBodyShape() {
	const shape = new Shape();
	shape.moveTo(0, 0);
	shape.bezierCurveTo(0.22, 0, 0.34, 0.18, 0.33, 0.42);
	shape.bezierCurveTo(0.32, 0.6, 0.28, 0.7, 0.3, 0.8);
	shape.lineTo(0.37, 1);
	shape.bezierCurveTo(0.26, 0.93, 0.1, 0.89, 0, 0.9);
	shape.bezierCurveTo(-0.1, 0.89, -0.26, 0.93, -0.37, 1);
	shape.lineTo(-0.3, 0.8);
	shape.bezierCurveTo(-0.28, 0.7, -0.32, 0.6, -0.33, 0.42);
	shape.bezierCurveTo(-0.34, 0.18, -0.22, 0, 0, 0);
	return shape;
}

// A spread wing reaching along +X from the shoulder, with fingered primaries
// along its lower edge.
function createWingShape() {
	const shape = new Shape();
	shape.moveTo(0, 0.06);
	shape.bezierCurveTo(0.2, 0.2, 0.5, 0.18, 0.74, 0.04);
	const fingers = [
		[0.7, -0.04],
		[0.64, 0],
		[0.6, -0.1],
		[0.52, -0.02],
		[0.47, -0.13],
		[0.38, -0.05],
		[0.3, -0.14],
		[0.16, -0.08],
		[0, -0.06],
	];
	for (const finger of fingers) shape.lineTo(finger[0], finger[1]);
	return shape;
}

// One toe: a thick curved hook that wraps down over the front of the branch.
// "lean" tilts it outward, so the three toes of a foot fan slightly.
function createToeShape(params: { x: number; lean: number }) {
	const x = params.x;
	const lean = params.lean;
	const shape = new Shape();
	shape.moveTo(x - 0.016, 0.03);
	shape.quadraticCurveTo(x - 0.024 + lean * 0.4, -0.04, x + lean, -0.105);
	shape.quadraticCurveTo(x + 0.014 + lean * 0.3, -0.035, x + 0.016, 0.03);
	return shape;
}

const VERTEX = /* glsl */ `
	varying vec2 vPos;
	void main() {
		vPos = position.xy;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`;

// uPart: 0 = body, 1 = wing, 2 = outline, 3 = toes.
const PLUMAGE = /* glsl */ `
	uniform float uNight;
	uniform float uPart;
	uniform vec3 uBody;
	uniform vec3 uFeather;
	uniform vec3 uRimNight;
	uniform vec3 uRimDay;
	uniform vec3 uBeak;
	varying vec2 vPos;

	float ring(vec2 p, vec2 center, float radius, float width) {
		float d = length(p - center);
		return smoothstep(radius - width, radius, d) * (1.0 - smoothstep(radius, radius + width, d));
	}

	void main() {
		vec3 rim = mix(uRimDay, uRimNight, uNight);
		if (uPart > 2.5) {
			// Toes: pale scaly skin, with dark hooked claws at the tips.
			vec3 skin = mix(vec3(0.66, 0.57, 0.4), vec3(0.42, 0.46, 0.58), uNight);
			skin *= 0.85 + 0.15 * step(0.5, fract(vPos.y * 45.0));
			vec3 claw = vec3(0.05, 0.045, 0.04);
			gl_FragColor = vec4(mix(skin, claw, 1.0 - smoothstep(-0.075, -0.06, vPos.y)), 1.0);
			#include <colorspace_fragment>
			return;
		}
		if (uPart > 1.5) {
			gl_FragColor = vec4(rim, 1.0);
			#include <colorspace_fragment>
			return;
		}

		vec3 color = uBody;
		float feather = 0.0;

		if (uPart > 0.5) {
			// Wing: long primary feathers running out to the fingertips.
			feather = smoothstep(0.86, 0.95, fract(vPos.x * 11.0 - vPos.y * 3.0)) * step(vPos.y, 0.1);
			feather += smoothstep(0.9, 0.97, fract(vPos.y * 14.0 + vPos.x * 2.0)) * step(0.1, vPos.y) * 0.6;
		} else {
			// Belly: rows of scalloped feathers, like fish scales.
			float row = vPos.y * 17.0;
			vec2 cell = vec2(fract(vPos.x * 11.0 + mod(floor(row), 2.0) * 0.5) - 0.5, fract(row));
			float scallop = ring(cell * vec2(1.0, 1.4), vec2(0.0, 0.0), 0.44, 0.05);
			float belly = 1.0 - smoothstep(0.17, 0.22, abs(vPos.x));
			belly *= smoothstep(0.08, 0.14, vPos.y) * (1.0 - smoothstep(0.56, 0.62, vPos.y));
			feather += scallop * belly;

			// Folded wings down both sides.
			float side = smoothstep(0.19, 0.23, abs(vPos.x)) * smoothstep(0.1, 0.2, vPos.y) * (1.0 - smoothstep(0.66, 0.72, vPos.y));
			feather += smoothstep(0.88, 0.96, fract(vPos.y * 10.0 + abs(vPos.x) * 5.0)) * side;

			// Facial disc: two rings around the eyes, and a V brow between them.
			feather += ring(vPos, vec2(0.12, 0.72), 0.13, 0.012) * 1.4;
			feather += ring(vPos, vec2(-0.12, 0.72), 0.13, 0.012) * 1.4;
			float brow = abs(abs(vPos.x) * 0.9 - (vPos.y - 0.74)) ;
			feather += (1.0 - smoothstep(0.008, 0.02, brow)) * step(abs(vPos.x), 0.14) * 1.2;

			float beak = step(abs(vPos.x) * 2.2, vPos.y - 0.6) * step(vPos.y, 0.7);
			color = mix(color, uBeak, beak);
		}

		color = mix(color, uFeather, clamp(feather, 0.0, 1.0));
		// Moonlight catches the top of the head and shoulders.
		color += rim * smoothstep(0.7, 1.0, vPos.y) * 0.12 * uNight;
		gl_FragColor = vec4(color, 1.0);
		#include <colorspace_fragment>
	}
`;

const EYE_FRAGMENT = /* glsl */ `
	uniform float uNight;
	uniform vec3 uIris;
	uniform vec3 uIrisEdge;
	varying vec2 vPos;

	void main() {
		float d = length(vPos) / 0.075;
		vec3 iris = mix(uIris, uIrisEdge, smoothstep(0.35, 1.0, d));
		float pupil = 1.0 - smoothstep(0.42, 0.5, d);
		float glint = 1.0 - smoothstep(0.08, 0.14, length(vPos - vec2(-0.02, 0.022)) / 0.075);
		vec3 color = mix(iris * mix(0.85, 1.35, uNight), vec3(0.02), pupil);
		color = mix(color, vec3(1.0), glint);
		gl_FragColor = vec4(color, 1.0);
		#include <colorspace_fragment>
	}
`;

const HALO_FRAGMENT = /* glsl */ `
	uniform float uNight;
	uniform float uTime;
	uniform vec3 uHalo;
	varying vec2 vPos;

	void main() {
		float d = length(vPos) / 0.3;
		float glow = pow(max(0.0, 1.0 - d), 2.4);
		float flicker = 0.85 + 0.15 * sin(uTime * 2.3) * sin(uTime * 3.7);
		gl_FragColor = vec4(uHalo, glow * 0.65 * uNight * flicker);
		#include <colorspace_fragment>
	}
`;

function plumage(params: { shared: SharedUniforms; part: number }) {
	return new ShaderMaterial({
		// Mirrored parts (the left wing, the left claw) face backward.
		side: DoubleSide,
		vertexShader: VERTEX,
		fragmentShader: PLUMAGE,
		uniforms: {
			uNight: params.shared.uNight,
			uPart: { value: params.part },
			uBody: { value: new Color(OWL_COLORS.body) },
			uFeather: { value: new Color(OWL_COLORS.feather) },
			uRimNight: { value: new Color(OWL_COLORS.rimNight) },
			uRimDay: { value: new Color(OWL_COLORS.rimDay) },
			uBeak: { value: new Color(OWL_COLORS.beak) },
		},
	});
}

export interface Owl {
	group: Group;
	update: (params: { time: number; delta: number; night: number }) => void;
}

const FLIGHT_SECONDS = 3.2;

// The night owl. When night falls it flies in from the upper left, flapping,
// and lands on the mango branch; by day it flies back out the same way.
//
// "perched" runs from 0 (gone) to 1 (on the branch) and always eases toward
// the current theme at flying speed. Flipping the theme mid-flight turns the
// owl around in the air rather than restarting the animation.
export function createOwl(params: {
	shared: SharedUniforms;
	perch: Vector3;
	size: number;
}): Owl {
	const shared = params.shared;
	const group = new Group();
	const body = new Group();
	group.add(body);

	const bodyGeometry = new ShapeGeometry(createBodyShape(), 16);
	const outline = new Mesh(bodyGeometry, plumage({ shared, part: 2 }));
	outline.scale.set(1.08, 1.05, 1);
	outline.position.set(0, -0.02, -0.01);
	body.add(outline, new Mesh(bodyGeometry, plumage({ shared, part: 0 })));

	// Two feet of three toes, gripping the branch. They sit in front of the
	// body, so they overlap the branch's front edge.
	const toeMaterial = plumage({ shared, part: 3 });
	for (const side of [1, -1]) {
		for (const toe of [-1, 0, 1]) {
			const shape = createToeShape({
				x: side * 0.1 + toe * 0.034,
				lean: toe * 0.012 + side * 0.006,
			});
			const mesh = new Mesh(new ShapeGeometry(shape, 6), toeMaterial);
			mesh.position.z = 0.012;
			body.add(mesh);
		}
	}

	const wingGeometry = new ShapeGeometry(createWingShape(), 12);
	const wingMaterial = plumage({ shared, part: 1 });
	const wings = [1, -1].map((side) => {
		const shoulder = new Group();
		shoulder.position.set(side * 0.22, 0.56, -0.005);
		shoulder.scale.x = side;
		shoulder.add(new Mesh(wingGeometry, wingMaterial));
		body.add(shoulder);
		return { shoulder, side };
	});

	const eyes = new Group();
	eyes.position.set(0, 0.72, 0.01);
	const eyeMaterial = new ShaderMaterial({
		vertexShader: VERTEX,
		fragmentShader: EYE_FRAGMENT,
		uniforms: {
			uNight: shared.uNight,
			uIris: { value: new Color(OWL_COLORS.iris) },
			uIrisEdge: { value: new Color(OWL_COLORS.irisEdge) },
		},
	});
	const haloMaterial = new ShaderMaterial({
		vertexShader: VERTEX,
		fragmentShader: HALO_FRAGMENT,
		transparent: true,
		depthWrite: false,
		blending: AdditiveBlending,
		uniforms: {
			uNight: shared.uNight,
			uTime: shared.uTime,
			uHalo: { value: new Color(OWL_COLORS.halo) },
		},
	});
	const eyeGeometry = new CircleGeometry(0.075, 24);
	const haloGeometry = new CircleGeometry(0.3, 24);
	for (const side of [1, -1]) {
		const eye = new Mesh(eyeGeometry, eyeMaterial);
		eye.position.x = side * 0.12;
		const halo = new Mesh(haloGeometry, haloMaterial);
		halo.position.set(side * 0.12, 0, 0.01);
		halo.renderOrder = 5;
		eyes.add(eye, halo);
	}
	body.add(eyes);

	const perch = params.perch;
	const flight = new CatmullRomCurve3([
		perch.clone().add(new Vector3(-16, 10, -8)),
		perch.clone().add(new Vector3(-8, 5.5, -3)),
		perch.clone().add(new Vector3(-2.5, 1.6, 0.4)),
		perch.clone(),
	]);

	let perched = 0;
	let wingsOpen = 0;
	group.scale.setScalar(params.size);

	const update = (frame: { time: number; delta: number; night: number }) => {
		const target = frame.night > 0.5 ? 1 : 0;
		const before = perched;
		if (frame.delta === 0) perched = target;
		else
			perched +=
				Math.sign(target - perched) *
				Math.min(Math.abs(target - perched), frame.delta / FLIGHT_SECONDS);
		const flying = perched !== before && frame.delta > 0;

		const along = MathUtils.smootherstep(perched, 0, 1);
		group.position.copy(flight.getPoint(along));
		group.visible = perched > 0.001;

		// Bank into the turn while flying; sit upright on the branch.
		const tangent = flight.getTangent(along);
		const bank = flying ? MathUtils.clamp(-tangent.y * 0.5, -0.4, 0.4) : 0;
		const ease = frame.delta === 0 ? 1 : Math.min(1, frame.delta * 6);
		body.rotation.z += (bank - body.rotation.z) * ease;

		wingsOpen +=
			((flying || (perched > 0 && perched < 0.97) ? 1 : 0) - wingsOpen) * ease;
		const flap = Math.sin(frame.time * 13) * 0.75;
		for (const wing of wings) {
			wing.shoulder.scale.set(wing.side * wingsOpen, wingsOpen, 1);
			wing.shoulder.rotation.z = wing.side * flap * wingsOpen;
			wing.shoulder.visible = wingsOpen > 0.02;
		}

		// On the branch: a slow breath, and a blink now and then.
		const settled = perched >= 1 ? 1 : 0;
		body.position.y = Math.sin(frame.time * 1.6) * 0.008 * settled;
		const blink = MathUtils.smoothstep(
			Math.sin(frame.time * 1.7) * Math.sin(frame.time * 0.61),
			0.93,
			0.99,
		);
		eyes.scale.y = 1 - blink * 0.92;
	};

	return { group, update };
}
