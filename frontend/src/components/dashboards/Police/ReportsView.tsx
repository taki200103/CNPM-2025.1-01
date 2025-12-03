import { FileText } from 'lucide-react';

export default function ReportsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Báo cáo</h2>
        <p className="text-gray-600 mt-1">Thống kê và báo cáo hoạt động bảo vệ</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Người ra/vào hôm nay</p>
          <p className="text-gray-900 text-2xl mt-2">156</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Khách đăng ký</p>
          <p className="text-gray-900 text-2xl mt-2">12</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Sự cố tháng này</p>
          <p className="text-gray-900 text-2xl mt-2">18</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Trung bình/ngày</p>
          <p className="text-gray-900 text-2xl mt-2">142</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-900 mb-4">Báo cáo chi tiết</h3>
        <div className="space-y-3">
          {[
            { name: 'Báo cáo tuần (21/11 - 27/11)', date: '27/11/2025', type: 'PDF' },
            { name: 'Báo cáo tháng 10/2025', date: '31/10/2025', type: 'PDF' },
            { name: 'Báo cáo tháng 9/2025', date: '30/09/2025', type: 'PDF' },
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-gray-900">{report.name}</p>
                  <p className="text-gray-500 text-sm">{report.date}</p>
                </div>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm">
                Tải xuống
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

