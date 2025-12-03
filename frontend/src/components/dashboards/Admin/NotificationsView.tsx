import { useState, useEffect, useCallback } from 'react';
import { Loader2, X } from 'lucide-react';
import { NotificationsService } from '../../../api/services/NotificationsService';

export default function NotificationsView() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ info: '', creator: 'Ban Quản Lý' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await NotificationsService.notificationControllerFindAll();
      setNotifications(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error('Failed to load notifications', err);
      setError('Không thể tải danh sách thông báo. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const resetForm = () => {
    setFormData({ info: '', creator: 'Ban Quản Lý' });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.info.trim()) {
      setError('Nội dung thông báo không được để trống.');
      return;
    }
    setIsSubmitting(true);
    try {
      await NotificationsService.notificationControllerCreate({
        info: formData.info.trim(),
        creator: formData.creator.trim() || 'Ban Quản Lý',
      });
      await loadNotifications();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error('Create notification failed', err);
      setError('Không thể tạo thông báo. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-gray-900">Quản lý thông báo</h2>
          <p className="text-gray-600 mt-1">Gửi thông báo đến cư dân</p>
        </div>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Tạo thông báo mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-6 flex items-center text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Đang tải thông báo...
          </div>
        ) : error ? (
          <div className="p-6 text-red-600">{error}</div>
        ) : notifications.length === 0 ? (
          <div className="p-6 text-gray-500">Chưa có thông báo nào.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification: any) => (
              <div key={notification.id} className="p-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-gray-900">{notification.info}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Người gửi: {notification.creator || 'Ban Quản Lý'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notification.createdAt ? new Date(notification.createdAt).toLocaleString('vi-VN') : ''}
                  </p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-green-50 text-green-700">Đã gửi</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-6 relative">
            <button
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-gray-900 text-lg font-semibold leading-tight list-none">Tạo thông báo</h3>
            <p className="text-gray-500 text-sm mb-4">Nội dung sẽ gửi đến toàn bộ cư dân.</p>

            {error && <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Người gửi</label>
                <input
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.creator}
                  onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Nội dung</label>
                <textarea
                  rows={5}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.info}
                  onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                  placeholder="Nhập nội dung thông báo..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Gửi thông báo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

