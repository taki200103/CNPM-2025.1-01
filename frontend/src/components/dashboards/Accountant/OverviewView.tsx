export default function OverviewView() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <p className="text-green-100 text-sm">Doanh thu tháng</p>
          <p className="text-3xl mt-2">2.4 tỷ</p>
          <p className="text-green-100 text-sm mt-2">+8% so tháng trước</p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow p-6 text-white">
          <p className="text-red-100 text-sm">Chi phí tháng</p>
          <p className="text-3xl mt-2">1.2 tỷ</p>
          <p className="text-red-100 text-sm mt-2">+3% so tháng trước</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <p className="text-blue-100 text-sm">Lợi nhuận</p>
          <p className="text-3xl mt-2">1.2 tỷ</p>
          <p className="text-blue-100 text-sm mt-2">Tháng 11/2025</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <p className="text-purple-100 text-sm">Tỷ lệ thu</p>
          <p className="text-3xl mt-2">87%</p>
          <p className="text-purple-100 text-sm mt-2">213/245 căn hộ</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Doanh thu theo tháng (2025)</h3>
          <div className="space-y-3">
            {[
              { month: 'Tháng 11', amount: 2400000000, percent: 100 },
              { month: 'Tháng 10', amount: 2220000000, percent: 92 },
              { month: 'Tháng 9', amount: 2350000000, percent: 98 },
              { month: 'Tháng 8', amount: 2100000000, percent: 87 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.month}</span>
                  <span className="text-gray-900">{(item.amount / 1000000000).toFixed(1)} tỷ</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-900 mb-4">Cơ cấu chi phí</h3>
          <div className="space-y-3">
            {[
              { category: 'Nhân sự', amount: 450000000, color: 'bg-blue-600' },
              { category: 'Bảo trì, sửa chữa', amount: 320000000, color: 'bg-green-600' },
              { category: 'Điện nước', amount: 280000000, color: 'bg-yellow-600' },
              { category: 'Vệ sinh', amount: 150000000, color: 'bg-purple-600' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-gray-600 text-sm">{item.category}</span>
                </div>
                <span className="text-gray-900">{(item.amount / 1000000).toFixed(0)} triệu</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-900 mb-4">Công việc cần xử lý</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">12 hóa đơn chưa thanh toán</p>
            <p className="text-sm text-yellow-600 mt-1">Tổng: 16.3 triệu</p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">5 phiếu chi chờ duyệt</p>
            <p className="text-sm text-blue-600 mt-1">Tổng: 8.5 triệu</p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-purple-800">Báo cáo tháng cần hoàn thành</p>
            <p className="text-sm text-purple-600 mt-1">Hạn: 05/12/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

