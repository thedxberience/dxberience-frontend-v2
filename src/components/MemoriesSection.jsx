"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";

const MemoriesSection = () => {
  const stickySection = useRef(null);
  const scrollSection = useRef(null);

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", (e) => {
        handleTransform();
      });
    }
  }, []);

  const handleTransform = () => {
    const offsetTop = stickySection.current.parentElement.offsetTop;
    let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    percentage = percentage < 0 ? 0 : percentage > 120 ? 120 : percentage;
    scrollSection.current.style.transform = `translate3d( 0, ${-percentage}vw, 0)`;
  };

  return (
    <section className="memories w-full mt-[191px] ">
      <div className="sticky_parent w-full">
        <div ref={stickySection} className="sticky w-full">
          <div className="text flex justify-center items-center mt-[256px]">
            <div className="w-[219px] lg:w-[513px] h-[161px] lg:h-[285px]">
              <p className="text-white font-cormorant">Memories</p>
              <div className="flex flex-col justify-end items-end">
                <h1 className="text-text-secondary text-4xl lg:text-[90px] font-thin">
                  MOMENTS
                </h1>
                <p className="text-white text-[17px] lg:text-[35px] font-thin">
                  THAT LASTS A LIFE TIME
                </p>
              </div>
              <div>
                <p className="text-center text-sm lg:text-base text-white pt-[25px] font-cormorant">
                  Memories we have curated with people so they can tell
                  beautiful, fun and luxurious stories with.
                </p>
              </div>
            </div>
          </div>
          <div ref={scrollSection} className="scroll_section p-5">
            <div className="flex flex-col justify-between items-start lg:items-center h-[150vh] lg:h-[280vh]">
              <div className="memory_image">
                <Image
                  src="/demand-luxury-image-2.png"
                  alt="view of the ocean from a yacht"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="memory_image">
                <Image
                  src="/memories_champagne.png"
                  alt="people drinking glasses of champagne"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center h-[100vh]">
              <div className="memory_image">
                <Image
                  src="/chauffeur.png"
                  alt="people drinking glasses of champagne"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between items-center h-[120vh] lg:h-[200vh] mt-10 lg:mt-0">
              <div className="memory_image">
                <Image
                  src="/car_flight.png"
                  alt="car view of a private plane"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="memory_image">
                <Image
                  src="/hero_section.png"
                  alt="people drinking glasses of champagne"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemoriesSection;
