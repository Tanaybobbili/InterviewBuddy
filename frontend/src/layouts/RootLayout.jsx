// import { Home } from 'lucide-react';
// export default function RootLayout({ children }) {
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <div className="bg-gray-800 text-white px-6 py-2 text-sm">
//         <a href="/"><Home className="w-4 h-4" />Manage B2B</a>
        
//       </div>
//       <main className="grow p-6">{children}</main>
//     </div>
//   );    
// }
import { Home } from 'lucide-react';

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-gray-800 text-white px-6 py-3 text-sm flex items-center space-x-2">
        <a href="/" className="flex items-center space-x-2 hover:text-gray-300 transition">
          <Home className="w-4 h-4" />
          <span>Manage B2B</span>
        </a>
      </div>

      <main className="grow p-6">{children}</main>
    </div>
  );
}
