import { z } from 'zod';

export const createEmployeeSchema = z.object({
  nome: z.string().min(1),
  cpf: z.string().optional(),
  email: z.string().email().optional(),
  telefone: z.string().optional(),
  departmentId: z.string(),
  positionId: z.string(),
  salarioBase: z.number().positive(),
});

export const updateEmployeeSchema = z.object({
  nome: z.string().min(1).optional(),
  status: z.enum(['ativo', 'inativo', 'ferias', 'afastado']).optional(),
  salarioBase: z.number().positive().optional(),
  dataSaida: z.string().datetime().optional(),
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
