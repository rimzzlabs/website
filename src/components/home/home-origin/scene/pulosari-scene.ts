import {
	type Material,
	Mesh,
	PerspectiveCamera,
	Points,
	Scene,
	SRGBColorSpace,
	Vector3,
	WebGLRenderer,
} from "three";

import { populate } from "./layout";
import { createSharedUniforms } from "./paint-material";
import { createRandom } from "./random";
import { createClouds, createSky, driftClouds } from "./sky";
import { createGround } from "./terrain";
import { createBirds, createFireflies } from "./wildlife";

type Result<T> = { ok: true; value: T } | { ok: false; error: Error };

export interface PulosariScene {
	resize: (width: number, height: number) => void;
	start: () => void;
	stop: () => void;
	render: () => void;
	setNight: (night: boolean, instant: boolean) => void;
	dispose: () => void;
}

export function createPulosariScene(
	canvas: HTMLCanvasElement,
): Result<PulosariScene> {
	let renderer: WebGLRenderer;
	try {
		renderer = new WebGLRenderer({
			canvas,
			antialias: true,
			powerPreference: "low-power",
		});
	} catch (error) {
		return {
			ok: false,
			error:
				error instanceof Error ? error : new Error("WebGL is not available"),
		};
	}
	renderer.outputColorSpace = SRGBColorSpace;
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

	const random = createRandom(1987);
	const scene = new Scene();
	const camera = new PerspectiveCamera(32, 16 / 9, 0.5, 400);
	const target = new Vector3(0, 6.8, -30);
	const home = new Vector3(0, 2.4, 16);

	const shared = createSharedUniforms();
	const sky = createSky(shared);
	const cloudLayer = createClouds({ random, shared });
	const ground = createGround(shared);
	const fireflies = createFireflies({ random, shared });
	const birds = createBirds({ random, shared });
	scene.add(
		sky.mesh,
		ground.mesh,
		fireflies.points,
		birds.group,
		...cloudLayer.clouds.map((cloud) => cloud.group),
	);
	const populated = populate({ scene, random, shared, viewpoint: home });

	let nightTarget = 0;
	let frame = 0;
	let running = false;
	let elapsed = 0;
	let last = 0;

	const draw = (elapsed: number, delta: number) => {
		shared.uTime.value = elapsed;
		// Ease toward day or night, so a theme switch fades over about a second.
		shared.uNight.value +=
			(nightTarget - shared.uNight.value) * Math.min(1, delta * 2.5);
		driftClouds(cloudLayer.clouds, delta);
		birds.update(delta);
		// Buffaloes walk home at night and the owl flies in; by day they swap.
		const night = shared.uNight.value;
		for (const buffalo of populated.buffaloes)
			buffalo.update({ time: elapsed, delta, night });
		populated.owl.update({ time: elapsed, delta, night });
		populated.squirrel.update({ delta, night });
		// A slow drift, like the camera is held by someone standing in the field.
		camera.position.set(
			home.x + Math.sin(elapsed * 0.11) * 0.7,
			home.y + Math.sin(elapsed * 0.17) * 0.12,
			home.z,
		);
		camera.lookAt(target);
		renderer.render(scene, camera);
	};

	// Time only advances while the loop runs, so the wind picks up where it
	// stopped when the scene scrolls back into view.
	const loop = (now: number) => {
		frame = requestAnimationFrame(loop);
		const delta = Math.min((now - last) / 1000, 0.1);
		last = now;
		elapsed += delta;
		draw(elapsed, delta);
	};

	const fit = (width: number, height: number) => {
		if (width === 0 || height === 0) return;
		camera.aspect = width / height;
		// Narrow screens get a wider lens, so the whole mountain still fits.
		camera.fov = camera.aspect < 1.4 ? 38 : 32;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height, false);
		sky.material.uniforms.uAspect.value = camera.aspect;
		fireflies.material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
	};

	return {
		ok: true,
		value: {
			resize: fit,
			start: () => {
				if (running) return;
				running = true;
				last = performance.now();
				frame = requestAnimationFrame(loop);
			},
			stop: () => {
				running = false;
				cancelAnimationFrame(frame);
			},
			// A still frame snaps animals to where the theme puts them. While the
			// loop runs, only redraw, so a resize never makes them jump.
			render: () => {
				if (running) renderer.render(scene, camera);
				else draw(elapsed, 0);
			},
			setNight: (night, instant) => {
				nightTarget = night ? 1 : 0;
				if (instant) shared.uNight.value = nightTarget;
			},
			dispose: () => {
				cancelAnimationFrame(frame);
				scene.traverse((object) => {
					if (!(object instanceof Mesh || object instanceof Points)) return;
					object.geometry.dispose();
					const materials: Array<Material> = Array.isArray(object.material)
						? object.material
						: [object.material];
					for (const material of materials) material.dispose();
				});
				renderer.dispose();
			},
		},
	};
}
