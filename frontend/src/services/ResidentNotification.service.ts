import api from './api.service';
import type { Resident } from '../types/resident.types';
import type { ResidentNotification } from '../types/ResidentNotification.types';

type ResidentNotificationWithResident = {
  notificationId: string;
  residentId: string;
  resident: Resident;
};

const residentNotificationService = {
  // Lấy thông báo theo ID resident
  getByResident: async (
    residentId: string
  ): Promise<ResidentNotification[]> => {
    const { data } = await api.get<ResidentNotification[]>(
      '/resident-notifications/by-resident',
      { params: { residentId } }
    );
    return data;
  },

  // Lấy danh sách resident theo ID thông báo
  getResidentsByNotification: async (
    notificationId: string
  ): Promise<ResidentNotificationWithResident[]> => {
    const { data } = await api.get<ResidentNotificationWithResident[]>(
      '/resident-notifications/by-notification',
      { params: { notificationId } }
    );
    return data;
  },
};

export default residentNotificationService;


