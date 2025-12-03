import React, { useState, useEffect, useCallback } from 'react';
import { ServicesService, OpenAPI, ApiError } from '../../../api';
import type { CreateServiceDto } from '../../../api/models/CreateServiceDto';
import type { UpdateServiceDto } from '../../../api/models/UpdateServiceDto';
import { Wrench, X, Loader2, Calendar, DollarSign, AlertCircle, Plus, Pencil, Trash2 } from 'lucide-react';

type ServiceRecord = {
  id: string;
  name: string;
  month: string;
  totalAmount: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function ServicesView() {
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingService, setEditingService] = useState<ServiceRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    month: '',
    totalAmount: '',
    status: 'unpaid',
  });

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (token) {
        OpenAPI.TOKEN = token;
      }

      const data = await ServicesService.serviceControllerFindAll();
      const list = Array.isArray(data) ? data : data?.data || [];
      setServices(list);
    } catch (err: any) {
      console.error('Failed to fetch services', err);
      setError('Không thể tải danh sách dịch vụ. Vui lòng thử lại sau.');
      if (err instanceof ApiError) {
        setError(err.body?.message || err.message || 'Không thể tải danh sách dịch vụ.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const resetForm = () => {
    setFormData({
      name: '',
      month: '',
      totalAmount: '',
      status: 'unpaid',
    });
    setError('');
    setSuccessMessage('');
    setIsEditMode(false);
    setEditingService(null);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service: ServiceRecord) => {
    setEditingService(service);
    setIsEditMode(true);
    setFormData({
      name: service.name,
      month: service.month,
      totalAmount: service.totalAmount.toString(),
      status: service.status || 'unpaid',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!formData.name || !formData.month || !formData.totalAmount) {
      setError('Vui lòng nhập đầy đủ thông tin bắt buộc.');
      return;
    }

    if (isNaN(Number(formData.totalAmount)) || Number(formData.totalAmount) <= 0) {
      setError('Số tiền phải là số dương.');
      return;
    }

    // Validate month format (YYYY-MM)
    const monthRegex = /^\d{4}-\d{2}$/;
    if (!monthRegex.test(formData.month)) {
      setError('Tháng phải có định dạng YYYY-MM (ví dụ: 2025-11).');
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      OpenAPI.TOKEN = token;
    }

    setIsSubmitting(true);
    try {
      if (isEditMode && editingService) {
        const updatePayload: UpdateServiceDto = {
          name: formData.name,
          month: formData.month,
          totalAmount: Number(formData.totalAmount),
          status: formData.status,
        };

        const updatedService = await ServicesService.serviceControllerUpdate(
          editingService.id,
          updatePayload
        );
        
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? (updatedService as ServiceRecord) : s))
        );
        setSuccessMessage('Đã cập nhật dịch vụ thành công.');
      } else {
        const createPayload: CreateServiceDto = {
          name: formData.name,
          month: formData.month,
          totalAmount: Number(formData.totalAmount),
          status: formData.status,
        };

        const newService = await ServicesService.serviceControllerCreate(createPayload);
        setServices((prev) => [newService as ServiceRecord, ...prev]);
        setSuccessMessage('Đã tạo dịch vụ mới thành công.');
      }

      setTimeout(() => {
        handleCloseModal();
        fetchServices();
      }, 1000);
    } catch (err: any) {
      console.error('Save service failed', err);
      if (err instanceof ApiError) {
        setError(err.body?.message || 'Không thể lưu dịch vụ. Vui lòng thử lại.');
      } else {
        setError('Không thể lưu dịch vụ. Vui lòng thử lại.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa dịch vụ này không?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (token) {
        OpenAPI.TOKEN = token;
      }

      await ServicesService.serviceControllerRemove(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      setSuccessMessage('Đã xóa dịch vụ thành công.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      console.error('Delete service failed', err);
      if (err instanceof ApiError) {
        setError(err.body?.message || 'Không thể xóa dịch vụ. Vui lòng thử lại.');
      } else {
        setError('Không thể xóa dịch vụ. Vui lòng thử lại.');
      }
      setTimeout(() => setError(''), 3000);
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' đ';
  };

  const formatMonth = (month: string) => {
    if (!month) return '';
    const [year, monthNum] = month.split('-');
    return `Tháng ${monthNum}/${year}`;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'paid') {
      return 'bg-green-100 text-green-800';
    }
    return 'bg-yellow-100 text-yellow-800';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'paid') {
      return 'Đã thanh toán';
    }
    return 'Chưa thanh toán';
  };

  return (
    <div className="space-y-6">
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}
      {error && !isModalOpen && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-gray-900">Quản lý dịch vụ</h2>
          <p className="text-gray-600 mt-1">Cấu hình các loại phí và dịch vụ của chung cư</p>
        </div>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
          onClick={handleOpenCreateModal}
        >
          <Plus className="w-4 h-4" />
          Thêm dịch vụ mới
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow p-12 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400 mr-2" />
          <span className="text-gray-600">Đang tải dữ liệu...</span>
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Chưa có dịch vụ nào</p>
          <button
            className="mt-4 text-indigo-600 hover:text-indigo-700"
            onClick={handleOpenCreateModal}
          >
            Thêm dịch vụ đầu tiên
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Wrench className="w-6 h-6 text-indigo-600" />
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(service.status)}`}>
                  {getStatusLabel(service.status)}
                </span>
              </div>
              <h3 className="text-gray-900 text-lg font-semibold mb-1">{service.name}</h3>
              <div className="space-y-2 mt-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatMonth(service.month)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-900">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-semibold">{formatCurrency(service.totalAmount)}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <button
                  className="flex-1 text-sm text-indigo-600 hover:text-indigo-700 py-2 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition flex items-center justify-center gap-1"
                  onClick={() => handleOpenEditModal(service)}
                >
                  <Pencil className="w-3 h-3" />
                  Chỉnh sửa
                </button>
                <button
                  className="flex-1 text-sm text-red-600 hover:text-red-700 py-2 border border-red-300 rounded-lg hover:bg-red-50 transition flex items-center justify-center gap-1"
                  onClick={() => handleDelete(service.id)}
                >
                  <Trash2 className="w-3 h-3" />
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-gray-900 mb-1 text-lg font-semibold leading-tight">
              {isEditMode ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
            </h3>
            <p className="text-gray-500 mb-4 text-sm leading-relaxed">
              {isEditMode
                ? 'Cập nhật thông tin dịch vụ'
                : 'Điền thông tin để tạo dịch vụ mới'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
              {successMessage && (
                <div className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm">
                  {successMessage}
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Tên loại phí <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Phí thuê, Phí điện, Phí nước..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Phí thuê, Phí điện, Phí nước, Phí gửi xe, Phí vệ sinh, Phí dịch vụ, Phí nhà ở
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Tháng <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="month"
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.month}
                      onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Định dạng: YYYY-MM</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Số tiền <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      className="w-full border rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.totalAmount}
                      onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                      placeholder="0"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">VND</p>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Trạng thái <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="paid">Đã thanh toán</option>
                  <option value="unpaid">Chưa thanh toán</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isEditMode ? 'Cập nhật' : 'Tạo dịch vụ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

