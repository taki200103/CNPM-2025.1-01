import api from './api.service';
import type { CreateHouseholdDto, UpdateHouseholdDto, Household } from '../types/household.type';

const householdService = {
	// Create new household
	create: async (payload: CreateHouseholdDto): Promise<Household> => {
		const { data } = await api.post<Household>('/households', payload);
		return data;
	},

	// Get all households
	getAll: async (): Promise<Household[]> => {
		const { data } = await api.get<Household[]>('/households');
		return data;
	},

	// Try to get households without triggering auth redirect (for public contexts)
	getAllPublicSafe: async (): Promise<Household[]> => {
		const { data } = await api.get<Household[]>('/households', { skipAuthRedirect: true } as unknown as Record<string, unknown>);
		return data;
	},

	// Get household by ID
	getById: async (id: string): Promise<Household> => {
		const { data } = await api.get<Household>(`/households/${id}`);
		return data;
	},

	// Update household
	update: async (id: string, payload: UpdateHouseholdDto): Promise<Household> => {
		const { data } = await api.put<Household>(`/households/${id}`, payload);
		return data;
	},

	// Delete household
	remove: async (id: string): Promise<{ message: string }> => {
		const { data } = await api.delete<{ message: string }>(`/households/${id}`);
		return data;
	},
};

export default householdService;

