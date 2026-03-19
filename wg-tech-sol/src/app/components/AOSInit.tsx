"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    AOS.init({
      duration: 1500,      // your site-wide default
      easing: "linear",    // your site-wide default
      offset: 50,
      once: false,         // allow re-animate when re-entering
      mirror: true,        // hide/animate-out when element scrolls past (top)
      // throttleDelay: 50, // optional fine-tuning
      // debounceDelay: 0,
      disable: prefersReduced, // respect reduced motion
    });
  }, []);

  // Refresh AOS on route change so new elements get animations
  useEffect(() => {
    AOS.refresh();
  }, [pathname]);

  return null;
}