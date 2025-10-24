
import React from 'react';

export default function OrgDetails({ org }) {
  if (!org) return <div>No organization data found.</div>;
  

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Profile</h3>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Organization details */}
        <div>
          <label className="block font-medium mb-1">Organization name</label>
          <input value={org.name} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
        </div>
        <div>
          <label className="block font-medium mb-1">Organization SLUG</label>
          <input value={org.slug} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
        </div>
        
        {/* Contact details */}
        <div>
          <label className="block font-medium mb-1">Primary Admin Name</label>
          <input value={org.primary_admin_name} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
        </div>
        <div>
          <label className="block font-medium mb-1">Primary Admin Mail-id</label>
          <input value={org.primary_admin_email} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
        </div>
        <div>
          <label className="block font-medium mb-1">Support Email</label>
          <input value={org.support_email} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
        </div>
        <div>
          <label className="block font-medium mb-1">Phone no</label>
          <input value={org.contact_phone} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
        </div>
        <div>
          <label className="block font-medium mb-1">Alternate phone no</label>
          <input value={org.alternate_phone} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
        </div>
        
        {/* Coordinators/Timezone/Language */}
        <div>
          <label className="block font-medium mb-1">Max coordinators allowed</label>
          <input value={org.max_coordinators} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
        </div>
        <div>
          <label className="block font-medium mb-1">Timezone</label>
          <input value={org.timezone_name} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
        </div>
        <div>
          <label className="block font-medium mb-1">Region</label>
          <input value={org.timezone_region} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
        </div>
        <div>
          <label className="block font-medium mb-1">Language</label>
          <input value={org.language} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
        </div>
        <div>
          <label className="block font-medium mb-1">Website URL</label>
          <input value={org.website_url} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
        </div>
      </div>
    </div>
  );
}
