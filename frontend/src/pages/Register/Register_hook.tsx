import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Resident } from '../../types/resident.types';
import residentService from '../../services/resident.service';
import householdService from '../../services/househole.service';
import type { Household } from '../../types/household.type';

interface RegisterFormData extends Partial<Resident> {
  confirmPassword?: string;
  apartmentNumber?: string;
  householdId?: string;
}

const initialForm: RegisterFormData = {
  fullName: '', phone: '', email: '',
  idNumber: '', birthDate: '', password: '', confirmPassword: '', apartmentNumber: '', householdId: ''
};

export const useRegister = () => {
  const [formData, setFormData] = useState<RegisterFormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  // Households state moved from component
  const [households, setHouseholds] = useState<Household[]>([]);
  const [isLoadingHouseholds, setIsLoadingHouseholds] = useState<boolean>(false);
  const [loadHouseholdsError, setLoadHouseholdsError] = useState<string>('');
  const [useHouseholdDropdown, setUseHouseholdDropdown] = useState<boolean>(true);

  useEffect(() => {
    const fetchHouseholds = async () => {
      try {
        setIsLoadingHouseholds(true);
        setLoadHouseholdsError('');
        // Attempt to fetch without forcing global 401 redirect
        const data = await householdService.getAllPublicSafe();
        setHouseholds(data);
      } catch {
        // If cannot fetch (likely protected), fall back to manual input
        setUseHouseholdDropdown(false);
        setLoadHouseholdsError('Không tải được danh sách căn hộ');
      } finally {
        setIsLoadingHouseholds(false);
      }
    };
    fetchHouseholds();
  }, []);

  const validate = (): boolean => {
    const err: Record<string, string> = {};
    if (!formData.fullName?.trim()) err.fullName = 'Họ tên là bắt buộc';
    if (!formData.birthDate) err.birthDate = 'Ngày sinh là bắt buộc';
    if (!formData.phone?.trim()) err.phone = 'SĐT là bắt buộc';
    else if (!/^[0-9]{10}$/.test(formData.phone)) err.phone = 'SĐT phải có 10 số';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) err.email = 'Email không hợp lệ';
    if (!formData.idNumber?.trim()) err.idNumber = 'CMND/CCCD là bắt buộc';
    // Require householdId when dropdown is available; otherwise require apartmentNumber (fallback input)
    if (useHouseholdDropdown) {
      if (!formData.householdId?.trim()) err.householdId = 'Vui lòng chọn căn hộ';
    } else {
      if (!formData.apartmentNumber?.trim()) err.apartmentNumber = 'Căn hộ là bắt buộc';
    }
    if (!formData.password?.trim()) err.password = 'Mật khẩu là bắt buộc';
    else if (formData.password.length < 6) err.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    if (!formData.confirmPassword?.trim()) err.confirmPassword = 'Vui lòng nhập lại mật khẩu';
    else if (formData.password !== formData.confirmPassword) err.confirmPassword = 'Mật khẩu không khớp';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the field being changed
    if (errors[name]) setErrors(prev => { const newErr = { ...prev }; delete newErr[name]; return newErr; });
    // If password or confirmPassword changes, also clear the other's error if passwords match
    if (name === 'password' && formData.confirmPassword && value === formData.confirmPassword) {
      setErrors(prev => { const newErr = { ...prev }; delete newErr.confirmPassword; return newErr; });
    }
    if (name === 'confirmPassword' && formData.password && value === formData.password) {
      setErrors(prev => { const newErr = { ...prev }; delete newErr.confirmPassword; return newErr; });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setIsSuccess(false);
    try {
      // Remove confirmPassword before sending to API
      const submitData: Partial<Resident> & { apartmentNumber?: string } = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        idNumber: formData.idNumber,
        birthDate: formData.birthDate,
        password: formData.password,
        householdId: formData.householdId, // backend cần householdId
        apartmentNumber: formData.apartmentNumber,
      };
      await residentService.createResident(submitData as Resident);
      setIsSuccess(true);
      setFormData(initialForm);
      setErrors({});
      setTimeout(() => {
        setIsSuccess(false);
        navigate('/login');
      }, 1000);
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Có lỗi xảy ra';
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData: formData as Partial<Resident> & { confirmPassword?: string; apartmentNumber?: string },
    errors,
    isLoading,
    isSuccess,
    handleChange,
    handleSubmit,
    households,
    isLoadingHouseholds,
    loadHouseholdsError,
    useHouseholdDropdown,
  };
};