import {
	Color,
	DoubleSide,
	FrontSide,
	ShaderMaterial,
	Vector2,
	Vector3,
} from "three";

import { PALETTE } from "./palette";

// Shared GLSL noise. Value noise is enough for brush texture and much cheaper
// than simplex on phones.
export const NOISE_GLSL = /* glsl */ `
	float hash21(vec2 p) {
		p = fract(p * vec2(123.34, 456.21));
		p += dot(p, p + 45.32);
		return fract(p.x * p.y);
	}

	float valueNoise(vec2 p) {
		vec2 i = floor(p);
		vec2 f = fract(p);
		vec2 u = f * f * (3.0 - 2.0 * f);
		float a = hash21(i);
		float b = hash21(i + vec2(1.0, 0.0));
		float c = hash21(i + vec2(0.0, 1.0));
		float d = hash21(i + vec2(1.0, 1.0));
		return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
	}

	float fbm(vec2 p) {
		float value = 0.0;
		float amplitude = 0.5;
		for (int octave = 0; octave < 4; octave++) {
			value += amplitude * valueNoise(p);
			p *= 2.03;
			amplitude *= 0.5;
		}
		return value;
	}
`;

const VERTEX = /* glsl */ `
	attribute float sway;
	attribute float glow;

	uniform float uTime;
	uniform float uSwayAmount;

	varying vec3 vColor;
	varying vec3 vNormal;
	varying vec3 vWorld;
	varying float vGlow;

	void main() {
		vGlow = glow;
		mat4 model = modelMatrix;
		#ifdef USE_INSTANCING
			model = modelMatrix * instanceMatrix;
		#endif

		vec4 world = model * vec4(position, 1.0);

		// Wind: a slow wave rolls across the scene; "sway" is 0 at roots and
		// 1 at the tips, so only the loose parts of a plant move.
		float gust = sin(uTime * 1.1 + world.x * 0.18 + world.z * 0.12);
		float flutter = sin(uTime * 2.7 + world.x * 0.9 + world.y * 1.3);
		world.x += (gust * 0.8 + flutter * 0.2) * sway * uSwayAmount;
		world.z += flutter * 0.25 * sway * uSwayAmount;

		vWorld = world.xyz;
		vNormal = normalize(mat3(model) * normal);

		vColor = vec3(1.0);
		#ifdef USE_COLOR
			vColor = color;
		#endif
		#ifdef USE_INSTANCING_COLOR
			vColor *= instanceColor;
		#endif

		gl_Position = projectionMatrix * viewMatrix * world;
	}
`;

const FRAGMENT = /* glsl */ `
	uniform vec3 uLightDir;
	uniform vec3 uHaze;
	uniform vec3 uNightHaze;
	uniform float uNight;
	uniform vec2 uHazeRange;
	uniform float uHazeAmount;
	uniform float uStrokeScale;

	varying vec3 vColor;
	varying vec3 vNormal;
	varying vec3 vWorld;
	varying float vGlow;

	${NOISE_GLSL}

	void main() {
		vec3 normal = normalize(vNormal) * (gl_FrontFacing ? 1.0 : -1.0);
		float light = dot(normal, uLightDir) * 0.5 + 0.5;

		// Brush strokes: stretched noise nudges the light bands, so each edge
		// wobbles like a gouache stroke instead of a clean toon step.
		vec2 strokeUv = vec2(vWorld.x + vWorld.z * 0.35, vWorld.y * 2.6 + vWorld.z * 0.2);
		float stroke = fbm(strokeUv * uStrokeScale);
		light += (stroke - 0.5) * 0.42;

		float band = smoothstep(0.40, 0.43, light) * 0.55 + smoothstep(0.66, 0.69, light) * 0.45;
		vec3 color = vColor * mix(0.68, 1.1, band);

		// Pigment variation, like uneven paint coverage.
		color *= 0.94 + 0.12 * fbm(vWorld.xy * uStrokeScale * 3.1 + 7.0);

		// Night: the same painting under moonlight, cooler and darker. The lit
		// band stays a touch brighter, so shapes still read.
		vec3 moonlit = color * vec3(0.22, 0.28, 0.46) * mix(0.8, 1.3, band) + vec3(0.008, 0.012, 0.03);
		color = mix(color, moonlit, uNight);
		color = mix(color, vec3(1.0, 0.78, 0.42), vGlow * uNight);

		float distanceToCamera = length(vWorld - cameraPosition);
		float haze = smoothstep(uHazeRange.x, uHazeRange.y, distanceToCamera) * uHazeAmount;
		color = mix(color, mix(uHaze, uNightHaze, uNight), haze * (1.0 - vGlow * uNight));

		gl_FragColor = vec4(color, 1.0);
		#include <colorspace_fragment>
	}
`;

export const LIGHT_DIRECTION = new Vector3(-0.55, 0.75, 0.45).normalize();

// Time and night are shared by every material in the scene, so one update
// per frame reaches all of them.
export interface SharedUniforms {
	uTime: { value: number };
	uNight: { value: number };
}

export function createSharedUniforms(): SharedUniforms {
	return { uTime: { value: 0 }, uNight: { value: 0 } };
}

interface PaintMaterialOptions {
	shared: SharedUniforms;
	swayAmount?: number;
	strokeScale?: number;
	hazeAmount?: number;
	doubleSide?: boolean;
	vertexColors?: boolean;
}

export function createPaintMaterial(options: PaintMaterialOptions) {
	return new ShaderMaterial({
		vertexShader: VERTEX,
		fragmentShader: FRAGMENT,
		vertexColors: options.vertexColors ?? true,
		side: options.doubleSide ? DoubleSide : FrontSide,
		uniforms: {
			uTime: options.shared.uTime,
			uNight: options.shared.uNight,
			uNightHaze: { value: new Color(PALETTE.nightHaze) },
			uSwayAmount: { value: options.swayAmount ?? 0 },
			uLightDir: { value: LIGHT_DIRECTION },
			uHaze: { value: new Color(PALETTE.haze) },
			uHazeRange: { value: new Vector2(18, 70) },
			uHazeAmount: { value: options.hazeAmount ?? 0.55 },
			uStrokeScale: { value: options.strokeScale ?? 1.4 },
		},
	});
}
