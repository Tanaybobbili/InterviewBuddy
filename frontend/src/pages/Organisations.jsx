
// import { useState, useEffect } from 'react';
// import { Search, Plus, Bell, Headphones, User, Home, ChevronRight } from 'lucide-react';
// import OrgList from '../details/organisation/OrgList';
// import AddOrg from '../details/organisation/AddOrg';
// import Button from '../components/Button';
// import { fetchOrganisations } from '../api/OrgApi'; // Make sure this API returns all orgs

// export default function Organisations() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [refreshFlag, setRefreshFlag] = useState(false);
//   const [allOrgs, setAllOrgs] = useState([]);
//   const [filteredOrgs, setFilteredOrgs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Load organizations
//   const loadOrgs = async () => {
//     setLoading(true);
//     try {
//       const orgs = await fetchOrganisations();
//       setAllOrgs(orgs);
//       setFilteredOrgs(orgs);
//     } catch (err) {
//       console.error('Failed to fetch organizations', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadOrgs();
//   }, [refreshFlag]);

//   // Handle search
//   const handleSearch = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);

//     if (!term) {
//       setFilteredOrgs(allOrgs);
//       return;
//     }

//     const filtered = allOrgs.filter((org) =>
//       org.name.toLowerCase().includes(term.toLowerCase())
//     );
//     setFilteredOrgs(filtered);
//   };

//   const handleAddOrgSuccess = () => {
//     setRefreshFlag((flag) => !flag);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="border-2 border-black px-4 py-2 font-bold text-lg">LOGO</div>
//             <div className="text-xs text-gray-500 mt-6">2020</div>
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="p-2 hover:bg-gray-100 rounded-lg">
//               <Headphones className="w-5 h-5 text-gray-600" />
//             </button>
//             <button className="p-2 hover:bg-gray-100 rounded-lg">
//               <Bell className="w-5 h-5 text-gray-600" />
//             </button>
//             <button className="p-2 hover:bg-gray-100 rounded-lg">
//               <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
//                 <User className="w-5 h-5 text-purple-600" />
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="px-6 flex gap-8">
//           <button className="pb-4 text-gray-500 hover:text-gray-700">Dashboard</button>
//           <button className="pb-4 text-purple-600 border-b-2 border-purple-600 font-medium">
//             Manage B2B organizations
//           </button>
//         </div>
//       </div>

//       {/* Breadcrumb + Search */}
//       <div className="bg-white px-6 py-4 flex items-center gap-2 text-sm border-b border-gray-200">
//         <Home className="w-4 h-4 text-gray-400" />
//         <ChevronRight className="w-4 h-4 text-gray-400" />
//         <span className="text-gray-600">Manage B2B organizations</span>

//         <div className="ml-auto relative">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearch}
//             placeholder="Search organizations..."
//             className="border rounded-lg px-3 py-1 pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-purple-600"
//           />
//           <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-600" />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-800">B2B organizations</h2>
//             <Button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
//             >
//               <Plus className="w-4 h-4" />
//               Add organization
//             </Button>
//           </div>

//           {loading ? (
//             <div className="p-6">Loading organizations...</div>
//           ) : filteredOrgs.length ? (
//             <OrgList orgs={filteredOrgs} />
//           ) : (
//             <div className="p-6 text-gray-600">No organizations found.</div>
//           )}
//         </div>
//       </div>

//       {isModalOpen && (
//         <AddOrg onClose={() => setIsModalOpen(false)} onSuccess={handleAddOrgSuccess} />
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { Search, Plus, Bell, Headphones, User, Home, ChevronRight } from 'lucide-react';
import OrgList from '../details/organisation/OrgList';
import AddOrg from '../details/organisation/AddOrg';
import Button from '../components/Button';
import { fetchOrganisations } from '../api/OrgApi';

export default function Organisations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allOrgs, setAllOrgs] = useState([]);
  const [filteredOrgs, setFilteredOrgs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Load organizations
  const loadOrgs = async () => {
    setLoading(true);
    try {
      const orgs = await fetchOrganisations();
      setAllOrgs(orgs);
      setFilteredOrgs(orgs);
    } catch (err) {
      console.error('Failed to fetch organizations', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrgs();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term) {
      setFilteredOrgs(allOrgs);
      return;
    }

    const filtered = allOrgs.filter((org) =>
      org.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOrgs(filtered);
  };

  // Callback when an organization is deleted
  const handleOrgDelete = (deletedId) => {
    setAllOrgs(prev => prev.filter(org => org.id !== deletedId));
    setFilteredOrgs(prev => prev.filter(org => org.id !== deletedId));
  };

  const handleAddOrgSuccess = () => {
    loadOrgs(); // reload to include newly added org
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="border-2 border-black px-4 py-2 font-bold text-lg">LOGO</div>
            <div className="text-xs text-gray-500 mt-6">2020</div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Headphones className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 flex gap-8">
          <button className="pb-4 text-gray-500 hover:text-gray-700">Dashboard</button>
          <button className="pb-4 text-purple-600 border-b-2 border-purple-600 font-medium">
            Manage B2B organizations
          </button>
        </div>
      </div>

      {/* Breadcrumb + Search */}
      <div className="bg-white px-6 py-4 flex items-center gap-2 text-sm border-b border-gray-200">
        <Home className="w-4 h-4 text-gray-400" />
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-gray-600">Manage B2B organizations</span>

        <div className="ml-auto relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search organizations..."
            className="border rounded-lg px-3 py-1 pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-600" />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">B2B organizations</h2>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add organization
            </Button>
          </div>

          {loading ? (
            <div className="p-6">Loading organizations...</div>
          ) : filteredOrgs.length ? (
            <OrgList orgs={filteredOrgs} onDelete={handleOrgDelete} />
          ) : (
            <div className="p-6 text-gray-600">No organizations found.</div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddOrg onClose={() => setIsModalOpen(false)} onSuccess={handleAddOrgSuccess} />
      )}
    </div>
  );
}
