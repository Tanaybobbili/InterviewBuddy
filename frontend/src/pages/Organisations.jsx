
import { useState } from 'react';
import { Search, Plus, Bell, Headphones, User, Home, ChevronRight } from 'lucide-react';
import OrgList from '../details/organisation/OrgList';
import AddOrg from '../details/organisation/AddOrg';
import Button from '../components/Button';

export default function Organizations() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  function handleAddOrgSuccess() {
    setRefreshFlag(flag => !flag);
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}


      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="border-2 border-black px-4 py-2 font-bold text-lg">
              LOGO
            </div>
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
          <button className="pb-4 text-gray-500 hover:text-gray-700">
            Dashboard
          </button>
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
        <button className="ml-auto p-2 hover:bg-gray-100 rounded-lg">
          <Search className="w-5 h-5 text-purple-600" />
        </button>
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

          <OrgList key={refreshFlag} />
        </div>
      </div>

      {isModalOpen && (
        <AddOrg
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleAddOrgSuccess}
        />
      )}
    </div>
  );
}
