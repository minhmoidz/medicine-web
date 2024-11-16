import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation example
    if (username === '1' && password === '1') {
      navigate('/'); // Redirect to the dashboard
    } else {
      setError('Tên người dùng hoặc mật khẩu không đúng');
    }
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src="public/ptit.jpg" alt="Login Illustration" />
      </div>
      <div className="login-form">
        <div className="form-box">
          <h2>Đăng nhập</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Tên người dùng</label>
            <input
              type="text"
              id="username"
              placeholder="Nhập tên người dùng"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Đăng nhập</button>
          </form>
          <div className="login-options">
            <a href="/forgot-password">Quên mật khẩu?</a>
            <span> | </span>
            <a href="/register">Đăng ký</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
