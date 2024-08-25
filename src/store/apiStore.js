import { makeRequest } from "@/utils/axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useApiStore = create(
  persist(
    (set, get) => ({
      user: [],
      setUser: (user) => set(() => ({ user: user })),
      productData: [],
      openModal: false,
      setOpenModal: (openModal) => set((store) => ({ openModal: openModal })),
      loginError: "",
      setLoginError: (error) => set(() => ({ loginError: error })),
      registerError: "",
      setRegisterError: (error) => set(() => ({ registerError: error })),
      setProductData: (data) => set(() => ({ productData: data })),
      accessToken: "",
      setAccessToken: (token) => set(() => ({ accessToken: token })),
      login: async (data) => {
        try {
          const request = await makeRequest("/auth/login", {
            method: "POST",
            data: data,
          });

          set(() => ({ openModal: false, accessToken: request.accessToken }));
          return request;
        } catch (error) {
          console.log(error);
          set(() => ({ loginError: error.message }));
        }
      },
      registerUser: async (data) => {
        try {
          const request = await makeRequest("/auth/register", {
            method: "POST",
            data: data,
          });
          set(() => ({
            openModal: false,
            accessToken: request.accessToken,
            user: request,
          }));
          return request;
        } catch (error) {
          console.log(error);
          set(() => ({ registerError: error.message }));
        }
      },
    }),
    {
      name: "dxberienceV2Store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
