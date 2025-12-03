import React from 'react';

export default function FeesView() {
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

