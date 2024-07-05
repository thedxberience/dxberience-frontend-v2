"use client";
import React, { useState } from "react";
import Image from "next/image";

const Heart = () => {
  const [heartClicked, setHeartClicked] = useState(false);

  const handleHeartClick = () => {
    setHeartClicked(!heartClicked);
  };
  return (
    <div
      className="heart-logo relative z-20 w-full flex justify-end items-center"
      onClick={handleHeartClick}
    >
      {heartClicked ? (
        <Image
          src={"/experience_card/heart_bold.svg"}
          alt="heart clicked icon"
          width={24}
          height={24}
        />
      ) : (
        <Image
          src={"/experience_card/heart.svg"}
          alt="heart icon"
          width={24}
          height={24}
        />
      )}
    </div>
  );
};

export default Heart;
