// src/pages/Profile/Profile_hook.tsx
import { useEffect, useState } from 'react';
import authService from '../../services/auth.service';
import residentService from '../../services/resident.service';
import type { User } from '../../types/auth.types';
import type { Resident } from '../../types/resident.types';

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [resident, setResident] = useState<Resident | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    birthDate: '',
  });

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        if (!authService.isAuthenticated()) {
          setLoading(false);
          return;
        }
  
        const profileData = await authService.getProfile();
        console.log('📋 Profile data từ API:', profileData);
        
        setUser(profileData);
        
        if (profileData.fullName || profileData.phone || profileData.idNumber) {
          if (profileData.id && profileData.householdId) {
            setResident({
              id: profileData.id,
              householdId: profileData.householdId,
              fullName: profileData.fullName || '',
              phone: profileData.phone || '',
              email: profileData.email,
              role: profileData.role,
              temporaryStatus: profileData.temporaryStatus || false,
              idNumber: profileData.idNumber || '',
              birthDate: profileData.birthDate || '',
            });
          }
        }
  
        setFormData({
          fullName: profileData.fullName || '',
          email: profileData.email || '',
          phone: profileData.phone || '',
          idNumber: profileData.idNumber || '',
          birthDate: profileData.birthDate
            ? new Date(profileData.birthDate).toISOString().split('T')[0]
            : '',
        });
  
      } catch (error) {
        console.error('Lỗi khi tải thông tin profile:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadUserProfile();
  }, []);

  const handleEdit = () => {
    if (resident) {
      setFormData({
        fullName: resident.fullName || '',
        email: resident.email || '',
        phone: resident.phone || '',
        idNumber: resident.idNumber || '',
        birthDate: resident.birthDate ? new Date(resident.birthDate).toISOString().split('T')[0] : '',
      });
    } else if (user) {
      setFormData({
        fullName: user.fullName || user.name || '',
        email: user.email || '',
        phone: '',
        idNumber: '',
        birthDate: '',
      });
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (resident) {
      setFormData({
        fullName: resident.fullName || '',
        email: resident.email || '',
        phone: resident.phone || '',
        idNumber: resident.idNumber || '',
        birthDate: resident.birthDate ? new Date(resident.birthDate).toISOString().split('T')[0] : '',
      });
    }
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    if (!resident && !user) {
      setNotification({ message: 'Không tìm thấy thông tin người dùng', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setSaving(true);
    try {
      if (resident) {
        console.log('Updating resident with ID:', resident.id);
        console.log('Data to update:', {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          idNumber: formData.idNumber,
          birthDate: formData.birthDate,
        });

        await residentService.updateResident(resident.id, {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          idNumber: formData.idNumber,
          birthDate: formData.birthDate,
        });
        
        console.log('Update successful, reloading profile...');
        
        const updatedProfile = await authService.getProfile();
        
        setUser(updatedProfile);
        
        if (updatedProfile.id && updatedProfile.householdId) {
          setResident({
            id: updatedProfile.id,
            householdId: updatedProfile.householdId,
            fullName: updatedProfile.fullName || '',
            phone: updatedProfile.phone || '',
            email: updatedProfile.email,
            role: updatedProfile.role,
            temporaryStatus: updatedProfile.temporaryStatus || false,
            idNumber: updatedProfile.idNumber || '',
            birthDate: updatedProfile.birthDate || '',
          });
        }
        
        setFormData({
          fullName: updatedProfile.fullName || '',
          email: updatedProfile.email || '',
          phone: updatedProfile.phone || '',
          idNumber: updatedProfile.idNumber || '',
          birthDate: updatedProfile.birthDate
            ? new Date(updatedProfile.birthDate).toISOString().split('T')[0]
            : '',
        });
      } else {
        console.log('Không có thông tin resident, chỉ có thể cập nhật user');
      }
      
      setIsEditing(false);
      setNotification({ message: 'Cập nhật thông tin thành công!', type: 'success' });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
      setNotification({ message: 'Có lỗi xảy ra khi cập nhật thông tin', type: 'error' });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  return {
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
  };
};