import { PrismaService } from '../prisma/prisma.service';
export declare class ApartmentService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        floor: string;
        area: string;
    }): import("@prisma/client").Prisma.Prisma__ApartmentClient<{
        id: string;
        floor: string;
        area: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        households: {
            id: string;
            contractStartDate: Date;
            contractEndDate: Date;
            ownerId: string;
            apartmentId: string;
        }[];
    } & {
        id: string;
        floor: string;
        area: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ApartmentClient<({
        households: {
            id: string;
            contractStartDate: Date;
            contractEndDate: Date;
            ownerId: string;
            apartmentId: string;
        }[];
    } & {
        id: string;
        floor: string;
        area: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: {
        floor?: string;
        area?: string;
    }): import("@prisma/client").Prisma.Prisma__ApartmentClient<{
        id: string;
        floor: string;
        area: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ApartmentClient<{
        id: string;
        floor: string;
        area: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
