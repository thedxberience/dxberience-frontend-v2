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
      affiliateId: null,
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
      getCategoryPage: async (slug) => {
        try {
          const getCategoryPageReq = await makeRequest(`/categories/${slug}`);

          return getCategoryPageReq[0];
        } catch (error) {
          console.log(`Could not get Category Page: ${error}`);
          return null;
        }
      },
      validateAffiliate: async (affiliateId, slug) => {
        try {
          const affiliateVerification = await makeRequest(
            `/affiliate/validate?partnerId=${affiliateId}&product=${slug}`
          );

          if (affiliateVerification) {
            set(() => ({
              affiliateId: affiliateId,
            }));
          } else {
            set(() => ({
              affiliateId: null,
            }));
          }
          return affiliateVerification;
        } catch (error) {
          console.log(`Error validating affiliate: ${error}`);
        }
      },
      getUserBookings: async () => {
        try {
          const userBookingsReq = await makeRequest("/booking/me");

          return userBookingsReq;
        } catch (error) {
          throw new AxiosError(`Could not call get user bookings: ${error}`);
        }
      },
    }),
    {
      name: "dxberienceV2ApiStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
