

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrganisationById } from '../api/OrgApi';
import UserList from '../details/user/UserList';
import AddUser from '../details/user/AddUser';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../components/Button';

export default function OrgDetailsPage() {
  const { id } = useParams();
  const [org, setOrg] = useState(null);
  const [tab, setTab] = useState('basic');
  const [loading, setLoading] = useState(true);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [refreshUsersFlag, setRefreshUsersFlag] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchOrganisationById(id)
      .then(setOrg)
      .catch(() => setError('Error loading organization'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600 font-semibold">{error}</div>;
  if (!org) return <div>No organization found.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Breadcrumb omitted for brevity—move your top nav here as needed */}

      <div className="p-6">
        {/* Organization Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 flex justify-between items-start">
          <div className="flex gap-6">
            {/* Logo + maybe Edit */}
            <div className="relative">
              <div className="w-32 h-32 bg-amber-800 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={org.logoUrl || '/placeholder-logo.png'}
                  alt={org.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 bg-white p-2 rounded-lg shadow-md hover:bg-gray-50">
                <Edit className="w-4 h-4 text-purple-600" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold text-gray-900">{org.name}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="w-5 h-5">{/* Mail Icon */}</span>
                <span className="text-sm">{org.primary_admin_email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="w-5 h-5">{/* Phone Icon */}</span>
                <span className="text-sm">{org.contact_phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5">{/* Globe Icon */}</span>
                <a href={org.website_url} className="text-sm text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  {org.website_url}
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border
                ${org.status === 'Active' ? 'bg-green-50 text-green-600 border-green-200'
                   : org.status === 'Blocked' ? 'bg-red-50 text-red-600 border-red-200'
                   : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
              <span className={`w-2 h-2 rounded-full ${
                org.status === 'Active' ? 'bg-green-500'
                  : org.status === 'Blocked' ? 'bg-red-500'
                  : 'bg-gray-400'
              }`}></span>
              {org.status}
            </span>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Change status
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-lg shadow-sm border border-gray-200">
          <div className="flex gap-1 px-6 pt-4">
            <button
              onClick={() => setTab('basic')}
              className={`px-6 py-3 text-sm font-medium rounded-t-lg ${
                tab === 'basic' ? 'bg-gray-100 text-purple-600' : 'text-gray-500 hover:text-gray-700'
              }`}>
              Basic details
            </button>
            <button
              onClick={() => setTab('users')}
              className={`px-6 py-3 text-sm font-medium rounded-t-lg ${
                tab === 'users' ? 'bg-purple-50 text-purple-600' : 'text-gray-500 hover:text-gray-700'
              }`}>
              Users
            </button>
          </div>
          {/* Tab Content */}
          <div className="p-6">
            {tab === 'basic' ? (
                <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Profile</h3>
                <div className="grid grid-cols-2 gap-6 mb-3">
                    {[
                    { label: 'Organization name', value: org.name },
                    { label: 'Organization SLUG', value: org.slug },
                    { label: 'Primary Admin Name', value: org.primary_admin_name },
                    { label: 'Primary Admin Mail-id', value: org.primary_admin_email },
                    { label: 'Support Email', value: org.support_email },
                    { label: 'Phone no', value: org.contact_phone },
                    { label: 'Alternate phone no', value: org.alternate_phone },
                    { label: 'Max active coordinators allowed', value: org.max_coordinators },
                    { label: 'Timezone', value: org.timezone_name },
                    { label: 'Region', value: org.timezone_region },
                    { label: 'Language', value: org.language },
                    { label: 'Website URL', value: org.website_url },
                    ].map(({ label, value }) => (
                    <div key={label}>
                        <label className="block font-medium">{label}</label>
                        <input
                        readOnly
                        value={value ?? ''}
                        className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                        />
                    </div>
                    ))}
                </div>
                </div>
            ) : null}
            {tab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Users</h2>
                  <Button
                    onClick={() => setAddUserOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" /> Add user
                  </Button>
                </div>
                <UserList orgId={org.id} refreshFlag={refreshUsersFlag}  />
                {addUserOpen && (
                  <AddUser
                    orgId={org.id}
                    onClose={() => setAddUserOpen(false)}
                    onSuccess={() => {
                      setAddUserOpen(false);
                      setRefreshUsersFlag(flag => !flag);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
