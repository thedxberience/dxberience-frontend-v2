"use client";
import ExperienceCard from "@/components/Experiences/ExperienceCard";
import ExperiencesForm from "@/components/Experiences/ExperiencesForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/Footer";
import { makeRequest } from "@/utils/axios";
import React, { useCallback, useState, useEffect, Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useComponentStore } from "@/store/componentStore";
import TailoredExperienceContainer from "../TailoredExperiences/TailoredExperienceContainer";
import { useSearchParams } from "next/navigation";
import { useApiStore } from "@/store/apiStore";

const ExploreExperienceContent = ({ params }) => {
  const searchParams = useSearchParams();
  const affiliateID = searchParams.get("affiliate");

  const validateAffiliate = useApiStore((state) => state.validateAffiliate);

  const setRevealTailoredExperiencForm = useComponentStore(
    (state) => state.setRevealTailoredExperiencForm
  );

  const affiliateReq = useQuery({
    queryKey: ["affiliate", affiliateID],
    queryFn: async () => {
      const req = await validateAffiliate(affiliateID, params.slug);

      return req;
    },
  });

  const [apiParams, setApiParams] = useState("/product");

  const { data, error, isError, isSuccess, isLoading } = useQuery({
    queryKey: ["product", apiParams],
    queryFn: async () => {
      const data = await makeRequest(apiParams);
      return data;
    },
  });

  const setCategoryFromSlug = useComponentStore(
    (state) => state.setCategoryFromSlug
  );

  useEffect(() => {
    setCategoryFromSlug(params.slug);
    if (affiliateID) {
      setRevealTailoredExperiencForm(true);
    }
  }, []);

  const handleShowExperiences = useCallback(() => {
    if (isLoading) {
      return (
        <div className="loader animate-spin flex justify-center items-center w-full">
          <Image src={"/Loader.svg"} alt="loader icon" width={48} height={48} />
        </div>
      );
    } else if (!isError && !isLoading && data && data.length != 0) {
      // console.log(JSON.stringify(productData));

      return data.map((product) => (
        <ExperienceCard
          experienceDescription={product.shortDescription}
          experienceTitle={product.title}
          slug={product.slug}
          experienceImage={product.thumbnail.image}
          experienceAlt={product.thumbnail.altText}
          priceStart={product.price}
          experienceLocation={
            product.location ? product.location : "Dubai, United Arab Emirates"
          }
          category={product?.category?.name}
          key={product.slug}
        />
      ));
    } else if (isError) {
      return (
        <div className="flex justify-center items-center w-full">
          <h1>{error.message}</h1>
        </div>
      );
    } else if (!data || data.length == 0) {
      return (
        <div className="flex justify-center text-black items-center w-full">
          <h1>
            Oops! Looks like we don't have what you are looking for, try a
            different filter or category.
          </h1>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center text-black items-center w-full">
          <div className="loader animate-spin">
            <Image
              src={"/Loader.svg"}
              alt="loader icon"
              width={48}
              height={48}
            />
          </div>
        </div>
      );
    }
  }, [data, isSuccess, isLoading, isError, params.slug]);

  return (
    <main>
      <section className="header-section h-[468px] relative lg:h-[800px] flex flex-col justify-between items-center">
        <Navbar />
        <div className="content p-5 text-white lg:w-10/12 h-full flex flex-col justify-center items-start">
          <h1 className="text-4xl lg:text-7xl font-IvyPresto lg:w-[50.656vw] pb-8">
            Explore our luxury experiences, activities and lifestyle management
            services
          </h1>
          <p className="lg:text-lg lg:w-[28.385vw]">
            From personalized travel itineraries to exclusive access to elite
            events, our services ensure that every moment is crafted to
            perfection, providing you with unparalleled sophistication and
            comfort.
          </p>
        </div>
        <ExperiencesForm
          setApiParams={setApiParams}
          isProductLoading={isLoading}
        />
      </section>
      <section className="experiences-container flex justify-start lg:justify-center items-start mt-32 md:px-5 py-10">
        <div
          className={`experiences ${
            !data && "loading-experiences mt-20"
          } w-full px-4 lg:px-0 lg:w-9/12 mt-16`}
        >
          {handleShowExperiences()}
        </div>
      </section>

      <div className="w-full md:mt-28 lg:mt-[20%]">
        <TailoredExperienceContainer />
      </div>

      <Footer />
    </main>
  );
};

// Wrapper component with Suspense boundary
const ExploreExperience = ({ params }) => {
  return (
    <Suspense
      fallback={
        <main>
          <section className="header-section h-[468px] relative lg:h-[800px] flex flex-col justify-between items-center">
            <Navbar />
            <div className="content p-5 text-white lg:w-10/12 h-full flex flex-col justify-center items-start">
              <h1 className="text-4xl lg:text-7xl font-IvyPresto lg:w-[50.656vw] pb-8">
                Loading...
              </h1>
            </div>
          </section>
          <Footer />
        </main>
      }
    >
      <ExploreExperienceContent params={params} />
    </Suspense>
  );
};

export default ExploreExperience;
