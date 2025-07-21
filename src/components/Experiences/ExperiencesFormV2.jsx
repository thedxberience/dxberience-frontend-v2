"use client";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/utils/axios";
import { useDynamicFilters } from "@/utils/useDynamicFilters";
import { IoChevronDown, IoClose, IoChevronForward } from "react-icons/io5";

const ExperiencesFormV2 = ({ setApiParams, categoryFromSlug = null }) => {
  // State
  const [currentCategory, setCurrentCategory] = useState(categoryFromSlug || "all");
  const [isSubCategory, setIsSubCategory] = useState(false);
  const isInitialRender = useRef(true);

  // Queries
  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await makeRequest(`/categories`);
      return data;
    },
  });

  // Dynamic filters hook
  const {
    filterStates,
    availableFilters,
    activeFilters,
    toggleFilter,
    closeAllDropdowns,
    updateFilterValue,
    removeFilter: removeFilterFromHook,
    clearAllFilters: clearAllFiltersFromHook,
    isFilterOpen,
    getFilterValue,
    buildApiUrl,
  } = useDynamicFilters(currentCategory);

  // Effects
  useEffect(() => {
    if (categoryFromSlug) {
      setCurrentCategory(categoryFromSlug);
    }
  }, [categoryFromSlug]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      let apiUrl = buildApiUrl(isSubCategory);

      setApiParams(apiUrl);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [filterStates, currentCategory, isSubCategory, buildApiUrl, setApiParams]);

  // Handle clicking outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdowns = document.querySelectorAll('.relative');
      let clickedInsideDropdown = false;
      
      dropdowns.forEach(dropdown => {
        if (dropdown.contains(event.target)) {
          clickedInsideDropdown = true;
        }
      });
      
      if (!clickedInsideDropdown) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeAllDropdowns]);

  // Event handlers
  const handleCategoryChange = (categoryName, isSubCategorySelection = false) => {
    if (categoryName === "All") {
      setCurrentCategory("all");
      setIsSubCategory(false);
    } else {
      if (isSubCategorySelection) {
        // This is a subcategory selection
        setIsSubCategory(true);
        // Find the parent category for the subcategory
        const parentCategory = categoryData?.find(cat => 
          cat.subCategories?.some(sub => sub.name === categoryName)
        );
        if (parentCategory) {
          setCurrentCategory(parentCategory.slug);
        }
      } else {
        // This is a main category selection
        const category = categoryData?.find(cat => cat.name === categoryName);
        if (category) {
          setCurrentCategory(category.slug);
          setIsSubCategory(false);
        }
      }
    }
  };

  const handleFilterChange = (filterKey, value, isSubCategorySelection = false) => {
    if (filterKey === 'category') {
      handleCategoryChange(value, isSubCategorySelection);
      // Update the category filter value so it appears in active filters
      updateFilterValue(filterKey, value);
    } else {
      updateFilterValue(filterKey, value);
    }
  };

  const removeFilter = (filterType) => {
    if (filterType === 'category') {
      setCurrentCategory("all");
      setIsSubCategory(false);
    }
    removeFilterFromHook(filterType);
  };

  const clearAllFilters = () => {
    clearAllFiltersFromHook();
    setIsSubCategory(false);
  };

  //     apiUrl = urlObj.pathname + urlObj.search;
  //   }
    
  //   return apiUrl;
  // };

  // Utility functions
  const getDisplayValue = (value) => {
    if (typeof value === 'object' && value.label) {
      return value.label;
    }
    return value;
  };

  const getButtonText = (currentValue, filterConfig) => {
    // If no value or value is "All", show the filter label
    if (!currentValue || currentValue === "All" || 
        (typeof currentValue === 'object' && currentValue.label === "All")) {
      return filterConfig.label;
    }
    
    // Otherwise show the selected value
    const displayValue = getDisplayValue(currentValue);
    return displayValue;
  };

  // Render functions
  const renderCategoryDropdown = () => {
    const currentValue = getFilterValue('category');
    const isOpen = isFilterOpen('category');
    
    return (
      <div className="relative">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors min-w-[120px]"
          onClick={() => toggleFilter('category')}
        >
          <span className="text-sm font-medium">{getButtonText(currentValue, { label: "Category" })}</span>
          <IoChevronDown className="w-4 h-4" />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            <div className="py-2">
                              <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  onClick={() => {
                    handleFilterChange('category', "All", false);
                    toggleFilter('category');
                  }}
                >
                  All
                </button>
              {categoryData?.map((category, key) => (
                <CategoryOption 
                  key={key}
                  category={category}
                  onSelect={(value, isSubCategory) => {
                    handleFilterChange('category', value, isSubCategory);
                    toggleFilter('category');
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderFilterDropdown = (filterKey, filterConfig) => {
    const currentValue = getFilterValue(filterKey);
    const isOpen = isFilterOpen(filterKey);
    
    return (
      <div className="relative">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition-colors min-w-[120px]"
          onClick={() => toggleFilter(filterKey)}
        >
          <span className="text-sm font-medium">{getButtonText(currentValue, filterConfig)}</span>
          <IoChevronDown className="w-4 h-4" />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            <div className="py-2">
              {filterConfig.options.map((option, key) => {
                const optionLabel = typeof option === 'object' && option.label ? option.label : option;
                const optionValue = option;
                
                return (
                  <button
                    key={key}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    onClick={() => {
                      handleFilterChange(filterKey, optionValue);
                    }}
                  >
                    {optionLabel}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderActiveFilters = () => {
    if (activeFilters.length === 0) return null;

    return (
      <div className="mb-4 px-6 py-3 bg-white shadow-lg rounded-lg">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600 font-medium">Applied filters:</span>
          {activeFilters.map((filter, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm"
            >
              <span className="text-gray-700 font-medium">
                {typeof filter.value === 'object' && filter.value.label ? filter.value.label : filter.value}
              </span>
              <button
                type="button"
                onClick={() => removeFilter(filter.type)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <IoClose className="w-3 h-3" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>
    );
  };

  const renderFilterBar = () => (
    <div className="px-6 py-4 flex justify-between items-center gap-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center gap-4 flex-1 flex-wrap">
        {/* Category Filter with Subcategories */}
        {availableFilters.category && renderCategoryDropdown()}

        {/* Other Filters */}
        {Object.keys(availableFilters).map(filterKey => {
          if (filterKey === 'category') return null;
          
          return (
            <div key={filterKey}>
              {renderFilterDropdown(filterKey, availableFilters[filterKey])}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="experience-form w-full lg:w-10/12 px-5 lg:-mb-10">
      {renderActiveFilters()}
      {renderFilterBar()}
    </div>
  );
};

// Category Option Component with Subcategory Support
const CategoryOption = ({ category, onSelect }) => {
  const [showSubCategories, setShowSubCategories] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const hasSubCategories = category.subCategories && category.subCategories.length > 0;

  const handleMouseEnter = () => {
    if (hasSubCategories) {
      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setShowSubCategories(true);
    }
  };

  const handleMouseLeave = () => {
    // Add a small delay before hiding to allow moving to subcategory dropdown
    const newTimeoutId = setTimeout(() => {
      setShowSubCategories(false);
    }, 150);
    setTimeoutId(newTimeoutId);
  };

  const handleCategoryClick = () => {
    onSelect(category.name, false);
  };

  const handleSubCategoryClick = (subCategoryName) => {
    onSelect(subCategoryName, true);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  if (!hasSubCategories) {
    return (
      <button
        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
        onClick={handleCategoryClick}
      >
        {category.name}
      </button>
    );
  }

  return (
    <div
      className="relative flex w-full justify-between items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span onClick={handleCategoryClick}>{category.name}</span>
      <IoChevronForward className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
      
      {showSubCategories && (
        <div 
          className="absolute top-0 left-full ml-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50 py-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {category.subCategories.map((subCategory, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              onClick={() => handleSubCategoryClick(subCategory.name)}
            >
              {subCategory.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperiencesFormV2; 