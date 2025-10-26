

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Home, ChevronRight } from 'lucide-react';
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

  const handleOrgDelete = (deletedId) => {
    setAllOrgs(prev => prev.filter(org => org.id !== deletedId));
    setFilteredOrgs(prev => prev.filter(org => org.id !== deletedId));
  };

  const handleAddOrgSuccess = () => {
    loadOrgs(); // reload after adding
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="flex justify-end mb-4 relative">
        <div className="relative w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search organizations..."
            className="border rounded-lg px-3 py-1 pl-8 w-full text-sm focus:outline-none focus:ring-1 focus:ring-purple-600"
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
            className="
              bg-purple-600 hover:bg-purple-700 text-white 
              px-3 py-1 sm:px-4 sm:py-2 
              rounded-lg flex items-center gap-1 sm:gap-2 
              text-xs sm:text-sm font-medium
              transition-colors duration-200
            "
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Add organization</span>
            <span className="sm:hidden">Add</span>
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
