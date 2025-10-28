import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApartmentModule } from './apartment/apartment.module';
import { PrismaModule } from './prisma/prisma.module';
import { HouseholdModule } from './household/household.module';
import { ResidentModule } from './resident/resident.module';
import { NotificationModule } from './notification/notification.module';
import { ServiceModule } from './service/service.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ResidentnotificationModule } from './residentnotification/residentnotification.module';

@Module({
  imports: [
    ApartmentModule,
    PrismaModule,
    HouseholdModule,
    ResidentModule,
    NotificationModule,
    ServiceModule,
    AuthModule,
    InvoiceModule,
    ResidentnotificationModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
