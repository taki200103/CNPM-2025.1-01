import { PrismaService } from '../prisma/prisma.service';
export declare class ServiceService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        info: string;
        calculate: string;
    }): import("@prisma/client").Prisma.Prisma__ServiceClient<{
        info: string;
        id: string;
        name: string;
        calculate: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        invoices: {
            id: string;
            name: string;
            createdAt: Date;
            serviceId: string;
            residentId: string;
            money: number;
        }[];
    } & {
        info: string;
        id: string;
        name: string;
        calculate: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ServiceClient<({
        invoices: {
            id: string;
            name: string;
            createdAt: Date;
            serviceId: string;
            residentId: string;
            money: number;
        }[];
    } & {
        info: string;
        id: string;
        name: string;
        calculate: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: {
        name?: string;
        info?: string;
        calculate?: string;
    }): import("@prisma/client").Prisma.Prisma__ServiceClient<{
        info: string;
        id: string;
        name: string;
        calculate: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ServiceClient<{
        info: string;
        id: string;
        name: string;
        calculate: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
