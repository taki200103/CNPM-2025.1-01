import { PrismaService } from '../prisma/prisma.service';
export declare class HouseholdService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        apartmentId: string;
        contractStartDate: string;
        contractEndDate: string;
        ownerId: string;
    }): import("@prisma/client").Prisma.Prisma__HouseholdClient<{
        id: string;
        contractStartDate: Date;
        contractEndDate: Date;
        ownerId: string;
        apartmentId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        apartment: {
            id: string;
            floor: string;
            area: string;
        };
        residents: {
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
        }[];
    } & {
        id: string;
        contractStartDate: Date;
        contractEndDate: Date;
        ownerId: string;
        apartmentId: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__HouseholdClient<({
        apartment: {
            id: string;
            floor: string;
            area: string;
        };
        residents: {
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
        }[];
    } & {
        id: string;
        contractStartDate: Date;
        contractEndDate: Date;
        ownerId: string;
        apartmentId: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: {
        apartmentId?: string;
        contractStartDate?: string;
        contractEndDate?: string;
        ownerId?: string;
    }): import("@prisma/client").Prisma.Prisma__HouseholdClient<{
        id: string;
        contractStartDate: Date;
        contractEndDate: Date;
        ownerId: string;
        apartmentId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__HouseholdClient<{
        id: string;
        contractStartDate: Date;
        contractEndDate: Date;
        ownerId: string;
        apartmentId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
