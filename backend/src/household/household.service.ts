import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HouseholdService {
  constructor(private prisma: PrismaService) {}

  create(data: {
    apartmentId: string;
    contractStartDate: string;
    contractEndDate: string;
    ownerId: string;
  }) {
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

  findOne(id: string) {
    return this.prisma.household.findUnique({
      where: { id },
      include: { apartment: true, residents: true },
    });
  }

  update(
    id: string,
    data: {
      apartmentId?: string;
      contractStartDate?: string;
      contractEndDate?: string;
      ownerId?: string;
    },
  ) {
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

  remove(id: string) {
    return this.prisma.household.delete({ where: { id } });
  }
}
