import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import React from "react";
import Heart from "./Heart";

const ExperienceCard = ({
  experienceImage = "/experience_bg.jpeg",
  experienceTitle = "Dubai Desert Safari Package",
  experienceLocation = "Dubai, United Arab Emirates",
  experienceDescription = "Each show is a meticulously crafted spectacle, featuring elaborate costumes, intricate ",
  newExperience = false,
}) => {
  return (
    <div className="experience relative w-[43.277vw] p-2 lg:p-4 lg:w-[407px] h-[210px] lg:h-[508px] flex flex-col justify-end items-end text-white">
      <div className="overlay absolute top-0 left-0"></div>
      <Image src={experienceImage} alt={experienceTitle} fill />
      {newExperience && (
        <div className="new-tag absolute left-0 top-5 lg:top-8 z-10">
          <div className="w-8 h-2 relative lg:w-16 lg:h-5">
            <Image src={"/new_tag.svg"} alt="new-experience" fill />
          </div>
        </div>
      )}
      <div className="content relative p-1 lg:p-2 flex flex-col h-full w-full justify-between items-start gap-1 z-10 border">
        <Heart />
        <div className="flex flex-col gap-2">
          <h1 className="text-sm lg:text-2xl font-IvyPresto w-[23.846vw]">
            {experienceTitle}
          </h1>
          <div className="location text-[5.81px] lg:text-sm flex justify-start items-center gap-[1.24px]">
            <div className="w-4 h-4">
              <IoLocationOutline />{" "}
            </div>
            <span>{experienceLocation}</span>
          </div>
          <div className="text-[10px] lg:text-sm w-10/12">
            <p>{experienceDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
