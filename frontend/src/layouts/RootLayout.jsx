
// import { Home, Bell, Headphones, User, ChevronRight } from 'lucide-react';
// import IBlogo_light from '../assets/IBlogo_light.svg';
// import { Link, useLocation } from 'react-router-dom';

// export default function RootLayout({ children }) {
//   const location = useLocation();
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">

//       {/* Top Header */}
//       <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="flex items-center">
//           <img src={IBlogo_light} alt="IB Logo" className="h-8" />
//         </Link>

//         {/* Top-right icons */}
//         <div className="flex items-center gap-4">
//           {/* Help/Support */}
//           <Link
//             to="/support"
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//             title="Support"
//           >
//             <Headphones className="w-5 h-5 text-gray-600" />
//           </Link>

//           {/* Notifications */}
//           <Link
//             to="/notifications"
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//             title="Notifications"
//           >
//             <Bell className="w-5 h-5 text-gray-600" />
//           </Link>

//           {/* User Profile */}
//           <Link
//             to="/profile"
//             className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//             title="Profile"
//           >
//             <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
//               <User className="w-5 h-5 text-purple-600" />
//             </div>
//           </Link>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="px-6 flex gap-8">
//           <Link
//             to="/"
//             className="pb-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
//           >
//             Dashboard
//           </Link>

//           <Link
//             to="/"
//             className="pb-4 text-purple-600 border-b-2 border-purple-600 font-medium transition-colors duration-200"
//           >
//             Manage B2B Organizations
//           </Link>
//         </div>
//       </div>
//       <div className="bg-white px-6 py-4 flex items-center gap-2 text-sm border-b border-gray-200">
//         <Link to="/" className="flex items-center gap-1 text-gray-500 hover:text-purple-600">
//           <Home className="w-4 h-4" />
//         </Link>
//         <ChevronRight className="w-4 h-4 text-gray-400" />
//         <span className="text-gray-600">Manage B2B organizations</span>
//         {isOrganizationsPage && (
//           <>
//             <ChevronRight className="w-4 h-4 text-gray-400" />
//             <span className="text-gray-600">Organization Details</span>
//           </>
//         )}
//       </div>
//       {/* Main content */}
//       <main className="grow p-6">{children}</main>
//     </div>
//   );
// }


import { Home, Bell, Headphones, User, ChevronRight } from 'lucide-react';
import IBlogo_light from '../assets/IBlogo_light.svg';
import { Link, useLocation } from 'react-router-dom';

export default function RootLayout({ children }) {
  const location = useLocation();

  // Check if current path is organizations page or its subpage
  const isOrganizationsPage = location.pathname.startsWith('/organizations');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Top Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={IBlogo_light} alt="IB Logo" className="h-8" />
        </Link>

        {/* Top-right icons */}
        <div className="flex items-center gap-4">
          {/* Help/Support */}
          <Link
            to="/support"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            title="Support"
          >
            <Headphones className="w-5 h-5 text-gray-600" />
          </Link>

          {/* Notifications */}
          <Link
            to="/notifications"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
          </Link>

          {/* User Profile */}
          <Link
            to="/profile"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            title="Profile"
          >
            <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 flex gap-8">
          <Link
            to="/"
            className="pb-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Dashboard
          </Link>

          <Link
            to="/"
            className="pb-4 text-purple-600 border-b-2 border-purple-600 font-medium transition-colors duration-200"
          >
            Manage B2B Organizations
          </Link>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white px-6 py-4 flex items-center gap-2 text-sm border-b border-gray-200">
        <Link to="/" className="flex items-center gap-1 text-gray-500 hover:text-purple-600">
          <Home className="w-4 h-4" />
        </Link>
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <Link to="/" className="text-gray-600 hover:text-purple-600">
          <span className="text-gray-600">Manage B2B organizations</span>
        </Link>
        {isOrganizationsPage && (
          <>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Organization Details</span>
          </>
        )}
      </div>

      {/* Main content */}
      <main className="grow p-6">{children}</main>
    </div>
  );
}
