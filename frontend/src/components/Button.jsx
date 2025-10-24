export default function Button({ children, onClick, className = '', ...props }) {
  return (
    <button
      onClick={onClick}
      className={`bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
