import { useEffect, useState } from 'react';
import { fetchOrganisations } from '../../api/OrgApi';
import Button from '../../components/Button';

export default function OrgList() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganisations()
      .then(data => setOrgs(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading organizations...</div>;

  return (
    <div>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {orgs.map((org, idx) => (
            <tr key={org.id}>
              <td className="border p-2">{idx + 1}</td>
              <td className="border p-2">{org.name}</td>
              <td className="border p-2">{org.primary_admin_email}</td>
              <td className="border p-2">{org.contact_phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
