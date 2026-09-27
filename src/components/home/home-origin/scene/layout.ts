import {
	type BufferGeometry,
	Color,
	InstancedMesh,
	type Material,
	Mesh,
	Object3D,
	type Scene,
	Vector3,
} from "three";

import { type Buffalo, createBuffalo } from "./animals";
import { createForest } from "./forest";
import { merge, place } from "./geometry";
import { createOwl, type Owl } from "./owl";
import { createPaintMaterial, type SharedUniforms } from "./paint-material";
import { PALETTE } from "./palette";
import {
	createBananaGeometry,
	createBushGeometry,
	createCoconutGeometry,
	createFlowerGeometry,
	createMangoGeometry,
	createRiceClumpGeometry,
	createRiceTuftGeometry,
	createTreeGeometry,
	MANGO_PERCH_RADIUS,
	MANGO_SQUIRREL_STOPS,
	mangoPerchTop,
} from "./plants";
import { between, pick, type Random } from "./random";
import { createSquirrel, type Squirrel } from "./squirrel";
import { createHillsGeometry, createMountainGeometry } from "./terrain";
import {
	createFlagGeometry,
	createRoadGeometry,
	createSchoolGeometry,
} from "./village";

interface Placement {
	x: number;
	z: number;
	scale: [number, number, number];
	rotation?: number;
	tilt?: number;
	color?: string;
}

function instance(params: {
	geometry: BufferGeometry;
	material: Material;
	placements: ReadonlyArray<Placement>;
}) {
	const mesh = new InstancedMesh(
		params.geometry,
		params.material,
		params.placements.length,
	);
	const dummy = new Object3D();
	params.placements.forEach((placement, index) => {
		dummy.position.set(placement.x, 0, placement.z);
		dummy.rotation.set(0, placement.rotation ?? 0, placement.tilt ?? 0);
		dummy.scale.set(...placement.scale);
		dummy.updateMatrix();
		mesh.setMatrixAt(index, dummy.matrix);
		if (placement.color) mesh.setColorAt(index, new Color(placement.color));
	});
	mesh.computeBoundingSphere();
	return mesh;
}

function scatter(params: {
	random: Random;
	count: number;
	x: [number, number];
	z: [number, number];
	size: [number, number];
	colors?: ReadonlyArray<string>;
	avoid?: (x: number, z: number) => boolean;
}): Array<Placement> {
	const random = params.random;
	const placements: Array<Placement> = [];
	for (
		let attempt = 0;
		placements.length < params.count && attempt < params.count * 4;
		attempt += 1
	) {
		const x = between(random, params.x);
		const z = between(random, params.z);
		if (params.avoid?.(x, z)) continue;
		const size = between(random, params.size);
		placements.push({
			x,
			z,
			scale: [size, size * between(random, [0.9, 1.15]), size],
			rotation: random() * Math.PI * 2,
			tilt: between(random, [-0.06, 0.06]),
			color: params.colors ? pick(random, params.colors) : undefined,
		});
	}
	return placements;
}

// Keep plants off the road, the school yard, and the buffalo pasture.
function isOpenGround(x: number, z: number) {
	const onRoad = x > 4.8 && x < 10 && z > -14;
	const inSchoolYard = x > 6 && x < 20 && z > -16 && z < -5;
	const inPasture = x > -7 && x < 1.5 && z > -10 && z < -1.5;
	const underMango = x > -9.5 && x < -3.5 && z > -1.5 && z < 4.5;
	return onRoad || inSchoolYard || inPasture || underMango;
}

export interface Populated {
	materials: Array<Material>;
	buffaloes: Array<Buffalo>;
	owl: Owl;
	squirrel: Squirrel;
}

export function populate(params: {
	scene: Scene;
	random: Random;
	shared: SharedUniforms;
	viewpoint: Vector3;
}): Populated {
	const random = params.random;
	const shared = params.shared;
	const plants = createPaintMaterial({
		shared,
		swayAmount: 0.35,
		doubleSide: true,
		strokeScale: 2.2,
	});
	const solid = createPaintMaterial({
		shared,
		strokeScale: 1.6,
		doubleSide: true,
	});
	const land = createPaintMaterial({
		shared,
		strokeScale: 0.9,
		hazeAmount: 0.6,
	});
	const flatland = createPaintMaterial({ shared, strokeScale: 1.2 });
	flatland.polygonOffset = true;
	flatland.polygonOffsetFactor = -2;

	const mountain = new Mesh(createMountainGeometry(), land);
	mountain.position.set(-3, -0.05, -36);
	const forest = createForest({ random, material: land });
	forest.position.copy(mountain.position);
	const hills = new Mesh(createHillsGeometry(), land);
	hills.position.set(0, -0.05, -62);
	const road = new Mesh(createRoadGeometry(), flatland);

	const canopy = [...PALETTE.canopy];
	const treeLine = (["round", "wide", "tall"] as const).map((variant) =>
		instance({
			geometry: createTreeGeometry(variant),
			material: plants,
			placements: {
				round: scatter({
					random,
					count: 34,
					x: [-46, 46],
					z: [-23, -15],
					size: [3.4, 5.4],
				}),
				wide: scatter({
					random,
					count: 24,
					x: [-46, 46],
					z: [-22, -16],
					size: [3.8, 5.6],
				}),
				tall: scatter({
					random,
					count: 4,
					x: [-22, -9],
					z: [-15, -11],
					size: [7.5, 9.5],
					avoid: isOpenGround,
				}),
			}[variant],
		}),
	);

	const coconuts = instance({
		geometry: createCoconutGeometry(),
		material: plants,
		placements: [
			// Palms stand in front of the tree line, where their trunks are seen
			// rising from the field instead of appearing out of the canopy.
			...scatter({
				random,
				count: 4,
				x: [-20, -12],
				z: [-10, -6],
				size: [7.5, 9.5],
			}),
			...scatter({
				random,
				count: 3,
				x: [20, 25],
				z: [-7, -3],
				size: [8, 10],
			}),
			{ x: 13, z: 1.5, scale: [12.5, 12.5, 12.5], rotation: 2.6, tilt: 0.05 },
		],
	});

	const bushes = instance({
		geometry: createBushGeometry(),
		material: plants,
		placements: [
			...scatter({
				random,
				count: 50,
				x: [-44, 44],
				z: [-15.5, -12.5],
				size: [0.9, 1.7],
				colors: [...canopy, ...canopy, PALETTE.bushes[1], PALETTE.bushes[4]],
			}),
			...scatter({
				random,
				count: 8,
				x: [5, 9],
				z: [-12, -7],
				size: [0.7, 1.1],
				colors: PALETTE.bushes,
			}),
			...scatter({
				random,
				count: 8,
				x: [-11, -5],
				z: [2, 6],
				size: [0.8, 1.3],
				colors: PALETTE.bushes,
				avoid: isOpenGround,
			}),
			...scatter({
				random,
				count: 6,
				x: [10, 14],
				z: [3, 7],
				size: [0.8, 1.2],
				colors: PALETTE.bushes,
			}),
		],
	});

	const bananas = instance({
		geometry: createBananaGeometry(),
		material: plants,
		placements: [
			...scatter({
				random,
				count: 5,
				x: [-13, -7],
				z: [-2, 4],
				size: [2.4, 3.4],
				avoid: isOpenGround,
			}),
			...scatter({
				random,
				count: 4,
				x: [10.5, 14.5],
				z: [-3, 3],
				size: [2.4, 3.2],
			}),
			...scatter({
				random,
				count: 5,
				x: [18, 24],
				z: [-13, -6],
				size: [2.2, 3],
			}),
		],
	});

	const school = new Mesh(createSchoolGeometry(), solid);
	const flag = new Mesh(createFlagGeometry(), plants);
	for (const part of [school, flag]) {
		part.position.set(12.5, 0, -10.5);
		part.rotation.y = -0.45;
	}

	const tufts = instance({
		geometry: createRiceTuftGeometry(),
		material: plants,
		placements: scatter({
			random,
			count: 380,
			x: [-16, 16],
			z: [-7, 5.5],
			size: [0.45, 0.75],
			avoid: isOpenGround,
		}),
	});

	const clumps = instance({
		geometry: createRiceClumpGeometry(3),
		material: plants,
		placements: scatter({
			random,
			count: 70,
			x: [-7.5, 7.5],
			z: [6.5, 10.5],
			size: [1.4, 2.1],
		}),
	});

	const flowers = new Mesh(
		merge(
			[
				{ x: -4.6, z: 9.6, s: 2.1, color: PALETTE.flowers[0] },
				{ x: -3.9, z: 10.2, s: 1.7, color: PALETTE.flowers[1] },
				{ x: -2.4, z: 9.9, s: 1.5, color: PALETTE.flowers[2] },
				{ x: 3.1, z: 10.1, s: 1.7, color: PALETTE.flowers[2] },
				{ x: 4.4, z: 9.4, s: 2.2, color: PALETTE.flowers[0] },
				{ x: 5.2, z: 10.4, s: 1.6, color: PALETTE.flowers[1] },
			].map((flower) =>
				place(createFlowerGeometry(flower.color), {
					x: flower.x,
					z: flower.z,
					s: flower.s,
				}),
			),
		),
		plants,
	);

	const buffaloes = [
		{ x: -3.8, z: -3.4, rotation: 0.35, size: 1.1, phase: 0 },
		{ x: -0.8, z: -7.6, rotation: Math.PI - 0.5, size: 1, phase: 0.45 },
	].map((spot, index) =>
		// At night they walk off the left edge of the field, home to the pen.
		createBuffalo({
			material: solid,
			phase: spot.phase,
			home: { x: spot.x, z: spot.z, rotation: spot.rotation },
			barn: { x: -17, z: -8 - index * 2.5 },
			size: spot.size,
		}),
	);

	// The mango tree on the left. Its low limb is the owl's perch.
	const mango = new Mesh(createMangoGeometry(), plants);
	mango.position.set(-6.4, 0, 1.2);
	mango.rotation.y = 0.15;
	mango.scale.setScalar(6);
	mango.updateMatrixWorld(true);
	// The owl stands on top of the perch, nudged toward the camera by the
	// branch's thickness so its talons wrap over the front of the branch.
	const perchTop = mango.localToWorld(mangoPerchTop());
	const towardCamera = params.viewpoint
		.clone()
		.sub(perchTop)
		.setY(0)
		.normalize();
	const owl = createOwl({
		shared,
		perch: perchTop.addScaledVector(
			towardCamera,
			MANGO_PERCH_RADIUS * 6 + 0.04,
		),
		size: 0.72,
	});

	// The squirrel's route, pulled slightly toward the camera so the trunk and
	// limb never hide it.
	const onTree = (local: [number, number, number]) => {
		const point = mango.localToWorld(new Vector3(...local));
		const toward = params.viewpoint.clone().sub(point).setY(0).normalize();
		return point.addScaledVector(toward, 0.45);
	};
	const limb = onTree(MANGO_SQUIRREL_STOPS.limb);
	const squirrel = createSquirrel({
		size: 0.55,
		stops: {
			start: new Vector3(11, 0, 3.6),
			treeBase: onTree(MANGO_SQUIRREL_STOPS.treeBase),
			treeTop: onTree(MANGO_SQUIRREL_STOPS.treeTop),
			limb,
			exit: new Vector3(-15, limb.y - 1.2, limb.z),
		},
	});

	params.scene.add(
		hills,
		mountain,
		forest,
		road,
		...treeLine,
		coconuts,
		bushes,
		bananas,
		school,
		flag,
		tufts,
		clumps,
		flowers,
		...buffaloes.map((buffalo) => buffalo.group),
		mango,
		owl.group,
		squirrel.group,
	);

	return {
		materials: [plants, solid, land, flatland],
		buffaloes,
		owl,
		squirrel,
	};
}
