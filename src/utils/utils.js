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

    console.log(`Check User Request: ${JSON.stringify(request)}`);

    let loggedIn;
    if (admin) {
      loggedIn = useUserStore.getState().user && request.isAdmin ? true : false; // Checks if there is a user state and the access token is valid
    } else {
      loggedIn = useUserStore.getState().user && !request.isAdmin; // Checks if there is a user state and the access token is valid
    }

    if (loggedIn) {
      useUserStore.setState(() => ({
        userAuthenticated: loggedIn,
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
    throw new Error(`Error: ${error}`);
  }
};
