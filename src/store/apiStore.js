import { makeRequest } from "@/utils/axios";
import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useUserStore } from "./userStore";
import { useComponentStore } from "./componentStore";
import { getUrlQueryString } from "@/utils/utils";

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
      wishlistedSlug: [],
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
            accessToken: request.accessToken,
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
      getUserBookings: async (filterData) => {
        try {
          const queryString = getUrlQueryString(filterData);
          const userBookingsReq = await makeRequest(
            `/booking/me?${queryString}`
          );

          return userBookingsReq;
        } catch (error) {
          throw new AxiosError(`Could not call get user bookings: ${error}`);
        }
      },
      getUserWishlist: async () => {
        try {
          const userWishlist = await makeRequest("/user/wishlist");

          let wishlistedSlug = [];

          if (userWishlist.length > 0) {
            userWishlist.forEach((wishlist) => {
              const wishlistSlug = wishlist.slug;

              wishlistedSlug.push(wishlistSlug);
            });
          }

          set(() => ({
            wishlistedSlug: wishlistedSlug,
          }));

          return userWishlist;
        } catch (error) {
          console.log(`Could not call get user wishlist: ${error}`);
        }
      },
      filterUserBooking: async (filterData) => {
        try {
          const queryString = getUrlQueryString(filterData);

          const filterBookingsReq = await makeRequest(
            `/booking?${queryString}`
          );

          return filterBookingsReq;
        } catch (error) {
          console.log(`Could not filter date: ${error}`);
          throw new Error(`Could not filter user bookings: ${error}`);
        }
      },
    }),
    {
      name: "dxberienceV2ApiStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
