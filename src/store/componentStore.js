import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useComponentStore = create(
  persist(
    (set, get) => ({
      footerHeight: null,
      setFooterHeight: (height) => {
        return set({
          footerHeight: height,
        });
      },
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
      openForgotPasswordModal: false,
      setOpenForgotPasswordModal: (openForgotPasswordModal) =>
        set(() => ({ openForgotPasswordModal: openForgotPasswordModal })),
      // Keep only the methods that are still being used by existing components
      toggleCategoryDropdown: () =>
        set((state) => ({
          experienceFormDropdownState: {
            categoryDropdown: !state.experienceFormDropdownState?.categoryDropdown,
            statusDropdown: false,
            priceDropdown: false,
            dateDropdown: false,
            locationDropdown: false,
            durationDropdown: false,
            groupSizeDropdown: false,
            ratingDropdown: false,
          },
        })),
      toggleBudgetDropdown: () =>
        set((state) => ({
          experienceFormDropdownState: {
            categoryDropdown: false,
            statusDropdown: false,
            priceDropdown: !state.experienceFormDropdownState?.priceDropdown,
            dateDropdown: false,
            locationDropdown: false,
            durationDropdown: false,
            groupSizeDropdown: false,
            ratingDropdown: false,
          },
        })),
      closeCategoryDropdown: () =>
        set((state) => ({
          experienceFormDropdownState: {
            categoryDropdown: false,
            statusDropdown: false,
            priceDropdown: false,
            dateDropdown: false,
            locationDropdown: false,
            durationDropdown: false,
            groupSizeDropdown: false,
            ratingDropdown: false,
          },
        })),
      closeBudgetDropdown: () =>
        set((state) => ({
          experienceFormDropdownState: {
            categoryDropdown: false,
            statusDropdown: false,
            priceDropdown: false,
            dateDropdown: false,
            locationDropdown: false,
            durationDropdown: false,
            groupSizeDropdown: false,
            ratingDropdown: false,
          },
        })),
      closeDateDropdown: () =>
        set((state) => ({
          experienceFormDropdownState: {
            categoryDropdown: false,
            statusDropdown: false,
            priceDropdown: false,
            dateDropdown: false,
            locationDropdown: false,
            durationDropdown: false,
            groupSizeDropdown: false,
            ratingDropdown: false,
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
      showVideoModal: false,
      setShowVideoModal: (showVideoModal) =>
        set({ showVideoModal: showVideoModal }),
    }),
    {
      name: "dxberienceV2ComponentStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
