import { secondaryButtons } from "../lib/constants";
import { useItemsStore } from "../stores/itemsStore";
import Button from "./Button";

export default function ButtonGroup() {

  const markAllAsComplete = useItemsStore((state) => state.markAllAsComplete);
  const markAllAsIncomplete = useItemsStore((state) => state.markAllAsIncomplete);
  const resetToInitial = useItemsStore((state) => state.resetToInitial);
  const removeAllItems = useItemsStore((state) => state.removeAllItems);

  const handleOnClick = (e) => {
    const action = e.target.textContent;
    switch (action) {
      case `${secondaryButtons[0]}`:
        markAllAsComplete();
        break;
      case `${secondaryButtons[1]}`:
        markAllAsIncomplete();
        break;
      case `${secondaryButtons[2]}`:
        resetToInitial();
        break;
      case `${secondaryButtons[3]}`:
        removeAllItems();
        break;
      default:
        console.error("Invalid action");
    }
  };

  return (
    <section className="button-group">
      {secondaryButtons.map((buttonText, index) => (
        <Button
          onClick={handleOnClick}
          key={index}
          text={buttonText}
          buttonType="secondary"
        />
      ))}
    </section>
  );
}
