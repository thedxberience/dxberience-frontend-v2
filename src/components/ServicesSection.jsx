"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomButton from "./shared/CustomButton";
import ServiceCard from "./ServiceSection/ServiceCard";

const ServicesSection = () => {
  const servicesSectionRef = useRef(null);
  const stickySection = useRef(null);
  const scrollSection = useRef(null);

  const desktopScrollThreshold = 280;

  const [scrollThreshold, setScrollThreshold] = useState(
    desktopScrollThreshold
  );

  const [oddWidthState, setOddWidth] = useState(600);
  const [evenWidthState, setEvenWidth] = useState(373);

  const [stickySectionWidth, setStickySectionWidth] = useState(1082);

  useEffect(() => {
    if (window) {
      if (window.innerWidth < 1024) {
        setOddWidth(341);
        setEvenWidth(290);
      }
    }
  }, []);

  const handleScrollThreshold = useCallback(() => {
    if (window.innerWidth < 1024) {
      setScrollThreshold(620);
      setOddWidth(341);
      setEvenWidth(290);
    } else {
      setScrollThreshold(desktopScrollThreshold);
    }
    handleTransform();
  });

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", handleScrollThreshold);
    }

    return () => {
      window.removeEventListener("scroll", handleScrollThreshold);
    };
  }, [scrollThreshold]);

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

  const services = [
    {
      serviceName: "Vip Concierge",
      image: "/vip_concierge.jpeg",
      alt: "VIP concierge service in Dubai for exclusive experiences, personalized shopping, corporate services, travel booking.",
    },
    {
      serviceName: "Luxury Rentals",
      image: "/luxury_rentals.jpeg",
      alt: "Luxury car rentals for your Dubai getaway, private chauffeur and limousine services.",
    },
    {
      serviceName: "Private Jets",
      image: "/private_jets.jpeg",
      alt: "Private jet charters for seamless travel experiences in style.",
    },
    {
      serviceName: "Yachts",
      image: "/service_yacht.jpeg",
      alt: "Luxury yacht rentals in Dubai for unforgettable memories and celebrations.",
    },
    {
      serviceName: "Experiences",
      image: "/experiences.jpeg",
      alt: "Curated experiences in Dubai for desert activities, water sports, beach clubs, attractions and excursions.",
    },
    {
      serviceName: "Reservations",
      image: "/reservations.jpeg",
      alt: "Exclusive tables reservations at Dubai's finest restaurants, nightclubs and bars.",
    },
    {
      serviceName: "Events",
      image: "/events.jpeg",
      alt: "Attend private events and book your event tickets for sports, fashion, opera and film festivals.",
    },
    {
      serviceName: "Luxury Stays",
      image: "/luxury_stays.jpeg",
      alt: "Indulge in luxury villas at premium accommodations.",
    },
    {
      serviceName: "Visa Services",
      image: "/visa_services.jpeg",
      alt: "Streamlined visa services for hassle-free travel arrangements.",
    },
  ];

  const handleStickyDimension = useCallback(() => {
    const serviceCount = services.length;
    let oddWidth, evenWidth;

    if (serviceCount % 2 != 0) {
      oddWidth = Math.floor(serviceCount / 2) * oddWidthState;
      evenWidth = (Math.floor(serviceCount / 2) + 1) * evenWidthState;
      console.log(oddWidthState, evenWidthState);
    }
    setStickySectionWidth(oddWidth + evenWidth);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setScrollThreshold(620);
        setOddWidth(341);
        setEvenWidth(290);
      } else {
        setScrollThreshold(desktopScrollThreshold);
      }
    };

    if (window) {
      if (window.innerWidth < 1024) {
        setOddWidth(341);
        setEvenWidth(290);
      }
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleStickyDimension();
  }, [oddWidthState, evenWidthState]);

  return (
    <section className="services w-full">
      <div
        style={{
          height: stickySectionWidth + "px",
        }}
        className="sticky_parent"
      >
        <div ref={stickySection} className="sticky text-white">
          <div className="w-full flex justify-end items-center p-6 2xl:p-20">
            <div className="text flex flex-col lg:flex-row justify-evenly items-center">
              <div className="flex flex-col justify-end lg:justify-center items-end w-full lg:w-5/12">
                <h1 className="font-IvyPresto text-4xl lg:text-7xl">VIP</h1>
                <p className="text-base lg:text-4xl">CURATED EXPEIENCES</p>
              </div>
              <div className="flex flex-col gap-8 justify-center items-start w-full lg:w-5/12">
                <p className="text-base">
                  Dxberience offers VIP experiences that redefine luxury living
                  in Dubai, from bespoke services to curated experiences.
                  Discover our exclusive global private villa portfolio,
                  featuring luxurious accommodations in the world's most
                  sought-after destinations.
                </p>
                <div>
                  <CustomButton btnName="global private villa portfolio" />
                </div>
              </div>
            </div>
          </div>
          <div
            ref={scrollSection}
            style={{
              width: stickySectionWidth + "px",
            }}
            className="scroll_section pb-20"
          >
            {services.map((service, index) => (
              <ServiceCard
                {...service}
                key={`${service.serviceName} ${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
