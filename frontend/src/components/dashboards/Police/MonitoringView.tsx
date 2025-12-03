import { Camera } from 'lucide-react';

export default function MonitoringView() {
  const cameras = [
    { id: 1, location: 'Cổng chính', status: 'Hoạt động', lastCheck: '5 phút trước' },
    { id: 2, location: 'Bãi xe tầng 1', status: 'Hoạt động', lastCheck: '5 phút trước' },
    { id: 3, location: 'Thang máy A', status: 'Hoạt động', lastCheck: '5 phút trước' },
    { id: 4, location: 'Thang máy B', status: 'Bảo trì', lastCheck: '2 giờ trước' },
    { id: 5, location: 'Hành lang tầng 5', status: 'Hoạt động', lastCheck: '5 phút trước' },
    { id: 6, location: 'Sảnh chính', status: 'Hoạt động', lastCheck: '5 phút trước' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Hệ thống giám sát</h2>
        <p className="text-gray-600 mt-1">Quản lý camera an ninh</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map((camera) => (
          <div key={camera.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gray-200 w-full h-40 rounded-lg flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            <h3 className="text-gray-900">{camera.location}</h3>
            <div className="flex items-center justify-between mt-3">
              <span className={`px-2 py-1 text-xs rounded-full ${
                camera.status === 'Hoạt động' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {camera.status}
              </span>
              <span className="text-xs text-gray-500">{camera.lastCheck}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

