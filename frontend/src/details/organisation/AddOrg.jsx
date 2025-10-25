
import { useState } from 'react';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { addOrganisation } from '../../api/OrgApi';

export default function AddOrg({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    primary_admin_email: '',
    contact_phone: ''
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Only send first-page fields
    const payload = {
      name: form.name,
      slug: form.slug,
      primary_admin_email: form.primary_admin_email,
      contact_phone: form.contact_phone
    };

    try {
      await addOrganisation(payload);
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to create organization' });
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Add Organization</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto flex flex-col gap-6">
          {/* Organization Name */}
          <Field label="Organization Name" name="name" value={form.name} onChange={handleChange} required />

          {/* Slug */}
          <Field label="Slug" name="slug" value={form.slug} onChange={handleChange} required />

          {/* Primary Admin Email */}
          <Field label="Primary Admin Email" name="primary_admin_email" value={form.primary_admin_email} onChange={handleChange} required />

          {/* Contact Phone */}
          <Field label="Contact Phone" name="contact_phone" value={form.contact_phone} onChange={handleChange} required />

          <div className="flex justify-end gap-2 mt-8">
            <Button type="button" className="bg-gray-100 text-black" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-purple-600 text-white">Add</Button>
          </div>

          {errors.submit && <span className="text-red-500">{errors.submit}</span>}
        </form>
      </div>
    </Modal>
  );
}

function Field({ label, name, value, onChange, required }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      />
    </div>
  );
}
