import React from "react";
import ExploreExperience from "@/components/Pages/ExploreExperience";
import CategoryPage from "@/app/categories/[category]/page.client";
import AllCategoriesOverview from "@/components/Pages/AllCategoriesOverview";
import { notFound } from "next/navigation";
import EventsDetailsPage from "@/app/events/[slug]/page.client";
import { urlBuilder } from "@/utils/utils";

// Category metadata map for SEO
const CATEGORY_METADATA = {
  "vip-concierge": {
    title: "VIP Concierge Dubai | Luxury Lifestyle Services by Dxberience",
    description:
      "Experience VIP concierge services in Dubai with Dxberience. Personalized lifestyle solutions, elite access & 24/7 luxury support for every need.",
  },
  "luxury-car-rentals": {
    title: "Luxury Car Rentals Dubai - Sports & Prestige Cars by Dxberience",
    description:
      "Rent luxury cars in Dubai with Dxberience. Choose from sports cars, exotic models & chauffeur-driven options — tailored for VIP experiences.",
  },
  "luxury-yacht-rentals": {
    title: "Luxury Yacht Rental Dubai - Private Charters by Dxberience",
    description:
      "Book your luxury yacht rental in Dubai with Dxberience. Private charters, sunset cruises & VIP experiences aboard fully equipped yachts for any occasion.",
  },
  "luxury-stays": {
    title: "Luxury Stays in Dubai - Villas & Private Homes by Dxberience",
    description:
      "Book luxury stays in Dubai with Dxberience. From exclusive villas to private homes, enjoy refined comfort, full privacy & premium hospitality services.",
  },
  "restaurants-and-nightlife": {
    title: "Restaurant Reservations Dubai - Dining & Nightlife by Dxberience",
    description:
      "Book restaurant reservations in Dubai with Dxberience. From fine dining to exclusive clubs and beach lounges — enjoy premium nightlife without hassle.",
  },
  events: {
    title: "Ticket Booking Dubai - Events Tickets & Private Event Management",
    description:
      "Book tickets for Dubai's top events with Dxberience. From concerts to private gatherings, enjoy seamless ticket booking and white-glove event management.",
  },
};

// Product/Service metadata map for SEO (specific items)
const PRODUCT_METADATA = {
  "personal-shopping-with-fashion-consultant": {
    title: "Personal Shopping Dubai - VIP Fashion Consultant by Dxberience",
    description:
      "Enjoy a premium personal shopping experience in Dubai with a dedicated fashion consultant. Style guidance, luxury boutiques & full VIP concierge support.",
  },
  "exclusive-aston-martin-db11-experience": {
    title: "Aston Martin DB11 Rental Dubai - Exclusive Drive by Dxberience",
    description:
      "Rent the Aston Martin DB11 in Dubai for a premium driving experience. Sleek design, powerful V8 engine & VIP service—perfect for luxury car enthusiasts.",
  },
  "bmw-m4-competition": {
    title: "BMW M4 Competition Rental Dubai - Thrill & Luxury by Dxberience",
    description:
      "Rent the BMW M4 Competition in Dubai with Dxberience. Feel the power, elegance, and performance — drive an iconic sports car with VIP treatment.",
  },
  "bmw-735i-2023": {
    title: "BMW 735i 2023 Rental Dubai - Luxury Drive by Dxberience",
    description:
      "Rent the BMW 735i 2023 in Dubai with Dxberience. Enjoy refined luxury, powerful performance & tailor-made service for an exceptional driving experience.",
  },
  "bmw-x7m-sports": {
    title: "BMW X7M Sports Rental Dubai | Luxury Performance by Dxberience",
    description:
      "Rent the BMW X7M Sports in Dubai with Dxberience. Power, elegance & driving pleasure in one sleek SUV — tailored for those who demand the best.",
  },
  "bentley-continental-gt": {
    title: "Bentley Continental GT Rental Dubai - Luxury & Prestige",
    description:
      "Rent the Bentley Continental GT in Dubai with Dxberience. Enjoy powerful performance, refined elegance and VIP service for your luxury driving experience.",
  },
  "bentley-bentayga-2020": {
    title: "Bentley Bentayga 2020 Rental Dubai | Luxury SUV by Dxberience",
    description:
      "Rent the Bentley Bentayga 2020 in Dubai with Dxberience. Experience elite SUV luxury, comfort, and power — delivered with VIP-level service.",
  },
  "chauffeur-driven-maybach-gls600": {
    title: "Maybach GLS600 Chauffeur Rental Dubai | VIP Drive by Dxberience",
    description:
      "Enjoy a chauffeur-driven Maybach GLS600 in Dubai with Dxberience. Ride in opulence, privacy & perfection—tailored for your elite travel experience.",
  },
  "ferrari-488-spyder": {
    title: "Ferrari 488 Spyder Rental Dubai - Thrilling Drive by Dxberience",
    description:
      "Rent the Ferrari 488 Spyder in Dubai with Dxberience. Experience top-tier performance, sleek design & VIP service for a truly unforgettable drive.",
  },
  "chauffeur-driven-bentley-bentayga-experience": {
    title: "Chauffeur-Driven Bentley Bentayga Rental in Dubai | Dxberience",
    description:
      "Experience a chauffeur-driven Bentley Bentayga in Dubai with Dxberience. Elegance, comfort & privacy — enjoy VIP service on your terms.",
  },
  "audi-r8-spyder-2020": {
    title: "Audi R8 Spyder 2020 Rental Dubai - Performance & Luxury",
    description:
      "Rent the Audi R8 Spyder 2020 in Dubai with Dxberience. Feel exhilarating performance, sleek design & VIP driving indulgence—book your dream drive now.",
  },
  "bmw-x6-m-competition-2022": {
    title: "BMW X6 M Competition 2022 Rental Dubai - Luxury & Power",
    description:
      "Rent the BMW X6 M Competition 2022 in Dubai with Dxberience. Experience commanding power, refined design & VIP-level comfort on every drive.",
  },
  "chauffeur-driven-bmw-x7-m50i-experience": {
    title: "Chauffeur-Driven BMW X7 M50I Rental Dubai - Luxury Ride",
    description:
      "Enjoy a chauffeur‑driven BMW X7 M50I in Dubai with Dxberience. Premium SUV comfort, elegance & VIP service — the perfect drive for discerning travelers.",
  },
  "cadillac-escalade-sports-platinum": {
    title: "Cadillac Escalade Sports Platinum Rental Dubai - Luxury SUV",
    description:
      "Rent the Cadillac Escalade Sports Platinum in Dubai with Dxberience. Experience bold luxury, spacious performance & VIP service tailored for you.",
  },
  "desert-supercar-adventure": {
    title: "Desert Supercar Driving Experience Dubai - Dxberience",
    description:
      "Join the Desert Supercar Adventure with Dxberience and conquer Dubai's dunes in style. Drive high-performance cars with VIP service for an unforgettable thrill.",
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [category, allServices] = slug || [];

  if (category && allServices && allServices !== "all") {
    // Fetch product data from API
    try {
      const data = await fetch(urlBuilder(`/product/${allServices}`)).then(
        (res) => res.json()
      );

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
