import Navbar from "@/components/Navbar";
import RatingsSection from "@/components/RatingsSection";
import ServicesSection from "@/components/ServicesSection";
import CustomButton from "@/components/shared/CustomButton";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <main>
      <header className="category-page-header flex flex-col justify-between items-center relative w-full h-[468px] lg:h-[100svh]">
        <div className="overlay absolute top-0 left-0"></div>
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="main-bg-img relative w-full h-full">
            <Image
              src="/fashion_show.jpeg"
              alt="High-end fashion show with models walking the runway"
              className="object-cover"
              fill
            />
          </div>
        </div>
        <div className="main-content h-4/6 lg:h-5/6 w-11/12 lg:w-full flex justify-center items-start lg:items-center relative z-50">
          <div className="main-img absolute left-5 bottom-12 lg:relative w-[231px] h-[351px] lg:w-[59.219svw] lg:h-[60.484svh]">
            <div className="lg:hidden absolute overlay"></div>
            <Image
              src="/fashion_model.jpeg"
              alt="Fashion events showcasing designer attire on the runway"
              className="object-cover"
              fill
            />
          </div>
          <div className="main-text-content text-white lg:w-[35.208vw] z-50 lg:-ml-10 flex flex-col justify-start items-start gap-4">
            <h1 className="font-IvyPresto w-5/6 lg:w-full text-4xl lg:text-[88px] lg:leading-[110px]">
              Exclusive Events Ticketing for seamless access
            </h1>
            <p className="text-sm lg:text-lg lg:w-4/6">
              Dxberience offers an exceptional event ticketing service,
              providing access to a wide range of prestigious events both in
              Dubai and globally.
            </p>
          </div>
        </div>
      </header>
      <section className="section-b flex justify-center items-center">
        <div className="flex justify-center lg:justify-between items-center w-11/12 py-6 lg:py-[97px] gap-16">
          <div className="section-b-text-content w-full flex flex-col gap-8 justify-center lg:justify-start items-center">
            <h2 className="font-IvyPresto text-4xl lg:text-7xl">
              Unparalleled Access to Premium Events
            </h2>
            <div className="section-b-description">
              <p className="text-sm lg:text-lg">
                Whether you’re looking to attend exclusive film festivals,
                high-end fashion shows, thrilling sports events, or elegant
                charity galas, we ensure you have the best seats in the house.
                Dxberience takes care of every detail, from securing exclusive
                tickets to providing personalized itineraries that enhance your
                event experience
              </p>
              <p className="text-sm lg:text-lg">
                Imagine walking the red carpet at internationally renowned film
                festivals, where you can mingle with A-list celebrities and
                industry giants. Enjoy front-row seats at the latest fashion
                shows, witnessing firsthand the unveiling of cutting-edge
                designs from top designers. Cheer on your favorite teams from
                the best vantage points at major sports events, feeling the
                adrenaline and excitement up close. Attend sophisticated charity
                galas and contribute to meaningful causes while enjoying a night
                of elegance and philanthropy.
              </p>
            </div>
            <div className="section-b-btn w-full flex-center lg:justify-start">
              <CustomButton btnName="find events" invert />
            </div>
          </div>
          <div className="w-full hidden lg:flex">
            <div className="section-b-img relative desktop-only lg:w-[44.167vw] lg:h-[78.327vh]">
              <Image
                src="/concert.jpeg"
                alt="Live concert with vibrant stage lighting and a large crowd"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <ServicesSection />
      <section className="section-d flex-center py-9 lg:py-[100px]">
        <div className="flex flex-col gap-16 justify-center items-center w-10/12">
          <div className="section-d-text-content flex flex-col gap-8 lg:flex-row justify-between items-center">
            <div>
              <h2 className="section-d-header lg:w-7/12 text-4xl lg:text-7xl font-IvyPresto">
                Explore our Top-Tier Events
              </h2>
            </div>
            <div className="w-full lg:w-6/12 flex flex-col justify-start items-start gap-9">
              <div className="section-d-description">
                <p className="text-sm lg:text-lg">
                  Discover a world of exceptional experiences with our top-tier
                  events. From global spectacles and cultural showcases to
                  intimate private gatherings and luxurious opera performances,
                  Dxberience offers an extensive range of premium events to suit
                  your preferences. Let us elevate your event experience with
                  curated access to the finest happenings around the globe.
                </p>
              </div>
              <div className="w-full flex justify-center lg:justify-start items-center">
                <CustomButton btnName="indulge today" />
              </div>
            </div>
          </div>
          <div className="section-d-video">
            <div className="relative w-[90svw] lg:w-[82.813vw] h-[222px] lg:h-[74.093vh] flex-center">
              <Image
                src="/event.png"
                alt="Private event with elegant décor and VIP guests"
                className="object-cover"
                fill
              />
              <Image
                src="/play_btn.png"
                alt="Play Buttton"
                className="object-cover relative z-20"
                width={135}
                height={135}
              />
            </div>
          </div>
        </div>
      </section>
      <RatingsSection />
      <Footer />
    </main>
  );
};

export default page;
