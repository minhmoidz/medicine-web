import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Kiểm tra trường hợp để trống hoặc sai mật khẩu
    if (!username || !password) {
      toast.error('Tên người dùng và mật khẩu không được để trống!');
      return;
    }

    setLoading(true); // Bắt đầu quá trình đăng nhập

    // Giả lập thời gian tải 3 giây
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        toast.success('Đăng nhập thành công!');
        navigate('/'); // Redirect to the dashboard
      } else {
        toast.error('Tên người dùng hoặc mật khẩu không đúng');
      }
      setLoading(false); // Sau khi đăng nhập xong, ẩn màn hình loading
    }, 3000); // Giả lập thời gian tải trong 3 giây
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-message">Đang tải, xin đợi một chút...</div>
        </div>
      )}

      <div className="login-container">
  <div className="login-image">
    {/* Có thể thêm ảnh hoặc để trống nếu không cần */}
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

      <ToastContainer /> {/* Đặt ToastContainer ở đây để hiện thông báo toast */}
    </>
  );
};

export default Login;






