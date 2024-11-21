import { useComponentStore } from "@/store/componentStore";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkUser } from "./utils";

export const useAuthGuard = ({ adminRoute = false }) => {
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
        router.replace("/");
        setOpenModal(true);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [isError, isSuccess, router, adminRoute]);

  return isAuthenticated;
};
