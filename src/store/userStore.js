"use client";
import { makeRequest } from "@/utils/axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      userAuthenticated: null,
      accessToken: "",
      checkUser: async (admin = false) => {
        try {
          const request = await makeRequest("/user/me");

          console.log(`Check User Request: ${JSON.stringify(request)}`);

          let loggedIn;
          if (admin) {
            loggedIn =
              useUserStore.getState().user && request.isAdmin ? true : false; // Checks if there is a user state and the access token is valid
          } else {
            loggedIn = request; // Checks if there is a user state and the access token is valid
          }

          if (loggedIn) {
            set(() => ({
              userAuthenticated: loggedIn,
            }));
          } else {
            set(() => ({
              userAuthenticated: false,
              user: null,
              accessToken: "",
            }));
          }

          // return request;
        } catch (error) {
          console.log(`Unable to check user details: ${error}`);
          set(() => ({
            userAuthenticated: false,
            user: null,
            accessToken: "",
          }));
          throw new Error(`Error: ${error}`);
        }
      },
      logOutUser: (router) => {
        set(() => ({
          user: null,
          accessToken: "",
        }));
        router.replace("/");
      },
    }),
    {
      name: "dxberienceV2UserStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
