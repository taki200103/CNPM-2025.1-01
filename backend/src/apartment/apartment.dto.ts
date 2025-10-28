import { ApiProperty } from '@nestjs/swagger';

export class CreateApartmentDto {
  @ApiProperty({
    description: 'Floor number of the apartment',
    example: '1',
  })
  floor: string;

  @ApiProperty({
    description: 'Area of the apartment in square meters',
    example: '50',
  })
  area: string;
}

export class UpdateApartmentDto {
  @ApiProperty({
    description: 'Floor number of the apartment',
    example: '1',
    required: false,
  })
  floor?: string;

  @ApiProperty({
    description: 'Area of the apartment in square meters',
    example: '50',
    required: false,
  })
  area?: string;
}
