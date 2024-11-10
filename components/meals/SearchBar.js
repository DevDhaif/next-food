const SearchBar = ({ value, onChange }) => (
  <div className="my-4">
    <input
      type="text"
      placeholder="Search by name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 border rounded-md max-w-sm"
    />
  </div>
);

export default SearchBar;
