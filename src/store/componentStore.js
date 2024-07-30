import { create } from "zustand";

export const componentUseStore = create((set, get) => ({
  experienceFormDropdownState: {
    categoryDropdown: false,
    dateDropdown: false,
    budgetDropdown: false,
  },
  toggleCategoryDropdown: () =>
    set((state) => ({
      experienceFormDropdownState: {
        categoryDropdown: !state.experienceFormDropdownState.categoryDropdown,
        dateDropdown: false,
        budgetDropdown: false,
      },
    })),
  toggledateDropdown: () =>
    set((state) => ({
      experienceFormDropdownState: {
        categoryDropdown: false,
        dateDropdown: !state.experienceFormDropdownState.dateDropdown,
        budgetDropdown: false,
      },
    })),
  togglebudgetDropdown: () =>
    set((state) => ({
      experienceFormDropdownState: {
        categoryDropdown: false,
        dateDropdown: false,
        budgetDropdown: !state.experienceFormDropdownState.budgetDropdown,
      },
    })),
}));
