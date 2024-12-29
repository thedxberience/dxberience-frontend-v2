"use client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      userAuthenticated: null,
      accessToken: "",
      setAccessToken: (token) => {
        return set({
          accessToken: token,
        });
      },
      logOutUser: (router) => {
        set(() => ({
          user: null,
          accessToken: "",
        }));
        if (router) {
          router.replace("/");
        }
      },
    }),
    {
      name: "dxberienceV2UserStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
