// import React, { useEffect, useState } from 'react';
// import { fetchUsers } from '../../api/UserApi';

// export default function UserList({ orgId }) {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers()
//       .then(list => setUsers(list.filter(u => u.organization_id === orgId)))
//       .finally(() => setLoading(false));
//   }, [orgId]);

//   if (loading) return <div>Loading users...</div>;
//   if (!users.length) return <div>No users found.</div>;

//   return (
//     <table className="w-full border">
//       <thead>
//         <tr>
//           <th className="border p-2">#</th>
//           <th className="border p-2">User name</th>
//           <th className="border p-2">Role</th>
//           <th className="border p-2">Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((u, idx) => (
//           <tr key={u.id}>
//             <td className="border p-2">{idx + 1}</td>
//             <td className="border p-2">{u.name}</td>
//             <td className="border p-2">
//               <span className={u.role === 'Admin' ? 'text-green-700 bg-green-100 px-2 rounded' : 'text-orange-700 bg-orange-100 px-2 rounded'}>
//                 {u.role}
//               </span>
//             </td>
//             <td className="border p-2">
//               {/* Insert edit/delete icons and actions here if needed */}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

import { useEffect, useState } from 'react';
import { fetchUsers } from '../../api/UserApi';

export default function UserList({ orgId, refreshFlag }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then(list => setUsers(list.filter(u => u.organization_id === orgId)))
      .finally(() => setLoading(false));
  }, [orgId, refreshFlag]);

  if (loading) return <div>Loading users...</div>;
  if (!users.length) return <div>No users found.</div>;

  return (
    <table className="w-full rounded shadow border">
      <thead className="bg-gray-50">
        <tr>
          <th className="border p-2 text-left">Sr. No</th>
          <th className="border p-2 text-left">User name</th>
          <th className="border p-2 text-left">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, idx) => (
          <tr key={u.id} className="hover:bg-gray-50">
            <td className="border p-2">{idx + 1}</td>
            <td className="border p-2">{u.name}</td>
            <td className="border p-2">
              <span
                className={
                  u.role === "Admin"
                    ? "bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
                    : "bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs"
                }
              >
                {u.role}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
