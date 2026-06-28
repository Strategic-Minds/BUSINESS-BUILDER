"use client";

import { useEffect } from "react";

export function ThemeBoot() {
  useEffect(() => {
    const saved = window.localStorage.getItem("sma-theme");
    const theme = saved === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
  }, []);

  return null;
}
