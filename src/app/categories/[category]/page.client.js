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

const CATEGORY_CTA_LABELS = {
  "vip-concierge": {
    explore: "View Services",
    indulge: "Request Concierge",
  },
  "luxury-car-rentals": {
    explore: "Chauffeur Service",
    indulge: "View Fleet",
  },
  "luxury-yacht-rentals": {
    explore: "View Yachts",
    indulge: "Explore Fleet",
  },
  events: {
    explore: "View Events",
    indulge: "Get Tickets",
  },
  "restaurants-and-nightlife": {
    explore: "View Venues",
    indulge: "Book a Table",
  },
  "luxury-stays": {
    explore: "View Stays",
    indulge: "Discover Villas",
  },
};

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
        <header className="category-page-header flex flex-col relative w-full bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <Navbar />

          <div className="main-content w-full py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Text content - Clear and readable */}
                <div className="flex-1 text-white space-y-6 lg:space-y-8">
                  <h1 className="font-IvyPresto text-5xl lg:text-7xl 2xl:text-8xl leading-tight">
                    {data.headerTitle}
                  </h1>
                  <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
                    {data.headerCaption}
                  </p>
                </div>

                {/* Featured image - As accent element */}
                <div className="flex-shrink-0 w-full lg:w-[500px] xl:w-[600px]">
                  <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src={data.headerImg.image}
                      alt={data.headerImg.alt}
                      className="object-cover"
                      fill
                      priority
                    />
                  </div>
                </div>
              </div>
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
                  btnName={
                    CATEGORY_CTA_LABELS[
                      data?.category?.slug || params.category
                    ]?.explore || "Explore"
                  }
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
                    btnName={
                      CATEGORY_CTA_LABELS[
                        data?.category?.slug || params.category
                      ]?.indulge || "indulge today"
                    }
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
