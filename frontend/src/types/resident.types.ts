export interface Resident {
    id: string;
    householdId: string;
    fullName: string;
    password?: string;
    phone: string;
    email: string;
    role: string;
    temporaryStatus: boolean;
    idNumber: string;
    birthDate: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface UpdateResidentDto {
    householdId?: string;
    fullName?: string;
    phone?: string;
    password?: string;
    email?: string;
    role?: string;
    temporaryStatus?: boolean;
    idNumber?: string;
    birthDate?: string;
  }