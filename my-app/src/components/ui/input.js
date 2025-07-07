
export function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded mb-2"
    />
  );
}
