import { urlBuilder } from "./utils";

// QueryRequestGateway - A structured approach to handling category-specific queries
class QueryRequestGateway {
  constructor() {
    this.defaultApi = "/product";
  }

  // Get category-specific API endpoint based on filter configuration
  getCategoryApiEndpoint(categorySlug) {
    if (!categorySlug || categorySlug === "all") {
      return this.defaultApi;
    }

    // Get the filter configuration for this category
    const filterConfig = this.getCategoryFilterConfig(categorySlug);
    
    // If specific config exists, use its endpoint
    if (filterConfig && filterConfig.apiEndpoint) {
      return urlBuilder(filterConfig.apiEndpoint);
    }

    return this.defaultApi;
  }

  // Normalize category slug to match our filter keys
  normalizeCategorySlug(slug) {
    if (!slug) return "other";
    
    const slugMap = {
      "yacht": "yacht",
      "event": "event", 
      "experience": "experience",
      "vip-concierge": "vip-concierge",
      "luxury-car-rentals": "luxury-car-rentals",
      "luxury-yacht-rentals": "luxury-yacht-rentals",
      "restaurants-and-nightlife": "restaurants-and-nightlife",
      "luxury-stays": "luxury-stays",
    };

    return slugMap[slug] || "other";
  }

  // Get standardized filters for a category
  getStandardizedFilters(categorySlug) {
    const normalizedSlug = this.normalizeCategorySlug(categorySlug);
    const config = this.getCategoryFilterConfig(normalizedSlug);
    
    const standardizedFilters = {};
    config.filters.forEach(filterKey => {
      standardizedFilters[filterKey] = {
        label: config.labels[filterKey],
        options: config.options[filterKey],
        defaultValue: "All",
        required: false,
      };
    });

    return standardizedFilters;
  }

  // Get category-specific filter configuration
  getCategoryFilterConfig(categorySlug) {
    const configs = {
      "luxury-yacht-rentals": {
        apiEndpoint: "/yachts",
        excludeCategoryQueries: true,
        filters: ["length", "capacity", "price"],
        labels: {
          length: "Length",
          capacity: "Capacity",
          price: "Price Range"
        },
        options: {
          length: [
            { label: "All", value: "all" },
            { label: "Under 30ft", value: "length__lt=30" },
            { label: "30-50ft", value: "length__gte=30&length__lte=50" },
            { label: "50-80ft", value: "length__gte=50&length__lte=80" },
            { label: "80ft+", value: "length__gte=80" }
          ],
          capacity: [
            { label: "All", value: "all" },
            { label: "1-10 guests", value: "capacity__gte=1&capacity__lte=10" },
            { label: "11-20 guests", value: "capacity__gte=11&capacity__lte=20" },
            { label: "21-30 guests", value: "capacity__gte=21&capacity__lte=30" },
            { label: "30+ guests", value: "capacity__gte=30" }
          ],
          price: [
            { label: "All", value: "all" },
            { label: "Under 1,000 AED", value: "price__lt=1000" },
            { label: "1,000 - 5,000 AED", value: "price__gte=1000&price__lte=5000" },
            { label: "5,000 - 10,000 AED", value: "price__gte=5000&price__lte=10000" },
            { label: "10,000+ AED", value: "price__gte=10000" }
          ],
        }
      },
    };

    return configs[categorySlug] || this.getDefaultStandardizedConfig();
  }

  // Default standardized configuration
  getDefaultStandardizedConfig() {
    return {
      apiEndpoint: "/product",
      filters: ["category"],
      labels: {
        category: "Category",
        // price: "Price Range"
      },
      options: {
        category: [
          { label: "All", value: "all" }
        ],
        // price: [
        //   { label: "All", value: "all" },
        //   { label: "Under 500 AED", value: "price__lt=500" },
        //   { label: "500 - 1,000 AED", value: "price__gte=500&price__lte=1000" },
        //   { label: "1,000 - 2,000 AED", value: "price__gte=1000&price__lte=2000" },
        //   { label: "2,000+ AED", value: "price__gte=2000" }
        // ]
      }
    };
  }

  // Helper method to get option value from label
  getOptionValue(config, filterKey, selectedLabel) {
    if (!config || !config.options || !config.options[filterKey]) {
      return selectedLabel; // Fallback to original value
    }

    const options = config.options[filterKey];
    
    // Handle both old format (strings) and new format (objects)
    if (Array.isArray(options) && options.length > 0) {
      if (typeof options[0] === 'string') {
        // Old format - return the label as is
        return selectedLabel;
      } else if (typeof options[0] === 'object' && options[0].label) {
        // New format - find the matching option and return its value
        const option = options.find(opt => opt.label === selectedLabel);
        return option ? option.value : selectedLabel;
      }
    }
    
    return selectedLabel;
  }

  // Build query parameters from filters
  buildQuery(filters, categorySlug = null, isSubCategory = false, includeCategoryQueries = true) {
    const query = {};

    // Get the filter configuration to map labels to values
    const normalizedSlug = this.normalizeCategorySlug(categorySlug);
    const config = this.getCategoryFilterConfig(normalizedSlug);
    
    // Add category queries if requested
    if (includeCategoryQueries && categorySlug && categorySlug !== "all" && !config.excludeCategoryQueries) {
      if (isSubCategory) {
        query.subCategory__contains = categorySlug;
      } else {
        query.category__contains = categorySlug;
      }
    }



    for (const [key, value] of Object.entries(filters)) {
      if (value && value !== "All" && value !== key) {
        // Skip category - let the component handle this
        if (key === "category") {
          continue;
        }
        
        // Handle date filters
        if (key === "date") {
          query.dateFilter = value;
          continue;
        }
        
        // Handle all other filters with the new system
        const rawOptionValue = this.getOptionValue(config, key, value);
        const optionValue = (typeof rawOptionValue === 'object' && rawOptionValue !== null) ? rawOptionValue.value : rawOptionValue;
        
        // Handle Django QuerySet-style parameters
        if (optionValue && optionValue.includes('&')) {
          // Parse multiple parameters (e.g., "length__gte=30&length__lte=50")
          const params = optionValue.split('&');
          params.forEach(param => {
            const [paramKey, paramValue] = param.split('=');
            if (paramKey && paramValue) {
              query[paramKey] = paramValue;
            }
          });
        } else if (optionValue && optionValue.includes('=')) {
          // Parse single parameter (e.g., "length__lt=30")
          const [paramKey, paramValue] = optionValue.split('=');
          if (paramKey && paramValue) {
            query[paramKey] = paramValue;
          }
        } else {
          // Fallback to simple key-value
          query[key] = optionValue || value;
        }
      }
    }

    return query;
  }

  // Build API URL from query object
  buildApiUrl(query, categorySlug = null) {
    // Get category-specific endpoint
    const baseUrl = this.getCategoryApiEndpoint(categorySlug);
    const queryParams = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    }
    queryParams.append("asProduct", true);

    const queryString = queryParams.toString();
    const finalUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
    
    console.log("Generated API URL:", finalUrl);
    return finalUrl;
  }
}

// Create and export a singleton instance
const queryGateway = new QueryRequestGateway();

export default queryGateway; 