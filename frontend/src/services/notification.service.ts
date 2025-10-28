// src/services/notification.service.ts
import api from './api.service';
import type { Notification } from '../types/notification.types';

const notificationService = {
  // Lấy notification theo ID
  getById: async (id: string): Promise<Notification> => {
    const { data } = await api.get<Notification>(`/notifications/${id}`);
    return data;
  },
};

export default notificationService;