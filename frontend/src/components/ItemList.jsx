import { useMemo, useState } from "react";
import { sortingOptions } from "../lib/constants";
import EmptyView from "./EmptyView";
import Select from "react-select";
import { useItemsStore } from "../stores/itemsStore";

export default function ItemList() {
  const [sortBy, setSortBy] = useState("default");

  const items = useItemsStore((state) => state.items);
  const toggleItem = useItemsStore((state) => state.toggleItem);
  const deleteItem = useItemsStore((state) => state.deleteItem);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (sortBy === "packed") {
        return b.packed - a.packed;
      }

      if (sortBy === "unpacked") {
        return a.packed - b.packed;
      }

      return;
    });
  }, [items, sortBy]);

  return (
    <>
      <ul className="item-list">
        {items.length === 0 && <EmptyView />}
        {items.length > 0 && (
          <section className="sorting">
            <Select
              onChange={(option) => setSortBy(option.value)}
              defaultValue={sortingOptions[0]}
              options={sortingOptions}
            />
          </section>
        )}
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            {...item}
            onToggleItem={toggleItem}
            onDeleteItem={deleteItem}
          />
        ))}
      </ul>
    </>
  );
}

function Item({ label, id, packed, onToggleItem, onDeleteItem }) {
  return (
    <li className="item">
      <label htmlFor={id}>
        <input
          onChange={() => onToggleItem(id)}
          checked={packed}
          type="checkbox"
          id={id}
        />
        <span>{label}</span>
      </label>
      {/* emojis on Mac: fn + e */}
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
}
