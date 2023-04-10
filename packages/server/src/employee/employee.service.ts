import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  getAllEmployees(name?: string): Promise<Employee[]> {
    const where = name ? { firstName: { contains: name } } : {};
    return this.prisma.employee.findMany({ where });
  }
  getEmployee() {}
  async create(employeeData: Employee): Promise<Employee> {
    return this.prisma.employee.create({ data: employeeData });
  }

  async delete(id: number): Promise<Employee> {
    return this.prisma.employee.delete({ where: { id } });
  }
}
