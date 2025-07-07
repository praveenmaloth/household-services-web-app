
export function Button({ children, onClick, variant = "primary", className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${variant === "primary" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"} ${className}`}
    >
      {children}
    </button>
  );
}
