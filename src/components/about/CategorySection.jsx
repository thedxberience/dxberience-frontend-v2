import React from "react";
import ServiceCard from "../ServiceSection/ServiceCard";

const CategorySection = () => {
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
      serviceName: "Visas and Business Formation",
      image: "/visa_services.jpeg",
      alt: "Streamlined visa services for hassle-free travel arrangements.",
    },
  ];
  return (
    <section>
      <div className="expertise-section">
        <div className="header flex flex-col justify-center items-center gap-10">
          <h2>Our Expertise</h2>
          <p>
            With years of unparalleled expertise, we are leaders in luxury
            lifestyle management. Our team is dedicated to redefining luxury
            through bespoke services, tailored itineraries, and VIP experiences.
            From luxury cars and yachts to global travel arrangements and
            exclusive partnerships, our expertise ensures that every aspect of
            your experience is seamless and exceptional. Trust us to deliver
            unparalleled luxury across a diverse range of experiences, making
            your dreams a reality.
          </p>
        </div>
        <div className="categories">
          {services.map((service, index) => {
            if (index % 4 == 0) {
              return (
                <div className="single-div">
                  <ServiceCard
                    alt={service.alt}
                    image={service.image}
                    name={service.serviceName}
                    slug={service.serviceName}
                  />
                </div>
              );
            } else {
            }
          })}
          <div className=""></div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
