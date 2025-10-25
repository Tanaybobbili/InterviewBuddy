

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-500/20 flex justify-end z-50">
      <div className="bg-white h-full w-1/2 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-gray-600"
          aria-label="Close"
          type="button"
        >
          &times;
        </button>
        <div className="p-6 h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
