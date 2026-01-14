"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/shared/Footer";
import CustomButton from "@/components/shared/CustomButton";
import TailoredExperienceContainer from "@/components/TailoredExperiences/TailoredExperienceContainer";

const AllCategoriesOverview = () => {
  const categories = [
    {
      id: 1,
      title: "VIP Concierge",
      slug: "vip-concierge",
      description:
        "Experience unparalleled luxury with our dedicated VIP concierge services. From exclusive reservations to personalized shopping experiences, our team ensures every detail is perfectly orchestrated. Let us transform your desires into extraordinary moments of sophistication.",
      image: "/vip_concierge.jpeg",
      alt: "VIP lifestyle management service in Dubai for exclusive experiences, personalized shopping, corporate services, travel booking",
    },
    {
      id: 2,
      title: "Luxury Car Rentals",
      slug: "luxury-car-rentals",
      description:
        "Drive in style with our premium fleet of luxury vehicles including exotic sports cars, elegant sedans, and sophisticated SUVs. Each vehicle comes with professional chauffeur services and is meticulously maintained to ensure the ultimate driving experience. Arrive at your destination in unmatched elegance.",
      image: "/luxury-car-about.jpeg",
      alt: "Luxury car rentals for your Dubai getaway, private chauffeur and limousine services",
    },
    {
      id: 3,
      title: "Luxury Yacht Rentals",
      slug: "luxury-yacht-rentals",
      description:
        "Set sail on the pristine waters of Dubai aboard our collection of luxury yachts and superyachts. Perfect for intimate celebrations, corporate events, or peaceful escapes, each vessel features world-class amenities and professional crew. Create unforgettable memories on the azure waters of the Arabian Gulf.",
      image: "/yacht_about.jpeg",
      alt: "Luxury yacht rentals in Dubai for unforgettable memories and celebrations",
    },
    {
      id: 4,
      title: "Events",
      slug: "events",
      description:
        "Gain exclusive access to Dubai's most prestigious events, from glamorous galas and fashion shows to world-class sporting events and cultural festivals. Our insider connections ensure you experience the city's most sought-after occasions. Immerse yourself in Dubai's vibrant social and cultural scene.",
      image: "/events.jpeg",
      alt: "Attend private events and book your event tickets for sports, fashion, opera and film festivals",
    },
    {
      id: 5,
      title: "Restaurants and Nightlife",
      slug: "restaurants-and-nightlife",
      description:
        "Discover Dubai's culinary excellence and vibrant nightlife through our curated selection of fine dining establishments and exclusive venues. From Michelin-starred restaurants to rooftop lounges with breathtaking views, we secure the most coveted reservations. Savor exceptional gastronomy and experience the city's electric atmosphere.",
      image: "/fine_dining.jpeg",
      alt: "Exclusive tables reservations at Dubai's finest restaurants, nightclubs and bars",
    },
    {
      id: 6,
      title: "Luxury Stays",
      slug: "luxury-stays",
      description:
        "Retreat to our handpicked collection of luxury accommodations including opulent hotels, private villas, and exclusive resorts. Each property offers world-class amenities, impeccable service, and stunning locations throughout Dubai. Experience the epitome of comfort and sophistication in your home away from home.",
      image: "/luxury_stays.jpeg",
      alt: "Indulge in luxury villas at premium accommodations",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="header-section h-[468px] relative lg:h-[800px] flex flex-col justify-between items-center">
        <Navbar />
        <div className="content p-5 text-white lg:w-10/12 h-full flex flex-col justify-center items-start">
          <h1 className="text-4xl lg:text-7xl font-IvyPresto lg:w-[50.656vw] pb-8">
            Discover Dubai's Premier Luxury Services
          </h1>
          <p className="lg:text-lg lg:w-[28.385vw]">
            Explore our comprehensive collection of luxury lifestyle management
            services, from exclusive experiences to premium accommodations. Each
            service is meticulously crafted to deliver unparalleled
            sophistication and personalized excellence.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-overview py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-4xl lg:text-6xl font-IvyPresto text-black mb-6">
              Our Luxury Services
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              From personalized concierge services to exclusive experiences,
              discover the complete range of luxury lifestyle management
              solutions designed to exceed your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {categories.map((category) => (
              <div key={category.id} className="category-card group">
                {/* Image */}
                <Link href={`/explore-experiences/${category.slug}`}>
                  <div className="relative w-full h-[300px] lg:h-[400px] mb-6 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-black bg-opacity-20 z-10 group-hover:bg-opacity-30 transition-all duration-300"></div>

                    <Image
                      src={category.image}
                      alt={category.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

                {/* Content */}
                <div className="category-content">
                  <h3 className="text-2xl lg:text-3xl font-IvyPresto text-black mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {category.title}
                  </h3>

                  <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-6">
                    {category.description}
                  </p>

                  <Link
                    href={`/explore-experiences/${category.slug}`}
                    className="inline-block"
                  >
                    <CustomButton
                      btnName="Explore Services"
                      invert
                      className="transform hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20 lg:mt-32">
            <div className="bg-black text-white py-16 px-8 rounded-lg flex flex-col items-center justify-center">
              <h2 className="text-3xl lg:text-5xl font-IvyPresto mb-6">
                Ready to Experience Luxury?
              </h2>
              <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Let our expert team curate the perfect luxury experience
                tailored to your preferences and desires.
              </p>
              <Link href="/tailored-experiences">
                <CustomButton
                  btnName="Plan Your Experience"
                  className="text-lg px-8 py-4"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full md:mt-28 lg:mt-[20%]">
        <TailoredExperienceContainer />
      </div>

      <Footer />
    </main>
  );
};

export default AllCategoriesOverview;
