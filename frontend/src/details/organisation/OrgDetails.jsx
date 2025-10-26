import React, { useState } from 'react';
import { updateOrganisation } from '../../api/OrgApi';

// Label mapping for all form fields
const labelMap = {
  name: 'Organization name',
  slug: 'Organization SLUG',
  primary_admin_name: 'Primary Admin name',
  primary_admin_email: 'Primary Admin Mail-id',
  support_email: 'Support Email ID',
  contact_phone: 'Phone no',
  alternate_phone: 'Alternative phone no',
  max_coordinators: 'Max active Coordinators allowed',
  timezone_name: 'Common name',
  timezone_region: 'Region',
  language: 'Choose the language for organization',
  website_url: 'website URL',
};

// Dropdown icon component (large, always visible)
function DropdownIcon({ disabled }) {
  return (
    <svg
      className={`w-6 h-6 absolute right-2 top-1/2 transform -translate-y-1/2 ${
        disabled ? 'text-gray-700' : 'text-gray-700'
      } pointer-events-none`}
      viewBox="0 0 20 20" fill="none"
    >
      <path
        d="M7 8l3 3 3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function OrgDetails({ org, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(org || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!org) return <div>No organization data found.</div>;

  const coordinatorLimits = ['1', '5', '10', '25', '50', '100'];
  const timezones = [
    'Indian Standard Time',
    'Pacific Standard Time',
    'Eastern Standard Time',
    'Central European Time'
  ];
  const regions = [
    'Asia/Kolkata',
    'Asia/Colombo',
    'Europe/London',
    'America/Los_Angeles'
  ];
  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Hindi',
    'Tamil',
    'Telugu'
  ];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      // Normalize website URL before save
      let updatedData = { ...formData };
      if (
        updatedData.website_url &&
        !/^https?:\/\//i.test(updatedData.website_url)
      ) {
        updatedData.website_url = 'https://' + updatedData.website_url;
      }
      await updateOrganisation(org.id, updatedData); // Save updates
      setIsEditing(false);
      onUpdate && onUpdate();
    } catch (err) {
      setError('Failed to update organization. Check all fields.',err);
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

      {error && (
        <div className="text-red-600 text-sm mb-4">{error}</div>
      )}

      {/* Organization details */}
      <div className="mb-6">
        <div className="text-base font-semibold mb-2">
          Organization details
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Field
            label={labelMap['name']}
            name="name"
            value={formData['name']}
            onChange={handleChange}
            isEditing={isEditing}
          />
          <Field
            label={labelMap['slug']}
            name="slug"
            value={formData['slug']}
            onChange={handleChange}
            isEditing={isEditing}
          />
        </div>
      </div>

      {/* Contact details */}
      <div className="mb-6">
        <div className="text-base font-semibold mb-2">
          Contact details
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Field
            label={labelMap['primary_admin_name']}
            name="primary_admin_name"
            value={formData['primary_admin_name']}
            onChange={handleChange}
            isEditing={isEditing}
          />
          <Field
            label={labelMap['primary_admin_email']}
            name="primary_admin_email"
            value={formData['primary_admin_email']}
            onChange={handleChange}
            isEditing={isEditing}
          />
          <Field
            label={labelMap['support_email']}
            name="support_email"
            value={formData['support_email']}
            onChange={handleChange}
            isEditing={isEditing}
          />
          <div className="grid grid-cols-2 gap-6 col-span-2">
            <Field
              label={labelMap['contact_phone']}
              name="contact_phone"
              value={formData['contact_phone']}
              onChange={handleChange}
              isEditing={isEditing}
            />
            <Field
              label={labelMap['alternate_phone']}
              name="alternate_phone"
              value={formData['alternate_phone']}
              onChange={handleChange}
              isEditing={isEditing}
            />
          </div>
        </div>
      </div>

      {/* Maximum Allowed Coordinators */}
      <div className="mb-6">
        <div className="text-base font-semibold mb-2">
          Maximum Allowed Coordinators
        </div>
        <SelectField
          label={labelMap['max_coordinators']}
          name="max_coordinators"
          value={formData.max_coordinators}
          options={coordinatorLimits.map(n => `Upto ${n} Coordinators`)}
          onChange={handleChange}
          isEditing={isEditing}
        />
      </div>

      {/* Timezone */}
      <div className="mb-6">
        <div className="text-base font-semibold mb-2">
          Timezone
        </div>
        <div className="grid grid-cols-2 gap-6">
          <SelectField
            label={labelMap['timezone_name']}
            name="timezone_name"
            value={formData.timezone_name}
            options={timezones}
            onChange={handleChange}
            isEditing={isEditing}
          />
          <SelectField
            label={labelMap['timezone_region']}
            name="timezone_region"
            value={formData.timezone_region}
            options={regions}
            onChange={handleChange}
            isEditing={isEditing}
          />
        </div>
      </div>

      {/* Language */}
      <div className="mb-6">
        <div className="text-base font-semibold mb-2">
          Language
        </div>
        <SelectField
          label={labelMap['language']}
          name="language"
          value={formData.language}
          options={languages}
          onChange={handleChange}
          isEditing={isEditing}
        />
      </div>

      {/* Website */}
      <div className="mb-6">
        <div className="text-base font-semibold mb-2">
          Official website URL
        </div>
        <Field
          label={labelMap['website_url']}
          name="website_url"
          value={formData['website_url']}
          onChange={handleChange}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}

// Text input field
function Field({ label, name, value, onChange, isEditing }) {
  return (
    <div>
      <label className="block text-xs font-normal text-gray-500 mb-1">
        {label}
      </label>
      <input
        name={name}
        value={value ?? ''}
        onChange={onChange}
        readOnly={!isEditing}
        className={`w-full border rounded-lg px-3 py-2 ${
          isEditing
            ? 'bg-white border-gray-300'
            : 'bg-gray-50 border-transparent'
        }`}
      />
    </div>
  );
}

// Select/dropdown input field
function SelectField({ label, name, value, options, onChange, isEditing }) {
  return (
    <div className="relative">
      <label className="block text-xs font-normal text-gray-500 mb-1">
        {label}
      </label>
      {isEditing ? (
        <div className="relative">
          <select
            name={name}
            value={value ?? ''}
            onChange={onChange}
            className="w-full border rounded-lg px-3 py-2 bg-white border-gray-300 appearance-none pr-10"
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <DropdownIcon disabled={false} />
        </div>
      ) : (
        <div className="relative">
          <input
            readOnly
            value={value ?? ''}
            className="w-full border rounded-lg px-3 py-2 bg-gray-50 border-transparent pr-10"
          />
          <DropdownIcon disabled={true} />
        </div>
      )}
    </div>
  );
}
