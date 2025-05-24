import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("converge-theme") || "lemonade",
  setTheme: (theme) => {
    localStorage.setItem("converge-theme", theme);
    set({ theme });
  },
}));