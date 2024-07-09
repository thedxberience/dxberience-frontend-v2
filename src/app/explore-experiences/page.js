import ExperienceCard from "@/components/Experiences/ExperienceCard";
import ExperiencesForm from "@/components/Experiences/ExperiencesForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/Footer";
import React from "react";

const page = () => {
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
      <section className="experiences-container flex justify-start lg:justify-center items-start mt-32 px-5 py-10">
        <div className="experiences w-full lg:w-9/12">
          <ExperienceCard />
          <ExperienceCard />
          <ExperienceCard />
          <ExperienceCard />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default page;
