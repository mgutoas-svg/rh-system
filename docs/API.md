# RH System API Documentation

## Authentication

All endpoints require JWT token in `Authorization: Bearer <token>` header.

### POST /auth/login
- Body: `{email, password}`
- Response: `{token, user}`

### GET /auth/me
- Response: User object

## Employees

### GET /api/employees
- Response: Employee[]

### POST /api/employees
- Requires: RH or ADMIN
- Body: `{nome, departmentId, positionId, salarioBase}`

### GET /api/employees/:id
- Response: Employee

### PUT /api/employees/:id
- Requires: RH or ADMIN
- Body: Partial employee fields

### DELETE /api/employees/:id
- Requires: ADMIN

## Payroll

### GET /api/payroll
- Requires: RH or ADMIN
- Response: PayrollRun[]

### POST /api/payroll
- Requires: RH or ADMIN
- Body: `{mes, ano}`
- Response: PayrollRun

### GET /api/payroll/:id
- Requires: RH or ADMIN
- Response: PayrollRun with items
