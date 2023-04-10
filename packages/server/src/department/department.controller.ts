import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Department, Prisma } from '@prisma/client';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async getAllDepartments(): Promise<Department[]> {
    return this.departmentService.getDepartments();
  }

  @Get(':id')
  async getDepartmentById(@Param('id') id: number): Promise<Department> {
    return this.departmentService.getDepartmentById(id);
  }

  @Post()
  async createDepartment(
    @Body() departmentData: Prisma.DepartmentCreateInput,
  ): Promise<Department> {
    return this.departmentService.createDepartment(departmentData);
  }

  @Delete(':id')
  async deleteDepartment(@Param('id') id: number): Promise<Department> {
    return this.departmentService.deleteDepartment(id);
  }

  // @Post(':id/employees')
  // async addEmployeeToDepartment(
  //   @Param('id') id: number,
  //   @Body() employeeData: Prisma.EmployeeCreateInput,
  // ): Promise<Department> {
  //   return this.departmentService.addEmployeeToDepartment(id, employeeData);
  // }

  @Delete(':id/employees/:employeeId')
  async removeEmployeeFromDepartment(
    @Param('id') id: number,
    @Param('employeeId') employeeId: number,
  ): Promise<Department> {
    return this.departmentService.removeEmployeeFromDepartment(id, employeeId);
  }
}
