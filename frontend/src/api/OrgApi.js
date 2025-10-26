import { API_BASE } from './config';

export async function fetchOrganisations() {
  const res = await fetch(`${API_BASE}/api/organisations`);
  if (!res.ok) throw new Error('Error fetching organisations');
  return res.json();
}

export async function addOrganisation(data) {
  const res = await fetch(`${API_BASE}/api/organisations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error adding organisation');
  return res.json();
}

export async function fetchOrganisationById(id) {
  const res = await fetch(`${API_BASE}/api/organisations/${id}`);
  if (!res.ok) throw new Error('Error fetching organisation');
  return res.json();
}

export async function updateOrganisation(id, data) {
  const res = await fetch(`${API_BASE}/api/organisations/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error updating organisation');
  return res.json();
}
export const deleteOrganisation = async (id) => {
    const response = await fetch(`${API_BASE}/api/organisations/${id}`, {
        method: 'DELETE'
    });
    
    if (!response.ok) {
        throw new Error('Failed to delete organisation');
    }
    if (response.status === 204) {
        return { success: true };
    }
    return response.json();
};
