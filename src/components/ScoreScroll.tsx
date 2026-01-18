"use client";

import { useEffect } from "react";

const TARGET_ID = "score";

function scrollToScore() {
  const el = document.getElementById(TARGET_ID);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function ScoreScroll() {
  useEffect(() => {
    // If someone lands directly on /#score, scroll after paint
    if (window.location.hash === "#score") {
      window.setTimeout(scrollToScore, 0);
    }

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a");
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      // Only intercept same-page #score links
      if (url.hash !== "#score") return;
      if (url.pathname !== window.location.pathname) return;

      e.preventDefault();

      // Ensure the URL shows #score even if already there
      if (window.location.hash !== "#score") {
        window.history.pushState(null, "", "#score");
      } else {
        window.history.replaceState(null, "", "#score");
      }

      scrollToScore();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
