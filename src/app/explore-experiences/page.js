import React from "react";
import AllCategoriesOverview from "@/components/Pages/AllCategoriesOverview";

export const metadata = {
  title: "Luxury Experiences in Dubai – Live the Extraordinary with Dxberience",
  description:
    "Uncover unforgettable luxury experiences in Dubai. From bespoke concierge to private yachts and elite nightlife, Dxberience crafts every detail of your perfect escape.",
  alternates: {
    canonical: "https://www.thedxberience.com/explore-experiences",
  },
  openGraph: {
    title:
      "Luxury Experiences in Dubai – Live the Extraordinary with Dxberience",
    description:
      "Uncover unforgettable luxury experiences in Dubai. From bespoke concierge to private yachts and elite nightlife, Dxberience crafts every detail of your perfect escape.",
  },
};

const page = () => {
  return (
    <div>
      <AllCategoriesOverview />
    </div>
  );
};

export default page;
