export type View = 'overview' | 'residents' | 'notifications' | 'fees' | 'statistics' | 'services' | 'expenses';

export type ResidentRecord = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: string;
  temporaryStatus: boolean;
  apartment?: { name?: string };
};

export const residentRoles = [
  { value: 'resident', label: 'Cư dân' },
  { value: 'admin', label: 'Quản trị viên' },
  { value: 'police', label: 'Bảo vệ' },
  { value: 'accountant', label: 'Kế toán' },
];

