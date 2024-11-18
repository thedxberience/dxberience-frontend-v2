import React from "react";
import CustomButton from "../shared/CustomButton";

const ErrorState = ({ error, showBtn = false, btnLink = "/" }) => {
  return (
    <div className="flex-center h-[40svh] w-full">
      <div className="w-11/12 lg:w-6/12 flex-center-col gap-4">
        <p className="text-lg text-center">{error}</p>
        {showBtn && (
          <CustomButton
            btnName="Find Experiences"
            isLink
            href={btnLink}
            invert
          />
        )}
      </div>
    </div>
  );
};

export default ErrorState;
