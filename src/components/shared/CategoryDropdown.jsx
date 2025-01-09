"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import Link from "next/link";
import PopoverContainer from "./PopoverContainer";

const CategoryDropdown = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const getCategoryReq = await makeRequest("/categories");

      return getCategoryReq;
    },
  });

  return (
    <PopoverContainer popoverTitle={"Experiences"} className={""}>
      <div className="experiences-dropdown text-black flex-start flex-col gap-4 w-full">
        <Link className="hover:underline" href={"/explore-experiences/all"}>
          All
        </Link>
        {data?.map((category) => (
          <Link
            key={category._id}
            className="hover:underline"
            href={`/categories/${category.slug}`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </PopoverContainer>
  );
};

export default CategoryDropdown;
