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
    if (stickySection.current) {
      const offsetTop = stickySection.current.parentElement.offsetTop;
      let percentage =
        ((window.scrollY - offsetTop) / window.innerHeight) * 100;
      percentage = percentage < 0 ? 0 : percentage > 120 ? 120 : percentage;
      scrollSection.current.style.transform = `translate3d( 0, ${-percentage}vw, 0)`;
    }
  };

  return (
    <section className="memories w-full">
      <div className="sticky_parent w-full">
        <div ref={stickySection} className="sticky w-full">
          <div className="text flex justify-center items-end mt-[256px]">
            <div className="w-full lg:w-[33.281vw]">
              <div className="flex flex-col text-center justify-center items-center pb-5">
                <h1 className="text-text-secondary text-base lg:text-4xl font-thin">
                  LUXURY
                </h1>
                <h2 className="text-4xl font-IvyPresto lg:text-7xl font-thin">
                  Cars, Yachts and Jets
                </h2>
              </div>
            </div>
          </div>
          <div className="flex items-center lg:justify-center">
            <div className="w-full lg:w-[37.5vw]">
              <p className="text-center text-sm lg:text-base pt-4 font-cormorant">
                Experience luxury at its finest with our exquisite collection of
                luxury cars, yachts, and jets. From sleek supercars to elegant
                yachts and private jets, we offer unparalleled access to the
                pinnacle of sophistication and style.
              </p>
            </div>
          </div>
          <div ref={scrollSection} className="scroll_section p-5">
            <div className="flex flex-col justify-between items-start lg:items-center h-[150vh] lg:h-[280vh]">
              <div className="memory_image">
                <Image
                  src="/yacht_deck.jpeg"
                  alt="Luxury yacht rental and best charters yachts in Dubai"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="memory_image">
                <Image
                  src="/watch_shopping.jpeg"
                  alt="Personalized shopping experiences in Dubai"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center h-[100vh]">
              <div className="memory_image">
                <Image
                  src="/chauffeur.png"
                  alt="Limousine services for VIP transportation in Dubai"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between items-center h-[120vh] lg:h-[200vh] mt-10 lg:mt-0">
              <div className="memory_image">
                <Image
                  src="/jet_interior.jpeg"
                  alt="Luxury private jet rental and best charter jets in Dubai"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="memory_image">
                <Image
                  src="/fine_dining.jpeg"
                  alt="Fine dining reservation at an exclusive restaurant in Dubai"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
