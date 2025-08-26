import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Footer from "@/components/shared/Footer";
import ServiceCardContainer from "@/components/party-finder/ServiceCardContainer";

export const metadata = {
  title:
    "The Dxberience x The Party Finder | The Best Luxury Lifestyle Management Services",
  description:
    "The Dxberience is a luxury Lifestyle Management service that provides a range of services to help you enjoy your time in Dubai.",
  openGraph: {
    title:
      "The Dxberience x The Party Finder | The Best Luxury Lifestyle Management Services",
    description:
      "The Dxberience is a luxury Lifestyle Management service that provides a range of services to help you enjoy your time in Dubai.",
    images: [
      {
        url: "/dxberience-logo.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const page = () => {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>
      <header className="w-11/12 mx-auto relative h-full">
        <div className="header-bg-image w-full max-h-[240px] lg:max-h-[540px] h-[240px] lg:h-[540px] relative">
          <Image
            src="/party-finder-header.jpg"
            alt="Enjoy strunning views in Dubai with The Dxberience and The Party finder"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="party-finder-header-content max-w-[325px] w-11/12 lg:max-w-[920px] mx-auto bg-white flex justify-center items-center py-6 lg:py-10 -mt-28 lg:-mt-72 z-20 relative">
          <div className="flex flex-col items-center justify-center gap-6">
            <p className="uppercase text-sm font-bold text-center rounded-sm bg-gray-1 py-1 px-1.5 text-primary">
              THE PARTY FINDER BRINGS YOU
            </p>
            <h1 className="text-2xl lg:text-6xl text-center font-IvyPresto text-balance leading-tight lg:leading-relaxed">
              The Best Luxury Concierge Services
            </h1>
            <p className="text-center text-xs lg:text-sm text-primary mx-auto font-bold">
              POWERED BY
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-4 bg-gray-1 rounded-sm px-6 py-2 min-w-[130px] lg:min-w-[300px] min-h-16 lg:min-h-[150px]">
                <div className="dxberience-logo relative w-28 h-6 lg:w-80 lg:h-20">
                  <Image
                    src="/dxberience-logo.png"
                    alt="The Dxberience"
                    fill
                    className="object-cover invert"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 bg-gray-1 rounded-sm px-6 py-2 min-w-[130px] lg:min-w-[300px] min-h-16 lg:min-h-[150px]">
                <div className="party-finder-logo relative w-11 h-10 lg:w-32 lg:h-28">
                  <Image
                    src="/party-finder-logo.png"
                    alt="Party Finder and TheDxberience partnership"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 w-11/12 mx-auto">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 h-[240px] lg:h-[280px] rounded-t-lg"></div>
                  <div className="bg-white p-4 lg:p-6 rounded-b-lg">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-4"></div>
                    <div className="h-10 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <ServiceCardContainer />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
};

export default page;
