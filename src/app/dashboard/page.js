"use client";
import ProfileForm from "@/components/Dashboard/ProfileForm";
import UserBookings from "@/components/Dashboard/UserBookings";
import UserWishlist from "@/components/Dashboard/UserWishlist";
import Navbar from "@/components/Navbar";
import { useUserStore } from "@/store/userStore";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthGuard } from "@/utils/CustomHooks";
import LoadingIcon from "@/components/shared/LoadingIcon";
import Weather from "@/components/Dashboard/Weather";

const page = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    watchDrag: true,
  });

  const user = useUserStore((state) => state.user);

  const [mainTitle, setMainTitle] = useState("My Bookings");

  const isAuthenticated = useAuthGuard({ adminRoute: false });

  const onTabClick = useCallback(
    (index) => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(index, true);
      // console.log("Scrolling to " + index);
      switch (index) {
        case 0:
          setMainTitle("My Bookings");
          break;
        case 1:
          setMainTitle("My Wishlist");
          break;
        case 2:
          setMainTitle("My Profile");
          break;

        default:
          break;
      }
    },
    [emblaMainApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    // emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const getTimeOfDay = () => {
    const date = new Date();

    const hour = date.getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening";
    } else {
      return "Good Evening";
    }
  };

  return isAuthenticated ? (
    <main className="h-full min-h-screen">
      <header>
        <Navbar />
        <div className="main-content  flex-center h-[25svh] lg:h-[80svh]">
          <div className="flex-between relative w-11/12 h-full">
            <div className="luxury-dashboard w-10/12 flex-start flex-col gap-4 lg:gap-10">
              <h2 className="text-2xl lg:text-7xl font-IvyPresto w-10/12">
                My Luxury Dashboard
              </h2>
              <div>
                <p className="text-sm lg:text-lg">{getTimeOfDay()},</p>
                <h4 className="text-lg lg:text-4xl font-IvyPresto">
                  {user?.firstName}
                </h4>
              </div>
            </div>
            <div>
              <div className="relative w-[160px] h-[160px] lg:w-[39.688vw] lg:h-[71.27vh]">
                <Image
                  src={"/dashboard_main_img.jpeg"}
                  alt="Interior of a spacious private jet cabin in Dubai"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* <Weather /> */}
          </div>
        </div>
      </header>
      <section className="dashboard-menu w-full h-full bg-[#F8F8F8] py-5 lg:py-20">
        <div className="flex-center">
          <h1 className="font-IvyPresto text-2xl lg:text-5xl text-center w-full">
            {mainTitle}
          </h1>
        </div>
        <div>
          <div className="event-tabs py-8 flex justify-center items-center w-full text-xs lg:text-lg">
            <div
              className={`w-full cursor-pointer flex justify-center items-center border-b ${
                selectedIndex == 0 ? "border-black" : "border-gray-50"
              } `}
              onClick={() => onTabClick(0)}
            >
              <h2>My Bookings</h2>
            </div>
            <div
              className={`w-full cursor-pointer flex justify-center items-center border-b ${
                selectedIndex == 1 ? "border-black" : "border-gray-50"
              }`}
              onClick={() => onTabClick(1)}
            >
              <h2>My Wishlist</h2>
            </div>

            <div
              className={`w-full cursor-pointer flex justify-center items-center border-b ${
                selectedIndex == 2 ? "border-black" : "border-gray-50"
              }`}
              onClick={() => onTabClick(2)}
            >
              <h2>My Profile</h2>
            </div>
          </div>
          <div className="tab-content">
            <div className="embla">
              <div className="embla__viewport" ref={emblaMainRef}>
                <div className="embla__container">
                  <div
                    className={`details md embla__slide ${
                      mainTitle.toLowerCase() != "my bookings" ? "h-0" : "h-fit"
                    }`}
                    key={1}
                  >
                    <UserBookings />
                  </div>
                  <div
                    className={`md embla__slide ${
                      mainTitle.toLowerCase() != "my wishlist" ? "h-0" : "h-fit"
                    }`}
                    key={2}
                  >
                    <UserWishlist />
                  </div>
                  <div
                    className={`md embla__slide ${
                      mainTitle.toLowerCase() != "my profile"
                        ? "h-0"
                        : "profile-form-height"
                    }`}
                    key={3}
                  >
                    <ProfileForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  ) : (
    <div className="flex-center h-screen">
      <LoadingIcon />
    </div>
  );
};

export default page;
