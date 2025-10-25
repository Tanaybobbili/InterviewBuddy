

// import { Edit, Trash2 } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { fetchUsers, deleteUser } from '../../api/UserApi';

// export default function UserList({ orgId, refreshFlag}) {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     fetchUsers()
//       .then(list => setUsers(list.filter(u => u.organization_id === orgId)))
//       .finally(() => setLoading(false));
//   }, [orgId, refreshFlag]);

//   const handleDelete = async (id) => {
//   setUsers(prev => prev.filter(u => u.id !== id));

//   try {
//     await deleteUser(id);
//   } catch (err) {
//     console.error('Failed to delete user', err);
//     setLoading(true);
//     fetchUsers()
//       .then(list => setUsers(list.filter(u => u.organization_id === orgId)))
//       .finally(() => setLoading(false));
//   }
// };

//   if (loading) return <div>Loading users...</div>;
//   if (!users.length) return <div>No users found.</div>;

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead className="bg-gray-50 border-b border-gray-200">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Sr. No</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">User name</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Role</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {users.map((user, idx) => (
//             <tr key={user.id} className="hover:bg-gray-50">
//               <td className="px-6 py-4">{idx + 1}</td>
//               <td className="px-6 py-4">{user.name}</td>
//               <td className="px-6 py-4">
//                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
//                   user.role === "Admin"
//                     ? "bg-green-50 text-green-600 border-green-200"
//                     : "bg-orange-50 text-orange-600 border-orange-200"
//                 }`}>{user.role}</span>
//               </td>
//               <td className="px-6 py-4">
//                 <div className="flex items-center gap-2">
//                   <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
//                     <Edit className="w-4 h-4" />
//                   </button>
//                   <button
//                     className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
//                     onClick={() => handleDelete(user.id)}
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../../api/UserApi';
import EditUser from './EditUser';

export default function UserList({ orgId, refreshFlag }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then(list => setUsers(list.filter(u => u.organization_id === orgId)))
      .finally(() => setLoading(false));
  }, [orgId, refreshFlag]);

  const handleDelete = async (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));

    try {
      await deleteUser(id);
    } catch (err) {
      console.error('Failed to delete user', err);
      setLoading(true);
      fetchUsers()
        .then(list => setUsers(list.filter(u => u.organization_id === orgId)))
        .finally(() => setLoading(false));
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditUserOpen(true);
  };

  const handleEditSuccess = () => {
    setEditUserOpen(false);
    setLoading(true);
    fetchUsers()
      .then(list => setUsers(list.filter(u => u.organization_id === orgId)))
      .finally(() => setLoading(false));
  };

  if (loading) return <div>Loading users...</div>;
  if (!users.length) return <div>No users found.</div>;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Sr. No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">User name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, idx) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{idx + 1}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                    user.role === "Admin"
                      ? "bg-green-50 text-green-600 border-green-200"
                      : "bg-orange-50 text-orange-600 border-orange-200"
                  }`}>{user.role}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      onClick={() => handleEdit(user)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editUserOpen && selectedUser && (
        <EditUser user={selectedUser} onClose={() => setEditUserOpen(false)} onSuccess={handleEditSuccess} />
      )}
    </>
  );
}
