import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// Every navigation (navbar, footer, buttons, even re-clicking the current
// page) starts the new page at the top. `key` changes on each navigation, so
// same-page clicks count too. Links with a #section are left alone so pages
// can scroll to that section themselves (e.g. /about#leadership).
export default function ScrollToTop() {
  const { key, hash } = useLocation();

  // Layout effect runs before the browser paints, so the old scroll position
  // never flashes. "instant" overrides the site-wide smooth scrolling.
  useLayoutEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [key, hash]);

  return null;
}
