"use client";
import ExperienceCard from "@/components/Experiences/ExperienceCard";
import ExperiencesForm from "@/components/Experiences/ExperiencesForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/Footer";
import { makeRequest } from "@/utils/axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const page = () => {
  const { data, error, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const data = await makeRequest("/product");
      return data;
    },
  });

  const handleShowExperiences = () => {
    if (isLoading) {
      return (
        <div className="loader animate-spin">
          <Image src={"/Loader.svg"} alt="loader icon" width={48} height={48} />
        </div>
      );
    } else if (isSuccess && data) {
      return data.map((category) => (
        <ExperienceCard
          experienceDescription={category.shortDescription}
          experienceTitle={category.title}
          slug={category.slug}
          experienceImage={category.thumbnail.image}
          experienceAlt={category.thumbnail.altText}
          priceStart={category.price}
          key={category.slug}
        />
      ));
    } else if (isError) {
      return (
        <div className="flex justify-center items-center w-full">
          <h1>{error}</h1>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center items-center w-full">
          <h1>No Categories present at the moment, check back later</h1>
        </div>
      );
    }
  };

  return (
    <main>
      <section className="header-section h-[468px] relative lg:h-[800px] flex flex-col justify-between items-center">
        <Navbar />
        <div className="content p-5 text-white lg:w-10/12 h-full flex flex-col justify-center items-start">
          <h1 className="text-4xl lg:text-7xl font-IvyPresto lg:w-[50.656vw] pb-8">
            Explore our luxury experiences, activities and concierge services
          </h1>
          <p className="lg:text-lg lg:w-[28.385vw]">
            From personalized travel itineraries to exclusive access to elite
            events, our services ensure that every moment is crafted to
            perfection, providing you with unparalleled sophistication and
            comfort.
          </p>
        </div>
        <ExperiencesForm />
      </section>
      <section className="experiences-container flex justify-start lg:justify-center items-start mt-32 md:px-5 py-10">
        <div className="experiences w-full lg:w-9/12 mt-8">
          {handleShowExperiences()}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default page;
