import { create } from "zustand";

export const apiUseStore = create((set, get) => ({
  productData: [],
  setProductData: (data) => set((state) => ({ productData: data })),
}));
