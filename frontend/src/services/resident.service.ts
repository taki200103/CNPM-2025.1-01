import api from './api.service';
import type { Resident, UpdateResidentDto } from '../types/resident.types';

const residentService = {
  // Lấy thông tin resident theo ID
  getResidentById: async (id: string): Promise<Resident> => {
    const { data } = await api.get<Resident>(`/residents/${id}`);
    return data;
  },

  // Cập nhật thông tin resident
  updateResident: async (id: string, updateDto: UpdateResidentDto): Promise<Resident> => {
    console.log(`Calling PUT /residents/${id} with data:`, updateDto);
    const { data } = await api.put<Resident>(`/residents/${id}`, updateDto);
    console.log('Update response:', data);
    return data;
  },

  // Lấy tất cả residents (cho fallback)
  getAllResidents: async (): Promise<Resident[]> => {
    const { data } = await api.get<Resident[]>('/residents');
    return data;
  },

  // tao resident moi
  createResident: async (resident: Resident): Promise<Resident> => {
    const { data } = await api.post<Resident>('/residents', resident);
    return data;
  },
  
};

export default residentService;

