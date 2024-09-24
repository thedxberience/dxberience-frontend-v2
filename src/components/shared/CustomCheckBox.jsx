"use client";
import Image from "next/image";
import React from "react";

const CustomCheckBox = ({ selected, setSelected }) => {
  return (
    <div onClick={() => setSelected(!selected)}>
      {selected ? (
        <Image
          src={"/check_box_selected.svg"}
          alt="checkbox selected"
          width={23}
          height={23}
        />
      ) : (
        <Image
          src={"/check_box.svg"}
          alt="checkbox not selected"
          width={23}
          height={23}
        />
      )}
    </div>
  );
};

export default CustomCheckBox;
