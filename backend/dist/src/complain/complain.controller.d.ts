import { ComplainService } from './complain.service';
import { CreateComplainDto, UpdateComplainDto } from './complain.dto';
export declare class ComplainController {
    private readonly service;
    constructor(service: ComplainService);
    create(data: CreateComplainDto): import("@prisma/client").Prisma.Prisma__ComplainClient<{
        resident: {
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
        };
    } & {
        title: string;
        id: string;
        residentId: string;
        createdAt: Date;
        responseText: string | null;
        message: string;
        status: string;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(residentId?: string): import("@prisma/client").Prisma.PrismaPromise<({
        resident: {
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
        };
    } & {
        title: string;
        id: string;
        residentId: string;
        createdAt: Date;
        responseText: string | null;
        message: string;
        status: string;
        updatedAt: Date;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__ComplainClient<({
        resident: {
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
        };
    } & {
        title: string;
        id: string;
        residentId: string;
        createdAt: Date;
        responseText: string | null;
        message: string;
        status: string;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: UpdateComplainDto): import("@prisma/client").Prisma.Prisma__ComplainClient<{
        resident: {
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
        };
    } & {
        title: string;
        id: string;
        residentId: string;
        createdAt: Date;
        responseText: string | null;
        message: string;
        status: string;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__ComplainClient<{
        title: string;
        id: string;
        residentId: string;
        createdAt: Date;
        responseText: string | null;
        message: string;
        status: string;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
