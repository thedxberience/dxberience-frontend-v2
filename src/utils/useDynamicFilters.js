import { useState, useEffect } from 'react';
import queryGateway from './QueryRequestGateway';

export const useDynamicFilters = (categorySlug) => {
  // State
  const [filterStates, setFilterStates] = useState({});
  const [availableFilters, setAvailableFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);

  // Initialize filters based on category
  useEffect(() => {
    const standardizedFilters = queryGateway.getStandardizedFilters(categorySlug);
    
    const filtersWithCategory = {
      category: {
        label: "Category",
        options: ["All"],
        defaultValue: "All",
        required: false,
      },
      ...standardizedFilters
    };
    
    setAvailableFilters(filtersWithCategory);
    
    const initialStates = {
      category: {
        isOpen: false,
        value: "All",
      }
    };
    
    Object.keys(standardizedFilters).forEach(key => {
      initialStates[key] = {
        isOpen: false,
        value: standardizedFilters[key].defaultValue,
      };
    });

    
    setFilterStates(initialStates);
  }, [categorySlug]);

  // Actions
  const toggleFilter = (filterKey) => {
    setFilterStates(prev => {
      const newStates = {};
      Object.keys(prev).forEach(key => {
        newStates[key] = {
          ...prev[key],
          isOpen: key === filterKey ? !prev[key].isOpen : false,
        };
      });
      return newStates;
    });
  };

  const closeAllDropdowns = () => {
    setFilterStates(prev => {
      const newStates = {};
      Object.keys(prev).forEach(key => {
        newStates[key] = {
          ...prev[key],
          isOpen: false,
        };
      });
      return newStates;
    });
  };

  const updateFilterValue = (filterKey, value) => {
    setFilterStates(prev => ({
      ...prev,
      [filterKey]: {
        ...prev[filterKey],
        value,
        isOpen: false,
      },
    }));

    if (value && value !== "All" && value !== filterKey) {
      setActiveFilters(prev => {
        const existing = prev.find(f => f.type === filterKey);
        if (existing) {
          return prev.map(f => f.type === filterKey ? { ...f, value } : f);
        } else {
          return [...prev, { type: filterKey, value }];
        }
      });
    } else {
      setActiveFilters(prev => prev.filter(f => f.type !== filterKey));
    }
  };

  const removeFilter = (filterKey) => {
    setActiveFilters(prev => prev.filter(f => f.type !== filterKey));
    
    const filterConfig = availableFilters[filterKey];
    if (filterConfig) {
      setFilterStates(prev => ({
        ...prev,
        [filterKey]: {
          ...prev[filterKey],
          value: filterConfig.defaultValue,
        },
      }));
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    
    const newStates = {};
    Object.keys(availableFilters).forEach(key => {
      newStates[key] = {
        ...filterStates[key],
        value: availableFilters[key].defaultValue,
        isOpen: false,
      };
    });
    setFilterStates(newStates);
  };

  // Getters
  const getFilterValues = () => {
    const values = {};
    Object.keys(filterStates).forEach(key => {
      values[key] = filterStates[key].value;
    });
    return values;
  };

  const isFilterOpen = (filterKey) => {
    return filterStates[filterKey]?.isOpen || false;
  };

  const getFilterValue = (filterKey) => {
    return filterStates[filterKey]?.value || availableFilters[filterKey]?.defaultValue;
  };

  const getMainFilters = () => {
    const mainFilterKeys = ['category', 'status', 'price', 'date'];
    return Object.keys(availableFilters).filter(key => mainFilterKeys.includes(key));
  };

  const getAdditionalFilters = () => {
    const mainFilterKeys = ['category', 'status', 'price', 'date'];
    return Object.keys(availableFilters).filter(key => !mainFilterKeys.includes(key));
  };

  const buildQuery = (isSubCategory = false, includeCategoryQueries = true) => {
    const filterValues = getFilterValues();
    return queryGateway.buildQuery(filterValues, categorySlug, isSubCategory, includeCategoryQueries);
  };

  const buildApiUrl = (isSubCategory = false, includeCategoryQueries = true) => {
    const query = buildQuery(isSubCategory, includeCategoryQueries);
    return queryGateway.buildApiUrl(query, categorySlug);
  };

  return {
    // State
    filterStates,
    availableFilters,
    activeFilters,
    
    // Actions
    toggleFilter,
    closeAllDropdowns,
    updateFilterValue,
    removeFilter,
    clearAllFilters,
    
    // Getters
    getFilterValues,
    isFilterOpen,
    getFilterValue,
    getMainFilters,
    getAdditionalFilters,
    buildQuery,
    buildApiUrl,
  };
}; 