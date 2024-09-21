// src/Signup.js
import React, { useState } from 'react';
import { auth, googleProvider } from './firebase';
import './Login.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      // Optionally, set display name
      await auth.currentUser.updateProfile({ displayName: name });
      // Redirect or additional actions
    } catch (error) {
      console.error('Error signing up with email and password:', error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
      // Additional actions if needed
    } catch (error) {
      console.error('Error signing up with Google:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleEmailSignup} className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
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
        <button type="submit" className="signup-button">Signup</button>
      </form>

      <div className="google-signup">
        <button onClick={handleGoogleSignUp} className="google-button">
          Sign up with Google
        </button>
      </div>
      
      <div className="register-prompt">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
