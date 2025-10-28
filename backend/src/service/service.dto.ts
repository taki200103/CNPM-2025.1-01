import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Phí quản lý' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Phí quản lý chung cư hàng tháng' })
  @IsString()
  @IsNotEmpty()
  info: string;

  @ApiProperty({ example: 'Theo diện tích' })
  @IsString()
  @IsNotEmpty()
  calculate: string;
}

export class UpdateServiceDto {
  @ApiProperty({ example: 'Phí quản lý', required: false })
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Phí quản lý chung cư hàng tháng', required: false })
  @IsString()
  info?: string;

  @ApiProperty({ example: 'Theo diện tích', required: false })
  @IsString()
  calculate?: string;
}
