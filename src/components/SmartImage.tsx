import Image from "next/image";
import type { CSSProperties } from "react";

export function isExternal(src: string): boolean {
  return /^https?:\/\//i.test(src);
}

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: CSSProperties;
};

/**
 * Always fills its nearest positioned ancestor, which is expected to define the
 * aspect ratio. Local files under /public go through next/image and get
 * optimisation plus responsive sizes; absolute URLs fall back to a plain <img>
 * because next/image would additionally require `images.remotePatterns` to be
 * configured for that host (see next.config.ts).
 */
export function SmartImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  style,
}: SmartImageProps) {
  if (isExternal(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- see note above
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`absolute inset-0 h-full w-full ${className}`}
        style={style}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      style={style}
    />
  );
}
