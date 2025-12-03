import { PrismaService } from '../prisma/prisma.service';
import { CreateResidentDto, UpdateResidentDto } from './resident.dto';
export declare class ResidentService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateResidentDto): Promise<{
        apartment: {
            name: string;
            contractStartDate: Date;
            contractEndDate: Date;
            ownerId: string;
            area: number;
            id: string;
        } | null;
        notifications: {
            notificationId: string;
            residentId: string;
        }[];
        invoices: {
            name: string;
            id: string;
            residentId: string;
            createdAt: Date;
            serviceId: number;
            money: number;
        }[];
        complains: {
            title: string;
            id: string;
            residentId: string;
            createdAt: Date;
            responseText: string | null;
            message: string;
            status: string;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        apartmentId: string | null;
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
        apartment: {
            name: string;
            contractStartDate: Date;
            contractEndDate: Date;
            ownerId: string;
            area: number;
            id: string;
        } | null;
        notifications: {
            notificationId: string;
            residentId: string;
        }[];
        invoices: {
            name: string;
            id: string;
            residentId: string;
            createdAt: Date;
            serviceId: number;
            money: number;
        }[];
        complains: {
            title: string;
            id: string;
            residentId: string;
            createdAt: Date;
            responseText: string | null;
            message: string;
            status: string;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        apartmentId: string | null;
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
        apartment: {
            name: string;
            contractStartDate: Date;
            contractEndDate: Date;
            ownerId: string;
            area: number;
            id: string;
        } | null;
        notifications: {
            notificationId: string;
            residentId: string;
        }[];
        invoices: {
            name: string;
            id: string;
            residentId: string;
            createdAt: Date;
            serviceId: number;
            money: number;
        }[];
        complains: {
            title: string;
            id: string;
            residentId: string;
            createdAt: Date;
            responseText: string | null;
            message: string;
            status: string;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        apartmentId: string | null;
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
        apartment: {
            name: string;
            contractStartDate: Date;
            contractEndDate: Date;
            ownerId: string;
            area: number;
            id: string;
        } | null;
        notifications: {
            notificationId: string;
            residentId: string;
        }[];
        invoices: {
            name: string;
            id: string;
            residentId: string;
            createdAt: Date;
            serviceId: number;
            money: number;
        }[];
        complains: {
            title: string;
            id: string;
            residentId: string;
            createdAt: Date;
            responseText: string | null;
            message: string;
            status: string;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        apartmentId: string | null;
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
        apartmentId: string | null;
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
