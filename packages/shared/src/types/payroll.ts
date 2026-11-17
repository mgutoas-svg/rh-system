export interface PayrollItemDTO {
  id: string;
  employeeId: string;
  salarioBase: number;
  descontos: Record<string, number>;
  adicionais: Record<string, number>;
  liquido: number;
}

export interface PayrollRunDTO {
  id: string;
  mes: number;
  ano: number;
  status: string;
  totalPago: number;
}
