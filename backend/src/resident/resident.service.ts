import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResidentDto, UpdateResidentDto } from './resident.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResidentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateResidentDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.resident.create({
      data: {
        ...data,
        password: hashedPassword,
        birthDate: new Date(data.birthDate),
      },
    });
  }

  findAll() {
    return this.prisma.resident.findMany({
      include: { household: true, notifications: true, invoices: true },
    });
  }

  findOne(id: string) {
    return this.prisma.resident.findUnique({
      where: { id },
      include: { household: true, notifications: true, invoices: true },
    });
  }

  async update(id: string, data: UpdateResidentDto) {
    return this.prisma.resident.update({
      where: { id },
      data: {
        ...data,
        ...(data.password && {
          password: await bcrypt.hash(data.password, 10),
        }),
        ...(data.birthDate && { birthDate: new Date(data.birthDate) }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.resident.delete({ where: { id } });
  }
}
