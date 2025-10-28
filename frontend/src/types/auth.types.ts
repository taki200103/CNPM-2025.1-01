// src/types/auth.types.ts

export interface LoginDto {
    email: string;
    password: string;
  }
  
  export interface User {
    id: string;
    email: string;
    fullName?: string;
    name?: string;
    role: string;
    phone?: string;
    idNumber?: string;
    birthDate?: string;
    householdId?: string;
    temporaryStatus?: boolean;
  }
  
  export interface LoginResponse {
    access_token: string;
    user: User;
  }
  
  export interface AuthContextType {
    user: User | null;
    login: (loginDto: LoginDto) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
  }