"use client";
import React from "react";
import CarouselButtons from "./shared/CarouselButtons";
import RatingsCard from "./shared/RatingsCard";
import Carousel from "./shared/Carousel";
import { usePrevNextButtons } from "./shared/CarouselButtons";
import useEmblaCarousel from "embla-carousel-react";

const RatingsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });

  const {
    nextBtnDisabled,
    prevBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const ratings = [
    {
      star: 5,
      ratingAuthor: "- Michael R.",
      ratingDescription:
        "I've traveled the world, but my recent experience with Dxberience in Dubai was unparalleled. They curated a personalized itinerary that showcased the city's hidden gems, all with a touch of luxury. Can't wait to book my next adventure with them!",
    },
    {
      star: 5,
      ratingAuthor: " - Jessica L.",
      ratingDescription:
        "Exceeded our wildest expectations! From securing exclusive dining reservations to arranging a private yacht experience, every detail was flawless. Our trip to Dubai was truly unforgettable, all thanks to the impeccable service of Dxberience, Highly recommended!",
    },
  ];

  return (
    <section className="review-section flex justify-center items-center lg:px-20 w-full mb-8">
      <div className="flex flex-col justify-center items-center border-t border-b border-gray-800 w-full h-full my-20 py-16 gap-12">
        <div className="section-header w-full flex flex-col justify-center items-center">
          <h1 className="text-xl lg:text-5xl font-bold font-IvyPresto text-text_primary">
            Our clients share their experiences.
          </h1>
        </div>
        <div className="review-container w-full flex justify-center items-center gap-8">
          <Carousel emblaRef={emblaRef}>
            {ratings.map((rating, index) => {
              return (
                <div className="embla__slide z-10" key={index}>
                  <RatingsCard
                    star={rating.star}
                    ratingAuthor={rating.ratingAuthor}
                    ratingDescription={rating.ratingDescription}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="flex justify-center items-center gap-4">
          <CarouselButtons
            direction="prev"
            disabled={prevBtnDisabled}
            onClick={onPrevButtonClick}
          />
          <CarouselButtons
            direction="next"
            disabled={nextBtnDisabled}
            onClick={onNextButtonClick}
          />
        </div>
      </div>
    </section>
  );
};

export default RatingsSection;
