import {
	AdditiveBlending,
	BufferGeometry,
	Color,
	DoubleSide,
	Float32BufferAttribute,
	Group,
	InstancedBufferAttribute,
	InstancedMesh,
	Object3D,
	Points,
	ShaderMaterial,
} from "three";

import type { SharedUniforms } from "./paint-material";
import { PALETTE } from "./palette";
import { between, type Random } from "./random";

// Fireflies: glowing points that wander and blink over the field. They only
// show at night, faded in by the shared night value.
export function createFireflies(params: {
	random: Random;
	shared: SharedUniforms;
}) {
	const random = params.random;
	const count = 80;
	const positions = new Float32Array(count * 3);
	const phases = new Float32Array(count);
	for (let i = 0; i < count; i += 1) {
		const near = i < 30;
		positions[i * 3] = between(random, near ? [-8, 8] : [-22, 22]);
		positions[i * 3 + 1] = between(random, [0.4, 2.6]);
		positions[i * 3 + 2] = between(random, near ? [2, 9] : [-15, 2]);
		phases[i] = random();
	}

	const geometry = new BufferGeometry();
	geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
	geometry.setAttribute("phase", new Float32BufferAttribute(phases, 1));

	const material = new ShaderMaterial({
		transparent: true,
		depthWrite: false,
		blending: AdditiveBlending,
		uniforms: {
			uTime: params.shared.uTime,
			uNight: params.shared.uNight,
			uPixelRatio: { value: 1 },
			uColor: { value: new Color(PALETTE.firefly) },
		},
		vertexShader: /* glsl */ `
			attribute float phase;
			uniform float uTime;
			uniform float uNight;
			uniform float uPixelRatio;
			varying float vAlpha;

			void main() {
				vec3 drift = position;
				drift.x += sin(uTime * 0.4 + phase * 6.0) * 0.6;
				drift.y += sin(uTime * 0.7 + phase * 4.0) * 0.35;
				drift.z += cos(uTime * 0.35 + phase * 5.0) * 0.5;
				vec4 view = modelViewMatrix * vec4(drift, 1.0);

				float blink = smoothstep(0.1, 1.0, sin(uTime * (1.1 + phase) + phase * 20.0));
				vAlpha = blink * uNight;
				gl_PointSize = 90.0 * uPixelRatio / -view.z;
				gl_Position = projectionMatrix * view;
			}
		`,
		fragmentShader: /* glsl */ `
			uniform vec3 uColor;
			varying float vAlpha;

			void main() {
				float glow = smoothstep(0.5, 0.0, length(gl_PointCoord - 0.5));
				gl_FragColor = vec4(uColor, glow * glow * vAlpha);
				#include <colorspace_fragment>
			}
		`,
	});

	const points = new Points(geometry, material);
	points.frustumCulled = false;
	return { points, material };
}

// A bird is a tiny body with two jointed wings. "wing" is 0 at the body,
// 0.5 at the elbow, and 1 at the tip, so a sine flap bends it into an M.
function createBirdGeometry() {
	const body: Array<[number, number, number, number]> = [];
	for (const side of [-1, 1]) {
		const shoulderFront: [number, number, number, number] = [0, 0, 0.12, 0];
		const shoulderBack: [number, number, number, number] = [0, 0, -0.14, 0];
		const elbow: [number, number, number, number] = [
			side * 0.5,
			0.06,
			0.02,
			0.5,
		];
		const elbowBack: [number, number, number, number] = [
			side * 0.45,
			0.04,
			-0.12,
			0.5,
		];
		const tip: [number, number, number, number] = [side * 1, 0.02, -0.1, 1];
		body.push(
			shoulderFront,
			shoulderBack,
			elbow,
			elbow,
			shoulderBack,
			elbowBack,
			elbow,
			elbowBack,
			tip,
		);
	}
	body.push([0, 0, 0.3, 0], [-0.06, 0, -0.1, 0], [0.06, 0, -0.1, 0]);

	const geometry = new BufferGeometry();
	geometry.setAttribute(
		"position",
		new Float32BufferAttribute(
			body.flatMap((vertex) => [vertex[0], vertex[1], vertex[2]]),
			3,
		),
	);
	geometry.setAttribute(
		"wing",
		new Float32BufferAttribute(
			body.map((vertex) => vertex[3]),
			1,
		),
	);
	return geometry;
}

export interface Flock {
	group: Group;
	update: (delta: number) => void;
}

export function createBirds(params: {
	random: Random;
	shared: SharedUniforms;
}): Flock & {
	material: ShaderMaterial;
} {
	const random = params.random;
	const count = 7;
	const geometry = createBirdGeometry();
	const phases = new Float32Array(count);
	for (let i = 0; i < count; i += 1) phases[i] = random() * Math.PI * 2;
	geometry.setAttribute("phase", new InstancedBufferAttribute(phases, 1));

	const material = new ShaderMaterial({
		side: DoubleSide,
		transparent: true,
		uniforms: {
			uTime: params.shared.uTime,
			uNight: params.shared.uNight,
			uColor: { value: new Color(PALETTE.bird) },
		},
		vertexShader: /* glsl */ `
			attribute float wing;
			attribute float phase;
			uniform float uTime;

			void main() {
				vec3 shape = position;
				float flap = sin(uTime * 7.0 + phase);
				shape.y += flap * 0.42 * wing - abs(flap) * 0.18 * wing * wing;
				gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(shape, 1.0);
			}
		`,
		fragmentShader: /* glsl */ `
			uniform vec3 uColor;
			uniform float uNight;
			void main() {
				gl_FragColor = vec4(uColor, 1.0 - uNight);
				#include <colorspace_fragment>
			}
		`,
	});

	// Loose V formation, each bird bobbing on its own.
	const offsets = Array.from({ length: count }, (_, i) => {
		const rank = Math.ceil(i / 2);
		const side = i % 2 === 0 ? 1 : -1;
		return {
			x: -rank * 1.4,
			y: rank * 0.25 * side + between(random, [-0.2, 0.2]),
			z: rank * side * 1.2,
		};
	});

	const flock = new InstancedMesh(geometry, material, count);
	flock.frustumCulled = false;
	const group = new Group();
	group.add(flock);
	group.position.set(-60, 16, -40);

	const dummy = new Object3D();
	let time = 0;

	const update = (delta: number) => {
		time += delta;
		group.position.x += delta * 3.2;
		if (group.position.x > 70) group.position.x = -70;
		offsets.forEach((offset, index) => {
			dummy.position.set(
				offset.x,
				offset.y + Math.sin(time * 1.3 + index) * 0.25,
				offset.z,
			);
			dummy.rotation.set(0.15, Math.PI / 2, 0);
			dummy.scale.setScalar(0.55);
			dummy.updateMatrix();
			flock.setMatrixAt(index, dummy.matrix);
		});
		flock.instanceMatrix.needsUpdate = true;
		group.visible = params.shared.uNight.value < 0.98;
	};
	update(0);

	return { group, update, material };
}
