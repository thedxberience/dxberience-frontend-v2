"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import Link from "next/link";
import PopoverContainer from "./PopoverContainer";

const CategoryDropdown = () => {
  const { data } = useQuery({
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
            href={`/explore-experiences/${category.slug}`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </PopoverContainer>
  );
};

export default CategoryDropdown;
