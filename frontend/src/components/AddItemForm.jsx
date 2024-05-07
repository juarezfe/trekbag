import { useRef, useState } from "react";
import Button from "./Button";

export default function AddItemForm({ onAddItem }) {
  const [itemText, setItemText] = useState("");
  const inputRef = useRef(null);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!itemText) {
      inputRef.current.focus();
      return;
    }
    onAddItem(itemText);
    setItemText("");
  };

  const handleOnChange = (e) => {
    setItemText(e.target.value);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h2>Add an item</h2>
      <input
        ref={inputRef}
        onChange={handleOnChange}
        value={itemText}
        autoFocus
      />
      <Button text="Add to list" />
    </form>
  );
}
