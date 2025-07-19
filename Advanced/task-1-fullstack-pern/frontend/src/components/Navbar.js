import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ token, setToken }) {
  return (
    <nav>
      <Link to="/">Posts</Link>
      {token ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/admin">Admin</Link>
          <button onClick={() => setToken(null)}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
