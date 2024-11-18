import Image from "next/image";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { useApiStore } from "@/store/apiStore";
import LoadingIcon from "../shared/LoadingIcon";
import EmptyState from "./EmptyState";
import ExperienceCard from "../Experiences/ExperienceCard";
import ErrorState from "./ErrorState";

const UserBookings = () => {
  const user = useUserStore((state) => state.user);
  const getUserBookings = useApiStore((state) => state.getUserBookings);

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["bookings", user?._id],
    queryFn: async () => {
      return await getUserBookings();
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex-center">
        <LoadingIcon />
      </div>
    );
  }

  if (!data || data?.bookings?.length == 0) {
    return (
      <ErrorState
        error={
          "You don’t have any experiences booked yet. Explore our VIP concierge services and luxury experiences with Dxberience to plan your next adventure or contact us to create a personalised experience."
        }
        showBtn
        btnLink="/explore-experiences/all"
      />
    );
  }

  return (
    <div className="bookings-container w-full flex-center">
      <div className="w-10/12 flex-center-col">
        <div className="booking-header w-full flex-between">
          <div className="filters flex-center gap-4">
            <Image
              src="/filter_icon.svg"
              alt="filter icon"
              width={25}
              height={25}
            />

            <p className="text-lg">Filters</p>
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-[222px] bg-transparent border-x-0 border-t-0 rounded-none text-lg border-b-[0.5px] border-b-[#4e4e4e]">
                <SelectValue placeholder="Sort by:" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Most Recent">Most Recent</SelectItem>
                <SelectItem value="Least Recent">Least Recent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="user-bookings experiences w-full mt-10 px-4 lg:px-0 lg:w-9/12 ">
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
              key={booking.productData.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
