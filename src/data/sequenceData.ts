/**
 * Sequence manifest and helpers for the Canvas scrollytelling scrub.
 * Total frames: 82 (frame_00 to frame_81)
 */

export const TOTAL_FRAMES = 82;

export const FRAME_PREFIX = "/sequence/frame_";
export const FRAME_SUFFIX = "_delay-0.05s.webp";

export function getFramePath(index: number): string {
  const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
  const paddedIndex = clampedIndex.toString().padStart(2, "0");
  return `${FRAME_PREFIX}${paddedIndex}${FRAME_SUFFIX}`;
}

export const ALL_FRAME_PATHS: string[] = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => getFramePath(i)
);
