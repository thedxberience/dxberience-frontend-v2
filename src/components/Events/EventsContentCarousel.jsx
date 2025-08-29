"use client";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ReactMarkdown from "react-markdown";
import Map from "./MapsApi";
import { PortableText } from "@portabletext/react";
import CustomPortableText from "../shared/CustomPortableText";

const EventsContentCarousel = ({
  longDescription,
  location,
  locationCoordinate,
  terms_and_conditions,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    watchDrag: true,
  });

  const onTabClick = useCallback(
    (index) => {
      if (!emblaMainApi) return;
      emblaMainApi.scrollTo(index, true);
      // console.log("Scrolling to " + index);
    },
    [emblaMainApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    // emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div>
      <div className="event-tabs py-8 flex justify-center items-center w-full text-xs lg:text-lg">
        {longDescription && (
          <div
            className={`w-full cursor-pointer flex justify-center items-center border-b ${
              selectedIndex == 0 ? "border-black" : "border-gray-50"
            } `}
            onClick={() => onTabClick(0)}
          >
            <h2>Details</h2>
          </div>
        )}
        {location && (
          <div
            className={`w-full cursor-pointer flex justify-center items-center border-b ${
              selectedIndex == 1 ? "border-black" : "border-gray-50"
            }`}
            onClick={() => onTabClick(1)}
          >
            <h2>Get Directions</h2>
          </div>
        )}

        {terms_and_conditions && (
          <div
            className={`w-full cursor-pointer flex justify-center items-center border-b ${
              selectedIndex == 2 ? "border-black" : "border-gray-50"
            }`}
            onClick={() => onTabClick(2)}
          >
            <h2>Terms & Conditions</h2>
          </div>
        )}
      </div>
      <div className="tab-content">
        <div className="embla">
          <div className="embla__viewport" ref={emblaMainRef}>
            <div className="embla__container">
              {longDescription && (
                <div
                  className={`details md embla__slide ${
                    selectedIndex == 0 ? "h-fit" : "h-0"
                  }`}
                  key={1}
                >
                  <CustomPortableText value={longDescription} />
                </div>
              )}

              <div
                className={`md embla__slide ${
                  selectedIndex == 1 ? "h-fit" : "h-0"
                }`}
                key={2}
              >
                <Map addressMD={location} coordinates={locationCoordinate} />
              </div>
              {terms_and_conditions && (
                <div
                  className={`md embla__slide ${
                    selectedIndex == 2 ? "h-fit" : "h-0"
                  }`}
                  key={3}
                >
                  <PortableText value={terms_and_conditions} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsContentCarousel;
