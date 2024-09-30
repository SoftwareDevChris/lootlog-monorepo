import { create } from "zustand";

type TUserStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
};

export const useUserStore = create<TUserStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));
