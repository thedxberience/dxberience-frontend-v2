"use client";
import { useApiStore } from "@/store/apiStore";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import ErrorState from "./ErrorState";
import ExperienceCard from "../Experiences/ExperienceCard";
import LoadingIcon from "../shared/LoadingIcon";

const UserWishlist = () => {
  const user = useUserStore((state) => state.user);
  const getUserWishlist = useApiStore((state) => state.getUserWishlist);

  const { data, isLoading, isPending, isFetching } = useQuery({
    queryKey: ["wishlist", user?._id],
    queryFn: async () => {
      const getUserWishlistReq = await getUserWishlist();

      return getUserWishlistReq;
    },
  });

  if (isPending || isLoading || isFetching) {
    return (
      <div className="w-full h-full flex-center">
        <LoadingIcon />
      </div>
    );
  }

  if (!data && data?.length == 0) {
    return (
      <ErrorState
        error={
          "You don’t have any experiences added to your Wishlist yet. Explore our VIP concierge services and luxury experiences with Dxberience to add it to your Wishlist if you’re not ready to book it yet."
        }
        showBtn
        btnLink="/explore-experiences/all"
      />
    );
  }

  return (
    <div className="w-full flex-center">
      <div className="w-full lg:w-10/12 flex-center">
        <div className="experiences w-full px-4 mt-16 lg:px-0 lg:w-10/12">
          {data.length > 0 &&
            data?.map((wishlist) => (
              <ExperienceCard
                experienceDescription={wishlist.productData.shortDescription}
                experienceTitle={wishlist.productData.title}
                slug={wishlist.productData.slug}
                experienceImage={wishlist.productData.thumbnail.image}
                experienceAlt={wishlist.productData.thumbnail.altText}
                priceStart={wishlist.productData.price}
                experienceLocation={
                  wishlist.productData.location
                    ? wishlist.productData.location
                    : "Dubai, United Arab Emirates"
                }
                category={wishlist.productData.category.name}
                key={wishlist.productData.slug}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserWishlist;
