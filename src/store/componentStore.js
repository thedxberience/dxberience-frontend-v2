import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useComponentStore = create(
  persist(
    (set, get) => ({
      filterData: {
        confirmationStatus: "",
        startDate: "",
        endDate: "",
        sortBy: "",
      },
      setFilterData: (data) =>
        set((state) => ({
          filterData: { ...state.filterData, ...data },
        })),
      openModal: false,
      setOpenModal: (openModal) => set(() => ({ openModal: openModal })),
      experienceFormDropdownState: {
        categoryDropdown: false,
        dateDropdown: false,
        budgetDropdown: false,
      },
      toggleCategoryDropdown: () =>
        set((state) => ({
          experienceFormDropdownState: {
            categoryDropdown:
              !state.experienceFormDropdownState.categoryDropdown,
            dateDropdown: false,
            budgetDropdown: false,
          },
        })),
      toggleDateDropdown: () =>
        set((state) => ({
          experienceFormDropdownState: {
            categoryDropdown: false,
            dateDropdown: !state.experienceFormDropdownState.dateDropdown,
            budgetDropdown: false,
          },
        })),
      toggleBudgetDropdown: () =>
        set((state) => ({
          experienceFormDropdownState: {
            categoryDropdown: false,
            dateDropdown: false,
            budgetDropdown: !state.experienceFormDropdownState.budgetDropdown,
          },
        })),
      closeCategoryDropdown: () =>
        set((state) => ({
          experienceFormDropdownState: {
            categoryDropdown: false,
            dateDropdown: false,
            budgetDropdown: false,
          },
        })),
      closeDateDropdown: () =>
        set((state) => ({
          experienceFormDropdownState: {
            categoryDropdown: false,
            dateDropdown: false,
            budgetDropdown: false,
          },
        })),
      closeBudgetDropdown: () =>
        set((state) => ({
          experienceFormDropdownState: {
            categoryDropdown: false,
            dateDropdown: false,
            budgetDropdown: false,
          },
        })),
      selectedBudgetRange: "",
      setSelectedBudgetRange: (budgetRange) =>
        set((state) => ({
          selectedBudgetRange: budgetRange,
        })),
      categoryFromSlug: "",
      categorySlugDisplay: "",
      setCategoryFromSlug: (slug) => {
        let category;
        if (slug) {
          let slugArray = slug.split("-");
          category = slugArray
            .map((string) => string.charAt(0).toUpperCase() + string.slice(1))
            .join(" ");
        }
        return set(() => ({
          categoryFromSlug: slug,
          categorySlugDisplay: category,
        }));
      },
    }),
    {
      name: "dxberienceV2ComponentStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
