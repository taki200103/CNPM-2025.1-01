import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { InvoicesService, OpenAPI, ApiError } from '../../../api';
import type { InvoiceResponseDto } from '../../../api/models/InvoiceResponseDto';

interface FeeGroup {
  month: string;
  monthKey: string;
  amount: number;
  status: string;
  date: string;
  invoices: InvoiceResponseDto[];
}

export default function FeesView() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<InvoiceResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [feeGroups, setFeeGroups] = useState<FeeGroup[]>([]);
  const [stats, setStats] = useState({
    totalPaid: 0,
    averageAmount: 0,
    nextAmount: 0,
    nextDueDate: '',
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (token) {
          OpenAPI.TOKEN = token;
        }

        const residentId = user.id;
        const invoicesData = await InvoicesService.invoiceControllerGetAllByResidentId(residentId);
        
        setInvoices(Array.isArray(invoicesData) ? invoicesData : []);

        // Nhóm hóa đơn theo tháng
        const grouped = groupInvoicesByMonth(Array.isArray(invoicesData) ? invoicesData : []);
        setFeeGroups(grouped);

        // Tính toán thống kê
        const calculatedStats = calculateStats(grouped);
        setStats(calculatedStats);
      } catch (err: any) {
        console.error('Lỗi khi lấy danh sách hóa đơn:', err);
        setError(err instanceof ApiError ? (err.body?.message || err.message) : 'Không thể tải danh sách hóa đơn');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [user]);

  const groupInvoicesByMonth = (invoices: InvoiceResponseDto[]): FeeGroup[] => {
    const groups: Record<string, FeeGroup> = {};

    invoices.forEach((invoice) => {
      const date = new Date(invoice.createdAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = `Tháng ${date.getMonth() + 1}/${date.getFullYear()}`;

      if (!groups[monthKey]) {
        groups[monthKey] = {
          month: monthLabel,
          monthKey,
          amount: 0,
          status: 'Đã thanh toán', // Có thể cập nhật dựa trên trạng thái thực tế
          date: date.toLocaleDateString('vi-VN'),
          invoices: [],
        };
      }

      groups[monthKey].amount += invoice.money || 0;
      groups[monthKey].invoices.push(invoice);
    });

    // Sắp xếp theo tháng mới nhất trước
    return Object.values(groups).sort((a, b) => b.monthKey.localeCompare(a.monthKey));
  };

  const calculateStats = (groups: FeeGroup[]) => {
    if (groups.length === 0) {
      return {
        totalPaid: 0,
        averageAmount: 0,
        nextAmount: 0,
        nextDueDate: '',
      };
    }

    // Tổng đã thanh toán (3 tháng gần nhất)
    const recent3Months = groups.slice(0, 3);
    const totalPaid = recent3Months.reduce((sum, group) => sum + group.amount, 0);

    // Chi phí trung bình
    const averageAmount = groups.reduce((sum, group) => sum + group.amount, 0) / groups.length;

    // Tháng tiếp theo (tháng mới nhất + 1)
    const latestGroup = groups[0];
    const latestDate = new Date(latestGroup.monthKey + '-01');
    latestDate.setMonth(latestDate.getMonth() + 1);
    const nextDueDate = latestDate.toLocaleDateString('vi-VN');

    return {
      totalPaid,
      averageAmount,
      nextAmount: latestGroup.amount, // Ước tính bằng tháng gần nhất
      nextDueDate,
    };
  };

  const getServiceBreakdown = (group: FeeGroup) => {
    const breakdown: Record<string, number> = {};

    group.invoices.forEach((invoice) => {
      const serviceName = invoice.service?.name || invoice.name || 'Khác';
      if (!breakdown[serviceName]) {
        breakdown[serviceName] = 0;
      }
      breakdown[serviceName] += invoice.money || 0;
    });

    return breakdown;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Đang tải thông tin...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)} triệu`;
    }
    return `${amount.toLocaleString('vi-VN')} đ`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900">Quản lý chi phí</h2>
        <p className="text-gray-600 mt-1">Theo dõi các khoản phí và thanh toán</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Tổng đã thanh toán</p>
          <p className="text-green-600 text-2xl mt-2">{formatCurrency(stats.totalPaid)}</p>
          <p className="text-gray-600 text-sm mt-1">3 tháng gần nhất</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Chi phí trung bình</p>
          <p className="text-gray-900 text-2xl mt-2">{formatCurrency(stats.averageAmount)}</p>
          <p className="text-gray-600 text-sm mt-1">Mỗi tháng</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Tiếp theo</p>
          <p className="text-orange-600 text-2xl mt-2">{formatCurrency(stats.nextAmount)}</p>
          <p className="text-gray-600 text-sm mt-1">
            {stats.nextDueDate ? `Hạn: ${stats.nextDueDate}` : 'Chưa có thông tin'}
          </p>
        </div>
      </div>

      {feeGroups.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          Chưa có hóa đơn nào
        </div>
      ) : (
        <div className="space-y-4">
          {feeGroups.map((group) => {
            const breakdown = getServiceBreakdown(group);
            const breakdownEntries = Object.entries(breakdown);

            return (
              <div key={group.monthKey} className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-gray-900">{group.month}</h3>
                    <p className="text-gray-600 text-sm mt-1">Thanh toán: {group.date}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-3 sm:mt-0">
                    <span className="text-gray-900 text-xl">
                      {group.amount.toLocaleString('vi-VN')} đ
                    </span>
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                      {group.status}
                    </span>
                  </div>
                </div>
                {breakdownEntries.length > 0 && (
                  <div className={`grid gap-4 pt-4 border-t border-gray-100 ${
                    breakdownEntries.length <= 2 ? 'grid-cols-2' : 
                    breakdownEntries.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 
                    'grid-cols-2 md:grid-cols-4'
                  }`}>
                    {breakdownEntries.map(([serviceName, amount]) => (
                      <div key={serviceName}>
                        <p className="text-gray-600 text-sm">{serviceName}</p>
                        <p className="text-gray-900">{amount.toLocaleString('vi-VN')} đ</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

