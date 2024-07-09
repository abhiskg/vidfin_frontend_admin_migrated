import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { LayoutSlice } from "./slices/layout-slice";
import { createLayoutSlice } from "./slices/layout-slice";
import type { SideNavSlice } from "./slices/sidenav-slice";
import { createSideNavSlice } from "./slices/sidenav-slice";
import type { ThemeSlice } from "./slices/theme-slice";
import { createThemeSlice } from "./slices/theme-slice";
import type { UserSlice } from "./slices/user-slice";
import { createUserSlice } from "./slices/user-slice";

export const useAppStore = create<
  SideNavSlice & LayoutSlice & UserSlice & ThemeSlice
>()(
  devtools(
    persist(
      (...a) => ({
        ...createSideNavSlice(...a),
        ...createLayoutSlice(...a),
        ...createUserSlice(...a),
        ...createThemeSlice(...a),
      }),
      {
        name: "vidfin-admin",
        partialize: (state) => ({
          isSideNavCollapsed: state.isSideNavCollapsed,
          resizableLayout: state.resizableLayout,
          user: state.user,
          theme: state.theme,
        }),
      }
    )
  )
);
