import { useState } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { addUser } from '../../api/UserApi';

export default function AddUser({ onClose, onSuccess, orgId }) {
  const [form, setForm] = useState({
    organization_id: orgId,
    name: '',
    role: '', // empty to force select
  });

  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      if (!form.name || !form.role) {
        setError("Name and role are required.");
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
