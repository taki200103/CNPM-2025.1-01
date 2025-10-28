import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateHouseholdDto {
  @ApiProperty({ example: 'uuid-apartment-id' })
  @IsString()
  @IsNotEmpty()
  apartmentId: string;

  @ApiProperty({ example: '2024-01-01' })
  @IsDateString()
  @IsNotEmpty()
  contractStartDate: string;

  @ApiProperty({ example: '2025-01-01' })
  @IsDateString()
  @IsNotEmpty()
  contractEndDate: string;

  @ApiProperty({ example: 'uuid-owner-id' })
  @IsString()
  @IsNotEmpty()
  ownerId: string;
}

export class UpdateHouseholdDto {
  @ApiProperty({ example: 'uuid-apartment-id', required: false })
  @IsString()
  apartmentId?: string;

  @ApiProperty({ example: '2024-01-01', required: false })
  @IsDateString()
  contractStartDate?: string;

  @ApiProperty({ example: '2025-01-01', required: false })
  @IsDateString()
  contractEndDate?: string;

  @ApiProperty({ example: 'uuid-owner-id', required: false })
  @IsString()
  ownerId?: string;
}
