"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoChevronForward } from "react-icons/io5";

const CustomOptionTag = ({
  optionName,
  optionType = "text",
  subCategories = [],
  onSelect = () => {},
}) => {
  const [selected, setSelected] = useState(false);
  const [showSubCategories, setShowSubCategories] = useState(false);

  const handleSelected = () => {
    setSelected(!selected);
    onSelect(optionName);
  };

  const handleSubCategorySelect = (subCategoryName) => {
    setSelected(!selected);
    onSelect(subCategoryName);
  };

  const handleMouseEnter = () => {
    setShowSubCategories(true);
  };

  const handleMouseLeave = () => {
    setShowSubCategories(false);
  };

  const handleOptionType = () => {
    switch (optionType) {
      case "text":
        return <p onClick={handleSelected}>{optionName}</p>;
      case "checkbox":
        return (
          <div
            onClick={handleSelected}
            className="flex w-full justify-between items-center gap-1"
          >
            <p>{optionName}</p>

            <div className="min-w-5 min-h-5">
              {selected ? (
                <Image
                  src={"/check_box_selected.svg"}
                  alt="check box"
                  width={18}
                  height={18}
                />
              ) : (
                <Image
                  src={"/check_box.svg"}
                  alt="check box"
                  width={18}
                  height={18}
                />
              )}
            </div>
          </div>
        );
      case "dropdown":
        return (
          <div
            className="relative flex w-full justify-between items-center gap-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <p>{optionName}</p>

            <div className="min-w-5 min-h-5">
              <IoChevronForward />
            </div>

            <div
              className={` ${
                showSubCategories && subCategories.length > 0
                  ? "block"
                  : "hidden"
              } absolute w-full top-0 -right-32 bg-white p-4 shadow-sm dropdown-list z-50 flex flex-col justify-start items-start gap-4`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {subCategories.map((category, index) => (
                <div
                  className="cursor-pointer"
                  key={index}
                  onClick={() => handleSubCategorySelect(category)}
                >
                  <p className="capitalize text-sm">{category}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <p>{optionName}</p>;
    }
  };

  return (
    <div className="w-full cursor-pointer capitalize">{handleOptionType()}</div>
  );
};

export default CustomOptionTag;
