import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface DataState {
  data: string[][];
  setData: (data: string[][]) => void;
}

export const useDataStore = create<DataState>()(
  devtools(
    persist(
      (set) => ({
        data: [],
        setData: (data) => set({ data }),
      }),
      {
        name: "data-storage",
      },
    ),
  ),
);
