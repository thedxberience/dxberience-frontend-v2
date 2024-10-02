import { currencyFormat } from "@/utils/utils";
import React, { useCallback } from "react";

const PriceContainer = ({ price, priceRate, subCategory, isMobile = true }) => {
  const handlePriceRate = useCallback(() => {
    if (subCategory?.name.toLowerCase().includes("rentals")) {
      return "PER DAY";
    } else {
      return "PER PERSON";
    }
  }, []);

  if (isMobile) {
    return (
      <div className="mobile-only flex-col justify-center items-center uppercase bg-primary px-4 py-2 text-center">
        {priceRate?.toLowerCase() == "starting from" && (
          <p className="font-thin text-sm lg:text-lg uppercase">
            {priceRate ? priceRate : handlePriceRate()}
          </p>
        )}
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
      <div className="desktop-only uppercase w-[431px] flex-col justify-center items-center h-[279px] bg-primary px-4 py-2 text-center">
        {priceRate?.toLowerCase() == "starting from" && (
          <p className="font-thin text-sm lg:text-lg uppercase">
            {priceRate ? priceRate : handlePriceRate()}
          </p>
        )}
        <h3 className="font-IvyPresto font-bold text-2xl lg:text-4xl">
          {price ? `AED ${currencyFormat(price)}` : "Request Quote"}
        </h3>
        {priceRate?.toLowerCase() !== "starting from" && (
          <p className="font-thin text-sm lg:text-lg uppercase">
            {priceRate ? priceRate : handlePriceRate()}
          </p>
        )}
      </div>
    );
  }
};

export default PriceContainer;
