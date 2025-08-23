import { useComponentStore } from "@/store/componentStore";
import { currencyFormat } from "@/utils/utils";
import React, { useCallback } from "react";
import CustomButton from "../shared/CustomButton";

const PriceContainer = ({ price, priceRate, subCategory, isMobile = true }) => {
  const handlePriceRate = useCallback(() => {
    if (subCategory?.name.toLowerCase().includes("rentals")) {
      return "PER DAY";
    } else {
      return "PER PERSON";
    }
  }, []);

  const setOpenModal = useComponentStore((state) => state.setOpenModal);

  // Authentication disabled - always show authenticated features
  const isAuthenticated = true;

  if (isMobile) {
    return (
      <div className="mobile-only flex-col justify-center items-center uppercase bg-primary px-4 py-2 text-center">
        {priceRate?.toLowerCase() == "starting from" && (
          <p className="font-thin text-sm lg:text-lg uppercase">
            {priceRate ? priceRate : handlePriceRate()}
          </p>
        )}
        <p>From</p>
        <h3 className="font-IvyPresto font-bold text-xl">
          {price ? `AED ${currencyFormat(price)}` : "Request Quote"}
        </h3>
        {priceRate?.toLowerCase() !== "starting from" && (
          <p className="font-thin text-sm lg:text-lg uppercase">
            {priceRate ? priceRate : handlePriceRate()}
          </p>
        )}
      </div>
    );
  } else {
    return (
      <div className="desktop-only uppercase w-[431px] gap-2 flex-col justify-center items-center h-[279px] bg-primary px-4 py-2 text-center">
        {priceRate?.toLowerCase() == "starting from" && (
          <p className="font-thin text-sm lg:text-lg uppercase">
            {priceRate ? priceRate : handlePriceRate()}
          </p>
        )}
        <p>From</p>
        <h3 className="font-IvyPresto font-bold text-2xl lg:text-4xl">
          {price ? `AED ${currencyFormat(price)}` : "Request Quote"}
        </h3>
        {priceRate?.toLowerCase() !== "starting from" && (
          <p className="font-thin text-sm lg:text-lg uppercase">
            {priceRate ? priceRate : handlePriceRate()}
          </p>
        )}

        {!isAuthenticated && (
          <CustomButton
            btnName="Log in to book"
            onClick={() => setOpenModal(true)}
          />
        )}
      </div>
    );
  }
};

export default PriceContainer;
