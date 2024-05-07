import { createContext, useEffect, useState } from "react";
import { initialItems } from "../lib/constants";

export const ItemsContext = createContext();

export default function ItemsContextProvider({ children }) {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem("items")) || initialItems
  );

  const handleAddItem = (newItemText) => {
    const newItem = {
      label: newItemText,
      id: new Date().getTime(),
      packed: false,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            packed: !item.packed,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveAllItems = () => {
    setItems([]);
  };

  const handleMarkAllAsComplete = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, packed: true }))
    );
  };

  const handleMarkAllAsIncomplete = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, packed: false }))
    );
  };

  const handleResetToInitial = () => {
    setItems(initialItems);
  };

  useEffect(() => {
    if (!items) {
      return;
    }
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        handleAddItem,
        handleDeleteItem,
        handleToggleItem,
        handleRemoveAllItems,
        handleMarkAllAsComplete,
        handleMarkAllAsIncomplete,
        handleResetToInitial,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
