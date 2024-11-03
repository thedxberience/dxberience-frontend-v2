"use client";
import Navbar from "@/components/Navbar";
import RatingsSection from "@/components/RatingsSection";
import ServicesSection from "@/components/ServicesSection";
import CustomButton from "@/components/shared/CustomButton";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useApiStore } from "@/store/apiStore";
import LoadingIcon from "@/components/shared/LoadingIcon";

const page = ({ params }) => {
  const { getCategoryPage } = useApiStore((state) => ({
    getCategoryPage: state.getCategoryPage,
  }));

  const { data, isPending, isSuccess, error, isError } = useQuery({
    queryKey: ["category-page", params.category],
    queryFn: async () => {
      const categoryPageReq = getCategoryPage(params.category);
      return categoryPageReq;
    },
  });

  const handleLoadingState = () => {
    return (
      <div className="max-w-full w-svw max-h-full h-svh bg-white flex justify-center items-start">
        <div className="loading-container animate-pulse flex flex-col justify-center items-center gap-4 h-[50%]">
          <LoadingIcon />
          <Image
            src="/dxberience_Logo_black.png"
            alt="Dxberience Logo"
            width={172}
            height={42}
            className="object-cover"
          />
        </div>
      </div>
    );
  };

  const handleErrorState = () => {
    return (
      <div className="max-w-full w-svw max-h-full h-svh bg-white flex justify-center items-start">
        <div className="loading-container flex flex-col justify-center items-center gap-4 h-[50%]">
          <Image
            src="/dxberience_Logo_black.png"
            alt="Dxberience Logo"
            width={172}
            height={42}
            className="object-cover"
          />

          <h1>
            Sorry, the category page does not exist, please check back later
          </h1>

          <CustomButton isLink href="/" btnName="Go Back Home" />
        </div>
      </div>
    );
  };

  if (isPending) {
    return handleLoadingState();
  }

  if (!data || isError) {
    return handleErrorState();
  }

  return (
    <main>
      <header className="category-page-header flex flex-col justify-between items-center relative w-full h-[468px] lg:h-[100svh]">
        <div className="overlay absolute top-0 left-0"></div>
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="main-bg-img relative w-full h-full">
            <Image
              src={data.headerBgImg.image}
              alt={data.headerBgImg.alt}
              className="object-cover"
              fill
            />
          </div>
        </div>
        <div className="main-content h-4/6 lg:h-5/6 w-11/12 lg:w-full flex justify-center items-start lg:items-center relative z-50">
          <div className="main-img absolute left-5 bottom-12 lg:relative w-[231px] h-[351px] lg:w-[59.219svw] lg:h-[60.484svh]">
            <div className="lg:hidden absolute overlay"></div>
            <Image
              src={data.headerImg.image}
              alt={data.headerImg.alt}
              className="object-cover"
              fill
            />
          </div>
          <div className="main-text-content text-white lg:w-[35.208vw] z-50 lg:-ml-10 flex flex-col justify-start items-start gap-4">
            <h1 className="font-IvyPresto w-5/6 lg:w-full text-4xl lg:text-[88px] lg:leading-[110px]">
              {data.headerTitle}
            </h1>
            <p className="text-sm lg:text-lg lg:w-4/6">{data.headerCaption}</p>
          </div>
        </div>
      </header>
      <section className="section-b flex justify-center items-center">
        <div className="flex justify-center lg:justify-between items-center w-11/12 py-6 lg:py-[97px] gap-16">
          <div className="section-b-text-content w-full flex flex-col gap-8 justify-center lg:justify-start items-center">
            <h2 className="font-IvyPresto text-4xl lg:text-7xl">
              {data.sectionATitle}
            </h2>
            <div className="section-b-description">
              <p className="text-sm lg:text-lg">{data.sectionADescription}</p>
            </div>
            <div className="section-b-btn w-full flex-center lg:justify-start">
              <CustomButton btnName="find events" invert />
            </div>
          </div>
          <div className="w-full hidden lg:flex">
            <div className="section-b-img relative desktop-only lg:w-[44.167vw] lg:h-[78.327vh]">
              <Image
                src={data.sectionAImage.image}
                alt={data.sectionAImage.alt}
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
                {data.sectionCHeader}
              </h2>
            </div>
            <div className="w-full lg:w-6/12 flex flex-col justify-start items-start gap-9">
              <div className="section-d-description">
                <p className="text-sm lg:text-lg">{data.sectionCDescription}</p>
              </div>
              <div className="w-full flex justify-center lg:justify-start items-center">
                <CustomButton btnName="indulge today" />
              </div>
            </div>
          </div>
          <div className="section-d-video">
            <div className="relative w-[90svw] lg:w-[82.813vw] h-[222px] lg:h-[74.093vh] flex-center">
              <Image
                src={data.sectionCVideoThumbnail.image}
                alt={data.sectionCVideoThumbnail.alt}
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
