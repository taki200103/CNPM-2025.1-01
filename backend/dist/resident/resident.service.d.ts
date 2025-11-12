import { PrismaService } from '../prisma/prisma.service';
import { CreateResidentDto, UpdateResidentDto } from './resident.dto';
export declare class ResidentService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateResidentDto): Promise<{
        id: string;
        fullName: string;
        phone: string;
        password: string;
        email: string;
        role: string;
        temporaryStatus: boolean;
        idNumber: string;
        birthDate: Date;
        householdId: string;
    }>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        household: {
            id: string;
            apartmentId: string;
            contractStartDate: Date;
            contractEndDate: Date;
            ownerId: string;
        };
        notifications: {
            notificationId: string;
            residentId: string;
        }[];
        invoices: {
            id: string;
            name: string;
            residentId: string;
            createdAt: Date;
            serviceId: string;
            money: number;
        }[];
    } & {
        id: string;
        fullName: string;
        phone: string;
        password: string;
        email: string;
        role: string;
        temporaryStatus: boolean;
        idNumber: string;
        birthDate: Date;
        householdId: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ResidentClient<({
        household: {
            id: string;
            apartmentId: string;
            contractStartDate: Date;
            contractEndDate: Date;
            ownerId: string;
        };
        notifications: {
            notificationId: string;
            residentId: string;
        }[];
        invoices: {
            id: string;
            name: string;
            residentId: string;
            createdAt: Date;
            serviceId: string;
            money: number;
        }[];
    } & {
        id: string;
        fullName: string;
        phone: string;
        password: string;
        email: string;
        role: string;
        temporaryStatus: boolean;
        idNumber: string;
        birthDate: Date;
        householdId: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: UpdateResidentDto): Promise<{
        id: string;
        fullName: string;
        phone: string;
        password: string;
        email: string;
        role: string;
        temporaryStatus: boolean;
        idNumber: string;
        birthDate: Date;
        householdId: string;
    }>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ResidentClient<{
        id: string;
        fullName: string;
        phone: string;
        password: string;
        email: string;
        role: string;
        temporaryStatus: boolean;
        idNumber: string;
        birthDate: Date;
        householdId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
