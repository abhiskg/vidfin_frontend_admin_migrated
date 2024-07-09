import { type StateCreator } from "zustand";

export interface ThemeSlice {
  theme: string;
  setTheme: (theme: string) => void;
}

export const createThemeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (
  set
) => ({
  theme: "system",
  setTheme: (theme) =>
    set(() => ({
      theme: theme,
    })),
});
