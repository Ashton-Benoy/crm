import React, { useEffect, useState } from 'react';
import API, { setAuthToken } from '../../services/api';
import CustomerForm from './CustomerForm';
import CustomerItem from './CustomerItem';
import { useNavigate } from 'react-router-dom';

export default function CustomersList({ token, setToken }) {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken(token);
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await API.get('/customers');
      setCustomers(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setToken(null);
        navigate('/login');
      }
    }
  };

  const addCustomer = customer => setCustomers(prev => [customer, ...prev]);

  return (
    <div>
      <h2>Customers</h2>
      <button onClick={() => { setToken(null); navigate('/login'); }}>Logout</button>
      <CustomerForm onAdd={addCustomer} />
      <ul>
        {customers.map(c => <CustomerItem key={c._id} customer={c} refresh={fetchCustomers} />)}
      </ul>
    </div>
  );
}
