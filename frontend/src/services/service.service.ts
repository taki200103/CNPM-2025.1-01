// src/services/service.service.ts
import api from './api.service';
import type { Service } from '../types/service.types';

const serviceService = {
  // Lấy tất cả services
  getAll: async (): Promise<Service[]> => {
    const { data } = await api.get<Service[]>('/services');
    return data;
  },
};

export default serviceService;