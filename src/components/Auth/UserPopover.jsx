"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

const UserPopover = () => {
  const router = useRouter();

  const { user, logOutUser } = useUserStore((state) => ({
    user: state.user,
    logOutUser: state.logOutUser,
  }));

  const handleUserLinks = () => {
    if (user?.isAdmin) {
      return (
        <>
          <li>
            <Link href={"/"}>Home</Link>{" "}
          </li>
          <li>
            <Link href={"/admin"}>Bookings</Link>{" "}
          </li>
          <li className="cursor-pointer" onClick={() => logOutUser(router)}>
            Logout
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link href={"/"}>Home</Link>{" "}
          </li>
          <li>
            <Link href={"/dashboard"}>Dashboard</Link>{" "}
          </li>
          <li className="cursor-pointer" onClick={() => logOutUser(router)}>
            Logout
          </li>
        </>
      );
    }
  };
  return (
    <Popover>
      <PopoverTrigger className="mix-blend-exclusion bg-transparent">
        <h2 className="uppercase">
          {user.firstName ? user.firstName : "USER"}
        </h2>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex justify-start items-center">
          <ul className="flex flex-col justify-start items-start gap-9 px-4 py-2 uppercase">
            {handleUserLinks()}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
