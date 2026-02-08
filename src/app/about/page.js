import Navbar from "@/components/Navbar";
import RatingsSection from "@/components/RatingsSection";
import ServicesSection from "@/components/ServicesSection";
import CustomButton from "@/components/shared/CustomButton";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import React, { Suspense } from "react";

export const metadata = {
  title: "About Dxberience - Luxury Lifestyle & Bespoke Concierge in Dubai",
  description:
    "Learn how Dxberience delivers bespoke luxury concierge and lifestyle services in Dubai. Our commitment to personalized VIP experiences and elite partnerships defines us.",
  alternates: {
    canonical: "https://www.thedxberience.com/about",
  },
  openGraph: {
    title: "About Dxberience - Luxury Lifestyle & Bespoke Concierge in Dubai",
    description:
      "Learn how Dxberience delivers bespoke luxury concierge and lifestyle services in Dubai. Our commitment to personalized VIP experiences and elite partnerships defines us.",
  },
};

const page = () => {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between">
      <header className="about-page-header flex flex-col relative w-full bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
        </Suspense>

        <div className="main-content w-full py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="flex-1 text-white space-y-6 lg:space-y-8">
                <h1 className="font-IvyPresto text-4xl lg:text-7xl 2xl:text-8xl leading-tight">
                  Dxberience refines Luxury with bespoke VIP services
                </h1>
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
                  From personalized travel itineraries to exclusive access to
                  elite events, our services ensure that every moment is crafted
                  to perfection, providing you with unparalleled sophistication
                  and comfort.
                </p>
              </div>

              <div className="flex-shrink-0 w-full lg:w-[500px] xl:w-[600px]">
                <div className="relative w-full h-[320px] lg:h-[500px] rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="/yacht_about.jpeg"
                    alt="luxury with our yacht rental service in Dubai"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="all-inclusive flex justify-center items-center my-[100px]">
        <div className="flex flex-col justify-center items-center w-11/12 lg:w-[36.094vw] gap-8">
          <h2 className="text-4xl lg:text-7xl font-IvyPresto">
            All-Inclusive Luxury Lifestyle Management in Dubai
          </h2>
          <p className="text-sm lg:text-lg">
            We offer a bespoke service tailored to meet the unique needs and
            desires of each client. With a commitment to excellence, our team
            provides a wide range of personalized services, from exclusive
            travel arrangements and VIP event access to luxury lifestyle
            management. We pride ourselves on our attention to detail and our
            ability to anticipate and fulfill the most discerning requests.
            Whether you seek a private yacht charter, tickets to a sold-out
            concert, or customized travel itineraries, Dxberience ensures an
            unparalleled experience, crafted with sophistication and precision.
            Let us elevate your lifestyle with our exceptional lifestyle
            management services.
          </p>
        </div>
      </section>
      <section className="bespoke-concierge-container flex justify-center items-center text-white w-full lg:h-[800px]">
        <div className="bespoke-concierge py-[100px] lg:py-0 px-4 lg:px-0 flex flex-col lg:flex-row justify-between items-center w-11/12">
          <div className="rectangle-box w-full h-full flex justify-start">
            <div className="w-[207px] h-[176px] lg:w-[23.438vw] lg:h-[718px] bg-primary -mt-[180px] lg:-mt-[612px]"></div>
          </div>
          <div className="content flex flex-col justify-center items-start gap-8 w-full lg:w-[37.396vw]">
            <h2 className="text-3xl lg:text-7xl font-IvyPresto">
              Bespoke Lifestyle Management Services
            </h2>
            <p className="text-sm lg:text-lg">
              Dxberience excels in tailoring services to meet the unique
              preferences and requirements of each client. Whether arranging
              bespoke travel itineraries, securing exclusive event access, or
              organizing private celebrations, Dxberience's commitment to
              personalization ensures that every detail aligns perfectly with
              the client's vision and desires. This personalized approach
              fosters a deep sense of satisfaction and loyalty among clients who
              appreciate the bespoke touch.
            </p>
          </div>
        </div>
      </section>
      <section className="extraordinary-experiences-container w-full py-[100px] flex justify-center lg:justify-end items-center">
        <div className="extraordinary-experiences flex flex-col lg:flex-row justify-between items-center w-11/12 h-[767px]">
          <div className="lhs flex flex-col justify-center items-start gap-11">
            <div className="section-header lg:w-[36.458vw]">
              <h2 className="font-IvyPresto text-3xl lg:text-7xl">
                DUBAI For Extraordinary Experiences
              </h2>
            </div>
            <div className="lg:pl-20 lg:w-[30.625vw]">
              <p>
                Dxberience, the all-inclusive luxury lifestyle management,
                offers all its services exclusively in Dubai to capitalize on
                the city's unparalleled blend of modern opulence and cultural
                richness. Dubai, renowned for its world-class amenities, luxury
                shopping, fine dining, and iconic landmarks, provides the
                perfect backdrop for delivering extraordinary experiences. By
                focusing on this vibrant city, Dxberience ensures that clients
                receive the highest level of personalized service and access to
                exclusive events, premium accommodations, and unique activities
                that only Dubai can offer. Our deep local knowledge and
                connections enable us to curate unforgettable moments, tailored
                specifically to our clients' desires, making every experience
                with Dxberience truly exceptional.
              </p>
            </div>
          </div>
          <div className="rhs">
            <div className="img-cotainer relative w-[315.97px] h-[175.69px] lg:w-[47.396vw] lg:h-[51.008vh]">
              <div className="absolute -top-24 -left-8 lg:-top-52 lg:-left-24 z-10">
                <div className="relative w-[129.51px] h-[170.14px] lg:w-[19.427vw] lg:h-[50.412vh]">
                  <Image
                    src="/chauffeur.png"
                    alt="Limousine services, Private Chauffeur for VIP transportation in Dubai"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <Image
                src="/private_villas_about.jpeg"
                alt="Private Villas for Exclusive Luxury Living"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <ServicesSection />
      {/* <LuxuryRetreats /> */}
      <section className="w-full flex flex-col justify-center items-center text-white bg-primary py-20">
        <div className="esteemed-partners flex flex-col justify-center items-center gap-16">
          <div className="section-header flex flex-col justify-center items-center gap-8">
            <header className="flex flex-col justify-center items-center gap-6">
              <h2 className="font-IvyPresto text-3xl lg:text-7xl">
                OUR Esteemed Partners
              </h2>
            </header>
            <p className="text-sm text-center lg:text-base px-2 lg:w-[46.719vw]">
              Discover the essence of luxury through Dxberience's esteemed
              partners, carefully curated to elevate your experience in Dubai.
              From exclusive hotels and fine dining to private transport and VIP
              event access, our network ensures unparalleled access to the
              city's most prestigious amenities and services. Join us in
              creating unforgettable moments by submitting your partnership
              request below.
            </p>
            <CustomButton
              btnName="Join the Elite Network"
              isLink
              href="/partners"
            />
          </div>
          <div className="relative w-11/12 h-[200px] lg:w-[56.667vw] lg:h-[45.968vh]">
            <Image
              src="/partners_resort.jpeg"
              alt="Partnership with exclusive hotels, fine dining, private transport and venues in Dubai"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <RatingsSection />
      <Footer />
    </main>
  );
};

export default page;
