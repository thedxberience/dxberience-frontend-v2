"use client";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import React, { useState } from "react";
import Heart from "./Heart";
import { useRouter } from "next/navigation";

const ExperienceCard = ({
  experienceImage = "/experience_bg.jpeg",
  experienceTitle = "Dubai Desert Safari Package",
  experienceAlt = "Image for a category",
  experienceLocation = "Dubai, United Arab Emirates",
  experienceDescription = "Each show is a meticulously crafted spectacle, featuring elaborate costumes, intricate ",
  newExperience = false,
  priceStart = false,
}) => {
  const [pan, setPan] = useState(false);

  const handleMouseOverPan = () => {
    setPan(true);
  };

  const handleRemoveMouseOverPan = () => {
    setPan(false);
  };

  const router = useRouter();

  const handleExperienceRoute = () => {
    router.push(`/events/${experienceTitle}`);
  };

  return (
    <div
      className="experience cursor-pointer relative w-[43.277vw] max-w-[43.277vw] lg:max-w-[21.198vw] p-2 lg:p-4 lg:w-full min-h-[210px] lg:h-[52.263vh] flex flex-col justify-end items-end text-white overflow-hidden"
      onMouseEnter={handleMouseOverPan}
      onMouseLeave={handleRemoveMouseOverPan}
      onClick={handleExperienceRoute}
    >
      <div className="overlay absolute top-0 left-0"></div>
      <Image
        src={experienceImage}
        alt={experienceAlt}
        fill
        className={`${
          pan ? "mouse-over-pan" : "mouse-over-no-pan"
        } object-cover`}
      />
      {newExperience && (
        <div className="new-tag absolute left-0 top-5 lg:top-8 z-10">
          <div className="w-8 h-2 relative lg:w-16 lg:h-5">
            <Image
              src={"/new_tag.svg"}
              alt="new-experience"
              className="object-cover"
              fill
            />
          </div>
        </div>
      )}
      <div className="content relative p-1 lg:p-2 flex flex-col h-full w-full justify-end items-start gap-1 z-10 border">
        {/* <Heart /> */}
        <div className="flex flex-col gap-2">
          {priceStart && (
            <div className="price-starts pb-4 lg:pb-8">
              <p className="text-xs lg:text-sm">STARTS FROM</p>
              <h2 className="text-lg lg:text-2xl font-IvyPresto">
                AED {priceStart}
              </h2>
            </div>
          )}
          <h1 className="text-sm lg:text-2xl font-IvyPresto w-[23.846vw]">
            {experienceTitle}
          </h1>
          <div className="location text-[10px] lg:text-sm flex justify-start items-center gap-[1.24px]">
            <div className="w-3 h-4 lg:w-4 lg:h-4 flex justify-start items-center">
              <IoLocationOutline />{" "}
            </div>
            <span>{experienceLocation}</span>
          </div>
          {pan && (
            <div className="text-[10px] lg:text-sm w-9/12">
              <p>{experienceDescription}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
