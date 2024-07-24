"use client";
import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const CustomSelectTag = ({ children, selectTagName = "Categories" }) => {
  const [revealOptions, setRevealOptions] = useState(false);

  const handleRevealOptions = () => {
    setRevealOptions(!revealOptions);
  };
  return (
    <div className="relative w-full">
      <div
        onClick={handleRevealOptions}
        className="select-tag cursor-pointer flex justify-between items-center gap-3 px-[10px] py-2 h-10 border-b border-black"
      >
        <h2 className="text-lg truncate">{selectTagName}</h2>
        <div className={` ${revealOptions ? "rotate-180" : ""}`}>
          <IoChevronDown />
        </div>
      </div>
      <div
        className={` ${
          revealOptions ? "reveal-options" : "hide-options"
        } absolute top-11 z-50 left-0 shadow w-full flex justify-start items-center p-2 bg-white`}
      >
        <div className="w-full flex flex-col justify-start items-center gap-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomSelectTag;
