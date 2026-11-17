import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const INSS_RATE = 0.08;
const IRRF_RATE = 0.11;

export async function calculatePayroll(employee: any, mes: number, ano: number) {
  const descontos: Record<string, number> = {
    inss: employee.salarioBase * INSS_RATE,
    irrf: Math.max(employee.salarioBase * IRRF_RATE - 100, 0)
  };

  const adicionais: Record<string, number> = {
    bonus: 0
  };

  const totalDescontos = Object.values(descontos).reduce((a, b) => a + b, 0);
  const totalAdicionais = Object.values(adicionais).reduce((a, b) => a + b, 0);
  const liquido = employee.salarioBase - totalDescontos + totalAdicionais;

  return { descontos, adicionais, liquido };
}

export async function generatePayrollRun(mes: number, ano: number) {
  const existente = await prisma.payrollRun.findUnique({
    where: { mes_ano: { mes, ano } }
  });

  if (existente) throw new Error('Payroll já existe para este mês/ano');

  const employees = await prisma.employee.findMany({
    where: { status: 'ativo', dataSaida: null }
  });

  const run = await prisma.payrollRun.create({
    data: { mes, ano, status: 'rascunho' }
  });

  let totalPago = 0;

  for (const emp of employees) {
    const { descontos, adicionais, liquido } = await calculatePayroll(emp, mes, ano);

    await prisma.payrollItem.create({
      data: {
        runId: run.id,
        employeeId: emp.id,
        salarioBase: emp.salarioBase,
        descontos,
        adicionais,
        liquido
      }
    });

    totalPago += liquido;
  }

  await prisma.payrollRun.update({
    where: { id: run.id },
    data: { totalPago }
  });

  return run;
}

export async function getPayrollRuns() {
  return prisma.payrollRun.findMany({
    include: { items: { include: { employee: true } } },
    orderBy: { ano: 'desc' }
  });
}

export async function getPayrollRunById(id: string) {
  return prisma.payrollRun.findUnique({
    where: { id },
    include: { items: { include: { employee: true } } }
  });
}
