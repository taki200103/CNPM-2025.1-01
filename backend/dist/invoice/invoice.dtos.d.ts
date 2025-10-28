export declare class CreateInvoiceDto {
    serviceId: string;
    residentId: string;
    name: string;
    money: number;
}
declare const UpdateInvoiceDto_base: import("@nestjs/common").Type<Partial<CreateInvoiceDto>>;
export declare class UpdateInvoiceDto extends UpdateInvoiceDto_base {
}
export declare class InvoiceResponseDto {
    id: string;
    createdAt: Date;
    serviceId: string;
    residentId: string;
    name: string;
    money: number;
    service?: {
        id: string;
        name: string;
        info: string;
        calculate: string;
    };
    resident?: {
        id: string;
        fullName: string;
        email: string;
        phone: string;
    };
}
export {};
