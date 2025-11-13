import { useResidentNotifications } from './ResidentNotification_hook';
import './ResidentNotification.css';

const ResidentNotification = () => {
  const { notifications, loading, error } = useResidentNotifications();

  if (loading) {
    return (
      <div className="rn-loading">
        <p>Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rn-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="rn-page">
      <header className="rn-header">
        <h1>Thông báo của tôi</h1>
      </header>

      {notifications.length === 0 ? (
        <div className="rn-empty">Chưa có thông báo nào.</div>
      ) : (
        <ul className="rn-list">
          {notifications.map((item) => (
            <li key={`${item.notificationId}-${item.residentId}`} className="rn-item">
              <div className="rn-item-header">
                <h3 className="rn-title">{item.notification.info}</h3>
                <span className="rn-date">
                  {new Date(item.notification.createdAt).toLocaleString('vi-VN')}
                </span>
              </div>
              <div className="rn-meta">
                <span>Người tạo: {item.notification.creator}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResidentNotification;


