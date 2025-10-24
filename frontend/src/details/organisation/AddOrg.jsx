
import { useState } from 'react';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { addOrganisation } from '../../api/OrgApi';

export default function AddOrg({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    primary_admin_name: '',
    primary_admin_email: '',
    support_email: '',
    contact_phone: '',
    alternate_phone: '',
    website_url: '',
    max_coordinators: 5,
    timezone_name: '',
    timezone_region: '',
    language: 'English',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addOrganisation(form);
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setErrors({ submit: err.message });
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="h-full flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Add Organization</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
          
          {/* Organization Name */}
          <div>
            <label className="block text-base font-medium mb-1">Name of the organization</label>
            <input
              name="name"
              placeholder="Type here"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
              required
            />
            <span className="block mt-1 text-xs text-gray-400">Hint: Enter the official name</span>
            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-base font-medium mb-1">Slug</label>
            <input
              name="slug"
              placeholder="Type here"
              value={form.slug}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
              required
            />
            <span className="block mt-1 text-xs text-gray-400">Hint: Unique identifier for the org</span>
            {errors.slug && <span className="text-red-500 text-xs">{errors.slug}</span>}
          </div>

          {/* Organization Email */}
          <div>
            <label className="block text-base font-medium mb-1">Organization mail</label>
            <input
              name="primary_admin_email"
              placeholder="Type here"
              value={form.primary_admin_email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
              required
            />
            <span className="block mt-1 text-xs text-gray-400">Hint: Admin email for contact</span>
            {errors.primary_admin_email && <span className="text-red-500 text-xs">{errors.primary_admin_email}</span>}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-base font-medium mb-1">Contact</label>
            <input
              name="contact_phone"
              placeholder="Type here"
              value={form.contact_phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
            />
            <span className="block mt-1 text-xs text-gray-400">Hint: Main contact number</span>
            {errors.contact_phone && <span className="text-red-500 text-xs">{errors.contact_phone}</span>}
          </div>

          {/* Repeat the above div structure for other fields (admin name, support email, alternate phone, website, timezone, etc) */}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-8">
            <Button type="button" className="bg-gray-100 text-black" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 text-white">
              Add
            </Button>
          </div>

          {/* Form submit error */}
          {errors.submit && <span className="text-red-500">{errors.submit}</span>}
        </form>
      </div>
    </Modal>
  );
}
