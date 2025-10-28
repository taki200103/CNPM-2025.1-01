import { Module } from '@nestjs/common';
import { ResidentnotificationController } from './residentnotification.controller';
import { ResidentnotificationService } from './residentnotification.service';

@Module({
  controllers: [ResidentnotificationController],
  providers: [ResidentnotificationService],
})
export class ResidentnotificationModule {}
