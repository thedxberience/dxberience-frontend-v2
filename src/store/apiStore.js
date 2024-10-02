import { makeMutation, makeRequest } from "@/utils/axios";
import { AxiosError } from "axios";
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
          set(() => ({
            openModal: false,
            accessToken: request.authTokens.accessToken,
            user: request,
          }));
          return { success: true, ...request };
        } catch (error) {
          // console.log(`API Store request: ${error.message}`);
          set(() => ({ loginError: error.message }));
          return { error: error.message, success: false };
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
      logOutUser: () => {
        set(() => ({
          user: [],
          accessToken: "",
        }));
      },
    }),
    {
      name: "dxberienceV2Store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
