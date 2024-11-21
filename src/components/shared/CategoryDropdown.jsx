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
            href={`/explore-experiences/${category.slug}`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </PopoverContainer>
  );

  //   return (
  //     <div className="relative">
  //       <div onClick={() => setShowDropDown(!showDropDown)}>
  //         <p className="cursor-pointer">EXPERIENCES</p>
  //       </div>
  //       <div
  //         className={`experiences-dropdown-container  gap-4 absolute top-8 w-[240px] left-0 ${
  //           showDropDown ? "flex flex-center" : "hidden"
  //         }`}
  //       >
  //         <div className="experiences-dropdown text-black flex-start flex-col gap-3 p-4 w-full">
  //           <Link className="hover:underline" href={"/explore-experiences/all"}>
  //             All
  //           </Link>
  //           {data?.map((category) => (
  //             <Link
  //               key={category._id}
  //               className="hover:underline"
  //               href={`/explore-experiences/${category.slug}`}
  //             >
  //               {category.name}
  //             </Link>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default CategoryDropdown;
