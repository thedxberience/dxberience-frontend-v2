"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceSection/ServiceCard";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import Image from "next/image";

const ServicesSection = () => {
  const stickySection = useRef(null);
  const scrollSection = useRef(null);

  const desktopScrollThreshold = 280;

  const [scrollThreshold, setScrollThreshold] = useState(
    desktopScrollThreshold
  );

  const [lastScrollTop, setLastScrollTop] = useState(0);

  const [oddWidthState, setOddWidth] = useState();
  const [evenWidthState, setEvenWidth] = useState();
  const [scrollingUp, setScrollingUp] = useState();
  const [y, setY] = useState(0);

  const [stickySectionWidth, setStickySectionWidth] = useState(1082);

  const mobileOddWidth = 301;
  const mobileEvenWidth = 218;
  const laptopOddWidth = 341;
  const laptopEvenWidth = 190;
  const desktopOddWidth = 600;
  const desktopEvenWidth = 373;

  useEffect(() => {
    if (window) {
      if (window.innerWidth < 1024) {
        setOddWidth(mobileOddWidth);
        setEvenWidth(mobileEvenWidth);
        // console.log("Mobile width is now set", oddWidthState, evenWidthState);
      } else if (window.innerWidth >= 1280 && window.innerWidth <= 1445) {
        setOddWidth(laptopOddWidth);
        setEvenWidth(laptopEvenWidth);
        // console.log("Laptop width is now set", oddWidthState, evenWidthState);
      } else {
        setOddWidth(desktopOddWidth);
        setEvenWidth(desktopEvenWidth);
        // console.log("Desktop width is now set", oddWidthState, evenWidthState);
      }
    }
  }, []);

  const handleScrollThreshold = useCallback(() => {
    if (window) {
      setY(window.scrollY || document.documentElement.scrollTop);
      if (y > lastScrollTop) {
        setScrollingUp(false);
      } else {
        setScrollingUp(true);
      }
      setLastScrollTop(y <= 0 ? 0 : y);
    }
    if (window.innerWidth < 1024) {
      setScrollThreshold(620);
      setOddWidth(mobileOddWidth);
      setEvenWidth(mobileEvenWidth);
    } else {
      setScrollThreshold(desktopScrollThreshold);
    }
    handleTransform();
  }, [y, lastScrollTop]);

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", handleScrollThreshold);
    }

    return () => {
      window.removeEventListener("scroll", handleScrollThreshold);
    };
  }, [scrollThreshold, y]);

  const handleTransform = () => {
    if (stickySection.current) {
      const offsetTop = stickySection.current.parentElement.offsetTop;
      let percentage =
        ((window.scrollY - offsetTop) / window.innerHeight) * 100;
      percentage =
        percentage < 0
          ? 0
          : percentage > scrollThreshold
          ? scrollThreshold
          : percentage;
      scrollSection.current.style.transform = `translate3d(${-percentage}vw, 0, 0)`;
    } else {
      return;
    }
  };

  const { data: services } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await makeRequest(`/categories`);
      return data;
    },
  });

  const handleStickyDimension = useCallback(() => {
    const serviceCount = services?.length;
    let oddWidth, evenWidth;

    // console.log(serviceCount, serviceCount % 2);
    if (oddWidthState && evenWidthState) {
      if (serviceCount % 2 != 0) {
        oddWidth = Math.ceil(serviceCount / 2) * oddWidthState;
        evenWidth = (Math.ceil(serviceCount / 2) + 1) * evenWidthState;
      } else {
        oddWidth = Math.ceil(serviceCount / 2) * oddWidthState;
        evenWidth = Math.ceil(serviceCount / 2) * evenWidthState;
      }
      // console.log(`Odd width: ${oddWidthState}, even width: ${evenWidthState}`);
    }

    // console.log(oddWidth, evenWidth);

    setStickySectionWidth(oddWidth + evenWidth);
  }, [services, oddWidthState, evenWidthState]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setScrollThreshold(620);
        setOddWidth(mobileOddWidth);
        setEvenWidth(mobileEvenWidth);
        // console.log("Mobile width is now set");
      } else if (window.innerWidth >= 1280 && window.innerWidth <= 1440) {
        setOddWidth(laptopOddWidth);
        setEvenWidth(laptopEvenWidth);
        // console.log("Laptop width is now set");
      } else {
        setOddWidth(desktopOddWidth);
        setEvenWidth(desktopEvenWidth);
        setScrollThreshold(desktopScrollThreshold);
        // console.log("Desktop width is now set");
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleStickyDimension();
  }, [services, oddWidthState, evenWidthState]);

  return (
    <section className="services w-full">
      <div
        style={{
          height: stickySectionWidth + "px",
        }}
        className="sticky_parent"
      >
        <div ref={stickySection} className="sticky text-white">
          <div className="w-full flex justify-end items-center p-6 2xl:p-20 z-10 relative">
            <div className="text flex flex-col lg:flex-row justify-evenly items-center gap-2 lg:gap-4">
              <div className="flex flex-col justify-end lg:justify-center items-end w-full lg:w-5/12">
                <h1 className="font-IvyPresto text-4xl lg:text-7xl">VIP</h1>
                <p className="text-base lg:text-4xl">CURATED EXPERIENCES</p>
              </div>
              <div className="flex flex-col gap-8 justify-center items-start w-full lg:w-5/12">
                <p className="text-base">
                  Dxberience offers VIP experiences that redefine luxury living
                  in Dubai, from bespoke services to curated experiences.
                  Discover our exclusive global private villa portfolio,
                  featuring luxurious accommodations in the world's most
                  sought-after destinations.
                </p>
                {/* <div>
                  <CustomButton btnName="global private villa portfolio" />
                </div> */}
              </div>
              <div
                className={`flex justify-center items-center flex-col ${
                  scrollingUp ? "gap-1" : "gap-3"
                }`}
              >
                <p className="uppercase text-xs">Scroll to continue</p>

                <Image
                  className={`animate-bounce ${scrollingUp ? "scroll-up" : ""}`}
                  src="/scroll_icon.svg"
                  alt="scroll icon"
                  width={41}
                  height={41}
                />
              </div>
            </div>
          </div>
          <div
            ref={scrollSection}
            style={{
              width: stickySectionWidth + "px",
            }}
            className="scroll_section"
          >
            {services?.map((service, index) => (
              <ServiceCard {...service} key={`${service.name} ${index}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
