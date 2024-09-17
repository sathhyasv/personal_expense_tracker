import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Add your styles here

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { name, password, rememberMe });
    // Perform login logic here

    // Redirect to the Expense page upon successful login
    navigate('/expense');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <div className="forgot-password">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>

      <div className="register-prompt">
        <p>Don't have an account? <a href="/signup">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
