export default function Button({ text, buttonType, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`btn ${buttonType === "secondary" && "btn--secondary"}`}
    >
      {text}
    </button>
  );
}
