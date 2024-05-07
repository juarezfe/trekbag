import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialItems } from "../lib/constants";

export const useItemsStore = create(
  persist(
    (set) => ({
      items: initialItems,
      removeAllItems: () => set(() => ({ items: [] })),
      markAllAsComplete: () =>
        set((state) => ({
          items: state.items.map((item) => ({ ...item, packed: true })),
        })),
      markAllAsIncomplete: () =>
        set((state) => ({
          items: state.items.map((item) => ({ ...item, packed: false })),
        })),
      resetToInitial: () => set(() => ({ items: initialItems })),
      addItem: (newItemText) => {
        const newItem = {
          id: new Date().getTime(),
          label: newItemText,
          packed: false,
        };
        set((state) => ({
          items: [...state.items, newItem],
        }));
      },
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      toggleItem: (id) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                packed: !item.packed,
              };
            }
            return item;
          }),
        })),
    }),
    {
      name: "items",
    }
  )
);
