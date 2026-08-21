"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function ScrollResetInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cameFromPopState = useRef(false);

  useEffect(() => {
    const markPopState = () => {
      cameFromPopState.current = true;
    };

    window.addEventListener("popstate", markPopState);
    return () => window.removeEventListener("popstate", markPopState);
  }, []);

  useEffect(() => {
    if (cameFromPopState.current) {
      cameFromPopState.current = false;
      return;
    }

    let frame = 0;
    const start = performance.now();

    const pinToTop = (time: number) => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      if (time - start < 260) {
        frame = requestAnimationFrame(pinToTop);
      }
    };

    frame = requestAnimationFrame(pinToTop);

    return () => cancelAnimationFrame(frame);
  }, [pathname, searchParams]);

  return null;
}

export function ScrollReset() {
  return (
    <Suspense fallback={null}>
      <ScrollResetInner />
    </Suspense>
  );
}
