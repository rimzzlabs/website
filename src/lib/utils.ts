import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { buildUrl } from "cloudinary-build-url";
import type { CldOptions } from "@cld-apis/types";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCloudinaryImage(url: string, options: CldOptions = {}) {
  return buildUrl(url, {
    cloud: { cloudName: "rizkicitra", ...options?.cloud },
    transformations: options.transformations,
  });
}

export function objectToURIComponent<O extends object>(obj: O) {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
}
