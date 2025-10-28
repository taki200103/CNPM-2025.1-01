export interface Service {
  id: string;
  name: string;
  info: string;
  calculate: string;
}

export interface Resident {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface Invoice {
  id: string;
  createdAt: string;
  serviceId: string;
  residentId: string;
  name: string;
  money: number;
  service: Service;
  resident: Resident;
}

export type InvoiceList = Invoice[];