import {
	Color,
	Float32BufferAttribute,
	Mesh,
	PlaneGeometry,
	ShaderMaterial,
	Vector2,
} from "three";

import { NOISE_GLSL, type SharedUniforms } from "./paint-material";
import { PALETTE } from "./palette";

function smoothMax(a: number, b: number, k: number) {
	const h = Math.max(k - Math.abs(a - b), 0) / k;
	return Math.max(a, b) + (h * h * k) / 4;
}

// The Pulosari silhouette from the photos: one broad cone, a flat-topped
// shoulder falling away to the right, and a long low ridge on the left.
// Radial gullies run down the slopes, like the ravines on the real mountain.
export function pulosariHeight(x: number, z: number) {
	const height = 13;
	const radius = Math.hypot(x, z * 1.25);
	const t = Math.max(0, 1 - radius / 21);
	const cone = height * t ** 1.15 * (1 - 0.16 * t ** 7);

	const shoulderDistance = Math.hypot((x - 10) * 0.75, z * 1.35);
	const shoulder = height * 0.6 * (1 - smoothstep(3, 15, shoulderDistance));

	const ridgeDistance = Math.hypot((x + 15) * 0.55, z * 1.5);
	const ridge = height * 0.32 * (1 - smoothstep(0, 18, ridgeDistance));

	let value = smoothMax(cone, smoothMax(shoulder, ridge, 2.5), 3);

	const angle = Math.atan2(z, x);
	const slope = t * (1 - t) * 4;
	value -= (0.5 + 0.5 * Math.sin(angle * 11 + radius * 0.18)) * 0.9 * slope;
	value +=
		Math.sin(x * 0.7 + z * 0.4) *
		Math.cos(z * 0.9 - x * 0.2) *
		0.25 *
		(value / height);
	return Math.max(0, value);
}

function smoothstep(edge0: number, edge1: number, value: number) {
	const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
	return t * t * (3 - 2 * t);
}

function displace(params: {
	geometry: PlaneGeometry;
	height: (x: number, z: number) => number;
	shade: (height: number, x: number) => Color;
}) {
	const geometry = params.geometry;
	geometry.rotateX(-Math.PI / 2);
	const position = geometry.getAttribute("position");
	const colors = new Float32Array(position.count * 3);
	for (let i = 0; i < position.count; i += 1) {
		const x = position.getX(i);
		const z = position.getZ(i);
		const height = params.height(x, z);
		position.setY(i, height);
		params.shade(height, x).toArray(colors, i * 3);
	}
	geometry.deleteAttribute("uv");
	geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
	geometry.setAttribute(
		"sway",
		new Float32BufferAttribute(new Float32Array(position.count), 1),
	);
	geometry.computeVertexNormals();
	return geometry;
}

// "detail" scales the mesh resolution; phones get a coarser mountain, which
// the forest lumps on top hide anyway.
export function createMountainGeometry(detail: number) {
	const low = new Color(PALETTE.mountainShadow);
	const mid = new Color(PALETTE.mountainMid);
	const high = new Color(PALETTE.mountainLight);
	return displace({
		geometry: new PlaneGeometry(
			76,
			44,
			Math.round(190 * Math.sqrt(detail)),
			Math.round(110 * Math.sqrt(detail)),
		),
		height: pulosariHeight,
		shade: (height, x) => {
			const patch = 0.5 + 0.5 * Math.sin(x * 0.9 + height * 1.7);
			return low
				.clone()
				.lerp(mid, Math.min(1, height / 5))
				.lerp(high, patch * 0.35 * Math.min(1, height / 9));
		},
	});
}

// Distant hazy hills that close the horizon behind and beside the mountain.
export function createHillsGeometry() {
	const color = new Color(PALETTE.ridgeShadow);
	return displace({
		geometry: new PlaneGeometry(240, 12, 160, 6),
		height: (x, z) => {
			const wave =
				2.6 +
				Math.sin(x * 0.07) * 1.8 +
				Math.sin(x * 0.19 + 1.4) * 0.9 +
				Math.sin(x * 0.43) * 0.3;
			return Math.max(0, wave * (1 - Math.abs(z) / 6));
		},
		shade: () => color,
	});
}

// Rice terraces: curved bands, golden near the camera and greener farther
// away, with furrows, bund lines, and a wind shimmer on the ripe rice.
export function createGround(shared: SharedUniforms) {
	const geometry = new PlaneGeometry(240, 80, 1, 1);
	geometry.rotateX(-Math.PI / 2);
	geometry.translate(0, 0, -24);

	const material = new ShaderMaterial({
		uniforms: {
			uTime: shared.uTime,
			uNight: shared.uNight,
			uNightHaze: { value: new Color(PALETTE.nightHaze) },
			uGold: { value: new Color(PALETTE.riceGold) },
			uGoldDeep: { value: new Color(PALETTE.riceGoldDeep) },
			uGreen: { value: new Color(PALETTE.riceGreen) },
			uGreenDeep: { value: new Color(PALETTE.riceGreenDeep) },
			uBund: { value: new Color(PALETTE.bund) },
			uHaze: { value: new Color(PALETTE.haze) },
			uHazeRange: { value: new Vector2(18, 70) },
		},
		vertexShader: /* glsl */ `
			varying vec3 vWorld;
			void main() {
				vec4 world = modelMatrix * vec4(position, 1.0);
				vWorld = world.xyz;
				gl_Position = projectionMatrix * viewMatrix * world;
			}
		`,
		fragmentShader: /* glsl */ `
			uniform float uTime;
			uniform float uNight;
			uniform vec3 uNightHaze;
			uniform vec3 uGold;
			uniform vec3 uGoldDeep;
			uniform vec3 uGreen;
			uniform vec3 uGreenDeep;
			uniform vec3 uBund;
			uniform vec3 uHaze;
			uniform vec2 uHazeRange;
			varying vec3 vWorld;

			${NOISE_GLSL}

			void main() {
				float wave = sin(vWorld.x * 0.07) * 1.6 + sin(vWorld.x * 0.17 + 1.3) * 0.6;
				float row = (vWorld.z + wave) / 3.4;
				float band = floor(row);
				float within = fract(row);
				float pick = hash21(vec2(band, 3.1));

				float ripe = smoothstep(-18.0, 4.0, vWorld.z);
				float isGold = step(pick, ripe * 0.5 + 0.04);
				vec3 gold = mix(uGold, uGoldDeep, pick * 0.8);
				vec3 green = mix(uGreen, uGreenDeep, pick);
				vec3 color = mix(green, gold, isGold);

				// Each terrace is a little lighter at its top edge.
				color *= 0.9 + 0.14 * within;

				// Furrows, faded out where they would alias in the distance.
				float furrowCoord = (vWorld.z + wave) * 2.2 + fbm(vWorld.xz * 0.4) * 0.8;
				float furrowWidth = fwidth(furrowCoord);
				float furrow = smoothstep(0.75, 0.9, fract(furrowCoord)) * (1.0 - smoothstep(0.15, 0.6, furrowWidth));
				color *= 1.0 - furrow * 0.14;

				// Some paddies are freshly planted: flooded, mirroring the sky,
				// with rows of seedlings poking out of the water.
				float flooded = step(0.8, hash21(vec2(band, 9.7))) * (1.0 - isGold) * step(vWorld.z, -2.0);
				vec3 water = mix(vec3(0.62, 0.79, 0.88), vec3(0.8, 0.89, 0.94), fbm(vWorld.xz * vec2(0.25, 0.8)));
				float seedlings = smoothstep(0.5, 0.7, fract(furrowCoord)) * (1.0 - smoothstep(0.2, 0.7, furrowWidth));
				color = mix(color, mix(water, uGreen, 0.2 + seedlings * 0.55), flooded);

				float bundWidth = fwidth(row) * 1.5 + 0.035;
				float bund = 1.0 - smoothstep(0.0, bundWidth, within);
				// Far away, the bunds of many terraces pile into one dark line on the
				// horizon, so they fade out with distance.
				float bundFade = 1.0 - smoothstep(22.0, 40.0, length(vWorld - cameraPosition));
				color = mix(color, uBund, bund * 0.85 * bundFade);

				float shimmer = sin(vWorld.x * 0.55 + vWorld.z * 0.35 - uTime * 1.4);
				color *= 1.0 + shimmer * 0.045 * isGold;
				color *= 0.95 + 0.1 * fbm(vWorld.xz * vec2(0.9, 2.4));

				color = mix(color, color * vec3(0.22, 0.28, 0.46) + vec3(0.008, 0.012, 0.03), uNight);
				float haze = smoothstep(uHazeRange.x, uHazeRange.y, length(vWorld - cameraPosition)) * 0.5;
				color = mix(color, mix(uHaze, uNightHaze, uNight), haze);

				gl_FragColor = vec4(color, 1.0);
				#include <colorspace_fragment>
			}
		`,
	});

	return { mesh: new Mesh(geometry, material), material };
}
