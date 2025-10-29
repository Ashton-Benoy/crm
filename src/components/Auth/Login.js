import React, { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login({ setToken }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      setToken(res.data.token);
      navigate('/customers');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <input name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} required />
      <button type="submit">Login</button>
    </form>
  );
}
