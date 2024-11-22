const Dropdown = ({ label, options, value, onChange }) => (
    <div className="w-full">
      <label className="block text-lg font-semibold mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-800 text-gray-300 border border-gray-600 rounded w-full p-3"
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
  
  export default Dropdown;
  