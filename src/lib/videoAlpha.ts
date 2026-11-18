/**
 * Does this browser honour the video's alpha channel?
 *
 * WebKit plays VP9 in WebM but ignores its transparency, painting what should
 * be see-through as opaque black -- so on any iOS browser a transparent clip
 * arrives as a black rectangle. Nothing reports this, and canPlayType says "probably"
 * either way, so the frame is drawn to a canvas and a corner pixel is read:
 * see-through means alpha survived decoding, opaque means it did not.
 */
export function rendersAlpha(video: HTMLVideoElement) {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return true; // cannot tell, so leave the video alone
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Callers keep their artwork away from the top-left corner, so that
    // pixel is see-through whenever alpha is being honoured.
    return context.getImageData(0, 0, 1, 1).data[3] < 250;
  } catch {
    return true; // same-origin should hold, but never break the page over this
  }
}
