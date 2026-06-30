export default function OptionButton({ children, selected = false, correct = false, wrong = false, onClick, disabled = false }) {
  return (
    <button
      type="button"
      className={`optionButton ${selected ? 'selected' : ''} ${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
