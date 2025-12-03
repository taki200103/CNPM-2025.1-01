import React, { useState, useEffect, useCallback } from 'react';
import { ResidentsService } from '../../../api/services/ResidentsService';
import { ApartmentsService } from '../../../api/services/ApartmentsService';
import type { CreateResidentDto } from '../../../api/models/CreateResidentDto';
import { ApiError } from '../../../api';
import { Loader2, X, Mail, Phone, CreditCard, Calendar } from 'lucide-react';

const residentRoles = [
  { value: 'resident', label: 'Cư dân' },
  { value: 'admin', label: 'Quản trị viên' },
  { value: 'police', label: 'Bảo vệ' },
  { value: 'accountant', label: 'Kế toán' },
];

type ResidentRecord = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: string;
  temporaryStatus: boolean;
  apartment?: { name?: string };
};

export default function ResidentsView() {
  const [residents, setResidents] = useState<ResidentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apartments, setApartments] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'resident',
    apartmentId: '',
    idNumber: '',
    birthDate: '',
    temporaryStatus: false,
  });

  const fetchResidents = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await ResidentsService.residentControllerFindAll();
      const list = Array.isArray(data) ? data : data?.data || [];
      setResidents(list);
    } catch (err) {
      console.error('Failed to fetch residents', err);
      setError('Không thể tải danh sách cư dân. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchApartments = useCallback(async () => {
    try {
      const data = await ApartmentsService.apartmentControllerFindAll();
      const list = Array.isArray(data) ? data : data?.data || [];
      setApartments(list);
    } catch (err) {
      console.error('Failed to fetch apartments', err);
    }
  }, []);

  useEffect(() => {
    fetchResidents();
  }, [fetchResidents]);

  useEffect(() => {
    if (isModalOpen && apartments.length === 0) {
      fetchApartments();
    }
  }, [isModalOpen, apartments.length, fetchApartments]);

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      role: 'resident',
      apartmentId: '',
      idNumber: '',
      birthDate: '',
      temporaryStatus: false,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!formData.fullName || !formData.email || !formData.phone) {
      setError('Vui lòng nhập đầy đủ thông tin bắt buộc.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (formData.role === 'resident' && !formData.apartmentId) {
      setError('Cư dân bắt buộc phải thuộc một căn hộ.');
      return;
    }
    if (!formData.idNumber) {
      setError('Vui lòng nhập số CMND/CCCD.');
      return;
    }
    if (!formData.birthDate) {
      setError('Vui lòng chọn ngày sinh.');
      return;
    }

    const payload: CreateResidentDto = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
      idNumber: formData.idNumber,
      birthDate: formData.birthDate,
      temporaryStatus: formData.temporaryStatus,
    };

    if (formData.role === 'resident') {
      payload.apartmentId = formData.apartmentId;
    }

    setIsSubmitting(true);
    try {
      const newResident = await ResidentsService.residentControllerCreate(
        payload,
      );
      setResidents((prev) => [newResident, ...prev]);
      setSuccessMessage('Đã tạo cư dân mới thành công.');
      resetForm();
      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Create resident failed', err);
      if (err instanceof ApiError) {
        setError(err.body?.message || 'Không thể tạo cư dân. Vui lòng thử lại.');
      } else {
        setError('Không thể tạo cư dân. Vui lòng thử lại.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-gray-900">Danh sách cư dân</h2>
          <p className="text-gray-600 mt-1">Quản lý thông tin cư dân trong chung cư</p>
        </div>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm cư dân mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-6 flex items-center justify-center text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Đang tải dữ liệu...
          </div>
        ) : error ? (
          <div className="p-6 text-red-600">{error}</div>
        ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Họ tên</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Căn hộ</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Số điện thoại</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Vai trò</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {residents.map((resident) => (
                <tr key={resident.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{resident.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {resident.apartment?.name || '—'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{resident.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{resident.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize text-sm text-gray-600">
                      {resident.role}
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          resident.temporaryStatus
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {resident.temporaryStatus ? 'Tạm vắng' : 'Hoạt động'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 relative">
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
            <h3 className="text-gray-900 mb-1 text-lg font-semibold leading-tight list-none">
              Thêm cư dân mới
            </h3>
            <p className="text-gray-500 mb-4 text-sm leading-relaxed">
              Điền thông tin cư dân. Vai trò khác cư dân có thể bỏ trống căn hộ.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {error && <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">{error}</div>}
              {successMessage && (
                <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm">{successMessage}</div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Họ và tên</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Số điện thoại</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0901234567"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Số CMND/CCCD</label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.idNumber}
                      onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                      placeholder="001234567890"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Mật khẩu</label>
                  <input
                    type="password"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Vai trò</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 capitalize"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    {residentRoles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Ngày sinh</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.birthDate}
                      onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {formData.role === 'resident' && (
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Căn hộ</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.apartmentId}
                    onChange={(e) => setFormData({ ...formData, apartmentId: e.target.value })}
                  >
                    <option value="">-- Chọn căn hộ --</option>
                    {apartments.map((apt) => (
                      <option key={apt.id || apt.ID_Apartment || apt.ID_apartment} value={apt.id || apt.ID_Apartment || apt.ID_apartment}>
                        {apt.name || apt.Name || `Căn hộ ${apt.id}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={formData.temporaryStatus}
                  onChange={(e) => setFormData({ ...formData, temporaryStatus: e.target.checked })}
                />
                Tạm vắng
              </label>

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
                  Tạo cư dân
                </button>
              </div>
            </form>
      </div>
        </div>
      )}
    </div>
  );
}

