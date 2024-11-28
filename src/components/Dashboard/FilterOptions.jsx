"use client";
import React, { useState } from "react";
import CustomCheckBox from "../shared/CustomCheckBox";

const FilterOptions = ({
  filterStatus,
  optionName,
  optionValue,
  setFilterData,
  filterData,
}) => {
  const [selected, setSelected] = useState(false);

  const handleSelectOption = () => {
    if (selected) {
      if (filterStatus == "status") {
        setFilterData({
          ...filterData,
          confirmationStatus: optionValue,
        });
      } else if (filterStatus == "price") {
        setFilterData({
          ...filterData,
          startDate: "",
          endDate: "",
        });
      }
    }
  };

  return (
    <div className="flex-between w-full">
      <p className="text-sm">{optionName}</p>
      <CustomCheckBox selected={selected} setSelected={setSelected} />
    </div>
  );
};

export default FilterOptions;
