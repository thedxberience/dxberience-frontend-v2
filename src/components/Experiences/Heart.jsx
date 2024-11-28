"use client";
import React, { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useApiStore } from "@/store/apiStore";
import { useUserStore } from "@/store/userStore";

const Heart = forwardRef(({ title, slug, category }, ref) => {
  const [heartClicked, setHeartClicked] = useState(false);

  const queryClient = useQueryClient();

  const user = useUserStore((state) => state.user);

  const wishlistedSlug = useApiStore((state) => state.wishlistedSlug);

  useEffect(() => {
    const isCurrentlyWishlisted = wishlistedSlug.includes(slug);

    setHeartClicked(isCurrentlyWishlisted);
  }, [wishlistedSlug]);

  const {
    mutateAsync: addToWishlistMutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationKey: ["add_to_wishlist", slug],
    mutationFn: async () => {
      const addToWishlistReq = await makeRequest("/user/wishlist", {
        method: "PATCH",
        data: {
          title,
          slug,
          category,
        },
      });

      return addToWishlistReq;
    },
  });

  const { mutateAsync: removeFromWishlistMutateAsync } = useMutation({
    mutationKey: ["add_to_wishlist", slug],
    mutationFn: async () => {
      const addToWishlistReq = await makeRequest("/user/wishlist", {
        method: "DELETE",
        data: {
          slug,
        },
      });

      return addToWishlistReq;
    },
  });

  const handleHeartClick = async (addToWishlist) => {
    setHeartClicked(addToWishlist);

    // console.log(`Add To Wishlist: ${addToWishlist}`);

    if (addToWishlist) {
      // console.log(`Adding to wishlist: ${slug}`);

      await addToWishlistMutateAsync();
    } else {
      // console.log(`Removing from wishlist: ${slug}`);

      await removeFromWishlistMutateAsync();
    }

    queryClient.invalidateQueries(["wishlist", user?._id], {
      refetchType: "active",
    });
  };

  return (
    <div
      ref={ref}
      className="heart-logo relative z-20 w-full flex justify-end items-center"
      onClick={() => handleHeartClick(!heartClicked)}
    >
      {heartClicked ? (
        <Image
          src={"/experience_card/heart_bold.svg"}
          alt="heart clicked icon"
          width={24}
          height={24}
        />
      ) : (
        <Image
          src={"/experience_card/heart.svg"}
          alt="heart icon"
          width={24}
          height={24}
        />
      )}
    </div>
  );
});

export default Heart;
