import { Home, Users, DollarSign, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

export default function OverviewView() {
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

