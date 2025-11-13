// src/pages/Profile/Profile.tsx
import { useProfile } from './Profile_hook';
import './Profile.css';

const Profile = () => {
  const {
    user,
    resident,
    loading,
    isEditing,
    saving,
    notification,
    formData,
    handleEdit,
    handleCancel,
    handleChange,
    handleSave,
  } = useProfile();

  if (loading) {
    return (
      <div className="profile-loading">
        <p>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <span>{notification.message}</span>
        </div>
      )}
      
      <div className="profile-header">
        <h1>Thông tin cá nhân</h1>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar-large">
            {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>

          <div className="profile-info">
            <div className="profile-field">
              <label htmlFor="fullName">Họ và tên</label>
              <input 
                type="text" 
                id="fullName" 
                value={isEditing ? formData.fullName : (resident?.fullName || user?.fullName || user?.name || '')} 
                onChange={handleChange}
                readOnly={!isEditing} 
              />
            </div>

            <div className="profile-field">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                value={isEditing ? formData.email : (resident?.email || user?.email || '')} 
                onChange={handleChange}
                readOnly={!isEditing} 
              />
            </div>

            <div className="profile-field">
              <label htmlFor="phone">Số điện thoại</label>
              <input 
                type="tel" 
                id="phone" 
                value={isEditing ? formData.phone : (resident?.phone || '')} 
                onChange={handleChange}
                placeholder="Chưa cập nhật" 
                readOnly={!isEditing} 
              />
            </div>

            <div className="profile-field">
              <label htmlFor="idNumber">Số CMND/CCCD</label>
              <input 
                type="text" 
                id="idNumber" 
                value={isEditing ? formData.idNumber : (resident?.idNumber || '')} 
                onChange={handleChange}
                placeholder="Chưa cập nhật" 
                readOnly={!isEditing} 
              />
            </div>

            <div className="profile-field">
              <label htmlFor="birthDate">Ngày sinh</label>
              <input 
                type="date" 
                id="birthDate" 
                value={isEditing ? formData.birthDate : (resident?.birthDate ? new Date(resident.birthDate).toISOString().split('T')[0] : '')} 
                onChange={handleChange}
                readOnly={!isEditing} 
              />
            </div>

            <div className="profile-field">
              <label htmlFor="role">Vai trò</label>
              <input type="text" id="role" value={resident?.role || user?.role || ''} readOnly />
            </div>

            <div className="profile-field">
              <label htmlFor="temporaryStatus">Trạng thái</label>
              <input 
                type="text" 
                id="temporaryStatus" 
                value={resident?.temporaryStatus ? 'Tạm trú' : 'Thường trú'} 
                readOnly 
              />
            </div>
          </div>

          <div className="profile-footer">
            {!isEditing ? (
              <button className="edit-button" onClick={handleEdit}>
                Chỉnh sửa
              </button>
            ) : (
              <div className="profile-actions">
                <button className="cancel-button" onClick={handleCancel}>
                  Hủy
                </button>
                <button className="save-button" onClick={handleSave} disabled={saving}>
                  {saving ? 'Đang lưu...' : 'Lưu'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;