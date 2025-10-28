import { ResidentService } from './resident.service';
import { CreateResidentDto, UpdateResidentDto } from './resident.dto';
export declare class ResidentController {
    private readonly service;
    constructor(service: ResidentService);
    create(data: CreateResidentDto): Promise<{
        id: string;
        householdId: string;
        fullName: string;
        phone: string;
        password: string;
        email: string;
        role: string;
        temporaryStatus: boolean;
        idNumber: string;
        birthDate: Date;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        household: {
            id: string;
            contractStartDate: Date;
            contractEndDate: Date;
            ownerId: string;
            apartmentId: string;
        };
        notifications: {
            residentId: string;
            notificationId: string;
        }[];
        invoices: {
            id: string;
            name: string;
            createdAt: Date;
            serviceId: string;
            residentId: string;
            money: number;
        }[];
    } & {
        id: string;
        householdId: string;
        fullName: string;
        phone: string;
        password: string;
        email: string;
        role: string;
        temporaryStatus: boolean;
        idNumber: string;
        birthDate: Date;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ResidentClient<({
        household: {
            id: string;
            contractStartDate: Date;
            contractEndDate: Date;
            ownerId: string;
            apartmentId: string;
        };
        notifications: {
            residentId: string;
            notificationId: string;
        }[];
        invoices: {
            id: string;
            name: string;
            createdAt: Date;
            serviceId: string;
            residentId: string;
            money: number;
        }[];
    } & {
        id: string;
        householdId: string;
        fullName: string;
        phone: string;
        password: string;
        email: string;
        role: string;
        temporaryStatus: boolean;
        idNumber: string;
        birthDate: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: UpdateResidentDto): Promise<{
        id: string;
        householdId: string;
        fullName: string;
        phone: string;
        password: string;
        email: string;
        role: string;
        temporaryStatus: boolean;
        idNumber: string;
        birthDate: Date;
    }>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ResidentClient<{
        id: string;
        householdId: string;
        fullName: string;
        phone: string;
        password: string;
        email: string;
        role: string;
        temporaryStatus: boolean;
        idNumber: string;
        birthDate: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
