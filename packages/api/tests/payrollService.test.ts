import { describe, it, expect } from 'vitest';
import { calculatePayroll } from '../src/services/payrollService';

describe('payrollService', () => {
  it('calculates payroll correctly', async () => {
    const employee = { salarioBase: 5000 };
    const result = await calculatePayroll(employee, 11, 2026);

    expect(result.descontos.inss).toBe(400);
    expect(result.descontos.irrf).toBe(450);
    expect(result.liquido).toBe(4150);
  });

  it('handles low salary correctly', async () => {
    const employee = { salarioBase: 1000 };
    const result = await calculatePayroll(employee, 11, 2026);

    expect(result.descontos.inss).toBe(80);
    expect(result.descontos.irrf).toBe(0);
    expect(result.liquido).toBe(920);
  });

  it('calculates INSS at 8%', async () => {
    const employee = { salarioBase: 2500 };
    const result = await calculatePayroll(employee, 11, 2026);

    expect(result.descontos.inss).toBe(200);
  });
});
