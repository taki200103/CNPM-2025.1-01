"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseholdService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let HouseholdService = class HouseholdService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.household.create({
            data: {
                ...data,
                contractStartDate: new Date(data.contractStartDate),
                contractEndDate: new Date(data.contractEndDate),
            },
        });
    }
    findAll() {
        return this.prisma.household.findMany({
            include: { apartment: true, residents: true },
        });
    }
    findOne(id) {
        return this.prisma.household.findUnique({
            where: { id },
            include: { apartment: true, residents: true },
        });
    }
    update(id, data) {
        return this.prisma.household.update({
            where: { id },
            data: {
                ...data,
                ...(data.contractStartDate && {
                    contractStartDate: new Date(data.contractStartDate),
                }),
                ...(data.contractEndDate && {
                    contractEndDate: new Date(data.contractEndDate),
                }),
            },
        });
    }
    remove(id) {
        return this.prisma.household.delete({ where: { id } });
    }
};
exports.HouseholdService = HouseholdService;
exports.HouseholdService = HouseholdService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HouseholdService);
//# sourceMappingURL=household.service.js.map