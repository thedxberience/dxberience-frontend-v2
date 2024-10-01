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

const UserPopover = () => {
  const { user, logOutUser } = useApiStore((state) => state);
  return (
    <Popover>
      <PopoverTrigger className="mix-blend-exclusion text-white bg-transparent">
        <h2 className="uppercase">
          {user.firstName ? user.firstName : "USER"}
        </h2>
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
            <li className="cursor-pointer" onClick={() => logOutUser()}>
              Logout
            </li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
