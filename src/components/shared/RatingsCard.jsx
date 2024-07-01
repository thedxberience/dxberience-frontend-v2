import React from "react";
import StarRatings from "./StarRatings";

const RatingsCard = ({ star, ratingAuthor, ratingDescription }) => {
  return (
    <div className="bg-primary rating-card p-5 max-w-full h-[336px] lg:w-[398px]">
      <div className="flex flex-col justify-center items-center gap-5 h-[300px] border-gray-300 border p-4">
        <StarRatings star={star} />
        <div className="rating-info flex flex-col justify-center gap-5 items-center text-white">
          <p className="text-center font-semibold">{ratingDescription}</p>
          <p className="rating-name font-sacramento">{ratingAuthor}</p>
        </div>
      </div>
    </div>
  );
};

export default RatingsCard;
