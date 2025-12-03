export default function StatisticsView() {
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

