import { Classes } from "@blueprintjs/core";
import { useEffect, useMemo, useState } from "react";
import { DarkModeContext } from "./DarkModeContext";

export function DarkModeProvider({ children }) {
  const [colorScheme, setColorScheme] = useState("system");
  const [isSystemDark, setIsSystemDark] = useState(false);

  useEffect(() => {
    setColorScheme(localStorage.getItem("color-scheme") ?? "system");
  }, []);

  useEffect(() => {
    localStorage.setItem("color-scheme", colorScheme);
    if (colorScheme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (event) => setIsSystemDark(event.matches);

      listener(mediaQuery);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, [colorScheme]);

  const isDark = useMemo(() => {
    return colorScheme === "dark" || (colorScheme === "system" && isSystemDark);
  }, [colorScheme, isSystemDark]);

  useEffect(() => {
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  }, [isDark]);

  return (
    <DarkModeContext.Provider value={{ isDark, colorScheme, setColorScheme }}>
      <div className={isDark ? Classes.DARK : ""}>{children}</div>
    </DarkModeContext.Provider>
  );
}
