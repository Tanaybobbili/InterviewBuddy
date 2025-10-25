import { useState } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { updateUser } from '../../api/UserApi';

export default function EditUser({ user, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: user.name || '',
    role: user.role || '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!form.name || !form.role) {
        setError('Name and role are required.');
        setLoading(false);
        return;
      }
      await updateUser(user.id, form);
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update user.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 p-8">
        <div className="text-xl font-semibold mb-2">Edit User</div>

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
          <Button type="submit" className="bg-purple-600 text-white" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
