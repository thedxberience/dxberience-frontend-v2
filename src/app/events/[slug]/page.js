"use client";
import EventsBookingForm from "@/components/Events/EventsBookingForm";
import EventsContentCarousel from "@/components/Events/EventsContentCarousel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/Footer";
import { makeRequest } from "@/utils/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";

const page = ({ params }) => {
  const { data, error, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["product", params.slug],
    queryFn: async () => {
      const data = await makeRequest(`/product/${params.slug}`);
      console.log(data[0]?.subCategory?.name.toLowerCase().includes("rentals"));

      return data[0];
    },
  });

  function currencyFormat(num) {
    return num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const router = useRouter();

  const handlePagePop = () => {
    router.back();
  };

  const handlePriceRate = useCallback(() => {
    if (data?.subCategory?.name.toLowerCase().includes("rentals")) {
      return "PER DAY";
    } else {
      return "PER PERSON";
    }
  }, [data]);

  return (
    <main>
      <header className="events-header relative w-full h-[468px] lg:h-[800px] flex flex-col justify-between items-center">
        <Navbar />
        <div className="overlay absolute top-0 left-0"></div>
        {data?.thumbnail && (
          <Image
            className="-z-10 object-cover"
            src={data?.thumbnail.image}
            alt={data?.thumbnail.altText}
            fill
          />
        )}
        <div className="event_content -mb-20 lg:-mb-28 w-11/12 z-10 flex flex-col gap-3 lg:gap-20 justify-between items-center text-white">
          <div className="flex justify-between items-center w-full">
            {data?.subCategory?.name && (
              <h2 className="text-2xl lg:text-6xl font-IvyPresto">
                Discover our {data?.subCategory?.name}
              </h2>
            )}

            {data?.price && (
              <div className="mobile-only flex-col justify-center items-center uppercase bg-primary px-4 py-2 text-center">
                <h3 className="font-IvyPresto font-bold text-2xl">
                  AED {currencyFormat(data?.price)}
                </h3>
                <p className="font-thin text-sm">
                  {data.priceRate ? data.priceRate : handlePriceRate()}
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col w-full justify-center items-start gap-6">
              <div className="event-gallery flex justify-start w-full items-center gap-1 lg:w-[55svw] flex-none flex-shrink-0 basis-full overflow-x-auto">
                {data?.gallery?.map((image, key) => {
                  return (
                    image.image && (
                      <div
                        className="relative flex-shrink-0 w-[17.497vw] lg:w-[195px] h-[56.69px] lg:h-[162px]"
                        key={key}
                      >
                        <Image
                          src={image.image}
                          alt={image.altText}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcP316LgAF5gI8MqGGhAAAAABJRU5ErkJggg=="
                          className="object-cover"
                        />
                      </div>
                    )
                  );
                })}
              </div>
              <div
                className="flex justify-center items-center gap-6 text-black cursor-pointer"
                onClick={handlePagePop}
              >
                <IoChevronDown className="rotate-90" />{" "}
                <span className="text-lg">Back</span>
              </div>
            </div>
            {data?.price && (
              <div className="desktop-only uppercase w-[431px] flex-col justify-center items-center h-[279px] bg-primary px-4 py-2 text-center">
                {data.priceRate?.toLowerCase() == "starting from" && (
                  <p className="font-thin text-sm lg:text-lg uppercase">
                    {data.priceRate ? data.priceRate : handlePriceRate()}
                  </p>
                )}
                <h3 className="font-IvyPresto font-bold text-2xl lg:text-5xl">
                  AED {currencyFormat(data?.price)}
                </h3>
                {data.priceRate?.toLowerCase() !== "starting from" && (
                  <p className="font-thin text-sm lg:text-lg uppercase">
                    {data.priceRate ? data.priceRate : handlePriceRate()}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      <section className="content mt-32 flex flex-col lg:flex-row justify-evenly items-start gap-6 w-full mb-16">
        <div className="w-full flex justify-center items-center">
          <div className="event-description w-11/12 ">
            <div className="event-name flex flex-col justify-start items-start gap-2">
              <h1 className="font-IvyPresto capitalize text-xl">
                {data?.title}
              </h1>
              <p className="text-sm">{data?.shortDescription}</p>
            </div>
            {data ? (
              <EventsContentCarousel
                longDescription={data.longDescription}
                location={data.location}
                locationCoordinate={data?.locationCoordinates}
                terms_and_conditions={data.termsAndCondition}
              />
            ) : (
              <div className="flex justify-center items-center min-h-screen">
                <Image
                  src={"/loader.svg"}
                  className="animate-spin"
                  alt="loader"
                  width={48}
                  height={48}
                />
              </div>
            )}
          </div>
        </div>

        <EventsBookingForm
          slug={params.slug}
          price={data?.price}
          product={data?.title}
        />
      </section>
      <Footer />
    </main>
  );
};

export default page;
