export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <button className="float-right" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}
