"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const THEME_FAVICONS = {
  light: "/logos/fav-dark.png",
  dark: "/logos/fav-white.png",
} as const;

function syncFavicon(href: string) {
  const selectors = [
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll<HTMLLinkElement>(selector).forEach((link) => {
      link.href = href;
    });
  });

  let dynamicLink = document.querySelector<HTMLLinkElement>("link[data-dynamic-favicon='true']");

  if (!dynamicLink) {
    dynamicLink = document.createElement("link");
    dynamicLink.rel = "icon";
    dynamicLink.type = "image/png";
    dynamicLink.dataset.dynamicFavicon = "true";
    document.head.appendChild(dynamicLink);
  }

  dynamicLink.href = href;
}

export function ThemeFavicon() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const theme = resolvedTheme === "dark" ? "dark" : "light";
    syncFavicon(THEME_FAVICONS[theme]);
  }, [resolvedTheme]);

  return null;
}