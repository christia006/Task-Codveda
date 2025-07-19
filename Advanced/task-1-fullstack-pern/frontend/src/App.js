import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PostList from './components/PostList';
import Navbar from './components/Navbar';
import ProfilePage from './components/ProfilePage';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<ProfilePage token={token} />} />
        <Route path="/admin" element={<AdminDashboard token={token} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
