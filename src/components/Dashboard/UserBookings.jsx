"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { useApiStore } from "@/store/apiStore";
import LoadingIcon from "../shared/LoadingIcon";
import ExperienceCard from "../Experiences/ExperienceCard";
import ErrorState from "./ErrorState";
import FilterPopover from "./FilterPopover";
import { useComponentStore } from "@/store/componentStore";
import SelectSortBy from "./SelectSortBy";

const UserBookings = () => {
  const user = useUserStore((state) => state.user);
  const getUserBookings = useApiStore((state) => state.getUserBookings);

  const filterData = useComponentStore((state) => state.filterData);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: [
      "bookings",
      user?._id,
      filterData.confirmationStatus,
      filterData.startDate,
      filterData.endDate,
      filterData.sortBy,
    ],
    queryFn: async () => {
      return await getUserBookings({
        ...filterData,
      });
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex-center">
        <LoadingIcon />
      </div>
    );
  }

  const handleEmptyStateMessage = () => {
    if (filterData.confirmationStatus !== "") {
      return `You currently don't have any bookings ${filterData.confirmationStatus.toLowerCase()} within the requested period`;
    } else if (filterData.startDate !== "" && filterData.endDate !== "") {
      return "You currently don't have any bookings within the requested period";
    } else {
      return "You don’t have any experiences booked yet. Explore our VIP concierge services and luxury experiences with Dxberience to plan your next adventure or contact us to create a personalised experience.";
    }
  };

  if (isError) {
    return (
      <div className="bookings-container w-full flex-center">
        <div className="w-full lg:w-10/12 flex-center-col">
          <div className="booking-header w-11/12 lg:w-full flex-between">
            <FilterPopover />
            <SelectSortBy />
          </div>
          <ErrorState
            error={error.message}
            showBtn
            btnLink="/explore-experiences/all"
          />
        </div>
      </div>
    );
  }

  if (!data || data?.bookings?.length == 0) {
    return (
      <div className="bookings-container w-full flex-center">
        <div className="w-full lg:w-10/12 flex-center-col">
          <div className="booking-header w-11/12 lg:w-full flex-between">
            <FilterPopover />
            <SelectSortBy />
          </div>
          <ErrorState
            error={handleEmptyStateMessage()}
            showBtn
            btnLink="/explore-experiences/all"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bookings-container w-full flex-center">
      <div className="w-full lg:w-10/12 flex-center-col">
        <div className="booking-header w-11/12 lg:w-full flex-between">
          <FilterPopover />
          <SelectSortBy />
        </div>
        <div className="user-bookings experiences w-full mt-10 px-4 lg:px-0 lg:w-10/12 ">
          {data?.bookings?.map((booking) => (
            <ExperienceCard
              bookingState={booking.confirmationStatus}
              experienceDescription={booking.productData.shortDescription}
              experienceTitle={booking.productData.title}
              slug={booking.productData.slug}
              experienceImage={booking.productData.thumbnail.image}
              experienceAlt={booking.productData.thumbnail.altText}
              experienceLocation={
                booking.productData.location
                  ? booking.productData.location
                  : "Dubai, United Arab Emirates"
              }
              bookingDate={booking.date}
              bookingTime={booking.time}
              no_of_guest={booking.noOfTickets}
              showLocation={false}
              category={booking.productData.category.name}
              id={booking._id}
              key={booking.productData.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
