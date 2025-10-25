
import React, { useState } from 'react';
import { updateOrganisation } from '../../api/OrgApi';

export default function OrgDetails({ org, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(org || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!org) return <div>No organization data found.</div>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      await updateOrganisation(org.id, formData);
      setIsEditing(false);
      onUpdate && onUpdate(); // Notify parent to refresh data
    } catch (err) {
      setError('Failed to update organization.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(org); // Reset to original data
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Profile</h3>
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleCancel}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </>
          )}
        </div>
      </div>

      {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

      <div className="grid grid-cols-2 gap-6">
        {[
          { label: 'Organization name', name: 'name', value: formData.name },
          { label: 'Organization SLUG', name: 'slug', value: formData.slug },
          { label: 'Primary Admin Name', name: 'primary_admin_name', value: formData.primary_admin_name },
          { label: 'Primary Admin Mail-id', name: 'primary_admin_email', value: formData.primary_admin_email },
          { label: 'Support Email', name: 'support_email', value: formData.support_email },
          { label: 'Phone no', name: 'contact_phone', value: formData.contact_phone },
          { label: 'Alternate phone no', name: 'alternate_phone', value: formData.alternate_phone },
          { label: 'Max coordinators allowed', name: 'max_coordinators', value: formData.max_coordinators },
          { label: 'Timezone', name: 'timezone_name', value: formData.timezone_name },
          { label: 'Region', name: 'timezone_region', value: formData.timezone_region },
          { label: 'Language', name: 'language', value: formData.language },
          { label: 'Website URL', name: 'website_url', value: formData.website_url },
        ].map(({ label, name, value }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            <input
              name={name}
              value={value ?? ''}
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full border rounded-lg px-3 py-2 ${
                isEditing ? 'bg-white' : 'bg-gray-50'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
