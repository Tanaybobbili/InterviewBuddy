import { API_BASE } from './config';

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/api/users`);
  if (!res.ok) throw new Error('Error fetching users');
  return res.json();
}

export async function addUser(data) {
  const res = await fetch(`${API_BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error adding user');
  return res.json();
}

export async function fetchUserById(id) {
  const res = await fetch(`${API_BASE}/api/users/${id}`);
  if (!res.ok) throw new Error('Error fetching user');
  return res.json();
}   

export async function updateUser(id, data) {
  const res = await fetch(`${API_BASE}/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error updating user');
  return res.json();
}   

export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/api/users/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error deleting user');
  return res.json();
}  