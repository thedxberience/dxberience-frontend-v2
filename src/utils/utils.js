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

export function sluggify(str) {
  return str
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
    .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}
