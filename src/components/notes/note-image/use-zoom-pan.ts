import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const DOUBLE_TAP_SCALE = 2.5;
const DOUBLE_TAP_MS = 300;
const DOUBLE_TAP_SLOP_PX = 24;

interface Transform {
	scale: number;
	x: number;
	y: number;
}

export interface ZoomPanApi {
	zoomIn: () => void;
	zoomOut: () => void;
	reset: () => void;
}

interface UseZoomPanParams {
	motionEnabled: boolean;
	onZoomedChange: (zoomed: boolean) => void;
}

interface PointerPoint {
	x: number;
	y: number;
}

function clampTransform(next: Transform, rect: DOMRect | undefined): Transform {
	const scale = Math.min(Math.max(next.scale, MIN_SCALE), MAX_SCALE);
	const maxX = rect ? ((scale - 1) * rect.width) / 2 : 0;
	const maxY = rect ? ((scale - 1) * rect.height) / 2 : 0;
	return {
		scale,
		x: Math.min(Math.max(next.x, -maxX), maxX),
		y: Math.min(Math.max(next.y, -maxY), maxY),
	};
}

export function useZoomPan(params: UseZoomPanParams) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [transform, setTransform] = useState<Transform>({ scale: 1, x: 0, y: 0 });
	const [gesturing, setGesturing] = useState(false);

	const transformRef = useRef(transform);
	transformRef.current = transform;

	const pointersRef = useRef(new Map<number, PointerPoint>());
	const panStartRef = useRef<{ pointer: PointerPoint; transform: Transform } | null>(null);
	const pinchStartRef = useRef<{ distance: number; transform: Transform } | null>(null);
	const lastTapRef = useRef<{ time: number; point: PointerPoint } | null>(null);
	const movedRef = useRef(false);

	const onZoomedChangeRef = useRef(params.onZoomedChange);
	onZoomedChangeRef.current = params.onZoomedChange;

	const applyTransform = useCallback((next: Transform) => {
		const rect = containerRef.current?.getBoundingClientRect();
		const clamped = clampTransform(next, rect);
		transformRef.current = clamped;
		setTransform(clamped);
		onZoomedChangeRef.current(clamped.scale > 1);
	}, []);

	// Zoom toward a viewport point: keep the image pixel under `point` fixed
	// while the scale changes (point is relative to the container center).
	const zoomAtPoint = useCallback(
		(point: PointerPoint, nextScale: number) => {
			const current = transformRef.current;
			const scale = Math.min(Math.max(nextScale, MIN_SCALE), MAX_SCALE);
			const ratio = scale / current.scale;
			applyTransform({
				scale,
				x: point.x - (point.x - current.x) * ratio,
				y: point.y - (point.y - current.y) * ratio,
			});
		},
		[applyTransform],
	);

	const toCenterOffset = useCallback((event: { clientX: number; clientY: number }) => {
		const rect = containerRef.current?.getBoundingClientRect();
		if (!rect) return { x: 0, y: 0 };
		return {
			x: event.clientX - rect.left - rect.width / 2,
			y: event.clientY - rect.top - rect.height / 2,
		};
	}, []);

	// React registers `onWheel` as passive, so preventDefault (needed to stop
	// page scroll while zooming) only works through a native listener.
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleWheel = (event: WheelEvent) => {
			event.preventDefault();
			const factor = Math.exp(-event.deltaY * 0.0015);
			zoomAtPoint(toCenterOffset(event), transformRef.current.scale * factor);
		};

		container.addEventListener("wheel", handleWheel, { passive: false });
		return () => container.removeEventListener("wheel", handleWheel);
	}, [zoomAtPoint, toCenterOffset]);

	const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
		pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
		movedRef.current = false;

		const zoomed = transformRef.current.scale > 1;
		const pointers = [...pointersRef.current.values()];

		if (pointers.length === 2) {
			pinchStartRef.current = {
				distance: Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y),
				transform: transformRef.current,
			};
			panStartRef.current = null;
		} else if (zoomed) {
			panStartRef.current = {
				pointer: { x: event.clientX, y: event.clientY },
				transform: transformRef.current,
			};
		}

		if (zoomed || pointers.length === 2) {
			event.currentTarget.setPointerCapture(event.pointerId);
			event.stopPropagation();
			setGesturing(true);
		}
	}, []);

	const handlePointerMove = useCallback(
		(event: React.PointerEvent<HTMLDivElement>) => {
			const tracked = pointersRef.current.get(event.pointerId);
			if (!tracked) return;
			pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

			const pointers = [...pointersRef.current.values()];
			const pinch = pinchStartRef.current;
			const pan = panStartRef.current;

			if (pinch && pointers.length === 2) {
				event.stopPropagation();
				const distance = Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y);
				const scale = pinch.transform.scale * (distance / pinch.distance);
				applyTransform({ scale, x: pinch.transform.x, y: pinch.transform.y });
				movedRef.current = true;
			} else if (pan) {
				event.stopPropagation();
				const deltaX = event.clientX - pan.pointer.x;
				const deltaY = event.clientY - pan.pointer.y;
				if (Math.hypot(deltaX, deltaY) > 4) movedRef.current = true;
				applyTransform({
					scale: pan.transform.scale,
					x: pan.transform.x + deltaX,
					y: pan.transform.y + deltaY,
				});
			}
		},
		[applyTransform],
	);

	const handlePointerUp = useCallback(
		(event: React.PointerEvent<HTMLDivElement>) => {
			pointersRef.current.delete(event.pointerId);

			if (pointersRef.current.size < 2) pinchStartRef.current = null;
			if (pointersRef.current.size === 0) {
				panStartRef.current = null;
				setGesturing(false);
			}

			if (event.type === "pointercancel" || movedRef.current) {
				lastTapRef.current = null;
				return;
			}

			// Unified double-tap for mouse and touch (dblclick is unreliable on iOS).
			const point = { x: event.clientX, y: event.clientY };
			const lastTap = lastTapRef.current;
			const isDoubleTap =
				lastTap !== null &&
				event.timeStamp - lastTap.time < DOUBLE_TAP_MS &&
				Math.hypot(point.x - lastTap.point.x, point.y - lastTap.point.y) < DOUBLE_TAP_SLOP_PX;

			if (isDoubleTap) {
				lastTapRef.current = null;
				const nextScale = transformRef.current.scale > 1 ? MIN_SCALE : DOUBLE_TAP_SCALE;
				zoomAtPoint(toCenterOffset(event), nextScale);
			} else {
				lastTapRef.current = { time: event.timeStamp, point };
			}
		},
		[zoomAtPoint, toCenterOffset],
	);

	const api = useMemo<ZoomPanApi>(
		() => ({
			zoomIn: () => zoomAtPoint({ x: 0, y: 0 }, transformRef.current.scale * 1.5),
			zoomOut: () => zoomAtPoint({ x: 0, y: 0 }, transformRef.current.scale / 1.5),
			reset: () => zoomAtPoint({ x: 0, y: 0 }, MIN_SCALE),
		}),
		[zoomAtPoint],
	);

	const style: React.CSSProperties = {
		transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
		transition: gesturing || !params.motionEnabled ? "none" : "transform 200ms ease-out",
	};

	return {
		containerRef,
		api,
		imageStyle: style,
		zoomed: transform.scale > 1,
		containerProps: {
			onPointerDown: handlePointerDown,
			onPointerMove: handlePointerMove,
			onPointerUp: handlePointerUp,
			onPointerCancel: handlePointerUp,
		},
	};
}
