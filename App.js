// File: src/App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

// Components
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import SplicingTool from './components/SplicingTool';

function App() {
  const [user, setUser] = useState(null);
  
  
  const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json()); // To parse JSON request bodies

mongoose.connect('mongodb://localhost:27017/spliceDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Use the auth routes
app.use('/api', authRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));


  // Check if user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/check-auth');
        if (response.data.user) setUser(response.data.user);
      } catch (error) {
        console.log('User not authenticated');
      }
    };
    fetchUser();
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout failed');
    }
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Fiber Optic Splicing Tool</h1>
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Navigate to="/login" replace />
          )}
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/register"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <RegisterForm onRegister={handleLogin} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/splicing-tool"
            element={
              user ? (
                <SplicingTool />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
