import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between">
      <header className="about-page-header w-full min-h-screen">
        {/* <div className="overlay h-full relative"></div> */}
        <Navbar />
        <div className="flex justify-center items-center text-white h-full lg:px-24">
          <div>
            <div className="left-img relative w-[25.781vw] h-[84.724vh]">
              <div className="overlay relative"></div>
              <Image
                src="/yacht_about.jpeg"
                alt="luxury with our yacht rental service in Dubai"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="header-content z-50 flex flex-col justify-between items-start 2xl:gap-16 lg:-ml-10">
            <h1 className="font-IvyPresto text-7xl lg:w-[45.156vw]">
              Dxberience refines Luxury with bespoke VIP services
            </h1>
            <p className="text-lg lg:w-[28.229vw]">
              From personalized travel itineraries to exclusive access to elite
              events, our services ensure that every moment is crafted to
              perfection, providing you with unparalleled sophistication and
              comfort.
            </p>
          </div>
          <div className="flex flex-col justify-end items-baseline h-[75svh]">
            <div className="right-img relative w-[29.01vw] h-[42.747vh]">
              <div className="overlay relative"></div>
              <Image
                src="/luxury-car-about.jpeg"
                alt="Luxury car for Private VIP Transportation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>
    </main>
  );
};

export default page;
