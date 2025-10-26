
import { Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteOrganisation } from '../../api/OrgApi';
import { fetchUsers } from '../../api/UserApi';

const getStatusBadge = (status) => {
  switch (status) {
    case 'Active':
      return 'bg-green-50 text-green-600 border-green-200';
    case 'Blocked':
      return 'bg-red-50 text-red-600 border-red-200';
    case 'Inactive':
      return 'bg-gray-50 text-gray-600 border-gray-200';
    default:
      return 'bg-gray-50 text-gray-600 border-gray-200';
  }
};

export default function OrgList({ orgs, onDelete }) {
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (deleting === id) return;

    try {
      setDeleting(id);
      const users = await fetchUsers();
      const relatedUsers = users.filter(u => u.organization_id === id);
      if (relatedUsers.length > 0) {
        alert("Cannot delete organization with associated users.");
        setDeleting(null);
        return;
      }
      await deleteOrganisation(id);

      // Immediately remove org from parent state
      if (onDelete) onDelete(id);

    } catch (err) {
      console.error('Delete error:', err);
      alert("Failed to delete organization. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  if (!orgs || orgs.length === 0) {
    return (
      <div className="px-6 py-6 text-center text-gray-500">
        No organizations found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Sr. No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Organizations</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Pending requests</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orgs.map((org, idx) => (
            <tr 
              key={org.id} 
              className={`hover:bg-gray-50 ${deleting === org.id ? 'opacity-50' : ''}`}
            >
              <td className="px-6 py-4">{idx + 1}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {org.logo_url ? (
                    <img 
                      src={org.logo_url}
                      alt={org.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-semibold">
                      {org.name?.charAt(0).toUpperCase() || "O"}
                    </div>
                  )}
                  <span className="text-sm">{org.name || "{ Organization name }"}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {org.pending_requests || "0 pending requests"}
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(org.status)}`}>
                  <span className={`w-2 h-2 rounded-full ${
                    org.status === 'Active' ? 'bg-green-500'
                      : org.status === 'Blocked' ? 'bg-red-500'
                      : 'bg-gray-400'
                  }`}></span>
                  {org.status || "Active"}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                    onClick={() => navigate(`/organizations/${org.id}`)}
                    disabled={deleting === org.id}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(org.id);
                    }}
                    disabled={deleting === org.id}
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
  );
}
