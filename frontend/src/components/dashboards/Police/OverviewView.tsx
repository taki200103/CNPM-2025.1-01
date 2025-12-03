import { UserCheck, AlertTriangle, Camera, Clock } from 'lucide-react';

export default function OverviewView() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Người ra/vào hôm nay</p>
              <p className="text-gray-900 text-2xl mt-2">156</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Khách đăng ký</p>
              <p className="text-gray-900 text-2xl mt-2">12</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Sự cố</p>
              <p className="text-gray-900 text-2xl mt-2">3</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Camera hoạt động</p>
              <p className="text-gray-900 text-2xl mt-2">24/24</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Camera className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-3">
            {[
              { time: '14:30', action: 'Khách vào thăm - Căn A301', type: 'in' },
              { time: '13:45', action: 'Xe giao hàng - Căn B205', type: 'delivery' },
              { time: '12:20', action: 'Cư dân ra ngoài - Căn C102', type: 'out' },
              { time: '11:15', action: 'Thợ sửa chữa - Căn A401', type: 'service' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-indigo-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">{activity.action}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Lịch trực hôm nay</h3>
          <div className="space-y-3">
            {[
              { shift: 'Ca sáng', time: '06:00 - 14:00', guard: 'Nguyễn Văn A', status: 'Hoàn thành' },
              { shift: 'Ca chiều', time: '14:00 - 22:00', guard: 'Trần Văn B', status: 'Đang trực' },
              { shift: 'Ca đêm', time: '22:00 - 06:00', guard: 'Lê Văn C', status: 'Sắp tới' },
            ].map((shift, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-900">{shift.shift}</p>
                  <p className="text-gray-600 text-sm">{shift.time}</p>
                  <p className="text-gray-500 text-xs mt-1">{shift.guard}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  shift.status === 'Đang trực' 
                    ? 'bg-green-100 text-green-800' 
                    : shift.status === 'Hoàn thành'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {shift.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

