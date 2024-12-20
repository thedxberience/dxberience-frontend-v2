import ContactForm from "@/components/Contact/ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import React, { Suspense } from "react";

const page = () => {
  return (
    <main className="min-h-screen">
      <header className="partner-hero-section flex-center-col w-full h-full min-h-[468px] lg:min-h-[812px]">
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
        </Suspense>
        <div className="partner-header-container flex-between justify-evenly text-white w-11/12 relative">
          <div className="absolute lg:relative bottom-3 lg:top-0 left-[20px] lg:left-0">
            <div className="header-img relative w-[231px] h-[351px] lg:w-[37.604vw] lg:max-h-[650px] lg:h-[64.214vh]">
              <Image
                src={"/partner_header_img.jpeg"}
                alt="Luxury concierge services in Dubai"
                className="object-cover"
                fill
              />
            </div>
          </div>

          <div className="w-full z-10 lg:w-6/12 h-full flex justify-start lg:justify-center items-start flex-col gap-8">
            <h1 className="text-4xl lg:text-[88px] lg:leading-[110px] font-IvyPresto w-11/12 lg:w-9/12">
              Our partnerships and collaborators
            </h1>
            <p className="text-sm lg:text-lg w-9/12">
              Our partnerships and collaborators form the backbone of our
              service, ensuring we deliver exceptional experiences and services
              to our clients.
            </p>
          </div>
        </div>
      </header>

      <section className="flex-center my-20">
        <div className="flex-start-col w-11/12 lg:flex-row lg:justify-between gap-4">
          <div className="text-3xl lg:text-7xl lg:w-4/12">
            <h2 className="font-IvyPresto">Our Esteemed Partners</h2>
          </div>
          <div className="lg:w-5/12">
            <p>
              Discover the essence of luxury through Dxberience's esteemed
              partners, carefully curated to elevate your experience in Dubai.
              From exclusive hotels and fine dining to private transport and VIP
              event access, our network ensures unparalleled access to the
              city's most prestigious amenities and services. Join us in
              creating unforgettable moments by submitting your partnership
              request below.
            </p>
          </div>
        </div>
      </section>

      <service>
        <div className="partner-form-bg">
          <ContactForm />
        </div>
      </service>

      <Footer />
    </main>
  );
};

export default page;
