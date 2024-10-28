import Navbar from "@/components/Navbar";
import RatingsSection from "@/components/RatingsSection";
import Footer from "@/components/shared/Footer";
import TailoredExperienceForm from "@/components/TailoredExperiences/TailoredExperiences";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <main>
      <header className="tailored-experiences max-w-full w-full max-h-svh h-[628px] lg:h-[800px] flex flex-col lg:justify-between items-center pb-4">
        <Navbar />
        <div className="bg-image absolute top-0 left-0 w-full max-w-full h-[688px] lg:h-[800px]">
          <div className="w-full h-full relative">
            <div className="overlay absolute"></div>
            <Image
              src="/tailored_experiences.jpeg"
              alt="tailored experiences"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="header-content w-11/12 h-full flex flex-wrap lg:flex-nowrap gap-5 lg:gap-10 justify-center items-center">
          <div className="text-contents z-10 text-white flex flex-col justify-center items-start lg:items-center gap-6">
            <h1 className="font-IvyPresto text-4xl lg:text-7xl">
              We create Bespoke Experiences & Services
            </h1>
            <p className="text-lg">
              At Dxberience, we specialize in crafting unforgettable luxury
              experiences and events that cater to your unique tastes and
              preferences. Our goal is to provide you with moments of
              indulgence, excitement, and sophistication that elevate your
              lifestyle and create lasting memories.
            </p>
          </div>
          <div className="image-contents flex justify-center items-end gap-7 w-full z-10">
            <div className="main-img relative w-[210.9px] h-[269.27px] lg:w-[25.781vw] lg:h-[63.71vh]">
              <Image
                src={"/tailored_experience_header.jpeg"}
                alt="a luxury car you could rent"
                fill
                className="object-cover"
              />
            </div>
            <div className="sub-img relative w-[117.59px] h-[195.56px] lg:w-[14.375vw] lg:h-[46.27vh]">
              <Image
                src={"/tailored_experience_suit.jpeg"}
                alt="A man wearing a luxury watch and a red suit"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>
      <section className="services mt-28 lg:mb-96 w-full flex-center">
        <div className="flex flex-col justify-center items-center gap-6 w-11/12">
          <h2 className="text-3xl text-center lg:text-left lg:text-6xl font-IvyPresto">
            Tailored Experiences & Services
          </h2>
          <p className="text-center w-10/12 text-sm lg:text-lg">
            Dxberience excels in tailoring services to meet the unique
            preferences and requirements of each client. Whether arranging
            bespoke travel itineraries, securing exclusive event access, or
            organizing private celebrations, Dxberience's commitment to
            personalization ensures that every detail aligns perfectly with the
            client's vision and desires. This personalized approach fosters a
            deep sense of satisfaction and loyalty among clients who appreciate
            the bespoke touch.
          </p>
        </div>
      </section>

      <div className="left-side mobile-only flex justify-center items-center w-full px-4 mt-16">
        <div className="top-box bg-primary text-white w-[300px] -mb-16 lg:w-[38.177vw] px-4 py-10 h-fit lg:px-[78px] lg:py-[93px] flex flex-col justify-center items-start gap-4 lg:gap-14">
          <h1 className="font-IvyPresto text-3xl lg:text-[70px]">
            We tailor unforgettable luxury experiences
          </h1>
        </div>
      </div>
      <section className="tailored-experiences-form flex flex-col lg:flex-row justify-between w-full h-fit lg:h-[836px] px-4 py-20 lg:px-[72px] lg:mt-[30px] ">
        <div className="left-side hidden lg:block h-[477px]">
          <div className="top-box -mt-[220px] lg:-mt-[60%] xl:-mt-[60%] 2xl:-mt-[30%] bg-primary text-white lg:w-[38.177vw] px-4 py-10 lg:px-[20px] xl:px-[78px] lg:py-[43px] xl:py-[93px] flex flex-col justify-center items-start gap-4 lg:gap-14">
            <h1 className="font-IvyPresto text-xl lg:text-5xl xl:text-7xl">
              We tailor unforgettable luxury experiences
            </h1>
          </div>
        </div>
        <div className="flex w-full justify-center items-center h-full">
          <div className="w-full lg:w-[49.479vw]">
            <TailoredExperienceForm />
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center my-10 lg:my-48">
        <div className="w-11/12">
          <div className="w-full lg:w-[44.896vw] flex flex-col justify-start items-start gap-10">
            <div className="section-header">
              <p className="text-sm lg:text-4xl">WHY</p>
              <h2 className="font-IvyPresto lg:text-7xl text-3xl">
                select our concierge services
              </h2>
            </div>
            <div className="flex justify-start items-start flex-col gap-7">
              <div className="flex justify-start items-start gap-3 flex-col">
                <h1 className="text-lg">VIP TREATMENT</h1>
                <p className="text-lg">
                  Enjoy VIP treatment at every stage of your journey, from
                  priority access and upgrades to exclusive perks and amenities,
                  ensuring you receive the utmost luxury and comfort during your
                  travels.
                </p>
              </div>
              <div className="flex justify-start items-start gap-3 flex-col">
                <h1 className="text-lg">PERSONALISED SERVICE</h1>
                <p className="text-lg">
                  At Dxberience, we specialize in crafting tailored travel
                  experiences that cater to your unique preferences and needs.
                  Our dedicated team of travel experts works closely with you to
                  create customized itineraries that reflect your individual
                  travel style.
                </p>
              </div>
              <div className="flex justify-start items-start gap-3 flex-col">
                <h1 className="text-lg">EXCLUSIVE ACCESS</h1>
                <p className="text-lg">
                  Our extensive network and established partnerships with
                  top-tier hotels, resorts, and tour operators worldwide grant
                  our clients exclusive access to highly sought-after travel
                </p>
              </div>
              <div className="flex justify-start items-start gap-3 flex-col">
                <h1 className="text-lg">GLOBAL EXPERTISE</h1>
                <p className="text-lg">
                  With a wealth of experience and knowledge in the luxury travel
                  industry, our team offers unparalleled insights and
                  recommendations for destinations across the globe, ensuring
                  you experience the best of each location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="img-section relative flex flex-col justify-center items-center">
        <div className="floating-box lg:absolute lg:w-[568px] mb-4 lg:mb-0 z-20 right-28 -top-56 bg-primary text-white px-8 py-10 lg:px-10 lg:py-16 flex flex-col justify-start items-start gap-8">
          <h1 className="text-3xl lg:text-7xl font-IvyPresto w-11/12">
            What makes us unique?
          </h1>
          <div className="px-8">
            <ul className="font-extralight list-disc">
              <li>Vip Treatment</li>
              <li>Personalised Service</li>
              <li>Exclusive Access</li>
              <li>Global Expertise</li>
            </ul>
          </div>
        </div>

        <div className="w-11/12 h-[73.589vh] relative">
          <Image
            src={"/dubai_sea_skyline.jpeg"}
            alt="Picture of the dubai skyline"
            fill
            className="object-cover"
          />
        </div>
      </section>
      <RatingsSection />
      <Footer />
    </main>
  );
};

export default page;
