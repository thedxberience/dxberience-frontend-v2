"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useApiStore } from "@/store/apiStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

const UserPopover = () => {
  const router = useRouter();

  const { user, logOutUser } = useUserStore((state) => ({
    user: state.user,
    logOutUser: state.logOutUser,
  }));

  const handleLoggedInName = () => {
    if (user) {
      if (user.isAdmin) {
        return "ADMIN";
      } else {
        if (user.firstName) {
          return user.firstName;
        } else {
          return "USER";
        }
      }
    }
  };
  return (
    <Popover>
      <PopoverTrigger className="mix-blend-exclusion text-white bg-transparent">
        <h2 className="uppercase">{handleLoggedInName()}</h2>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex justify-start items-center">
          <ul className="flex flex-col justify-start items-start gap-9 px-4 py-2 uppercase">
            <li>
              <Link href={"/admin"}>Bookings</Link>{" "}
            </li>
            {/* <li>Wishlist</li>
            <li>Interests</li>
            <li>Profile</li> */}
            <li className="cursor-pointer" onClick={() => logOutUser(router)}>
              Logout
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
