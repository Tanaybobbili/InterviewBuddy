

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Bell, Headphones, User, Home, ChevronRight } from 'lucide-react';
import OrgList from '../details/organisation/OrgList';
import AddOrg from '../details/organisation/AddOrg';
import Button from '../components/Button';
import { fetchOrganisations } from '../api/OrgApi';
import IBlogo_light from '../assets/IBlogo_light.svg'

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

  const handleOrgDelete = (deletedId) => {
    setAllOrgs(prev => prev.filter(org => org.id !== deletedId));
    setFilteredOrgs(prev => prev.filter(org => org.id !== deletedId));
  };

  const handleAddOrgSuccess = () => {
    loadOrgs(); // reload after adding
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <img src={IBlogo_light} alt="IB Logo" className="h-8" />
          </Link>

          {/* Top-right icons with navigation */}
          <div className="flex items-center gap-4">
            {/* Help/Support */}
            <Link to="/support" className="p-2 hover:bg-gray-100 rounded-lg" title="Support">
              <Headphones className="w-5 h-5 text-gray-600" />
            </Link>

            {/* Notifications */}
            <Link to="/notifications" className="p-2 hover:bg-gray-100 rounded-lg" title="Notifications">
              <Bell className="w-5 h-5 text-gray-600" />
            </Link>

            {/* User Profile */}
            <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-lg" title="Profile">
              <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 flex gap-8">
          <Link to="/" className="pb-4 text-gray-500 hover:text-gray-700">
            Dashboard
          </Link>

          <Link
            to="/organisations"
            className="pb-4 text-purple-600 border-b-2 border-purple-600 font-medium"
          >
            Manage B2B organizations
          </Link>
        </div>
      </div>

      {/* Breadcrumb + Search */}
      <div className="bg-white px-6 py-4 flex items-center gap-2 text-sm border-b border-gray-200">
        <Link to="/" className="flex items-center gap-1 text-gray-500 hover:text-purple-600">
          <Home className="w-4 h-4" />
        </Link>
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
