import {
	Color,
	Group,
	Mesh,
	PlaneGeometry,
	ShaderMaterial,
	Shape,
	ShapeGeometry,
	Vector2,
} from "three";

import { NOISE_GLSL, type SharedUniforms } from "./paint-material";
import { PALETTE } from "./palette";
import { between, type Random } from "./random";

// A full-screen quad drawn at the far plane, behind everything else. Day is
// a streaky gouache blue; night brings stars and the Milky Way.
export function createSky(shared: SharedUniforms) {
	const material = new ShaderMaterial({
		depthWrite: false,
		depthTest: false,
		uniforms: {
			uTime: shared.uTime,
			uNight: shared.uNight,
			uAspect: { value: 16 / 9 },
			uTop: { value: new Color(PALETTE.skyTop) },
			uBottom: { value: new Color(PALETTE.skyBottom) },
			uStreak: { value: new Color(PALETTE.skyStreak) },
			uNightTop: { value: new Color(PALETTE.nightTop) },
			uNightBottom: { value: new Color(PALETTE.nightBottom) },
			uMilkyWay: { value: new Color(PALETTE.milkyWay) },
			uStar: { value: new Color(PALETTE.star) },
		},
		vertexShader: /* glsl */ `
			varying vec2 vUv;
			void main() {
				vUv = uv;
				gl_Position = vec4(position.xy, 1.0, 1.0);
			}
		`,
		fragmentShader: /* glsl */ `
			uniform float uTime;
			uniform float uNight;
			uniform float uAspect;
			uniform vec3 uTop;
			uniform vec3 uBottom;
			uniform vec3 uStreak;
			uniform vec3 uNightTop;
			uniform vec3 uNightBottom;
			uniform vec3 uMilkyWay;
			uniform vec3 uStar;
			varying vec2 vUv;

			${NOISE_GLSL}

			float starLayer(vec2 uv, float density, float seed) {
				vec2 cell = floor(uv);
				vec2 local = fract(uv) - 0.5;
				float pick = hash21(cell + seed);
				vec2 offset = vec2(hash21(cell + seed + 1.3), hash21(cell + seed + 7.1)) - 0.5;
				float point = smoothstep(0.09, 0.0, length(local - offset * 0.7));
				float twinkle = 0.65 + 0.35 * sin(uTime * (1.5 + pick * 3.0) + pick * 40.0);
				return point * step(1.0 - density, pick) * twinkle;
			}

			void main() {
				vec3 day = mix(uBottom, uTop, smoothstep(0.1, 1.0, vUv.y));

				// Diagonal dry-brush streaks, drifting very slowly.
				vec2 brush = vec2(vUv.x * 1.4 - vUv.y * 0.9 + uTime * 0.004, vUv.y * 26.0 + vUv.x * 9.0);
				float streak = smoothstep(0.55, 0.8, fbm(brush));
				day = mix(day, uStreak, streak * 0.55);
				day = mix(day, uBottom, smoothstep(0.62, 0.9, fbm(brush * 0.7 + 3.0)) * 0.25);

				vec3 night = mix(uNightBottom, uNightTop, smoothstep(0.15, 0.95, vUv.y));
				vec2 sky = vec2(vUv.x * uAspect, vUv.y);

				// The Milky Way: a soft diagonal band of glow, broken by dust lanes.
				float along = sky.y - (0.95 - sky.x * 0.32);
				float band = exp(-along * along * 26.0);
				float glow = band * (0.45 + 0.75 * fbm(sky * 5.0 + 2.0));
				float dust = smoothstep(0.45, 0.75, fbm(sky * vec2(9.0, 14.0) + 11.0)) * band;
				night += uMilkyWay * glow * 0.32 - vec3(0.03, 0.03, 0.05) * dust;

				float stars = starLayer(sky * 90.0, 0.08 + band * 0.25, 0.0);
				stars += starLayer(sky * 45.0, 0.05, 17.0) * 1.4;
				stars *= smoothstep(0.25, 0.55, vUv.y);
				night += uStar * stars;

				gl_FragColor = vec4(mix(day, night, uNight), 1.0);
				#include <colorspace_fragment>
			}
		`,
	});

	const mesh = new Mesh(new PlaneGeometry(2, 2), material);
	mesh.frustumCulled = false;
	mesh.renderOrder = -1;
	return { mesh, material };
}

// The top edge of a cloud is the union of a few circles; the bottom is a
// gentle flat curve, the way the reference draws them.
function createCloudShape(params: {
	random: Random;
	bumps: number;
	height: number;
}) {
	const random = params.random;
	const count = params.bumps;
	const bumps = Array.from({ length: count }, (_, i) => {
		const along = i / (count - 1) - 0.5;
		return {
			x: along * 2.6,
			y: between(random, [0.05, 0.35]) * params.height,
			radius:
				between(random, [0.45, 0.8]) *
				params.height *
				(1 - Math.abs(along) * 0.7),
		};
	});

	const points: Array<Vector2> = [];
	const steps = 48;
	for (let i = 0; i <= steps; i += 1) {
		const x = -1.9 + (i / steps) * 3.8;
		const top = bumps.reduce((best, bump) => {
			const dx = x - bump.x;
			if (Math.abs(dx) >= bump.radius) return best;
			return Math.max(best, bump.y + Math.sqrt(bump.radius ** 2 - dx ** 2));
		}, 0);
		points.push(new Vector2(x, top));
	}
	const visible = points.filter((point) => point.y > 0);
	const bottom = visible
		.toReversed()
		.map((point) => new Vector2(point.x, -0.08 * Math.cos(point.x * 1.2)));
	return new Shape([...visible, ...bottom]);
}

// A loose wisp: a long, thin streak with a wavy top edge.
function createWispShape(random: Random) {
	const steps = 32;
	const phase = random() * Math.PI * 2;
	const top = Array.from({ length: steps + 1 }, (_, i) => {
		const t = i / steps;
		const lift =
			Math.sin(Math.PI * t) * (0.12 + 0.05 * Math.sin(t * 9 + phase));
		return new Vector2(-2 + t * 4, lift);
	});
	const bottom = top
		.toReversed()
		.map(
			(point) =>
				new Vector2(point.x, -Math.sin(Math.PI * ((point.x + 2) / 4)) * 0.05),
		);
	return new Shape([...top, ...bottom]);
}

const CLOUD_FRAGMENT = /* glsl */ `
	uniform vec3 uColor;
	uniform vec3 uNightColor;
	uniform float uNight;
	uniform float uOpacity;
	varying vec2 vUv;
	${NOISE_GLSL}
	void main() {
		float grain = fbm(vUv * vec2(3.0, 9.0));
		vec3 color = mix(uColor, uNightColor, uNight) * (0.97 + grain * 0.05);
		// Clouds thin out at night, so the stars show through.
		gl_FragColor = vec4(color, uOpacity * (1.0 - uNight * 0.7));
		#include <colorspace_fragment>
	}
`;

const CLOUD_VERTEX = /* glsl */ `
	varying vec2 vUv;
	void main() {
		vUv = position.xy;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`;

export interface Cloud {
	group: Group;
	speed: number;
}

type CloudKind = "dense" | "medium" | "loose";

interface CloudSpot {
	kind: CloudKind;
	x: number;
	y: number;
	z: number;
	scale: [number, number];
}

// Spread one kind of cloud across the whole sky width, with some jitter.
function spread(params: {
	random: Random;
	kind: CloudKind;
	count: number;
	y: [number, number];
	z: [number, number];
	scale: [[number, number], [number, number]];
}): Array<CloudSpot> {
	const random = params.random;
	return Array.from({ length: params.count }, (_, i) => ({
		kind: params.kind,
		x: -95 + ((i + 0.5) / params.count) * 190 + between(random, [-8, 8]),
		y: between(random, params.y),
		z: between(random, params.z),
		scale: [between(random, params.scale[0]), between(random, params.scale[1])],
	}));
}

export function createClouds(params: {
	random: Random;
	shared: SharedUniforms;
}) {
	const random = params.random;
	const cloudMaterial = (color: string, opacity: number) =>
		new ShaderMaterial({
			vertexShader: CLOUD_VERTEX,
			fragmentShader: CLOUD_FRAGMENT,
			transparent: true,
			depthWrite: false,
			uniforms: {
				uColor: { value: new Color(color) },
				uNightColor: { value: new Color(PALETTE.nightBottom) },
				uNight: params.shared.uNight,
				uOpacity: { value: opacity },
			},
		});
	const shade = cloudMaterial(PALETTE.cloudShade, 1);
	const fill = cloudMaterial(PALETTE.cloud, 1);
	const light = cloudMaterial(PALETTE.cloudLight, 1);
	const line = cloudMaterial(PALETTE.cloudLine, 1);
	const wisp = cloudMaterial(PALETTE.cloud, 0.55);

	const spots = [
		...spread({
			random,
			kind: "dense",
			count: 4,
			y: [17, 23],
			z: [-92, -82],
			scale: [
				[6.5, 8.5],
				[6, 7.5],
			],
		}),
		...spread({
			random,
			kind: "medium",
			count: 7,
			y: [20, 31],
			z: [-84, -70],
			scale: [
				[3.2, 5.2],
				[2.8, 4.4],
			],
		}),
		...spread({
			random,
			kind: "loose",
			count: 8,
			y: [27, 36],
			z: [-100, -90],
			scale: [
				[7, 11],
				[2, 3],
			],
		}),
	].toSorted((a, b) => a.z - b.z);

	// Layers of one cloud, back to front. Far clouds draw first, so a near
	// cloud always covers a far one.
	const build = (spot: CloudSpot, order: number) => {
		const group = new Group();
		const layer = (mesh: Mesh, index: number) => {
			mesh.renderOrder = order * 10 + index;
			group.add(mesh);
			return mesh;
		};

		if (spot.kind === "loose") {
			for (let i = 0; i < 3; i += 1) {
				const streak = layer(
					new Mesh(new ShapeGeometry(createWispShape(random), 8), wisp),
					i,
				);
				streak.position.set(
					between(random, [-0.8, 0.8]),
					i * 0.14 - 0.14,
					0.001 * i,
				);
				streak.scale.set(between(random, [0.6, 1]), 1, 1);
			}
		} else {
			const dense = spot.kind === "dense";
			const geometry = new ShapeGeometry(
				createCloudShape({
					random,
					bumps: dense ? 7 : 5,
					height: dense ? 1.35 : 1,
				}),
				12,
			);
			const outline = layer(new Mesh(geometry, line), 0);
			outline.scale.setScalar(1.045);
			outline.position.set(0.02, -0.03, -0.01);
			// A dense cumulus is painted in three tones: a shaded base, the body
			// lifted above it, and a bright highlight on the sunny top.
			layer(new Mesh(geometry, dense ? shade : fill), 1);
			if (dense) {
				const body = layer(new Mesh(geometry, fill), 2);
				body.scale.set(0.93, 0.9, 1);
				body.position.set(-0.05, 0.16, 0.002);
				const highlight = layer(new Mesh(geometry, light), 3);
				highlight.scale.set(0.55, 0.5, 1);
				highlight.position.set(-0.45, 0.62, 0.004);
			}
		}

		group.position.set(spot.x, spot.y, spot.z);
		group.scale.set(spot.scale[0], spot.scale[1], 1);
		// Nearer clouds drift faster, which gives the sky depth.
		return { group, speed: 0.35 + (100 + spot.z) * 0.03 };
	};

	const clouds: Array<Cloud> = spots.map(build);
	return { clouds, materials: [shade, fill, light, line, wisp] };
}

export function driftClouds(clouds: ReadonlyArray<Cloud>, delta: number) {
	for (const cloud of clouds) {
		cloud.group.position.x += cloud.speed * delta;
		if (cloud.group.position.x > 105) cloud.group.position.x = -105;
	}
}
