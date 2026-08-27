import type { ReactNode } from "react";

/**
 * Page shell. Owns the site's max width and responsive gutters so no page has
 * to restate them. Tokens live in `.container-page` in globals.css.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container-page ${className}`}>{children}</div>;
}
