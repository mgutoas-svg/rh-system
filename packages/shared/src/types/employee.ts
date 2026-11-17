export interface EmployeeDTO {
  id: string;
  nome: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  departmentId: string;
  positionId: string;
  status: string;
  salarioBase: number;
  dataContratacao: Date;
  dataSaida?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEmployeeInput {
  nome: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  departmentId: string;
  positionId: string;
  salarioBase: number;
}

export interface UpdateEmployeeInput {
  nome?: string;
  status?: string;
  salarioBase?: number;
  dataSaida?: Date;
}
