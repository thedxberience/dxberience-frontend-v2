"use client";
import Image from "next/image";
import React from "react";

const CustomButton = ({
  btnName = "Explore",
  invert = false,
  onClick = () => {},
}) => {
  return (
    <div className="relative w-fit">
      <div
        className={`${
          invert ? "bg-white border-black" : "bg-black border-white"
        } border-[1px]  w-full -z-0 h-10 absolute -bottom-3 left-3`}
      ></div>
      <div
        className={` ${
          invert ? "bg-black text-white" : "bg-white text-black"
        } p-[13.5px] z-40 border-black relative flex justify-center w-fit`}
      >
        <button
          className="flex justify-center text-sm lg:text-base items-center gap-3 uppercase"
          onClick={onClick}
        >
          {" "}
          {btnName}{" "}
          {invert ? (
            <span>
              <Image
                src="/btn_arrow_white.svg"
                alt="button arrow"
                width={24}
                height={24}
              />
            </span>
          ) : (
            <span>
              <Image
                src="/btn_arrow.svg"
                alt="button arrow"
                width={24}
                height={24}
              />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default CustomButton;
