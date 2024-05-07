import { useItemsStore } from "../stores/itemsStore";

export default function Counter() {
  const items = useItemsStore((state) => state.items);

  const totalNumberOfItems = items.length;
  const numberOfItemsPacked = items.filter((item) => item.packed).length;
  return (
    <p className="counter">
      <b>{numberOfItemsPacked}</b> /{totalNumberOfItems} items packed
    </p>
  );
}
