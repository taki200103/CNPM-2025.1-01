import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import authService from '../../services/auth.service';
import type { User } from '../../types/auth.types';
import './Home.css';

const AdminDashboard = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Tổng quan quản trị</h3>
			<p>Chào mừng đến bảng điều khiển của ban quản trị. Bạn có thể theo dõi số lượng cư dân, tỷ lệ cư trú, phản ánh và các chỉ số vận hành khác của tòa nhà tại đây.</p>
		</div>
	</div>
);

const ManageResidents = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Quản lý cư dân</h3>
			<p>Trang quản lý cư dân đang được xây dựng. Bạn sẽ có thể thêm, chỉnh sửa và theo dõi hồ sơ cư dân tại đây.</p>
		</div>
	</div>
);

const ManageHouseholds = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Quản lý hộ gia đình</h3>
			<p>Trang quản lý hộ gia đình đang được phát triển. Các thông tin hợp đồng, căn hộ và chủ hộ sẽ xuất hiện tại khu vực này.</p>
		</div>
	</div>
);

const ManageNotifications = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Quản lý thông báo</h3>
			<p>Bạn sẽ sớm có thể tạo, gửi và theo dõi thông báo dành cho cư dân trong khu vực này.</p>
		</div>
	</div>
);

const ManageComplaints = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Quản lý phản ánh</h3>
			<p>Khu vực này sẽ giúp bạn tiếp nhận, phân loại và xử lý các phản ánh từ cư dân một cách hiệu quả.</p>
		</div>
	</div>
);

const StatisticPage = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Báo cáo & thống kê</h3>
			<p>Các biểu đồ và báo cáo hoạt động của tòa nhà sẽ được hiển thị tại đây để hỗ trợ ra quyết định.</p>
		</div>
	</div>
);

const AdminProfile = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Thông tin tài khoản</h3>
			<p>Trang hồ sơ dành cho ban quản trị. Tại đây bạn sẽ có thể cập nhật thông tin cá nhân và cấu hình bảo mật.</p>
		</div>
	</div>
);

const AdminHome = () => {
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
				console.error('Lỗi kiểm tra xác thực quản trị:', error);
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

	const displayName = user?.fullName || user?.name || user?.email || 'Admin';
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
						<div className="app-icon">🏢</div>
						<h2 className="app-title">Quản trị chung cư</h2>
					</div>
				</div>

				<nav className="sidebar-menu">
					<button className="menu-item" onClick={() => navigate('/admin/dashboard')}>
						<span className="menu-text">Dashboard</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/admin/residents')}>
						<span className="menu-text">Quản lý cư dân</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/admin/households')}>
						<span className="menu-text">Quản lý hộ</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/admin/notifications')}>
						<span className="menu-text">Thông báo</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/admin/complaints')}>
						<span className="menu-text">Phản ánh</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/admin/statistic')}>
						<span className="menu-text">Thống kê</span>
					</button>
				</nav>

				<div className="sidebar-footer">
					<div className="user-avatar-section">
						<div className="avatar clickable-avatar" onClick={() => navigate('/admin/profile')} title="Trang cá nhân">
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
					<Route path="/admin/dashboard" element={<AdminDashboard />} />
					<Route path="/admin/residents" element={<ManageResidents />} />
					<Route path="/admin/households" element={<ManageHouseholds />} />
					<Route path="/admin/notifications" element={<ManageNotifications />} />
					<Route path="/admin/complaints" element={<ManageComplaints />} />
					<Route path="/admin/statistic" element={<StatisticPage />} />
					<Route path="/admin/profile" element={<AdminProfile />} />
					<Route path="/admin" element={<AdminDashboard />} />
				</Routes>
			</main>
		</div>
	);
};

export default AdminHome;

