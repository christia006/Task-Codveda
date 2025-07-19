import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfilePage({ token }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!token) return;
    axios.get('http://localhost:3000/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));
  }, [token]);

  if (!token) return <p>Silakan login untuk melihat profile.</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="posts-container">
      <h3>Profile</h3>
      <div className="post-card">
        <p><b>Name:</b> {profile.name}</p>
        <p><b>Email:</b> {profile.email}</p>
        <p><b>Role:</b> {profile.role}</p>
      </div>
    </div>
  );
}
