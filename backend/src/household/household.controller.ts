import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { HouseholdService } from './household.service';
import { CreateHouseholdDto, UpdateHouseholdDto } from './household.dto';

@ApiTags('Households')
@Controller('households')
export class HouseholdController {
  constructor(private readonly service: HouseholdService) {}

  @Post()
  @ApiOperation({ summary: 'Create new household' })
  @ApiBody({ type: CreateHouseholdDto })
  create(@Body() data: CreateHouseholdDto) {
    return this.service.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all households' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get household by ID' })
  @ApiParam({ name: 'id', description: 'Household ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update household' })
  @ApiParam({ name: 'id', description: 'Household ID' })
  @ApiBody({ type: UpdateHouseholdDto })
  update(@Param('id') id: string, @Body() data: UpdateHouseholdDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete household' })
  @ApiParam({ name: 'id', description: 'Household ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
