import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const makeRequest = async (url, options = {}) => {
  try {
    const response = await axiosInstance(url, options);
    return response.data;
  } catch (error) {
    // console.log("Error retrieving data:", error);
    throw new AxiosError(`Error: ${error?.response?.data?.message}`);
  }
};
