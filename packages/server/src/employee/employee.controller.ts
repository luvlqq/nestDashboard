import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  async findAll(@Query('name') name: string): Promise<Employee[]> {
    return this.employeeService.getAllEmployees(name);
  }

  @Post()
  async create(@Body() employeeData: Employee): Promise<Employee> {
    return this.employeeService.create(employeeData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Employee> {
    return this.employeeService.delete(id);
  }
}
