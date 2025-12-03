export default function ShiftsView() {
  const schedule = [
    { day: 'Thứ 2', date: '28/11', morning: 'Nguyễn Văn A', afternoon: 'Trần Văn B', night: 'Lê Văn C' },
    { day: 'Thứ 3', date: '29/11', morning: 'Trần Văn B', afternoon: 'Lê Văn C', night: 'Nguyễn Văn A' },
    { day: 'Thứ 4', date: '30/11', morning: 'Lê Văn C', afternoon: 'Nguyễn Văn A', night: 'Trần Văn B' },
    { day: 'Thứ 5', date: '01/12', morning: 'Nguyễn Văn A', afternoon: 'Trần Văn B', night: 'Lê Văn C' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Lịch trực</h2>
        <p className="text-gray-600 mt-1">Phân công và theo dõi ca trực</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Ngày</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Ca sáng (6h-14h)</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Ca chiều (14h-22h)</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Ca đêm (22h-6h)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedule.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.day}</div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.morning}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.afternoon}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.night}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

