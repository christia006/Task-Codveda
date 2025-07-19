import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', { name, email, password });
      alert('Register success!');
    } catch {
      alert('Register failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register</h3>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
}
