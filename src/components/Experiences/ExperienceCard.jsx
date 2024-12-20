"use client";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Heart from "./Heart";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/utils/CustomHooks";
import CancelBookingButton from "./CancelButton";

const ExperienceCard = ({
  slug,
  bookingDate,
  bookingTime,
  no_of_guest,
  bookingState = "",
  experienceImage = "/experience_bg.jpeg",
  experienceTitle = "Dubai Desert Safari Package",
  experienceAlt = "Image for a category",
  experienceLocation = "",
  experienceDescription = "Each show is a meticulously crafted spectacle, featuring elaborate costumes, intricate ",
  newExperience = false,
  priceStart = false,
  showLocation = true,
  category = "",
  id = "",
}) => {
  const [pan, setPan] = useState(false);
  const experienceCardRef = useRef(null);
  const heartRef = useRef(null);
  const cancelRef = useRef(null);

  const handleMouseOverPan = () => {
    setPan(true);
  };

  const handleRemoveMouseOverPan = () => {
    setPan(false);
  };

  const isAuthenticated = useAuthGuard({ adminRoute: false, redirect: false });

  const router = useRouter();

  const handleExperienceRoute = (e) => {
    if (
      e.target &&
      !heartRef?.current?.contains(e.target) &&
      !cancelRef?.current?.contains(e.target)
    ) {
      if (window) {
        if (window.innerWidth < 1024) {
          router.push(`/events/${slug}`);
        } else {
          window.open(`/events/${slug}`);
        }
      }
    }
  };

  useEffect(() => {
    if (experienceCardRef && experienceCardRef.current) {
      experienceCardRef.current.addEventListener(
        "click",
        handleExperienceRoute
      );
    }

    return () => {
      if (experienceCardRef && experienceCardRef.current) {
        experienceCardRef.current.removeEventListener(
          "click",
          handleExperienceRoute
        );
      }
    };
  }, []);

  const handleBookingState = () => {
    switch (bookingState.toLowerCase()) {
      case "confirmed":
        return (
          <div className="flex-center px-2 py-[2px] bg-text-secondary max-w-[154px]">
            <p className="text-[10px] uppercase leading-4">
              Reservation Confirmed
            </p>
          </div>
        );
      case "pending":
        return (
          <div className="flex-center px-2 py-[2px] text-black bg-white max-w-[154px]">
            <p className="text-[10px] uppercase leading-4">
              Reservation Pending
            </p>
          </div>
        );
      case "cancelled":
        return (
          <div className="flex-center px-2 py-[2px] bg-text-secondary max-w-[154px]">
            <p className="text-[10px] uppercase leading-4">
              Cancellation Confirmed
            </p>
          </div>
        );
      case "pending cancellation":
        return (
          <div className="flex-center px-2 py-[2px] text-black bg-white max-w-[154px]">
            <p className="text-[10px] uppercase leading-4">
              Cancellation Pending
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const handleBookindDate = () => {
    if (bookingDate) {
      const date = new Date(bookingDate);

      const formattedDate = date.toDateString();

      return formattedDate;
    } else {
      return null;
    }
  };

  return (
    <div
      ref={experienceCardRef}
      className="experience cursor-pointer relative w-[43.277vw] max-w-[43.277vw] xl:max-w-[21.198vw] p-2 lg:p-4 lg:w-full h-full min-h-[210px] md:h-[52.263vh] flex flex-col justify-end items-end text-white overflow-hidden"
      onMouseEnter={handleMouseOverPan}
      onMouseLeave={handleRemoveMouseOverPan}
      // onClick={handleExperienceRoute}
    >
      <div className="overlay absolute top-0 left-0"></div>
      {experienceImage && (
        <Image
          src={experienceImage}
          alt={experienceAlt ? experienceAlt : "image for a product"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`${
            pan ? "mouse-over-pan" : "mouse-over-no-pan"
          } object-cover`}
        />
      )}
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
      <div
        className={`content relative p-1 lg:p-2 flex flex-col h-full w-full justify-between items-start gap-1 z-10 border`}
      >
        <Heart
          title={experienceTitle}
          slug={slug}
          category={category}
          ref={heartRef}
        />
        <div className="flex flex-col gap-2">
          <CancelBookingButton
            isAuthenticated={isAuthenticated}
            pan={pan}
            id={id}
            bookingState={bookingState}
            ref={cancelRef}
          />

          {priceStart && (
            <div className="price-starts pb-4 lg:pb-8">
              <p className="text-xs lg:text-sm">STARTS FROM</p>
              <h2 className="text-lg lg:text-2xl font-IvyPresto">
                AED {priceStart}
              </h2>
            </div>
          )}
          {handleBookingState()}
          <h1 className="text-sm lg:text-2xl font-IvyPresto w-[23.846vw] md:w-10/12">
            {experienceTitle}
          </h1>
          {showLocation ? (
            <div className="location text-[10px] lg:text-sm flex justify-start items-center gap-[1.24px]">
              <div className="w-3 h-4 lg:w-4 lg:h-4 flex justify-start items-center">
                <IoLocationOutline />{" "}
              </div>
              <span>{experienceLocation}</span>
            </div>
          ) : (
            <div className="flex flex-col justify-start text-[10px] lg:text-sm gap-[2px] lg:gap-1">
              <p>{handleBookindDate()}</p>
              <p>{bookingTime}</p>
              <p>
                {no_of_guest > 1
                  ? `${no_of_guest} guests`
                  : `${no_of_guest} guest`}{" "}
              </p>
            </div>
          )}

          {!isAuthenticated && pan && (
            <div className="text-[10px] lg:text-sm w-10/12">
              <p>{experienceDescription}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
