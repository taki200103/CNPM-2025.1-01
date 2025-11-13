import { useEffect, useState } from 'react';
import residentNotificationService from '../../services/ResidentNotification.service';
import authService from '../../services/auth.service';
import type { ResidentNotification } from '../../types/ResidentNotification.types';

export const useResidentNotifications = () => {
  const [notifications, setNotifications] = useState<ResidentNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const user = authService.getUser();
        if (!user?.id) {
          throw new Error('Không tìm thấy người dùng. Vui lòng đăng nhập lại.');
        }
        const data = await residentNotificationService.getByResident(user.id);
        setNotifications(data);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Đã xảy ra lỗi khi tải thông báo';
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { notifications, loading, error };
};


