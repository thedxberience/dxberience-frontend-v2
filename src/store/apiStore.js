import { makeRequest } from "@/utils/axios";
import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useUserStore } from "./userStore";
import { useComponentStore } from "./componentStore";

export const useApiStore = create(
  persist(
    (set) => ({
      productData: [],
      loginError: "",
      setLoginError: (error) => set(() => ({ loginError: error })),
      registerError: "",
      setRegisterError: (error) => set(() => ({ registerError: error })),
      setProductData: (data) => set(() => ({ productData: data })),
      login: async (data) => {
        try {
          const request = await makeRequest("/auth/login", {
            method: "POST",
            data: data,
          });
          useComponentStore.setState({
            openModal: false,
          });
          useUserStore.setState({
            user: request,
            accessToken: request.authTokens.accessToken,
          });
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
          useComponentStore.setState({
            openModal: false,
          });
          useUserStore.setState({
            user: request,
            accessToken: request.accessToken,
          });
          return request;
        } catch (error) {
          console.log(error);
          set(() => ({ registerError: error.message }));
        }
      },
    }),
    {
      name: "dxberienceV2ApiStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
