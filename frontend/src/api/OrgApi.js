import { API_BASE } from './config';

export async function fetchOrganizations() {
  const res = await fetch(`${API_BASE}/api/organizations`);
  if (!res.ok) throw new Error('Error fetching organizations');
  return res.json();
}

export async function addOrganization(data) {
  const res = await fetch(`${API_BASE}/api/organizations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error adding organization');
  return res.json();
}
