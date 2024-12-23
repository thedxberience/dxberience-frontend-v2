import { useComponentStore } from "@/store/componentStore";
import { useUserStore } from "@/store/userStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkUser, updateUserFromGoogleSSO } from "./utils";

export const useAuthGuard = ({ adminRoute = false, redirect = true }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const setOpenModal = useComponentStore((state) => state.setOpenModal);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["userAuthenticated", user?._id, adminRoute],
    queryFn: async () => {
      const checkUserReq = await checkUser(adminRoute);

      return checkUserReq;
    },
    retry: false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (isError) {
        // console.log(`Not authenticated: ${data} ${isError}`);
        if (redirect) {
          router.replace("/");
          setOpenModal(true);
        }
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [isError, isSuccess, router, adminRoute]);

  return isAuthenticated;
};

export const useCheckURLToken = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const setAccessToken = useUserStore((state) => state.setAccessToken);

  const router = useRouter();

  useEffect(() => {
    if (token) {
      setAccessToken(token);
    }
  }, [token]);

  const checkUserReq = useQuery({
    queryKey: ["token", token],
    queryFn: async () => {
      const checkTokenReq = await updateUserFromGoogleSSO(token);
      // if (!checkTokenReq?.isAdmin) {
      //   router.replace("/dashboard"); // This might be an issue for admins. We possibly need to redirect to the admin dashboard if the user is an admin. It also depends on if the request returns if the user is an admin or not.
      // } else {
      //   router.replace("/admin");
      // }

      return checkTokenReq;
    },
    retry: false,
  });

  return token;
};
