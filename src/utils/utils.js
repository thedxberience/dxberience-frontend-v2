import { useUserStore } from "@/store/userStore";
import { makeRequest } from "./axios";

export function getUrlQueryString(queryObj) {
  const queryString = Object.entries(queryObj)
    .map(([key, value]) => {
      if (value) {
        return `${key}=${value}`;
      } else {
        return "*";
      }
    })
    .filter((value) => value != "*")
    .join("&");
  return queryString;
}

export function currencyFormat(num) {
  return num?.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export const checkUser = async (admin = false) => {
  try {
    const request = await makeRequest("/user/me");

    let loggedIn;
    if (admin) {
      loggedIn = useUserStore.getState().user && request.isAdmin ? true : false; // Checks if there is a user state and the access token is valid
    } else {
      loggedIn = useUserStore.getState().user && !request.isAdmin; // Checks if there is a user state and the access token is valid
    }

    if (loggedIn) {
      useUserStore.setState(() => ({
        userAuthenticated: loggedIn,
        user: request,
      }));
    } else {
      useUserStore.setState(() => ({
        userAuthenticated: false,
        user: null,
        accessToken: "",
      }));
    }

    return request;
  } catch (error) {
    console.log(`Unable to check user details: ${error}`);
    useUserStore.setState(() => ({
      userAuthenticated: false,
      user: null,
      accessToken: "",
    }));
    throw new Error(`Unable to check user details: ${error}`);
  }
};

export const updateUserFromGoogleSSO = async (googleToken) => {
  try {
    const request = await makeRequest("/user/me");

    if (request && googleToken) {
      useUserStore.setState(() => ({
        user: request,
      }));
    }

    return request;
  } catch (error) {
    console.log(`Unable to update user from google sso: ${error}`);
    throw new Error(`Unable to update user from google sso: ${error}`);
  }
};

export function urlBuilder(path) {
  // Handle null/undefined path
  if (!path) {
    throw new Error('Path is required');
  }

  // Convert path to string and trim whitespace
  const cleanPath = String(path).trim();
  
  // Get base URL from environment variable
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL environment variable is not defined');
  }

  // Remove trailing slash from base URL
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  
  // If path already starts with http/https, return as is (absolute URL)
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath;
  }
  
  // If path starts with slash, append to base URL
  if (cleanPath.startsWith('/')) {
    return cleanBaseUrl + cleanPath;
  }
  
  // Otherwise, add slash between base URL and path
  return cleanBaseUrl + '/' + cleanPath;
}

export function sluggify(str) {
  return str
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
    .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}
