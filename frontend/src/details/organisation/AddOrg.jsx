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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addOrganisation(form);
    onSuccess && onSuccess();
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" placeholder="Organization name" value={form.name} onChange={handleChange} required />
        <input name="slug" placeholder="Organization SLUG" value={form.slug} onChange={handleChange} required />

        <input name="primary_admin_name" placeholder="Primary Admin name" value={form.primary_admin_name} onChange={handleChange} required />
        <input name="primary_admin_email" placeholder="Primary Admin Mail-id" value={form.primary_admin_email} onChange={handleChange} required />

        <input name="support_email" placeholder="Support Email ID" value={form.support_email} onChange={handleChange} />
        <input name="contact_phone" placeholder="Phone no" value={form.contact_phone} onChange={handleChange} />
        <input name="alternate_phone" placeholder="Alternative phone no" value={form.alternate_phone} onChange={handleChange} />

        <input name="website_url" placeholder="Official website URL" value={form.website_url} onChange={handleChange} />

        {/* Coordinators, Timezone, Language, Status */}
        <select name="max_coordinators" value={form.max_coordinators} onChange={handleChange}>
          <option value={5}>Upto 5 Coordinators</option>
          <option value={10}>Upto 10 Coordinators</option>
        </select>

        <input name="timezone_name" placeholder="Common name (Timezone)" value={form.timezone_name} onChange={handleChange} />
        <input name="timezone_region" placeholder="Region (Timezone)" value={form.timezone_region} onChange={handleChange} />

        <select name="language" value={form.language} onChange={handleChange}>
          <option>English</option>
          {/* Add other languages here */}
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
          <option>Active</option>
          <option>Inactive</option>
          <option>Blocked</option>
        </select>

        <Button type="submit">Add Organization</Button>
      </form>
    </Modal>
  );
}
