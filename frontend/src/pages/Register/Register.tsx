import React from 'react';
import { useRegister } from './Register_hook';
import './Register.css';

const Register: React.FC = () => {
  const {
    formData,
    errors,
    isLoading,
    isSuccess,
    handleChange,
    handleSubmit,
    households,
    isLoadingHouseholds,
    loadHouseholdsError,
    useHouseholdDropdown,
  } = useRegister();

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Đăng ký cư dân mới</h2>
        
        {isSuccess && <div className="alert alert-success">Đăng ký thành công!</div>}
        {errors.submit && <div className="alert alert-error">{errors.submit}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="fullName">Họ và tên <span className="required">*</span></label>
            <input type="text" id="fullName" name="fullName" value={formData.fullName || ''} onChange={handleChange} />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="birthDate">Ngày sinh <span className="required">*</span></label>
              <input type="date" id="birthDate" name="birthDate" value={formData.birthDate || ''} onChange={handleChange} />
              {errors.birthDate && <span className="error">{errors.birthDate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại <span className="required">*</span></label>
              <input type="tel" id="phone" name="phone" value={formData.phone || ''} onChange={handleChange} />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email || ''} onChange={handleChange} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="idNumber">CMND/CCCD <span className="required">*</span></label>
              <input type="text" id="idNumber" name="idNumber" value={formData.idNumber || ''} onChange={handleChange} />
              {errors.idNumber && <span className="error">{errors.idNumber}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="apartmentNumber">Căn hộ <span className="required">*</span></label>
            {useHouseholdDropdown ? (
              <select
                id="householdId"
                name="householdId"
                value={formData.householdId || ''}
                onChange={handleChange}
                disabled={isLoadingHouseholds}
                aria-label="Chọn căn hộ"
              >
                <option value="">{isLoadingHouseholds ? 'Đang tải...' : 'Chọn căn hộ'}</option>
                {households.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.apartmentId}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id="apartmentNumber"
                name="apartmentNumber"
                value={formData.apartmentNumber || ''}
                onChange={handleChange}
                placeholder="Nhập số căn hộ (VD: A101, B205)"
              />
            )}
            {errors.apartmentNumber && <span className="error">{errors.apartmentNumber}</span>}
            {loadHouseholdsError && <span className="error">{loadHouseholdsError}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Mật khẩu <span className="required">*</span></label>
              <input type="password" id="password" name="password" value={formData.password || ''} onChange={handleChange} />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Nhập lại mật khẩu <span className="required">*</span></label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword || ''} onChange={handleChange} />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;