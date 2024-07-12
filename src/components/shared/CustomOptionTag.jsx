"use client";
import Image from "next/image";
import React, { useState } from "react";

const CustomOptionTag = ({
  optionName,
  optionType = "text",
  onSelect = () => {},
}) => {
  const [selected, setSelected] = useState(false);

  const handleSelected = () => {
    setSelected(!selected);
    onSelect(optionName);
  };

  const handleOptionType = () => {
    switch (optionType) {
      case "text":
        return <p>{optionName}</p>;
      case "checkbox":
        return (
          <div className="flex w-full justify-between items-center gap-1">
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
      default:
        return <p>{optionName}</p>;
    }
  };

  return (
    <div onClick={handleSelected} className="w-full capitalize">
      {handleOptionType()}
    </div>
  );
};

export default CustomOptionTag;
