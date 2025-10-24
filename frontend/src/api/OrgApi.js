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
