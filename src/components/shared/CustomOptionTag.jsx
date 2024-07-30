"use client";
import { componentUseStore } from "@/store/componentStore";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { IoChevronForward } from "react-icons/io5";

const CustomOptionTag = ({
  belongsTo,
  optionName,
  optionType = "text",
  subCategories = [],
  onSelect = () => {},
}) => {
  const [selected, setSelected] = useState(false);
  const [showSubCategories, setShowSubCategories] = useState(false);

  const {
    experienceFormDropdownState,
    toggleCategoryDropdown,
    toggledateDropdown,
    togglebudgetDropdown,
  } = componentUseStore((state) => state);

  const subCategoriesArray = useMemo(() => {
    let data;
    if (subCategories) {
      data = subCategories.map((data) => data.name);
    } else {
      data = [];
    }
    return data;
  }, [subCategories]);

  const handleSelected = () => {
    setSelected(!selected);
    onSelect(optionName);
    if (!selected) {
      if (belongsTo == "categories") {
        toggleCategoryDropdown();
      } else if (belongsTo == "budget") {
        togglebudgetDropdown();
      } else if (belongsTo == "dates") {
        toggledateDropdown();
      }
    }
    // console.log(JSON.stringify(experienceFormDropdownState));
  };

  const handleSubCategorySelect = (subCategoryName) => {
    setSelected(!selected);
    onSelect(subCategoryName);
    if (belongsTo == "categories") {
      toggleCategoryDropdown();
    } else if (belongsTo == "budget") {
      togglebudgetDropdown();
    } else if (belongsTo == "dates") {
      toggledateDropdown();
    }
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
        return (
          <p role="button" onClick={handleSelected}>
            {optionName}
          </p>
        );
      case "checkbox":
        return (
          <div
            role="button"
            onClick={handleSelected}
            className="flex w-full justify-between items-center gap-2"
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
            role="button"
            className="relative flex w-full justify-between items-center gap-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <p>{optionName}</p>

            <div className="min-w-5 min-h-5">
              <IoChevronForward />
            </div>

            <div
              className={` ${
                showSubCategories && subCategoriesArray.length > 0
                  ? "block"
                  : "hidden"
              } absolute w-fit top-0 -right-0 lg:-right-32 bg-white p-4 shadow-sm dropdown-list z-50 flex flex-col justify-start items-start gap-4`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {subCategoriesArray.map((category, index) => (
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
