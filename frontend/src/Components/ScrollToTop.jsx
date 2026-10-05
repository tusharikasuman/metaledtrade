import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Every navigation (navbar, footer, buttons, even re-clicking the current
// page) starts the new page at the top. `key` changes on each navigation, so
// same-page clicks count too.
//
// Links with a #section (e.g. /projects#mills) scroll to that section
// instead. Sections use `scroll-mt-*` to clear the fixed navbar.
// - Same page: smooth scroll.
// - Arriving from another page: jump straight there (a smooth scroll would
//   start from the old page's position while the new page is still laying
//   out, and overshoot), then re-check briefly in case images or animations
//   above the section changed the layout.
export default function ScrollToTop() {
  const { key, hash, pathname } = useLocation();
  const lastPath = useRef(pathname);

  useLayoutEffect(() => {
    const samePage = lastPath.current === pathname;
    lastPath.current = pathname;

    if (!hash) {
      // "instant" overrides the site-wide smooth scrolling.
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    const scrollToSection = (behavior) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior, block: "start" });
      return Boolean(el);
    };

    if (samePage && scrollToSection("smooth")) return;

    // New page: wait for the section to render, then settle on it.
    let frame;
    let tries = 0;
    const timers = [];
    const findAndJump = () => {
      if (scrollToSection("instant")) {
        timers.push(setTimeout(() => scrollToSection("instant"), 300));
        timers.push(setTimeout(() => scrollToSection("instant"), 900));
      } else if (tries++ < 60) {
        frame = requestAnimationFrame(findAndJump);
      }
    };
    findAndJump();

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
    };
  }, [key, hash, pathname]);

  return null;
}
