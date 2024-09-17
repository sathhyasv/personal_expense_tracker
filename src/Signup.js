import React, { useState } from 'react';
import './Login.css'; // Same CSS file as the login page

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', { name, email, password, terms });
    // Perform signup logic here
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="login-form">
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

        <div className="form-options">
          <div className="remember-me">
            <input
              type="checkbox"
              id="terms"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <label htmlFor="terms">I agree to terms and conditions</label>
          </div>
        </div>

        <button type="submit" className="login-button">Signup</button>
      </form>

      <div className="register-prompt">
      <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
