import { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import authService from '../../services/auth.service';
import type { User } from '../../types/auth.types';
import './Home.css';

const AccountantDashboard = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Bảng điều khiển kế toán</h3>
			<p>Tổng quan về dòng tiền, công nợ, doanh thu dịch vụ và các chỉ số tài chính quan trọng sẽ hiển thị tại đây.</p>
		</div>
	</div>
);

const InvoiceManagement = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Quản lý hóa đơn</h3>
			<p>Trang quản lý hóa đơn đang được xây dựng. Bạn sẽ theo dõi, phát hành và đối soát hóa đơn tại đây.</p>
		</div>
	</div>
);

const FeeTracking = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Theo dõi phí dịch vụ</h3>
			<p>Khu vực này sẽ giúp bạn tổng hợp và quản lý các khoản phí dịch vụ của cư dân theo từng kỳ.</p>
		</div>
	</div>
);

const BudgetPlanning = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Lập kế hoạch ngân sách</h3>
			<p>Lập kế hoạch ngân sách vận hành, dự trù chi phí bảo trì và các khoản dự phòng sẽ sớm có trong phần này.</p>
		</div>
	</div>
);

const FinancialReports = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Báo cáo tài chính</h3>
			<p>Các báo cáo doanh thu - chi phí, bảng cân đối và lãi lỗ sẽ được trình bày một cách trực quan tại đây.</p>
		</div>
	</div>
);

const AccountantProfile = () => (
	<div className="content-wrapper">
		<div className="placeholder-card">
			<h3>Thông tin tài khoản</h3>
			<p>Cập nhật hồ sơ cá nhân, phân quyền nghiệp vụ và thiết lập các thông số kế toán của bạn tại đây.</p>
		</div>
	</div>
);

const AccountantHome = () => {
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
				console.error('Lỗi kiểm tra xác thực kế toán:', error);
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

	const displayName = user?.fullName || user?.name || user?.email || 'Accountant';
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
						<div className="app-icon">💼</div>
						<h2 className="app-title">Quản lý tài chính</h2>
					</div>
				</div>

				<nav className="sidebar-menu">
					<button className="menu-item" onClick={() => navigate('/accountant/dashboard')}>
						<span className="menu-text">Dashboard</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/accountant/invoices')}>
						<span className="menu-text">Quản lý hóa đơn</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/accountant/fees')}>
						<span className="menu-text">Theo dõi phí dịch vụ</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/accountant/budget')}>
						<span className="menu-text">Lập kế hoạch ngân sách</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/accountant/reports')}>
						<span className="menu-text">Báo cáo tài chính</span>
					</button>
					<button className="menu-item" onClick={() => navigate('/accountant/profile')}>
						<span className="menu-text">Thông tin tài khoản</span>
					</button>
				</nav>

				<div className="sidebar-footer">
					<div className="user-avatar-section">
						<div className="avatar clickable-avatar" onClick={() => navigate('/accountant/profile')} title="Trang cá nhân">
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
					<Route path="/accountant/dashboard" element={<AccountantDashboard />} />
					<Route path="/accountant/invoices" element={<InvoiceManagement />} />
					<Route path="/accountant/fees" element={<FeeTracking />} />
					<Route path="/accountant/budget" element={<BudgetPlanning />} />
					<Route path="/accountant/reports" element={<FinancialReports />} />
					<Route path="/accountant/profile" element={<AccountantProfile />} />
					<Route path="/accountant" element={<AccountantDashboard />} />
				</Routes>
			</main>
		</div>
	);
};

export default AccountantHome;

