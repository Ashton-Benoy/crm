import React, { useState } from 'react';
import API from '../../services/api';

export default function CustomerForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', notes: '' });

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/customers', form);
      onAdd(res.data);
      setForm({ name: '', email: '', phone: '', company: '', notes: '' });
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} />
      <input name="company" placeholder="Company" value={form.company} onChange={onChange} />
      <input name="notes" placeholder="Notes" value={form.notes} onChange={onChange} />
      <button type="submit">Add</button>
    </form>
  );
}
