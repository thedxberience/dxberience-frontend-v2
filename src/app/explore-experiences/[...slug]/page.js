import React from "react";
import ExploreExperience from "@/components/Pages/ExploreExperience";
import CategoryPage from "@/app/categories/[category]/page.client";
import { notFound } from "next/navigation";
import EventsDetailsPage from "@/app/events/[slug]/page.client";

export async function generateMetadata({ params }) {
  const [category, allServices] = params.slug;

  if (category && allServices && allServices !== "all") {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${allServices}`
    ).then((res) => res.json());

    return {
      title: data[0].title,
      description: data[0].shortDescription,
      image: data[0].thumbnail.image,
      openGraph: {
        title: data[0].title,
        description: data[0].shortDescription,
        image: data[0].thumbnail.image,
      },
    };
  }

  if (category && allServices === "all") {
    return {
      title: "Discover Dubai: Experiences, Events, Lifestyle Management",
      description:
        "Explore our top experiences, exciting activities, memorable events, and premium lifestyle management services in Dubai. Discover the best of Dubai with us today!",
    };
  }

  if (category) {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${params.category}`;
      const data = await fetch(url).then((res) => res.json());

      return {
        title: data[0].headerTitle,
        description: data[0].headerCaption,
        image: data[0].headerImg.image,
        openGraph: {
          title: data[0].headerTitle,
          description: data[0].headerCaption,
          image: data[0].headerImg.image,
        },
      };
    } catch (error) {
      return {
        title: "Discover Dubai: Experiences, Events, Lifestyle Management",
        description:
          "Explore our top experiences, exciting activities, memorable events, and premium lifestyle management services in Dubai. Discover the best of Dubai with us today!",
      };
    }
  }
}

const page = ({ params }) => {
  const [category, allServices] = params.slug;

  // console.log(`Category: ${category}, All Service: ${allServices}`);

  if (category && allServices && allServices !== "all") {
    return <EventsDetailsPage params={{ slug: allServices }} />;
  }

  if (category === "all") {
    return <ExploreExperience params={{ slug: category }} />;
  }

  if (category && allServices === "all") {
    return <ExploreExperience params={{ slug: category }} />;
  }

  if (category) {
    return <CategoryPage params={{ category }} />;
  }

  notFound();
};

export default page;
