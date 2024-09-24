"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useApiStore } from "@/store/apiStore";

const UserPopover = () => {
  const { user } = useApiStore((state) => state);
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
            <li>Bookings</li>
            <li>Wishlist</li>
            <li>Interests</li>
            <li>Profile</li>
            <li>Logout</li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
