// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from './firebase';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function to link Firebase UID with MongoDB user
  const linkUserToMongoDB = async (firebaseUid) => {
    try {
      // Send UID to the backend API
      await fetch('/api/users/link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firebaseUid }), // Sending UID to backend
      });
    } catch (error) {
      console.error('Error linking user to MongoDB:', error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      
      // Capture Firebase UID
      const firebaseUid = userCredential.user.uid;

      // Link Firebase UID with MongoDB user
      await linkUserToMongoDB(firebaseUid);

      // Navigate to expense page
      navigate('/expense');
    } catch (error) {
      console.error('Error logging in with email and password:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      
      // Capture Firebase UID
      const firebaseUid = result.user.uid;

      // Link Firebase UID with MongoDB user
      await linkUserToMongoDB(firebaseUid);

      // Navigate to expense page
      navigate('/expense');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleEmailLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>

      <div className="google-signin">
        <button onClick={handleGoogleSignIn} className="google-button">
          Sign in with Google
        </button>
      </div>

      <div className="register-prompt">
        <p>Don't have an account? <a href="/signup">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
