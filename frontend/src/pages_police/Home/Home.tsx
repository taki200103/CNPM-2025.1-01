import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import authService from '../../services/auth.service';
import type { User } from '../../types/auth.types';
import './Home.css';

const PoliceDashboard = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Bảng điều khiển an ninh</h3>
			<p>Tổng quan về tình hình an ninh, thống kê sự vụ, camera giám sát và các chỉ số cần chú ý sẽ được hiển thị tại đây.</p>
		</div>
	</div>
);

const IncidentManagement = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Quản lý sự vụ</h3>
			<p>Trang quản lý sự vụ đang được phát triển. Bạn sẽ sớm có thể theo dõi, cập nhật trạng thái và ghi chú các vụ việc.</p>
		</div>
	</div>
);

const ResidentVerification = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Kiểm tra cư trú</h3>
			<p>Khu vực này sẽ cung cấp danh sách cư dân, trạng thái cư trú và công cụ xác thực thông tin cư trú.</p>
		</div>
	</div>
);

const CameraMonitoring = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Giám sát camera</h3>
			<p>Truy cập luồng camera trực tiếp, lịch sử và các điểm cần chú ý sẽ được hiển thị tại đây.</p>
		</div>
	</div>
);

const EmergencyContacts = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Liên hệ khẩn cấp</h3>
			<p>Danh sách các đầu mối liên hệ khẩn cấp và quy trình xử lý tình huống khẩn cấp sẽ được lưu trữ ở trang này.</p>
		</div>
	</div>
);

const PoliceProfile = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Hồ sơ cán bộ</h3>
			<p>Cập nhật thông tin cá nhân, lịch trực và các quyền truy cập liên quan đến nhiệm vụ an ninh.</p>
		</div>
	</div>
);

const PoliceHome = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				if (authService.isAuthenticated()) {
					const storedUser = authService.getUser();
					if (storedUser) {
						setUser(storedUser);
					} else {
						const profile = await authService.getProfile();
						setUser(profile);
					}
				} else {
					navigate('/login');
				}
			} catch (error) {
				console.error('Lỗi kiểm tra xác thực an ninh:', error);
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

	const displayName = user?.fullName || user?.name || user?.email || 'Officer';
	const avatarChar = displayName.charAt(0).toUpperCase();

	if (loading) {
		return (
			<div className="loading-container">
				<div className="loading-spinner" />
				<p>Đang tải...</p>
			</div>
		);
	}

	return (
		<div className="homepage-container">
			<aside className="sidebar">
				<div className="sidebar-header">
					<div className="app-logo-container">
						<div className="app-icon">🛡️</div>
						<h2 className="app-title">An ninh tòa nhà</h2>
					</div>
				</div>

				<nav className="sidebar-menu">
					<button className="menu-item" onClick={() => navigate('/police/dashboard')}>
						<span className="menu-text">Dashboard</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/police/incidents')}>
						<span className="menu-text">Quản lý sự vụ</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/police/residents')}>
						<span className="menu-text">Kiểm tra cư trú</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/police/cameras')}>
						<span className="menu-text">Giám sát camera</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/police/emergency')}>
						<span className="menu-text">Liên hệ khẩn cấp</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/police/profile')}>
						<span className="menu-text">Hồ sơ cán bộ</span>
					</button>
				</nav>

				<div className="sidebar-footer">
					<div className="user-avatar-section">
						<div className="avatar clickable-avatar" onClick={() => navigate('/police/profile')} title="Trang cá nhân">
							{avatarChar}
						</div>
						<div className="user-info">
							<p className="user-name">{displayName}</p>
							<button className="logout-link" onClick={handleLogout}>
								Đăng xuất
							</button>
						</div>
					</div>
				</div>
			</aside>

			<main className="main-content">
				<Routes>
					<Route path="/police/dashboard" element={<PoliceDashboard />} />
					<Route path="/police/incidents" element={<IncidentManagement />} />
					<Route path="/police/residents" element={<ResidentVerification />} />
					<Route path="/police/cameras" element={<CameraMonitoring />} />
					<Route path="/police/emergency" element={<EmergencyContacts />} />
					<Route path="/police/profile" element={<PoliceProfile />} />
					<Route path="/police" element={<PoliceDashboard />} />
				</Routes>
			</main>
		</div>
	);
};

export default PoliceHome;

