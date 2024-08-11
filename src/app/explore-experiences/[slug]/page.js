import React from "react";
import ExploreExperience from "@/components/Pages/ExploreExperience";

export const metadata = {
  title: "Discover Dubai: Experiences, Events, Concierge",
  description:
    "Explore our top experiences, exciting activities, memorable events, and premium concierge services in Dubai. Discover the best of Dubai with us today!",
};

const page = ({ params }) => {
  return <ExploreExperience params={params} />;
};

export default page;
