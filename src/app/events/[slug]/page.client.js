"use client";
import React, { useState, useEffect } from "react";
import { makeRequest } from "@/utils/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoChevronDown } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/Footer";
import PriceContainer from "@/components/Events/PriceContainer";
import EventsBookingForm from "@/components/Events/EventsBookingForm";
import EventsContentCarousel from "@/components/Events/EventsContentCarousel";

import { sluggify } from "@/utils/utils";
import CustomButton from "@/components/shared/CustomButton";
import { FaWhatsapp } from "react-icons/fa";
import { useWhatsAppModal } from "@/utils/useWhatsAppModal";

const EventsDetailsPage = ({ params, category }) => {
  // const searchParams = useSearchParams();
  // const affiliateID = searchParams.get("affiliate");

  // const validateAffiliate = useApiStore((state) => state.validateAffiliate);

  // useQuery({
  //   queryKey: ["affiliate", affiliateID],
  //   queryFn: async () => {
  //     const req = await validateAffiliate(affiliateID, params.slug);

  //     return req;
  //   },

  //   enabled: !!affiliateID,
  // });

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", params.slug],
    queryFn: async () => {
      let data;
      if (category === "luxury-yacht-rentals") {
        data = await makeRequest(`/yachts/${params.slug}?asProduct=true`);
      } else {
        data = await makeRequest(`/product/${params.slug}`);
      }

      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error("Product not found");
      }

      return data[0];
    },
  });

  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  const [thumbnailImage, setThumbnailImage] = useState(null);

  const router = useRouter();

  const { openWhatsAppModal } = useWhatsAppModal();

  // Authentication disabled - always show booking form
  const isAuthenticated = true;

  const handlePagePop = () => {
    if (document) {
      const prevPage = document.referrer;

      if (data && data?.category?.name) {
        router.push(
          `/explore-experiences/${sluggify(
            data?.category?.name.toLowerCase()
          )}/all`
        );
      } else {
        router.push("/explore-experiences/all");
      }
    }
  };

  // Update thumbnail image when data becomes available
  useEffect(() => {
    if (data?.thumbnail?.image && !thumbnailImage) {
      setThumbnailImage(data.thumbnail.image);
    }
  }, [data, thumbnailImage]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (!data?.thumbnail?.image) {
      if (data?.category?.name) {
        router.replace(
          `/explore-experiences/${sluggify(
            data.category.name.toLowerCase()
          )}/all`
        );
      } else {
        router.replace("/explore-experiences/all");
      }
    }
  }, [data, router]);

  const handleThumbnailImage = (image) => {
    setThumbnailImage(image);
    if (image !== thumbnailImage) {
      setThumbnailLoading(true);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <main>
        <header className="events-header relative w-full h-[468px] lg:h-[800px] flex flex-col justify-between items-center">
          <Navbar />
          <div className="overlay absolute top-0 left-0"></div>
          <div className="flex justify-center items-center h-full">
            <Image
              src="/Loader.svg"
              alt="loader spinner"
              className="animate-spin"
              width={48}
              height={48}
            />
          </div>
        </header>
      </main>
    );
  }

  // Show error state
  if (error) {
    return (
      <main>
        <header className="events-header relative w-full h-[468px] lg:h-[800px] flex flex-col justify-between items-center">
          <Navbar />
          <div className="overlay absolute top-0 left-0"></div>
          <div className="flex justify-center items-center h-full text-white">
            <div className="text-center">
              <h1 className="text-2xl font-IvyPresto mb-4">
                Product Not Found
              </h1>
              <p className="text-lg">
                The requested product could not be found.
              </p>
            </div>
          </div>
        </header>
      </main>
    );
  }

  // Don't render if data is not available
  if (!data) {
    return (
      <main>
        <header className="events-header relative w-full h-[468px] lg:h-[800px] flex flex-col justify-between items-center">
          <Navbar />
          <div className="overlay absolute top-0 left-0"></div>
          <div className="flex justify-center items-center h-full text-white">
            <div className="text-center">
              <h1 className="text-2xl font-IvyPresto mb-4">Loading...</h1>
            </div>
          </div>
        </header>
      </main>
    );
  }

  if (!data?.thumbnail?.image) {
    return null;
  }

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
            alt={data?.thumbnail?.altText || data?.title}
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
                          alt={image.altText || data?.title}
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
              <div className="cta flex justify-between items-center w-full">
                <div
                  className="flex justify-center items-center gap-6 text-black cursor-pointer"
                  onClick={handlePagePop}
                >
                  <IoChevronDown className="rotate-90" />{" "}
                  <span className="text-lg">Back</span>
                </div>
                <div className="flex justify-center items-center gap-6 text-black cursor-pointer pr-5">
                  <CustomButton
                    btnName="Book Now"
                    onClick={() => {
                      openWhatsAppModal(
                        `https://wa.me/+971585787558?text=Hi! I'm interested in the ${
                          data?.title
                        } ${
                          data?.subCategory?.name
                            ? `(${data?.subCategory?.name})`
                            : `(${data?.category?.name})`
                        } here is the link: ${window.location.href}`,
                        {
                          productName: data?.title,
                          productSlug: window.location.href,
                          productPrice: data?.price,
                          affiliateId: "",
                        }
                      );
                    }}
                    className="bg-black text-white"
                    invert
                    icon={<FaWhatsapp className="text-white w-6 h-6" />}
                  />
                </div>
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
            <div className="flex-between">
              <div className="event-name flex flex-col justify-start items-start gap-2">
                <h1 className="font-IvyPresto capitalize text-xl">
                  {data?.title}
                </h1>
                <p className="text-sm">{data?.shortDescription}</p>
              </div>
              {/* <div>
                <Heart
                  title={data?.title}
                  slug={data?.slug}
                  category={data?.category?.name}
                  invert={true}
                />
              </div> */}
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

        {isAuthenticated ? (
          <EventsBookingForm
            slug={params.slug}
            price={data?.price}
            product={data?.title}
          />
        ) : (
          <div className="w-5/12 h-full"></div>
        )}
      </section>
      <Footer />
    </main>
  );
};

export default EventsDetailsPage;
