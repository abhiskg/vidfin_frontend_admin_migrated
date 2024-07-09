import type { StateCreator } from "zustand";

export interface LayoutSlice {
  resizableLayout: number[];
  setResizableLayout: (resizableLayout: number[]) => void;
}

export const createLayoutSlice: StateCreator<
  LayoutSlice,
  [],
  [],
  LayoutSlice
> = (set) => ({
  resizableLayout: [17, 83],
  setResizableLayout: (resizableLayout) =>
    set(() => ({
      resizableLayout,
    })),
});
