// src/types/service.types.ts

export interface Service {
    id: string;
    name: string;
    info: string;
    calculate: string;
    invoices: [];
  }
  
  export interface CreateServiceDto {
    name: string;
    info: string;
    calculate: string;
  }
  
  export interface UpdateServiceDto {
    name?: string;
    info?: string;
    calculate?: string;
  }
  
  export interface ServiceResponse {
    id: string;
    name: string;
    info: string;
    calculate: string;
    invoices: [];
  }