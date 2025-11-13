import { useEffect, useState } from 'react';
import authService from '../../services/auth.service';
import invoiceService from '../../services/invoice.service';
import type { Invoice } from '../../types/invoice.types';

export const useInvoice = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        setLoading(true);
        setError('');

        // Lấy user hiện tại từ localStorage hoặc gọi profile
        let user = authService.getUser();
        if (!user) {
          user = await authService.getProfile();
        }

        if (!user?.id) {
          setInvoices([]);
          setError('Không tìm thấy thông tin người dùng.');
          return;
        }

        const data = await invoiceService.getAllByResidentId(user.id);
        setInvoices(data);
      } catch (err) {
        console.error('Lỗi khi tải hóa đơn:', err);
        setError('Không thể tải danh sách hóa đơn.');
      } finally {
        setLoading(false);
      }
    };

    loadInvoices();
  }, []);

  return {
    invoices,
    loading,
    error,
  };
};


