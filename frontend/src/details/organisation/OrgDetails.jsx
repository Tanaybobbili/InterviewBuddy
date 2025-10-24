// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchOrganisationById, updateOrganisation } from '../../api/OrgApi';
// import Button from '../../components/Button';

// export default function OrgDetails() {
//   const { id } = useParams();
//   const [form, setForm] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchOrganisationById(id)
//       .then(setForm)
//       .catch(() => setError('Error loading organization'))
//       .finally(() => setLoading(false));
//   }, [id]);

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSave(e) {
//     e.preventDefault();
//     setSaving(true);
//     setError('');
//     try {
//       await updateOrganisation(id, form);
//       navigate('/organizations');
//     } catch {
//       setError('Update failed');
//     }
//     setSaving(false);
//   }

//   if (loading) return <div>Loading...</div>;
//   if (!form) return <div>No data found</div>;

//   return (
//     <form onSubmit={handleSave} className="max-w-xl mx-auto p-8 flex flex-col gap-5">
//       <h2 className="text-2xl font-bold mb-4">Edit Organization</h2>
//       {Object.entries(form).map(([field, value]) => (
//         <div key={field}>
//           <label className="block font-medium capitalize mb-1">{field.replace(/_/g, ' ')}</label>
//           <input
//             name={field}
//             value={value ?? ''}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-3 py-2"
//           />
//         </div>
//       ))}
//       {error && <div className="text-red-500">{error}</div>}
//       <div>
//         <Button type="submit" disabled={saving}>
//           {saving ? 'Saving...' : 'Save'}
//         </Button>
//         <Button type="button" className="ml-2 bg-gray-200 text-black" onClick={() => navigate('/organizations')}>
//           Cancel
//         </Button>
//       </div>
//     </form>
//   );
// }


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
