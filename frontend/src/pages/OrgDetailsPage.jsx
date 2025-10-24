// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchOrganisationById } from '../api/OrgApi';
// import Button from '../components/Button';
// import OrgDetails from '../details/organisation/OrgDetails';
// import AddUser from '../details/user/AddUser'; // Modal
// import UserList from '../details/user/UserList'; // Table (needs implementation)
// import '../App.css'; // Import global/app-level css if needed

// export default function OrgDetailsPage() {
//   const { id } = useParams();
//   const [org, setOrg] = useState(null);
//   const [tab, setTab] = useState('basic');
//   const [loading, setLoading] = useState(true);
//   const [addUserOpen, setAddUserOpen] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     setLoading(true);
//     fetchOrganisationById(id)
//       .then(setOrg)
//       .catch(() => setError('Error loading organization'))
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (!org || error) return <div>{error || "No data found"}</div>;

//   return (
//     <div>
//       {/* Profile Card */}
//       <div className="bg-white flex items-center justify-between p-6 rounded-lg shadow mb-6">
//         <div className="flex items-center gap-4">
//           <img src={org.logoUrl || '/placeholder-logo.png'} alt="logo" className="w-16 h-16 rounded-full border" />
//           <div>
//             <h2 className="text-2xl font-bold">{org.name}</h2>
//             <div className="text-gray-600">{org.primary_admin_email}</div>
//             <div>{org.contact_phone}</div>
//             <a href={org.website_url} className="text-indigo-600" target="_blank" rel="noopener noreferrer">{org.website_url}</a>
//           </div>
//         </div>
//         <div className="flex flex-col items-end gap-2">
//           <span className={`px-3 py-1 rounded text-sm ${org.status === 'Active' ? 'bg-green-100 text-green-800' : org.status === 'Blocked' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-700'}`}>
//             {org.status}
//           </span>
//           <button className="text-indigo-600 underline text-sm">Change status</button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex border-b mb-4 gap-2">
//         <button
//           className={`py-2 px-4 font-semibold ${tab === 'basic' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
//           onClick={() => setTab('basic')}
//         >
//           Basic details
//         </button>
//         <button
//           className={`py-2 px-4 font-semibold ${tab === 'users' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
//           onClick={() => setTab('users')}
//         >
//           Users
//         </button>
//       </div>

//       {/* Tab Content */}
//       {tab === 'basic' && (
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-lg font-semibold mb-4">Profile</h3>
//           <div className="grid grid-cols-2 gap-6 mb-3">
//             <div>
//               <label className="block font-medium">Organization name</label>
//               <input value={org.name} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
//             </div>
//             <div>
//               <label className="block font-medium">Organization SLUG</label>
//               <input value={org.slug} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
//             </div>
//             <div>
//               <label className="block font-medium">Primary Admin Name</label>
//               <input value={org.primary_admin_name} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
//             </div>
//             <div>
//               <label className="block font-medium">Primary Admin Mail-id</label>
//               <input value={org.primary_admin_email} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
//             </div>
//             <div>
//               <label className="block font-medium">Support Email</label>
//               <input value={org.support_email} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
//             </div>
//             <div>
//               <label className="block font-medium">Phone no</label>
//               <input value={org.contact_phone} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
//             </div>
//             <div>
//               <label className="block font-medium">Alternate phone no</label>
//               <input value={org.alternate_phone} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
//             </div>
//             <div>
//               <label className="block font-medium">Max active coordinators allowed</label>
//               <input value={org.max_coordinators} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
//             </div>
//             <div>
//               <label className="block font-medium">Timezone</label>
//               <input value={org.timezone_name} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
//             </div>
//             <div>
//               <label className="block font-medium">Region</label>
//               <input value={org.timezone_region} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
//             </div>
//             <div>
//               <label className="block font-medium">Language</label>
//               <input value={org.language} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
//             </div>
//             <div>
//               <label className="block font-medium">Website URL</label>
//               <input value={org.website_url} readOnly className="w-full border rounded-lg px-3 py-2 bg-gray-50" />
//             </div>
//           </div>
//         </div>
//       )}

//       {tab === 'users' && (
//         <div className="bg-white p-6 rounded-lg shadow">
//           <div className="flex justify-between items-center mb-3">
//             <div className="text-lg font-semibold">Users</div>
//             <Button onClick={() => setAddUserOpen(true)}>+ Add user</Button>
//           </div>
//           <UserList orgId={org.id} />
//           {addUserOpen && (
//             <AddUser orgId={org.id} onClose={() => setAddUserOpen(false)} onSuccess={() => setAddUserOpen(false)} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrganisationById } from '../api/OrgApi';
import Button from '../components/Button';
import UserList from '../details/user/UserList';
import AddUser from '../details/user/AddUser';

export default function OrgDetailsPage() {
  const { id } = useParams();
  const [org, setOrg] = useState(null);
  const [tab, setTab] = useState('basic');
  const [loading, setLoading] = useState(true);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [error, setError] = useState('');
  const [refreshUsersFlag, setRefreshUsersFlag] = useState(false);


  useEffect(() => {
    setLoading(true);
    setError('');
    fetchOrganisationById(id)
      .then(setOrg)
      .catch(() => setError('Error loading organization'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600 font-semibold">{error}</div>;
  if (!org) return <div>No organization found.</div>;

  return (
    <div>
      {/* Profile Card */}
      <div className="bg-white flex items-center justify-between p-6 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4">
          <img
            src={org.logoUrl || '/placeholder-logo.png'}
            alt="logo"
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <h2 className="text-2xl font-bold">{org.name}</h2>
            <div className="text-gray-600">{org.primary_admin_email}</div>
            <div>{org.contact_phone}</div>
            <a
              href={org.website_url}
              className="text-indigo-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {org.website_url}
            </a>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-3 py-1 rounded text-sm ${
              org.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : org.status === 'Blocked'
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {org.status}
          </span>
          <button className="text-indigo-600 underline text-sm">Change status</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4 gap-2">
        <button
          onClick={() => setTab('basic')}
          className={`py-2 px-4 font-semibold ${
            tab === 'basic'
              ? 'border-b-2 border-indigo-500 text-indigo-600'
              : 'text-gray-500'
          }`}
        >
          Basic details
        </button>
        <button
          onClick={() => setTab('users')}
          className={`py-2 px-4 font-semibold ${
            tab === 'users' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'
          }`}
        >
          Users
        </button>
      </div>

      {/* Tab Content */}
      {tab === 'basic' && (
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
      )}

      {tab === 'users' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-3">
            <div className="text-lg font-semibold">Users</div>
            <Button onClick={() => setAddUserOpen(true)}>+ Add user</Button>
          </div>
          <UserList orgId={org.id} refreshFlag={refreshUsersFlag} />
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
  );
}
