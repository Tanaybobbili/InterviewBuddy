import { Home } from "lucide-react";

export default function Notifications() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Notifications feature has not been implemented yet
        </h1>
        <a href="/">
        <button
          className="mt-4 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          <Home className="w-4 h-4" />
          Go to Home
        </button>
        </a>
      </div>
    </div>
  );
}
