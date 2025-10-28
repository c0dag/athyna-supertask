import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApplicationQueryDto } from './dto/application-query.dto';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job application' })
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all applications with optional filters' })
  findAll(@Query() query: ApplicationQueryDto) {
    return this.applicationsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get application by ID' })
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete application' })
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(id);
  }
}
