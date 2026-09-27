import {
	Color,
	IcosahedronGeometry,
	InstancedMesh,
	type Material,
	Object3D,
} from "three";

import { paint } from "./geometry";
import { PALETTE } from "./palette";
import { between, pick, type Random } from "./random";
import { pulosariHeight } from "./terrain";

// The forest that covers Pulosari: thousands of small canopy lumps sitting
// on the mountain surface. The bumps give the slopes and the ridge line the
// broccoli texture of a tropical forest seen from far away.
export function createForest(params: {
	random: Random;
	material: Material;
	count: number;
}) {
	const random = params.random;
	const geometry = paint(new IcosahedronGeometry(1, 0), "#ffffff");
	// Sphere normals instead of face normals: each lump shades as one soft
	// canopy, without the faceted dark patches.
	const position = geometry.getAttribute("position");
	const normal = geometry.getAttribute("normal");
	for (let i = 0; i < position.count; i += 1) {
		const x = position.getX(i);
		const y = position.getY(i);
		const z = position.getZ(i);
		const length = Math.hypot(x, y, z);
		normal.setXYZ(i, x / length, y / length, z / length);
	}
	geometry.scale(1, 0.72, 1);

	const spots: Array<{ x: number; y: number; z: number; size: number }> = [];
	// Rejection sampling over the mountain's footprint; plain loop because it
	// tries a few thousand points once, at startup.
	for (
		let attempt = 0;
		attempt < params.count * 3.5 && spots.length < params.count;
		attempt += 1
	) {
		const x = between(random, [-36, 36]);
		const z = between(random, [-20, 20]);
		const height = pulosariHeight(x, z);
		if (height < 0.8) continue;
		// Front slopes need more trees than the far side, which is hidden.
		if (z < -6 && random() < 0.7) continue;
		const size = between(random, [0.55, 1.05]) * (1 - height / 40);
		spots.push({ x, y: height - size * 0.25, z, size });
	}

	const mesh = new InstancedMesh(geometry, params.material, spots.length);
	const dummy = new Object3D();
	spots.forEach((spot, index) => {
		dummy.position.set(spot.x, spot.y, spot.z);
		dummy.rotation.set(0, random() * Math.PI, 0);
		dummy.scale.setScalar(spot.size);
		dummy.updateMatrix();
		mesh.setMatrixAt(index, dummy.matrix);
		mesh.setColorAt(index, new Color(pick(random, PALETTE.forest)));
	});
	mesh.computeBoundingSphere();
	return mesh;
}
