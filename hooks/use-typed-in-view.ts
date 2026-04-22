"use client";

import { useRef } from "react";
import { useInView, type UseInViewOptions } from "framer-motion";

/**
 * Typed wrapper around framer-motion's useInView to avoid
 * `as unknown as React.RefObject<Element>` casts in every component.
 */
export function useTypedInView(options?: UseInViewOptions) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, options);
  return { ref, isInView };
}
