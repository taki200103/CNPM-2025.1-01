import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  create(data: { name: string; info: string; calculate: string }) {
    return this.prisma.service.create({ data });
  }

  findAll() {
    return this.prisma.service.findMany({
      include: { invoices: true },
    });
  }

  findOne(id: string) {
    return this.prisma.service.findUnique({
      where: { id },
      include: { invoices: true },
    });
  }

  update(
    id: string,
    data: { name?: string; info?: string; calculate?: string },
  ) {
    return this.prisma.service.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.service.delete({ where: { id } });
  }
}
