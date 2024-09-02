import { create } from "zustand";

export const useApiStore = create((set, get) => ({
  productData: [],
  setProductData: (data) => set(() => ({ productData: data })),
}));
