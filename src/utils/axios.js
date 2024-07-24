import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dxberienceapi.up.railway.app/api/v1",
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
    console.log("Error retrieving data:", error);
    throw new Error(`Could not get data: ${error}`);
  }
};
