
import { useState } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { addUser } from '../../api/UserApi';

export default function AddUser({ onClose, onSuccess, orgId }) {
  const [form, setForm] = useState({
    organization_id: orgId,
    name: '',
    email: '',
    role: '', // empty to force select
    status: 'Active',
    password_hash: ''
  });

  // Optional: handle errors for better UX
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      // Require fields validation
      if (!form.name || !form.email || !form.role || !form.password_hash) {
        setError("All fields are required.");
        return;
      }
      await addUser(form);
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to add user.');
    }
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 p-8">
        <div className="text-xl font-semibold mb-2">Add User</div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Name of the user</label>
          <input
            name="name"
            placeholder="Type here"
            value={form.name}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Choose user role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          >
            <option value="">Select an option</option>
            <option value="Admin">Admin</option>
            <option value="Coordinator">Co-ordinator</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">User Mail ID</label>
          <input
            name="email"
            placeholder="Type here"
            value={form.email}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Password</label>
          <input
            name="password_hash"
            type="password"
            placeholder="Password"
            value={form.password_hash}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" className="bg-gray-100 text-black" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-purple-600 text-white">
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
}
