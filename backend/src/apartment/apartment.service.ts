import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApartmentService {
  constructor(private prisma: PrismaService) {}

  create(data: { floor: string; area: string }) {
    return this.prisma.apartment.create({ data });
  }

  findAll() {
    return this.prisma.apartment.findMany({ include: { households: true } });
  }

  findOne(id: string) {
    return this.prisma.apartment.findUnique({
      where: { id },
      include: { households: true },
    });
  }

  update(id: string, data: { floor?: string; area?: string }) {
    return this.prisma.apartment.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.apartment.delete({ where: { id } });
  }
}
