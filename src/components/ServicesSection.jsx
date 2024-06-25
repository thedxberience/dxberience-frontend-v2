"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ServicesSection = () => {
  const servicesSectionRef = useRef(null);
  const stickySection = useRef(null);
  const scrollSection = useRef(null);

  const [scrollThreshold, setScrollThreshold] = useState(110);

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", (e) => {
        if (window.innerWidth < 1024) {
          setScrollThreshold(200);
        } else {
          setScrollThreshold(110);
        }
        handleTransform();
      });
    }
  }, [scrollThreshold]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setScrollThreshold(200);
      } else {
        setScrollThreshold(110);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTransform = () => {
    const offsetTop = stickySection.current.parentElement.offsetTop;
    let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    percentage =
      percentage < 0
        ? 0
        : percentage > scrollThreshold
        ? scrollThreshold
        : percentage;
    scrollSection.current.style.transform = `translate3d(${-percentage}vw, 0, 0)`;
  };

  return (
    <section className="services w-full">
      <div className="sticky_parent">
        <div ref={stickySection} className="sticky">
          <div className="w-full flex justify-end items-center p-20">
            <div className="text">
              <div className="flex items-baseline justify-between w-full lg:w-[580px] text-white">
                <h1 className="font-cormorant">Services</h1>
                <h1 className="uppercase text-[17px] lg:text-[40px] font-thin">
                  THE EXTRAS
                </h1>
              </div>
              <div className="lg:w-[580px]">
                <h1 className="text-text-secondary uppercase text-[36px] lg:text-[90px] font-thin">
                  THAT COUNT
                </h1>
              </div>
            </div>
          </div>
          <div ref={scrollSection} className="scroll_section pb-20">
            <div className="service_image">
              <Image
                src="/private_jet.png"
                alt="luxury picture of a car and a private jet"
                fill
                className="object-cover"
              />
              <p className="absolute z-10 text-white -bottom-4 lg:-bottom-6 left-1/4 text-2xl lg:text-[64px] text-center uppercase font-thin">
                PRIVATE JET
              </p>
            </div>
            <div className="service_image">
              <Image
                src="/pool.png"
                alt="open scenery of a pool with a view of the dubai skyline"
                fill
                className="object-cover"
              />
              <p className="absolute z-10 text-white bottom-10 -left-8 lg:-left-20 rotate-[270deg] text-2xl lg:text-[64px] text-center uppercase font-thin">
                Pool
              </p>
            </div>
            <div className="service_image">
              <Image
                src="/beach.jpeg"
                alt="beach view of the ocean with a yacht in it"
                fill
                className="object-cover"
              />
              <p className="absolute z-10 text-white -bottom-4 lg:-bottom-6  left-1/4 text-2xl lg:text-[64px] text-center uppercase font-thin">
                Beach
              </p>
            </div>
            <div className="service_image">
              <Image
                src="/pool.png"
                alt="open scenery of a pool with a view of the dubai skyline"
                fill
                className="object-cover"
              />
              <p className="absolute z-10 text-white bottom-10 -left-8 lg:-left-20 rotate-[270deg] text-2xl lg:text-[64px] text-center uppercase font-thin">
                Pool
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
