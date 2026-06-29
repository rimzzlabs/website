import { useStore } from "@nanostores/react";
import { $dockPosition } from "@/lib/stores/dock";

export function useDockPosition() {
	return useStore($dockPosition);
}
