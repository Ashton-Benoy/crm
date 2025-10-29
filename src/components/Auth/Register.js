import React, { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register({ setToken }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      setToken(res.data.token);
      navigate('/customers');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <input name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} required minLength={6} />
      <button type="submit">Register</button>
    </form>
  );
}
