import type { StateCreator } from "zustand";

export interface SideNavSlice {
  isSideNavCollapsed: boolean;
  setIsSideNavCollapsed: (isSideNavCollapsed: boolean) => void;
}

export const createSideNavSlice: StateCreator<
  SideNavSlice,
  [],
  [],
  SideNavSlice
> = (set) => ({
  isSideNavCollapsed: false,
  setIsSideNavCollapsed: (isSideNavCollapsed) =>
    set(() => ({
      isSideNavCollapsed,
    })),
});
