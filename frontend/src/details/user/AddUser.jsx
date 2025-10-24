import { useState } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { addUser } from '../../api/UserApi';

export default function AddUser({ onClose, onSuccess, orgId }) {
  const [form, setForm] = useState({
    organization_id: orgId,
    name: '',
    email: '',
    role: 'Admin',
    status: 'Active',
    password_hash: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addUser(form);
    onSuccess && onSuccess();
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" placeholder="Name of the user" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="User Mail ID" value={form.email} onChange={handleChange} required />

        <select name="role" value={form.role} onChange={handleChange}>
          <option>Admin</option>
          <option>Coordinator</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
          <option>Active</option>
          <option>Inactive</option>
          <option>Blocked</option>
        </select>

        <input name="password_hash" type="password" placeholder="Password" value={form.password_hash} onChange={handleChange} required />

        <Button type="submit">Add User</Button>
      </form>
    </Modal>
  );
}
