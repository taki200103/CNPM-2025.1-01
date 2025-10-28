// src/pages/Service/Service_hook.tsx
import { useState, useEffect } from 'react';
import serviceService from '../../services/service.service';
import type { Service } from '../../types/service.types';

export const useService = () => {
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Load tất cả dịch vụ
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const services = await serviceService.getAll();
        setAllServices(services);
      } catch (error) {
        console.error('Lỗi khi tải dịch vụ:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return {
    allServices,
    loading,
  };
};