import React from "react";
import ServiceCard from "./ServiceCard";

/**
 * ServiceCardContainer fetches categories with detailed data and structures them as:
 *
 * [
 *   {
 *     _id: string,
 *     name: string,
 *     slug: string,
 *     headerImg: { image: string, alt: string, ... } | null,  // Extracted from categories/{slug}
 *     headerCaption: string | null,                           // Extracted from categories/{slug}
 *     categoryData: object,                                   // Full category data from categories/{slug}
 *     headerTitle: string | null,
 *     products: array,
 *     hasDetailedData: boolean
 *   }
 * ]
 */

// Server-side function to fetch categories list
async function fetchCategoriesList() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch categories list:", error);
    return null;
  }
}

// Server-side function to fetch detailed category data
async function fetchCategoryDetails(slug) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} for slug: ${slug}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch category details for ${slug}:`, error);
    return null;
  }
}

// Server-side function to fetch all categories with detailed data
async function fetchCategoriesWithDetails() {
  try {
    // First, get the list of categories
    const categoriesList = await fetchCategoriesList();

    if (!categoriesList || categoriesList.length === 0) {
      return null;
    }

    // Then fetch detailed data for each category
    const categoriesWithDetails = await Promise.allSettled(
      categoriesList.map(async (category) => {
        const details = await fetchCategoryDetails(category.slug);

        // Extract the required data and structure it
        if (details && details.length > 0) {
          const categoryData = details[0];

          // Structured object with extracted headerImg, headerCaption, and category data
          return {
            _id: category._id,
            name: category.name,
            slug: category.slug,

            // Extracted headerImg object (contains image URL, alt text, etc.)
            headerImg: categoryData.headerImg || null,

            // Extracted headerCaption string (description for the category)
            headerCaption: categoryData.headerCaption || null,

            // Full category data object from the detailed API response
            categoryData: categoryData,

            // Additional useful fields from the detailed response
            headerTitle: categoryData.headerTitle || null,
            products: categoryData.products || [],

            // Metadata
            hasDetailedData: true,
          };
        }

        // Fallback to basic category data if detailed fetch fails
        return {
          _id: category._id,
          name: category.name,
          slug: category.slug,
          headerImg: category.headerImg || null,
          headerCaption: category.headerCaption || null,
          categoryData: category,
          hasDetailedData: false,
        };
      })
    );

    // Filter out any failed requests and return successful ones
    const successfulCategories = categoriesWithDetails
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    return successfulCategories;
  } catch (error) {
    console.error("Failed to fetch categories with details:", error);
    return null;
  }
}

const ServiceCardContainer = async () => {
  const categories = await fetchCategoriesWithDetails();

  // Log the structured data for debugging (remove in production)
  if (process.env.NODE_ENV === "development") {
    console.log(
      "Categories with details:",
      JSON.stringify(categories, null, 2)
    );
  }

  // Error state - fallback to empty state
  if (!categories) {
    return (
      <div className="py-6 w-11/12 mx-auto text-center">
        <p className="text-red-500">
          Failed to load services. Please try again later.
        </p>
      </div>
    );
  }

  // No data state
  if (categories.length === 0) {
    return (
      <div className="py-6 w-11/12 mx-auto text-center">
        <p className="text-gray-500">No services available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:my-20 py-6 w-11/12 mx-auto">
      {categories.map((category) => {
        // Log individual category data for debugging
        if (process.env.NODE_ENV === "development") {
          console.log(`Category ${category.name}:`, {
            headerImg: category.headerImg,
            headerCaption: category.headerCaption,
            categoryData: category.categoryData,
          });
        }

        if (category.name === "VIP concierge" || category.name === "Events") {
          return null;
        }

        return (
          <ServiceCard
            key={category._id}
            title={category.name}
            description={
              category.headerCaption || "Explore our premium services"
            }
            image={
              category.headerImg?.image ||
              category.categoryData?.image ||
              "/placeholder-image.jpg"
            }
            alt={
              category.headerImg?.alt ||
              category.categoryData?.alt ||
              `${category.name} service`
            }
            href={`/explore-experiences/${category.slug}/all`}
          />
        );
      })}
    </div>
  );
};

export default ServiceCardContainer;
