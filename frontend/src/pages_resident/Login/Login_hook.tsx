import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import type { LoginDto } from '../../types/auth.types';

export type UserRole = 'resident' | 'accountant' | 'police' | 'manager';

const roleRoutes: Record<UserRole, string> = {
  resident: '/dashboard',
  accountant: '/accountant/dashboard',
  police: '/police/dashboard',
  manager: '/admin/dashboard',
};

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginDto>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: FormEvent, role: UserRole) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(formData);
      navigate(roleRoutes[role] ?? '/');
    } catch (err: unknown) {
      let errorMessage = 'Đăng nhập thất bại';

      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || 'Đăng nhập thất bại';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
};