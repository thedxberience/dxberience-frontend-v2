import Navbar from "@/components/Navbar";
import RatingsSection from "@/components/RatingsSection";
import ServicesSection from "@/components/ServicesSection";
import CustomButton from "@/components/shared/CustomButton";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import React from "react";
import { notFound } from "next/navigation";
import VideoPlayer from "@/components/shared/VideoPlayer";
import SectionDVideo from "../components/SectionDVideo";

const CategoryPage = async ({ params }) => {
  try {
    const categoryReq = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + `/categories/${params.category}`
    );
    const [data] = await categoryReq.json();

    if (!data) {
      notFound();
    }

    return (
      <main>
        <header className="category-page-header flex flex-col justify-between items-center relative w-full h-[468px] lg:h-[100svh] ">
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
          <div className="main-content h-full lg:h-5/6 w-11/12 lg:w-full flex justify-center items-start lg:items-center relative z-40">
            <div className="main-img absolute left-5 bottom-4 lg:relative w-[231px] h-[351px] lg:w-[59.219svw] lg:h-[60.484svh]">
              <div className=" absolute overlay"></div>
              <Image
                src={data.headerImg.image}
                alt={data.headerImg.alt}
                className="object-cover"
                fill
              />
            </div>
            <div className="main-text-content relative text-white lg:w-[35.208vw] z-50 lg:-ml-10 flex flex-col justify-start items-start gap-4">
              <h2 className="font-IvyPresto w-5/6 lg:w-full text-4xl lg:text-7xl 2xl:text-[88px] 2xl:leading-[110px]">
                {data.headerTitle}
              </h2>
              <p className="text-sm lg:text-lg lg:w-4/6">
                {data.headerCaption}
              </p>
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
                <CustomButton
                  btnName="Explore"
                  invert
                  isLink
                  href={`/explore-experiences/${data.category.slug}/all`}
                />
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
        {
          // TODO: Implement category header and Center align if only one item
        }
        {data.category && data.category.subCategories && (
          <ServicesSection
            category={data.category}
            header={data.sectionBHeader}
          />
        )}
        <section className="section-d flex-center py-9 lg:py-[100px]">
          <div className="flex flex-col gap-16 justify-center items-center w-10/12">
            <div className="section-d-text-content flex flex-col gap-8 lg:flex-row justify-between items-center">
              <div className="lg:w-5/12 xl:w-4/12">
                <h2 className="section-d-header text-4xl xl:text-5xl 2xl:text-7xl font-IvyPresto">
                  {data.sectionCHeader}
                </h2>
              </div>
              <div className="w-full lg:w-7/12 flex flex-col justify-start items-start gap-9">
                <div className="section-d-description">
                  <p className="text-sm lg:text-lg">
                    {data.sectionCDescription}
                  </p>
                </div>
                <div className="w-full flex justify-center lg:justify-start items-center">
                  <CustomButton
                    btnName="indulge today"
                    invert
                    isLink
                    href={`/explore-experiences/${data.category.slug}/all`}
                  />
                </div>
              </div>
            </div>
            <SectionDVideo
              src={data.sectionCVideoThumbnail.image}
              alt={data.sectionCVideoThumbnail.alt}
            />
          </div>
        </section>
        <VideoPlayer videoURL={data.sectionCVideo} />

        <RatingsSection />
        <Footer />
      </main>
    );
  } catch (error) {
    // console.log("ERROR: ", error);

    notFound();
  }
};

export default CategoryPage;
