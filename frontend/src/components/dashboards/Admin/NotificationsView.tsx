import React from 'react';

export default function NotificationsView() {
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

