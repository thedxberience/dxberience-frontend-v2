export default async function sitemap() {
  const baseUrl = "https://thedxberience.com";

  // Static routes
  const staticRoutes = [
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tailored-experiences`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/explore-experiences`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Fetch categories dynamically from API
  let categories = [];
  try {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL;
    const response = await fetch(`${apiBaseUrl}/categories`);

    if (response.ok) {
      categories = await response.json();
    }
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error);
    // Fallback to known categories if API fails
    categories = [
      { slug: "vip-concierge" },
      { slug: "luxury-car-rentals" },
      { slug: "luxury-yacht-rentals" },
      { slug: "restaurants-and-nightlife" },
      { slug: "luxury-stays" },
    ];
  }

  // Main category routes - dynamically generated
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/explore-experiences/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // All services overview routes - dynamically generated
  const allServicesRoutes = categories.map((category) => ({
    url: `${baseUrl}/explore-experiences/${category.slug}/all`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Fetch products dynamically from API (paginated - pages 1 to 7)
  let products = [];
  try {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL;

    // Fetch products from pages 1 to 7
    const productPromises = [];
    for (let page = 1; page <= 7; page++) {
      productPromises.push(
        fetch(`${apiBaseUrl}/product?page=${page}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return [];
          })
          .catch((error) => {
            console.error(
              `Error fetching products page ${page} for sitemap:`,
              error
            );
            return [];
          })
      );
    }

    // Wait for all pages to be fetched
    const productPages = await Promise.all(productPromises);

    // Flatten all products from all pages into a single array
    products = productPages.flat();
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  // Product routes - dynamically generated
  const productRoutes = products.map((product) => {
    // Find the category for this product to construct the correct URL

    const productCategory = categories.find(
      (cat) => cat.name === product.category?.name
    );

    const categorySlug = productCategory?.slug || "experiences";

    return {
      url: `${baseUrl}/explore-experiences/${categorySlug}/${product.slug}`,
      lastModified: product.updatedAt
        ? new Date(product.updatedAt)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    };
  });

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...allServicesRoutes,
    ...productRoutes,
  ];
}
