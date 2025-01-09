"use client";
import { useComponentStore } from "@/store/componentStore";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { IoChevronForward } from "react-icons/io5";

const CustomOptionTag = ({
  belongsTo,
  optionName,
  optionType = "text",
  budgetRange = {},
  subCategories = [],
  onSelect = () => {},
  setBudgetRange = () => {},
  setIsSubCategory = () => {},
}) => {
  const [selected, setSelected] = useState(false);
  const [showSubCategories, setShowSubCategories] = useState(false);

  const {
    closeCategoryDropdown,
    closeDateDropdown,
    closeBudgetDropdown,
    selectedBudgetRange,
    setSelectedBudgetRange,
  } = useComponentStore((state) => state);

  const subCategoriesArray = useMemo(() => {
    let data;
    if (subCategories) {
      data = subCategories.map((data) => data.name);
    } else {
      data = [];
    }
    return data;
  }, [subCategories]);

  const handleOptionSelected = () => {
    setSelectedBudgetRange(optionName);
    onSelect(optionName);
    if (optionType == "radio" && !selected) {
      setBudgetRange(budgetRange);
      if (belongsTo == "categories") {
        closeCategoryDropdown();
      } else if (belongsTo == "budget") {
        closeBudgetDropdown();
      } else if (belongsTo == "dates") {
        closeDateDropdown();
      }
    }
  };

  useEffect(() => {
    setSelected(optionName == selectedBudgetRange);
  }, [selectedBudgetRange]);

  const handleCategorySelected = () => {
    onSelect(optionName);
    setIsSubCategory(false);
    if (belongsTo == "categories") {
      closeCategoryDropdown();
    } else if (belongsTo == "budget") {
      closeBudgetDropdown();
    } else if (belongsTo == "dates") {
      closeDateDropdown();
    }
  };

  const handleSubCategorySelect = (subCategoryName) => {
    onSelect(subCategoryName);
    setIsSubCategory(true);
    if (belongsTo == "categories") {
      closeCategoryDropdown();
    } else if (belongsTo == "budget") {
      closeBudgetDropdown();
    } else if (belongsTo == "dates") {
      closeDateDropdown();
    }
    // console.log(JSON.stringify(experienceFormDropdownState));
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
          <p role="button" onClick={handleCategorySelected}>
            {optionName}
          </p>
        );
      case "radio":
        return (
          <div
            role="button"
            onClick={handleOptionSelected}
            className="flex w-full justify-between items-center gap-2"
          >
            <p>{optionName}</p>

            <div className="min-w-5 min-h-5">
              {selected ? (
                <Image
                  src={"/radio_selected.svg"}
                  alt="check box"
                  width={18}
                  height={18}
                />
              ) : (
                <Image
                  src={"/radio.svg"}
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
            <p onClick={handleCategorySelected}>{optionName}</p>

            <div className="min-w-5 min-h-5">
              <IoChevronForward />
            </div>

            <div
              className={` ${
                showSubCategories && subCategoriesArray.length > 0
                  ? "block"
                  : "hidden"
              } absolute w-fit top-0 -right-0 lg:-right-40 bg-white p-4 drop-shadow-lg dropdown-list min-w-40 z-50 flex flex-col justify-start items-start gap-4`}
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
