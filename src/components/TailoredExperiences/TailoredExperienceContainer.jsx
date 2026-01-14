import React from "react";
import TailoredExperienceForm from "./TailoredExperiences";

const TailoredExperienceContainer = () => {
  return (
    <div>
      <div className="left-side mobile-only flex justify-center items-center w-full px-4 mt-16">
        <div className="top-box bg-primary text-white w-[300px] -mb-16 lg:w-[38.177vw] px-4 py-10 h-fit lg:px-[78px] lg:py-[93px] flex flex-col justify-center items-start gap-4 lg:gap-14">
          <h2 className="font-IvyPresto text-3xl lg:text-[70px]">
            We tailor unforgettable luxury experiences
          </h2>
        </div>
      </div>
      <section className="explore-tailored-experiences-form bg-black flex flex-col lg:flex-row justify-between w-full h-fit lg:h-[836px] px-4 py-20 lg:px-[72px] lg:mt-[30px] ">
        <div className="left-side hidden lg:block h-[477px]">
          <div className="top-box -mt-[220px] lg:-mt-[60%] xl:-mt-[60%] 2xl:-mt-[30%] text-white lg:w-[38.177vw] px-4 py-10 lg:px-[20px] xl:px-[78px] lg:py-[43px] xl:py-[93px] flex flex-col justify-center items-start gap-4 lg:gap-14">
            <h2 className="font-IvyPresto text-xl lg:text-5xl xl:text-7xl">
              We tailor unforgettable luxury experiences
            </h2>
          </div>
        </div>
        <div className="flex w-full justify-center items-center h-full">
          <div className="w-full lg:w-[49.479vw]">
            <TailoredExperienceForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TailoredExperienceContainer;
