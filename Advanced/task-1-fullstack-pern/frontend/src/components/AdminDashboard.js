import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard({ token }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!token) return;
    axios.get('http://localhost:3000/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));
  }, [token]);

  if (!token) return <p>Silakan login sebagai admin untuk melihat dashboard.</p>;
  if (!profile) return <p>Loading...</p>;
  if (profile.role !== 'admin') return <p>Akses ditolak: hanya admin yang bisa melihat halaman ini.</p>;

  return (
    <div className="posts-container">
      <h3>Admin Dashboard</h3>
      <div className="post-card">
        <p>Selamat datang, Admin <b>{profile.name}</b>!</p>
        <p>Di sini kamu bisa tambahkan fitur manajemen user atau postingan.</p>
      </div>
    </div>
  );
}
