import { NotificationService } from './notification.service';
import { CreateNotificationDto, UpdateNotificationDto } from './notification.dto';
export declare class NotificationController {
    private readonly service;
    constructor(service: NotificationService);
    create(data: CreateNotificationDto): import("@prisma/client").Prisma.Prisma__NotificationClient<{
        info: string;
        id: string;
        createdAt: Date;
        creator: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<({
        residents: {
            notificationId: string;
            residentId: string;
        }[];
    } & {
        info: string;
        id: string;
        createdAt: Date;
        creator: string;
    })[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__NotificationClient<({
        residents: {
            notificationId: string;
            residentId: string;
        }[];
    } & {
        info: string;
        id: string;
        createdAt: Date;
        creator: string;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, data: UpdateNotificationDto): import("@prisma/client").Prisma.Prisma__NotificationClient<{
        info: string;
        id: string;
        createdAt: Date;
        creator: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__NotificationClient<{
        info: string;
        id: string;
        createdAt: Date;
        creator: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
