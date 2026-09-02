"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { scrollToElement } from "./SmoothScroll";

/**
 * One header height, so the "My work" row lands flush beneath the sticky bar
 * -- as close to the top as it can sit and still be fully visible.
 *
 * This exact value also hides the hero completely. #work begins where the hero
 * ends, and the hero carries 80px of bottom padding, so the only hero left on
 * screen is that empty padding, sitting precisely behind the header. Stopping
 * further up leaves a band of it showing, which the auto-hiding header then
 * uncovers on the way down and puts the scroll cue back in view.
 */
const WORK_OFFSET = -80;

/**
 * Link to the homepage work section that keeps working on repeat clicks.
 *
 * `next/link` treats a navigation to the URL you are already on as a no-op, so
 * once the address bar read `/#work` every later click did nothing. On the
 * homepage we scroll the section into view ourselves instead of relying on the
 * router; from any other page the normal navigation home still runs and Next
 * jumps to the section on arrival.
 */
export function WorkLink({
  className,
  children,
  onNavigate,
}: {
  className?: string;
  children: ReactNode;
  /** Runs after a same-page scroll, e.g. to close the mobile menu. */
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Off the homepage there is nothing to scroll to yet -- let Next navigate.
    if (pathname !== "/") return;
    // Leave open-in-new-tab and middle-click to the browser.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = document.getElementById("work");
    if (!target) return;

    event.preventDefault();
    // Goes through Lenis when it is running, so this glides like the rest of
    // the page rather than jumping past it.
    scrollToElement(target, WORK_OFFSET);
    // Keep the address bar shareable without stacking history entries.
    window.history.replaceState(null, "", "/#work");
    onNavigate?.();
  };

  return (
    <Link href="/#work" onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
