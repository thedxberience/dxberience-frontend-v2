import { makeRequest } from "@/utils/axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      userAuthenticated: null,
      accessToken: "",
      checkUser: async () => {
        try {
          const request = await makeRequest("/user/me");

          //   console.log(`Check User Request: ${JSON.stringify(request)}`);

          if (request) {
            set((state) => ({
              userAuthenticated: state.user && request.isAdmin, // Checks if there is a user state and the access token is valid
            }));
          } else {
            set(() => ({ userAuthenticated: false }));
          }
          return request;
        } catch (error) {
          console.log(`Unable to check user details: ${error}`);
          set(() => ({ userAuthenticated: false }));
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
