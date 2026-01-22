import React from "react";
import ExploreExperience from "@/components/Pages/ExploreExperience";
import CategoryPage from "@/app/categories/[category]/page.client";
import AllCategoriesOverview from "@/components/Pages/AllCategoriesOverview";
import { notFound } from "next/navigation";
import EventsDetailsPage from "@/app/events/[slug]/page.client";
import { urlBuilder } from "@/utils/utils";
import { CATEGORY_METADATA, PRODUCT_METADATA } from "../metadata";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [category, allServices] = slug || [];

  if (category && allServices && allServices !== "all") {
    // Fetch product data from API
    try {
      let url = `/product/${allServices}`;
      if (category === "luxury-yacht-rentals") {
        url = `/yachts/${allServices}?asProduct=true`;
      }
      const data = await fetch(urlBuilder(url)).then((res) => res.json());

      // Check if data exists and has elements
      if (!data || !Array.isArray(data) || data.length === 0) {
        return {
          title: "Product Not Found",
          description: "The requested product could not be found.",
        };
      }

      const productData = data[0];
      const productSlug = productData.slug;

      // Check if product has custom metadata
      if (PRODUCT_METADATA[productSlug]) {
        const customMetadata = PRODUCT_METADATA[productSlug];
        return {
          title: customMetadata.title,
          description: customMetadata.description,
          image: productData.thumbnail?.image || "",
          alternates: {
            canonical: `https://www.thedxberience.com/explore-experiences/${category}/${allServices}`,
          },
          openGraph: {
            title: customMetadata.title,
            description: customMetadata.description,
            image: productData.thumbnail?.image || "",
          },
        };
      }

      // Use default API data if no custom metadata
      return {
        title: productData.title || "Product Details",
        description:
          productData.shortDescription || "Product details and information",
        image: productData.thumbnail?.image || "",
        alternates: {
          canonical: `https://www.thedxberience.com/explore-experiences/${category}/${allServices}`,
        },
        openGraph: {
          title: productData.title || "Product Details",
          description:
            productData.shortDescription || "Product details and information",
          image: productData.thumbnail?.image || "",
        },
      };
    } catch (error) {
      console.error("Error fetching product metadata:", error);
      return {
        title: "Product Not Found",
        description: "The requested product could not be found.",
      };
    }
  }

  if (category === "all") {
    return {
      title: "Discover Dubai: Experiences, Events, Lifestyle Management",
      description:
        "Explore our top experiences, exciting activities, memorable events, and premium lifestyle management services in Dubai. Discover the best of Dubai with us today!",
      alternates: {
        canonical: "https://www.thedxberience.com/explore-experiences/all",
      },
    };
  }

  // Check if category has custom metadata
  if (category && CATEGORY_METADATA[category]) {
    const metadata = CATEGORY_METADATA[category];
    return {
      title: metadata.title,
      description: metadata.description,
      alternates: {
        canonical: `https://www.thedxberience.com/explore-experiences/${category}`,
      },
      openGraph: {
        title: metadata.title,
        description: metadata.description,
      },
    };
  }

  if (category) {
    try {
      const url = urlBuilder(`/categories/${category}`);
      const data = await fetch(url).then((res) => res.json());
      // Check if data exists and has elements
      if (!data || !Array.isArray(data) || data.length === 0) {
        return {
          title: "Category Not Found",
          description: "The requested category could not be found.",
        };
      }

      return {
        title: data[0].headerTitle || "Category Details",
        description:
          data[0].headerCaption || "Category information and experiences",
        image: data[0].headerImg?.image || "",
        alternates: {
          canonical: `https://www.thedxberience.com/explore-experiences/${category}`,
        },
        openGraph: {
          title: data[0].headerTitle || "Category Details",
          description:
            data[0].headerCaption || "Category information and experiences",
          image: data[0].headerImg?.image || "",
        },
      };
    } catch (error) {
      console.error("Error fetching category metadata:", error);
      return {
        title: "Discover Dubai: Experiences, Events, Lifestyle Management",
        description:
          "Explore our top experiences, exciting activities, memorable events, and premium lifestyle management services in Dubai. Discover the best of Dubai with us today!",
        alternates: {
          canonical: `https://www.thedxberience.com/explore-experiences/${category}`,
        },
      };
    }
  }

  // Default metadata for all categories overview
  return {
    title: "Dubai Luxury Services | VIP Concierge, Yachts, Cars & Events",
    description:
      "Discover Dubai's premier luxury services including VIP concierge, luxury car & yacht rentals, exclusive events, fine dining, and luxury stays. Experience unparalleled sophistication with our curated lifestyle management services.",
    alternates: {
      canonical: "https://www.thedxberience.com/explore-experiences",
    },
    openGraph: {
      title: "Dubai Luxury Services | VIP Concierge, Yachts, Cars & Events",
      description:
        "Discover Dubai's premier luxury services including VIP concierge, luxury car & yacht rentals, exclusive events, fine dining, and luxury stays. Experience unparalleled sophistication with our curated lifestyle management services.",
    },
  };
}

const page = async ({ params }) => {
  const { slug } = await params;
  const [category, allServices] = slug || [];

  if (category && allServices && allServices !== "all") {
    return (
      <EventsDetailsPage params={{ slug: allServices }} category={category} />
    );
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

  // If no category is provided, show all categories overview
  if (!category) {
    return <AllCategoriesOverview />;
  }

  notFound();
};

export default page;
