import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllEmployees() {
  return prisma.employee.findMany({
    include: { department: true, position: true }
  });
}

export async function getEmployeeById(id: string) {
  return prisma.employee.findUnique({
    where: { id },
    include: { department: true, position: true }
  });
}

export async function createEmployee(data: any) {
  return prisma.employee.create({
    data: {
      ...data,
      dataContratacao: new Date()
    },
    include: { department: true, position: true }
  });
}

export async function updateEmployee(id: string, data: any) {
  return prisma.employee.update({
    where: { id },
    data,
    include: { department: true, position: true }
  });
}

export async function deleteEmployee(id: string) {
  await prisma.employee.delete({ where: { id } });
}
