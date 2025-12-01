import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../DashboardLayout';
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  DollarSign, 
  BarChart3, 
  Wrench,
  Home,
  TrendingUp,
  Calendar,
  AlertCircle,
  X,
  Loader2,
  Mail,
  Phone,
  CreditCard
} from 'lucide-react';
import { ResidentsService } from '../../../api/services/ResidentsService';
import { ApartmentsService } from '../../../api/services/ApartmentsService';
import type { CreateResidentDto } from '../../../api/models/CreateResidentDto';
import { ApiError } from '../../../api';

type View = 'overview' | 'residents' | 'notifications' | 'fees' | 'statistics' | 'services';

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState<View>('overview');

  const menuItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Tổng quan',
      onClick: () => setCurrentView('overview'),
      active: currentView === 'overview',
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Quản lý cư dân',
      onClick: () => setCurrentView('residents'),
      active: currentView === 'residents',
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: 'Quản lý thông báo',
      onClick: () => setCurrentView('notifications'),
      active: currentView === 'notifications',
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      label: 'Quản lý thu phí',
      onClick: () => setCurrentView('fees'),
      active: currentView === 'fees',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Thống kê',
      onClick: () => setCurrentView('statistics'),
      active: currentView === 'statistics',
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      label: 'Quản lý dịch vụ',
      onClick: () => setCurrentView('services'),
      active: currentView === 'services',
    },
  ];

  return (
    <DashboardLayout title="Dashboard Quản Trị" menuItems={menuItems}>
      {currentView === 'overview' && <OverviewView />}
      {currentView === 'residents' && <ResidentsView />}
      {currentView === 'notifications' && <NotificationsView />}
      {currentView === 'fees' && <FeesView />}
      {currentView === 'statistics' && <StatisticsView />}
      {currentView === 'services' && <ServicesView />}
    </DashboardLayout>
  );
}

function OverviewView() {
  const stats = [
    { label: 'Tổng căn hộ', value: '245', icon: Home, color: 'bg-blue-500', change: '+5%' },
    { label: 'Cư dân', value: '678', icon: Users, color: 'bg-green-500', change: '+12%' },
    { label: 'Doanh thu tháng', value: '2.4 tỷ', icon: DollarSign, color: 'bg-purple-500', change: '+8%' },
    { label: 'Tỷ lệ thanh toán', value: '87%', icon: TrendingUp, color: 'bg-orange-500', change: '+3%' },
  ];

  const recentActivities = [
    { time: '10 phút trước', text: 'Cư dân mới đăng ký - Căn A301', type: 'info' },
    { time: '30 phút trước', text: 'Thanh toán phí quản lý - Căn B205', type: 'success' },
    { time: '1 giờ trước', text: 'Yêu cầu sửa chữa từ Căn C102', type: 'warning' },
    { time: '2 giờ trước', text: 'Thông báo bảo trì thang máy đã gửi', type: 'info' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-gray-900 text-2xl mt-2">{stat.value}</p>
                <p className="text-green-600 text-sm mt-1">{stat.change} so với tháng trước</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">{activity.text}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Công việc cần xử lý</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div className="flex-1">
                <p className="text-gray-900 text-sm">5 yêu cầu sửa chữa chưa xử lý</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div className="flex-1">
                <p className="text-gray-900 text-sm">12 căn hộ chưa thanh toán phí</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-gray-900 text-sm">3 hợp đồng sắp hết hạn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const residentRoles = [
  { value: 'resident', label: 'Cư dân' },
  { value: 'admin', label: 'Quản trị viên' },
  { value: 'police', label: 'Bảo vệ' },
  { value: 'accountant', label: 'Kế toán' },
];

type ResidentRecord = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: string;
  temporaryStatus: boolean;
  apartment?: { name?: string };
};

function ResidentsView() {
  const [residents, setResidents] = useState<ResidentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apartments, setApartments] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'resident',
    apartmentId: '',
    idNumber: '',
    birthDate: '',
    temporaryStatus: false,
  });

  const fetchResidents = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await ResidentsService.residentControllerFindAll();
      const list = Array.isArray(data) ? data : data?.data || [];
      setResidents(list);
    } catch (err) {
      console.error('Failed to fetch residents', err);
      setError('Không thể tải danh sách cư dân. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchApartments = useCallback(async () => {
    try {
      const data = await ApartmentsService.apartmentControllerFindAll();
      const list = Array.isArray(data) ? data : data?.data || [];
      setApartments(list);
    } catch (err) {
      console.error('Failed to fetch apartments', err);
    }
  }, []);

  useEffect(() => {
    fetchResidents();
  }, [fetchResidents]);

  useEffect(() => {
    if (isModalOpen && apartments.length === 0) {
      fetchApartments();
    }
  }, [isModalOpen, apartments.length, fetchApartments]);

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'resident',
      apartmentId: '',
      idNumber: '',
      birthDate: '',
      temporaryStatus: false,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!formData.fullName || !formData.email || !formData.phone) {
      setError('Vui lòng nhập đầy đủ thông tin bắt buộc.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (formData.role === 'resident' && !formData.apartmentId) {
      setError('Cư dân bắt buộc phải thuộc một căn hộ.');
      return;
    }
    if (!formData.idNumber) {
      setError('Vui lòng nhập số CMND/CCCD.');
      return;
    }
    if (!formData.birthDate) {
      setError('Vui lòng chọn ngày sinh.');
      return;
    }

    const payload: CreateResidentDto = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
      idNumber: formData.idNumber,
      birthDate: formData.birthDate,
      temporaryStatus: formData.temporaryStatus,
    };

    if (formData.role === 'resident') {
      payload.apartmentId = formData.apartmentId;
    }

    setIsSubmitting(true);
    try {
      const newResident = await ResidentsService.residentControllerCreate(
        payload,
      );
      setResidents((prev) => [newResident, ...prev]);
      setSuccessMessage('Đã tạo cư dân mới thành công.');
      resetForm();
      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Create resident failed', err);
      if (err instanceof ApiError) {
        setError(err.body?.message || 'Không thể tạo cư dân. Vui lòng thử lại.');
      } else {
        setError('Không thể tạo cư dân. Vui lòng thử lại.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-gray-900">Danh sách cư dân</h2>
          <p className="text-gray-600 mt-1">Quản lý thông tin cư dân trong chung cư</p>
        </div>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm cư dân mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-6 flex items-center justify-center text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Đang tải dữ liệu...
          </div>
        ) : error ? (
          <div className="p-6 text-red-600">{error}</div>
        ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Họ tên</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Căn hộ</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Vai trò</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {residents.map((resident) => (
                <tr key={resident.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{resident.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {resident.apartment?.name || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{resident.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{resident.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize text-sm text-gray-600">
                      {resident.role}
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          resident.temporaryStatus
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {resident.temporaryStatus ? 'Tạm vắng' : 'Hoạt động'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative">
            <button
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-gray-900 mb-1 text-lg font-semibold leading-tight list-none">
              Thêm cư dân mới
            </h3>
            <p className="text-gray-500 mb-4 text-sm leading-relaxed">
              Điền thông tin cư dân. Vai trò khác cư dân có thể bỏ trống căn hộ.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {error && <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">{error}</div>}
              {successMessage && (
                <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm">{successMessage}</div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Họ và tên</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Số điện thoại</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0901234567"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Số CMND/CCCD</label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.idNumber}
                      onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                      placeholder="001234567890"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Mật khẩu</label>
                  <input
                    type="password"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Vai trò</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 capitalize"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    {residentRoles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Ngày sinh</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {formData.role === 'resident' && (
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Căn hộ</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.apartmentId}
                    onChange={(e) => setFormData({ ...formData, apartmentId: e.target.value })}
                  >
                    <option value="">-- Chọn căn hộ --</option>
                    {apartments.map((apt) => (
                      <option key={apt.id || apt.ID_Apartment || apt.ID_apartment} value={apt.id || apt.ID_Apartment || apt.ID_apartment}>
                        {apt.name || apt.Name || `Căn hộ ${apt.id}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={formData.temporaryStatus}
                  onChange={(e) => setFormData({ ...formData, temporaryStatus: e.target.checked })}
                />
                Tạm vắng
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Tạo cư dân
                </button>
              </div>
            </form>
      </div>
        </div>
      )}
    </div>
  );
}

function NotificationsView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-gray-900">Quản lý thông báo</h2>
          <p className="text-gray-600 mt-1">Gửi thông báo đến cư dân</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          Tạo thông báo mới
        </button>
      </div>

      <div className="grid gap-4">
        {[
          { title: 'Bảo trì thang máy', date: '25/11/2025', status: 'Đã gửi', recipients: 245 },
          { title: 'Thông báo cúp nước', date: '24/11/2025', status: 'Đã gửi', recipients: 245 },
          { title: 'Họp cư dân quý IV', date: '23/11/2025', status: 'Nháp', recipients: 0 },
        ].map((notification, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-gray-900">{notification.title}</h3>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <span>📅 {notification.date}</span>
                  <span>👥 {notification.recipients} người nhận</span>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full ${
                notification.status === 'Đã gửi' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {notification.status}
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="text-sm text-indigo-600 hover:text-indigo-700">Xem chi tiết</button>
              <button className="text-sm text-blue-600 hover:text-blue-700">Chỉnh sửa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeesView() {
  const fees = [
    { apartment: 'A101', month: 'Tháng 11', amount: 2500000, status: 'Đã thanh toán', date: '05/11/2025' },
    { apartment: 'A102', month: 'Tháng 11', amount: 2500000, status: 'Chưa thanh toán', date: '-' },
    { apartment: 'B201', month: 'Tháng 11', amount: 3200000, status: 'Đã thanh toán', date: '10/11/2025' },
    { apartment: 'B202', month: 'Tháng 11', amount: 3200000, status: 'Quá hạn', date: '-' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-gray-900">Quản lý thu phí</h2>
          <p className="text-gray-600 mt-1">Theo dõi thanh toán phí quản lý</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          Tạo phiếu thu
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Tổng phải thu</p>
          <p className="text-gray-900 text-2xl mt-2">124.5 triệu</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Đã thu</p>
          <p className="text-green-600 text-2xl mt-2">108.2 triệu</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Còn nợ</p>
          <p className="text-red-600 text-2xl mt-2">16.3 triệu</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Căn hộ</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Kỳ</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Số tiền</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Ngày TT</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fees.map((fee, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{fee.apartment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{fee.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fee.amount.toLocaleString('vi-VN')} đ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{fee.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      fee.status === 'Đã thanh toán' 
                        ? 'bg-green-100 text-green-800' 
                        : fee.status === 'Quá hạn'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {fee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-indigo-600 hover:text-indigo-900">Chi tiết</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatisticsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Thống kê báo cáo</h2>
        <p className="text-gray-600 mt-1">Tổng quan về hoạt động chung cư</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <p className="text-blue-100 text-sm">Tổng số căn hộ</p>
          <p className="text-3xl mt-2">245</p>
          <p className="text-blue-100 text-sm mt-2">100% công suất</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <p className="text-green-100 text-sm">Tỷ lệ thanh toán</p>
          <p className="text-3xl mt-2">87%</p>
          <p className="text-green-100 text-sm mt-2">Tháng 11/2025</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <p className="text-purple-100 text-sm">Doanh thu tháng</p>
          <p className="text-3xl mt-2">2.4 tỷ</p>
          <p className="text-purple-100 text-sm mt-2">+8% so tháng trước</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
          <p className="text-orange-100 text-sm">Yêu cầu dịch vụ</p>
          <p className="text-3xl mt-2">23</p>
          <p className="text-orange-100 text-sm mt-2">Tháng này</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Thống kê dân số</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tổng cư dân</span>
              <span className="text-gray-900">678 người</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Trẻ em</span>
              <span className="text-gray-900">125 người</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Người lớn</span>
              <span className="text-gray-900">553 người</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Trung bình/hộ</span>
              <span className="text-gray-900">2.8 người</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Dịch vụ phổ biến</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sửa chữa điện nước</span>
              <span className="text-gray-900">45 lượt</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Vệ sinh</span>
              <span className="text-gray-900">32 lượt</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bảo trì thang máy</span>
              <span className="text-gray-900">12 lượt</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Khác</span>
              <span className="text-gray-900">18 lượt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesView() {
  const services = [
    { name: 'Dịch vụ điện', price: '3,500đ/kWh', status: 'Hoạt động' },
    { name: 'Dịch vụ nước', price: '25,000đ/m³', status: 'Hoạt động' },
    { name: 'Phí quản lý', price: '12,000đ/m²', status: 'Hoạt động' },
    { name: 'Gửi xe máy', price: '100,000đ/tháng', status: 'Hoạt động' },
    { name: 'Gửi ô tô', price: '1,500,000đ/tháng', status: 'Hoạt động' },
    { name: 'Internet', price: '200,000đ/tháng', status: 'Hoạt động' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-gray-900">Quản lý dịch vụ</h2>
          <p className="text-gray-600 mt-1">Cấu hình các dịch vụ của chung cư</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          Thêm dịch vụ mới
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                {service.status}
              </span>
            </div>
            <h3 className="text-gray-900">{service.name}</h3>
            <p className="text-gray-600 mt-1">{service.price}</p>
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              <button className="flex-1 text-sm text-indigo-600 hover:text-indigo-700 py-2 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition">
                Chỉnh sửa
              </button>
              <button className="flex-1 text-sm text-gray-600 hover:text-gray-700 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                Chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
