import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Department, Prisma } from '@prisma/client';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async createDepartment(
    data: Prisma.DepartmentCreateInput,
  ): Promise<Department> {
    return this.prisma.department.create({ data });
  }

  async getDepartments(): Promise<Department[]> {
    return this.prisma.department.findMany();
  }

  async getDepartmentById(id: number): Promise<Department> {
    return this.prisma.department.findUnique({
      where: { id },
      include: { employees: true },
    });
  }

  async updateDepartment(
    id: number,
    data: Omit<Department, 'id' | 'createdAt' | 'employees'>,
  ): Promise<Department> {
    return this.prisma.department.update({ where: { id }, data });
  }

  async deleteDepartment(id: number): Promise<Department> {
    return this.prisma.department.delete({ where: { id } });
  }

  async addEmployeeToDepartment(
    departmentId: number,
    employeeId: number,
  ): Promise<Department> {
    return this.prisma.department.update({
      where: { id: departmentId },
      data: { employees: { connect: { id: employeeId } } },
    });
  }

  async removeEmployeeFromDepartment(
    departmentId: number,
    employeeId: number,
  ): Promise<Department> {
    return this.prisma.department.update({
      where: { id: departmentId },
      data: { employees: { disconnect: { id: employeeId } } },
    });
  }
}
