"use client";
import EventsBookingForm from "@/components/Events/EventsBookingForm";
import EventsContentCarousel from "@/components/Events/EventsContentCarousel";
import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import React from "react";
import { IoChevronDown } from "react-icons/io5";

const page = () => {
  const event_gallery = [
    {
      src: "/theatre.jpeg",
      alt: "rear view of a theatre",
    },
    {
      src: "/theatre_stage.jpeg",
      alt: "picture of the theatre stage",
    },
    {
      src: "/theatre_seats.jpeg",
      alt: "picture of the seats in the theatre",
    },
    {
      src: "/theatre_entrance.jpeg",
      alt: "Entrance of the theatre stage",
    },
    {
      src: "/theatre_hallway.jpeg",
      alt: "Hallway of the theatre",
    },
  ];

  return (
    <main>
      <header className="events-header relative w-full h-[468px] lg:h-[800px] flex flex-col justify-between items-center">
        <Navbar />
        <div className="overlay absolute top-0 left-0"></div>
        <Image
          className="-z-10 object-cover"
          src={"/experience_opera.jpeg"}
          alt="Tickets for opera and ballet theatre performances in Dubai"
          fill
        />
        <div className="event_content -mb-9 lg:-mb-28 w-11/12 z-10 flex flex-col gap-3 lg:gap-20 justify-between items-center text-white">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-2xl lg:text-6xl font-IvyPresto">
              Discover our Events
            </h2>
            <div className="mobile-only flex-col justify-center items-center uppercase bg-primary px-4 py-2 text-center">
              <h3 className="font-IvyPresto font-bold text-2xl">AED 495</h3>
              <p className="font-thin text-sm">PER PERSON</p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col w-full justify-center items-start gap-6">
              <div className="event-gallery flex justify-center items-center gap-1">
                {event_gallery.map((image, key) => {
                  return (
                    <div
                      className="relative w-[17.497vw] lg:w-[195px] h-[56.69px] lg:h-[162px]"
                      key={key}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex desktop-only justify-center items-center gap-6 text-black cursor-pointer">
                <IoChevronDown className="rotate-90" />{" "}
                <span className="text-lg">Back</span>
              </div>
            </div>
            <div className="desktop-only uppercase w-[431px] flex-col justify-center items-center h-[279px] bg-primary px-4 py-2 text-center">
              <h3 className="font-IvyPresto font-bold text-2xl lg:text-5xl">
                AED 495
              </h3>
              <p className="font-thin text-sm lg:text-lg">PER PERSON</p>
            </div>
          </div>
        </div>
      </header>
      <section className="content mt-32 flex flex-col lg:flex-row justify-evenly items-center gap-6 w-full mb-16">
        <div className="event-description w-11/12 lg:w-7/12">
          <div className="event-name flex flex-col justify-start items-start gap-2">
            <h1 className="font-IvyPresto capitalize text-xl">
              Opera Ballet Theatre
            </h1>
            <p className="text-sm">A Night at the Opera Ballet Theater</p>
          </div>
          <EventsContentCarousel />
        </div>
        <EventsBookingForm />
      </section>
      <Footer />
    </main>
  );
};

export default page;
