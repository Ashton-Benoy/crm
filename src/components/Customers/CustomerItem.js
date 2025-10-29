import React from 'react';
import API from '../../services/api';

export default function CustomerItem({ customer, refresh }) {
  const onDelete = async () => {
    if (!window.confirm('Delete this customer?')) return;
    try {
      await API.delete(`/customers/${customer._id}`);
      refresh();
    } catch (err) {
      alert('Error deleting');
    }
  };

  return (
    <li>
      <strong>{customer.name}</strong> — {customer.email} — {customer.phone}
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}
