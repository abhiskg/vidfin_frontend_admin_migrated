import type { IUser } from "@/types/auth.type";
import { type StateCreator } from "zustand";

export interface UserSlice {
  user: null | IUser;
  updateUser: (currentUser: IUser | null) => void;
}

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set
) => ({
  user: null,
  updateUser: (currentUser) =>
    set((state) => ({
      ...state,
      user: currentUser,
    })),
});
