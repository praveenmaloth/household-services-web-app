
export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        {children}
        <button onClick={() => onOpenChange(false)} className="absolute top-2 right-2">
          ❌
        </button>
      </div>
    </div>
  );
}

export function DialogContent({ children }) {
  return <div>{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-bold mb-2">{children}</h2>;
}
