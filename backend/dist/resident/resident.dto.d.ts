export declare class CreateResidentDto {
    householdId: string;
    fullName: string;
    phone: string;
    password: string;
    email: string;
    role?: string;
    temporaryStatus: boolean;
    idNumber: string;
    birthDate: string;
}
export declare class UpdateResidentDto {
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
