

import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrganisationById} from '../api/OrgApi';
import UserList from '../details/user/UserList';
import AddUser from '../details/user/AddUser';
import OrgDetails from '../details/organisation/OrgDetails';
import { Plus, Upload } from 'lucide-react';
import Button from '../components/Button';
import { API_BASE } from '../api/config';

export default function OrgDetailsPage() {
  const { id } = useParams();
  const [org, setOrg] = useState(null);
  const [tab, setTab] = useState('basic');
  const [loading, setLoading] = useState(true);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [refreshUsersFlag, setRefreshUsersFlag] = useState(false);
  const [error, setError] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const loadOrg = useCallback(() => {
    setLoading(true);
    fetchOrganisationById(id)
      .then(setOrg)
      .catch(() => setError('Error loading organization'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    loadOrg();
  }, [loadOrg]);
  const handleStatusChange = async (orgId) => {
    if (!org) return;

    const newStatus = org.status === 'Active' ? 'Inactive' : 'Active';
    try {
      const response = await fetch(`${API_BASE}/api/organisations/${orgId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      // ✅ Update local state immediately
      setOrg((prev) => ({ ...prev, status: newStatus }));

    } catch (error) {
      console.error('Error updating organization status:', error);
      alert('Failed to change status. Please try again.');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file');
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append('logo', file);

      // Call your backend API that handles multer + cloudinary
      const response = await fetch(`${API_BASE}/api/organisations/${id}/upload-logo`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const data = await response.json();
      // Update org with new logo URL
      setOrg(prev => ({ ...prev, logo_url: data.logoUrl }));
      loadOrg();
    } catch (err) {
      console.error('Image upload error:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600 font-semibold">{error}</div>;
  if (!org) return <div>No organization found.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Organization Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 flex justify-between items-start">
          <div className="flex gap-6">
            <div className="relative">
              <div className="w-32 h-32 bg-purple-300 rounded-lg flex items-center justify-center overflow-hidden">
                {org.logo_url ? (
                  <img
                    src={org.logo_url}
                    alt={org.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full rounded-lg flex items-center justify-center bg-purple-300 text-white font-semibold">
                    {org.name?.charAt(0).toUpperCase() || "O"}
                  </div>
                )}

                {uploadingImage && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-sm">Uploading...</div>
                  </div>
                )}
              </div>
              <label
                htmlFor="logo-upload"
                className="absolute bottom-2 right-2 bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 cursor-pointer"
              >
                <Upload className="w-4 h-4 text-purple-600" />
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold text-gray-900">{org.name}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-sm">{org.primary_admin_email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-sm">{org.contact_phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={org.website_url}
                  className="text-sm text-purple-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {org.website_url}
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border
                ${
                  org.status === 'Active'
                    ? 'bg-green-50 text-green-600 border-green-200'
                    : org.status === 'Blocked'
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  org.status === 'Active'
                    ? 'bg-green-500'
                    : org.status === 'Blocked'
                    ? 'bg-red-500'
                    : 'bg-gray-400'
                }`}
              ></span>
              {org.status}
            </span>
            <button onClick={() => handleStatusChange(org.id)} className="text-purple-600 hover:text-purple-700 text-sm font-medium cursor-pointer">
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
                tab === 'basic'
                  ? 'bg-gray-100 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Basic details
            </button>
            <button
              onClick={() => setTab('users')}
              className={`px-6 py-3 text-sm font-medium rounded-t-lg ${
                tab === 'users'
                  ? 'bg-purple-50 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Users
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {tab === 'basic' && <OrgDetails org={org} onUpdate={loadOrg} />}

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
                <UserList orgId={org.id} refreshFlag={refreshUsersFlag} />
                {addUserOpen && (
                  <AddUser
                    orgId={org.id}
                    onClose={() => setAddUserOpen(false)}
                    onSuccess={() => {
                      setAddUserOpen(false);
                      setRefreshUsersFlag((flag) => !flag);
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
