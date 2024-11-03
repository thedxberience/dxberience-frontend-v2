"use client";
import EventsBookingForm from "@/components/Events/EventsBookingForm";
import EventsContentCarousel from "@/components/Events/EventsContentCarousel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/Footer";
import { makeRequest } from "@/utils/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import PriceContainer from "@/components/Events/PriceContainer";

const page = ({ params }) => {
  const { data, error, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["product", params.slug],
    queryFn: async () => {
      const data = await makeRequest(`/product/${params.slug}`);
      // console.log(data[0]?.subCategory?.name.toLowerCase().includes("rentals"));

      return data[0];
    },
  });

  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  const [thumbnailImage, setThumbnailImage] = useState(data?.thumbnail.image);

  const router = useRouter();

  const handlePagePop = () => {
    if (document) {
      const prevPage = document.referrer;
      console.log(document.referrer);
      console.log(
        prevPage.includes("thedxberience.com") || prevPage.includes("localhost")
      );

      if (data) {
        router.push(
          `/explore-experiences/${data?.category?.name.toLowerCase()}`
        );
      } else {
        router.push("/explore-experiences/all");
      }
    }
  };

  const handleThumbnailImage = (image) => {
    setThumbnailImage(image);
    if (image !== thumbnailImage) {
      setThumbnailLoading(true);
    }
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
        {thumbnailLoading && (
          <div>
            <Image
              src="/Loader.svg"
              alt="loader spinner"
              className="animate-spin"
              width={48}
              height={48}
            />
          </div>
        )}

        {data?.thumbnail && (
          <Image
            className="-z-10 object-cover"
            src={thumbnailImage || data?.thumbnail.image}
            alt={data?.thumbnail.altText}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100%"
            onLoad={() => setThumbnailLoading(false)}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcP316LgAF5gI8MqGGhAAAAABJRU5ErkJggg=="
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

            <PriceContainer
              price={data?.price}
              priceRate={data?.priceRate}
              subCategory={data?.subCategory}
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col w-full justify-center items-start gap-6">
              <div className="event-gallery flex justify-start w-full items-center gap-1 lg:w-[55svw] flex-none flex-shrink-0 basis-full overflow-x-auto">
                {data?.gallery?.map((image, key) => {
                  return (
                    image.image && (
                      <div
                        className="relative flex-shrink-0 w-[17.497vw] lg:w-[195px] h-[56.69px] lg:h-[162px] cursor-pointer"
                        key={key}
                        onClick={() => handleThumbnailImage(image.image)}
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

            <PriceContainer
              price={data?.price}
              priceRate={data?.priceRate}
              subCategory={data?.subCategory}
              isMobile={false}
            />
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
