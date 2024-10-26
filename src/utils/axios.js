import { useUserStore } from "@/store/userStore";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const makeRequest = async (url, options = {}) => {
  try {
    const accessToken = useUserStore.getState().accessToken;
    const response = await axiosInstance(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    // console.log("Error retrieving data:", error);
    throw new AxiosError(`Error: ${error?.response?.data?.message}`);
  }
};
