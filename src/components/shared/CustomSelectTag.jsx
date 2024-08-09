"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

const CustomSelectTag = ({
  children,
  revealOptionProps,
  setRevealOptionsProps,
  closeSelectTag,
  dropdownType,
  selectTagName = "Categories",
}) => {
  const [revealOptions, setRevealOptions] = useState(false);

  const selectRef = useRef(null);

  useEffect(() => {
    if (dropdownType.toLowerCase() == "categories") {
      setRevealOptions(revealOptionProps.categoryDropdown);
    } else if (dropdownType.toLowerCase() == "dates") {
      setRevealOptions(revealOptionProps.dateDropdown);
    } else if (dropdownType.toLowerCase() == "budget") {
      setRevealOptions(revealOptionProps.budgetDropdown);
    }
  }, [dropdownType, revealOptionProps]);

  const handleRevealOptions = useCallback(() => {
    setRevealOptionsProps();
  }, [revealOptionProps, selectTagName]);

  const handleOutsideClick = (e) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      closeSelectTag();
    }
  };

  useEffect(() => {
    if (revealOptions) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [revealOptions]);

  return (
    <div className="relative w-full cursor-pointer" ref={selectRef}>
      <div
        role="button"
        onClick={handleRevealOptions}
        className="select-tag cursor-pointer flex justify-between items-center gap-3 px-[10px] py-2 h-10 border-b border-black"
      >
        <h2 className="text-lg truncate cursor-pointer w-fit">
          {selectTagName}
        </h2>
        <div
          className={` ${!revealOptions ? "rotate-180" : ""} cursor-pointer`}
        >
          <IoChevronDown />
        </div>
      </div>
      <div
        className={`${
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
