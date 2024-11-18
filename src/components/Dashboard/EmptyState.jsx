import React from "react";
import CustomButton from "../shared/CustomButton";

const EmptyState = () => {
  return (
    <div className="flex-center h-[40svh] w-full">
      <div className="w-11/12 lg:w-6/12 flex-center-col gap-4">
        <p className="text-lg text-center">
          You don’t have any experiences added to your Wishlist yet. Explore our
          VIP concierge services and luxury experiences with Dxberience to add
          it to your Wishlist if you’re not ready to book it yet.
        </p>
        <CustomButton
          btnName="Find Experiences"
          isLink
          href="/explore-experiences/all"
          invert
        />
      </div>
    </div>
  );
};

export default EmptyState;
