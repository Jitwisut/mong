"use client";

import { createElement, type CSSProperties, type ElementType, useEffect, useRef, useState } from "react";

interface RevealProps {
  as?: ElementType;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Reveal({ as = "div", children, className = "", style }: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref: (element: HTMLElement | null) => {
        elementRef.current = element;
      },
      className: `fade-in-up${visible ? " visible" : ""}${className ? ` ${className}` : ""}`,
      style,
    },
    children,
  );
}
