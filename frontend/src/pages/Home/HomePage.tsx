// src/pages/Home/HomePage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import authService from '../../services/auth.service';
import type { User } from '../../types/auth.types';
import DashboardPage from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import './HomePage.css';
import Service from '../Service/Service';
import Invoice from '../Invoice/Invoice';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = authService.getUser();
          if (userData) {
            setUser(userData);
          } else {
            const profileData = await authService.getProfile();
            setUser(profileData);
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra xác thực:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="homepage-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="app-logo-container">
            <div className="app-icon">🏠</div>
            <h2 className="app-title">Quản lý chung cư</h2>
          </div>
        </div>

        <nav className="sidebar-menu">
          <button
            className="menu-item"
            onClick={() => navigate('/dashboard')}
          >
            <span className="menu-text">Dashboard</span>
          </button>

          <button
            className="menu-item"
            onClick={() => navigate('/family')}
          >
            <span className="menu-text">Quản lí gia đình</span>
          </button>

          <button
            className="menu-item"
            onClick={() => navigate('/expense')}
          >
            <span className="menu-text">Quản lí chi phí</span>
          </button>

          <button
            className="menu-item"
            onClick={() => navigate('/service')}
          >
            <span className="menu-text">Quản lí dịch vụ</span>
          </button>
          <button
            className="menu-item"
            onClick={() => navigate('/notification')}
          >
            <span className="menu-text">Quản lí Thông Báo</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-avatar-section">
            <div
              className="avatar clickable-avatar"
              onClick={() => navigate('/profile')}
              title="Trang cá nhân"
            >
              {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <p className="user-name">{user?.name || user?.email || 'User'}</p>
              <button className="logout-link" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content - Render children routes */}
      <main className="main-content">
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/family" element={<div>Family Page</div>} />
          <Route path="/expense" element={<Invoice />} />
          <Route path="/service" element={<Service/>} />
          <Route path="/notification" element={<div>Notification Page</div>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default HomePage;