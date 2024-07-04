

const CustomNumberInput = ({ value, onChange }) => {
  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    onChange(value - 1);
  };

  return (
    <div className="custom-number-input-container w-full">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="custom-number-input appearance-none relative pr-8 block w-full px-4 py-2 bg-white border border-gray-300 rounded shadow focus:outline-none focus:shadow-outline"
      />
      <div className="custom-number-input-buttons">
        <button
          type="button"
          className="custom-number-input-button"
          onClick={handleIncrement}
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          type="button"
          className="custom-number-input-button"
          onClick={handleDecrement}
        >
          <svg viewBox="0 0 24 24">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomNumberInput;
