import Image from "next/image";
import React from "react";
import CarouselButtons from "../shared/CarouselButtons";

const LuxuryRetreats = () => {
  return (
    <section className="luxury-retreats my-24">
      <div className="luxury-retreats-container flex justify-between items-center lg:gap-3 xl:gap-24">
        <div className="lhs desktop-only">
          <div className="relative w-[405.19px] h-[973px]">
            <div className="white-overlay"></div>
            <Image
              src="/luxury_retreats_about.jpeg"
              alt="Luxury Retreat Experience for networking and investment-savvy individuals"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="rhs flex flex-col justify-center lg:justify-start items-center lg:items-start gap-16">
          <div className="top-container w-11/12 flex flex-col gap-5">
            <div className="helpers flex justify-between items-center">
              <p>01/05</p>
              <div className="flex justify-center items-center gap-5">
                <CarouselButtons direction={"previous"} />
                <CarouselButtons direction={"next"} />
              </div>
            </div>
            <div className="content flex flex-col gap-5">
              <h2 className="font-IvyPresto text-3xl lg:text-7xl">
                Our Luxury Retreats
              </h2>
              <p className="description text-sm lg:text-lg">
                The Retreat isn't solely about luxury; it's a chance to connect
                with influential and investment-savvy individuals worldwide.
                Limited to just 20 carefully selected participants, our retreats
                offer unparalleled networking opportunities. Immerse yourself in
                luxury, gourmet dining, and exclusive tours of off-market
                properties at our partner hotels.
              </p>
              <p className="underline font-bold text-sm">View All</p>
            </div>
          </div>
          <div className="bottom-container flex flex-col gap-8 w-11/12 lg:w-full lg:flex-row justify-center lg:justify-between items-center lg:items-start">
            <div className="content flex flex-col gap-4 lg:w-4/12">
              <h3 className="retreat-title text-base lg:text-4xl font-IvyPresto">
                The Jumeirah Experience
              </h3>
              <p className="text-sm lg:text-base">
                Experience the luxury of a 3-night stay at Jumeirah Beach
                Resort, surrounded by the breath-taking beauty of the Arabian
                Gulf. Dive into a world of opulent experiences, from gourmet
                dining to exhilarating desert adventures.
              </p>
              <div className="retreat-details">
                <p>
                  <span className="font-semibold text-xs lg:text-base uppercase">
                    LOCATION:
                  </span>
                  Jumeirah Beach Resort
                </p>
                <p>
                  <span className="font-semibold text-xs lg:text-base uppercase">
                    DATES:
                  </span>
                  May 25th - May 30th 2024
                </p>
              </div>
              <div>
                <p className="underline font-bold">Register Now!</p>
              </div>
            </div>
            <div className="image relative w-11/12 h-[192px] lg:w-[38.927vw] lg:h-[55.942vh] xl:w-[46.927vw] xl:h-[61.942vh]">
              <div className="white-overlay"></div>
              <Image
                src="/jumeirah_about.jpeg"
                alt="Luxury Retreat at Jumeirah Beach Hotel"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryRetreats;
