import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// Every navigation (navbar, footer, buttons, even re-clicking the current
// page) starts the new page at the top. `key` changes on each navigation, so
// same-page clicks count too.
//
// Links with a #section (e.g. /projects#inspection) scroll to that section
// instead. Pages render after navigation, so we retry for a moment until the
// element exists. Sections use `scroll-mt-*` to clear the fixed navbar.
export default function ScrollToTop() {
  const { key, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
      // "instant" overrides the site-wide smooth scrolling.
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    let frame;
    let tries = 0;
    const scrollToSection = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (tries++ < 60) frame = requestAnimationFrame(scrollToSection);
    };
    scrollToSection();
    return () => cancelAnimationFrame(frame);
  }, [key, hash]);

  return null;
}
