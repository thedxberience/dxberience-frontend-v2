import React from "react";
import CustomButton from "./CustomButton";

function MessageBox({ children, btnName, className, from, to }) {
  return (
    <div
      className={`p-10 flex flex-col items-center gap-5 bg-gradient-to-br from-[${from}] to-[${to}] bg-opacity-5 md:bg-none ${className}`}
    >
      <div className="flex flex-col items-center justify-center gap-5 w-[309px] whitespace-pre-line text-center text-white md:w-[840px] z-50 ">
        {children}
      </div>
      <CustomButton btnName={btnName} />
    </div>
  );
}

export { MessageBox };
