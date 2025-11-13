export interface CreateHouseholdDto {
	apartmentId: string;
	contractStartDate: string; // ISO date string (e.g., '2024-01-01')
	contractEndDate: string; // ISO date string (e.g., '2025-01-01')
	ownerId: string;
}

export interface UpdateHouseholdDto {
	apartmentId?: string;
	contractStartDate?: string; // ISO date string
	contractEndDate?: string; // ISO date string
	ownerId?: string;
}

export interface Household {
	id: string;
	apartmentId: string;
	contractStartDate: string;
	contractEndDate: string;
	ownerId: string;
	createdAt?: string;
	updatedAt?: string;
}

