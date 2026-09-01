"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const RTL_PREFIX = "/ar";

/**
 * Root-level client component that keeps <html lang>/<dir> in sync with the
 * active locale. The root layout hard-codes `lang="en"` for server-side
 * rendering; this restores the correct values after hydration and on every
 * client-side navigation (e.g. / -> /ar/), so the RTL CSS in
 * `html[lang='ar']` rules applies reliably.
 */
export default function DocMeta() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (pathname === RTL_PREFIX || pathname.startsWith(RTL_PREFIX + "/")) {
      if (root.lang !== "ar") root.lang = "ar";
      if (root.dir !== "rtl") root.dir = "rtl";
    } else {
      if (root.lang !== "en") root.lang = "en";
      if (root.dir !== "ltr") root.dir = "ltr";
    }
  }, [pathname]);

  return null;
}