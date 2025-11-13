// src/pages/Login.tsx
import { Link } from 'react-router-dom';
import { useLoginForm } from './Login_hook';
import './Login.css';

const Login = () => {
  const { formData, error, loading, handleChange, handleSubmit } = useLoginForm();

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đăng nhập</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="register-link">
          <p>Chưa có tài khoản? <Link to="/register" className="register-btn">Đăng ký</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;