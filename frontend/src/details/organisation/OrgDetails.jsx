
import React, { useState } from 'react';
import { updateOrganisation } from '../../api/OrgApi';

export default function OrgDetails({ org, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(org || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!org) return <div>No organization data found.</div>;

  const coordinatorLimits = ['1', '5', '10', '25', '50', '100'];
  const timezones = ['Indian Standard Time', 'Pacific Standard Time', 'Eastern Standard Time', 'Central European Time'];
  const regions = ['Asia/Kolkata', 'Asia/Colombo', 'Europe/London', 'America/Los_Angeles'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Tamil', 'Telugu'];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      await updateOrganisation(org.id, formData); // Send all updated fields
      setIsEditing(false);
      onUpdate && onUpdate();
    } catch (err) {
      console.error(err);
      setError('Failed to update organization. Check all fields.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(org);
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Organization Profile</h3>
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
        {/* Text fields */}
        {['name', 'slug', 'primary_admin_name', 'primary_admin_email', 'support_email', 'contact_phone', 'alternate_phone', 'website_url'].map((field) => (
          <Field key={field} label={field.replace(/_/g, ' ')} name={field} value={formData[field]} onChange={handleChange} isEditing={isEditing} />
        ))}

        {/* Dropdowns */}
        <SelectField label="Max Coordinators" name="max_coordinators" value={formData.max_coordinators} options={coordinatorLimits} onChange={handleChange} isEditing={isEditing} />
        <SelectField label="Timezone" name="timezone_name" value={formData.timezone_name} options={timezones} onChange={handleChange} isEditing={isEditing} />
        <SelectField label="Region" name="timezone_region" value={formData.timezone_region} options={regions} onChange={handleChange} isEditing={isEditing} />
        <SelectField label="Language" name="language" value={formData.language} options={languages} onChange={handleChange} isEditing={isEditing} />
        
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, isEditing }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        name={name}
        value={value ?? ''}
        onChange={onChange}
        readOnly={!isEditing}
        className={`w-full border rounded-lg px-3 py-2 ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-transparent'}`}
      />
    </div>
  );
}

function SelectField({ label, name, value, options, onChange, isEditing }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      {isEditing ? (
        <select
          name={name}
          value={value ?? ''}
          onChange={onChange}
          className={`w-full border rounded-lg px-3 py-2 ${
            isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-transparent'
          } appearance-none`} // appearance-none removes native dropdown styling
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          readOnly
          value={value ?? ''}
          className="w-full border rounded-lg px-3 py-2 bg-gray-50 border-transparent"
        />
      )}
    </div>
  );
}

