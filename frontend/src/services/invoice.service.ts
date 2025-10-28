import api from './api.service';
import type { Invoice } from '../types/invoice.types';

const invoiceService = {
  // Lấy tất cả hóa đơn theo Resident ID
  getAllByResidentId: async (residentId: string): Promise<Invoice[]> => {
    const { data } = await api.get<Invoice[]>(`/invoices/resident/${residentId}`);
    return data;
  },
};

export default invoiceService;