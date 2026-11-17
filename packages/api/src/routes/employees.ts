import { Router, Request, Response } from 'express';
import { checkAuth, hasRole } from '../middleware/auth';
import * as employeeService from '../services/employeeService';
import { createEmployeeSchema, updateEmployeeSchema } from '@rh-system/shared';

const router = Router();

router.get('/', checkAuth, async (req: Request, res: Response) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

router.get('/:id', checkAuth, async (req: Request, res: Response) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
});

router.post('/', checkAuth, hasRole(['ADMIN', 'RH']), async (req: Request, res: Response) => {
  try {
    const data = createEmployeeSchema.parse(req.body);
    const employee = await employeeService.createEmployee(data);
    res.status(201).json(employee);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', checkAuth, hasRole(['ADMIN', 'RH']), async (req: Request, res: Response) => {
  try {
    const data = updateEmployeeSchema.parse(req.body);
    const employee = await employeeService.updateEmployee(req.params.id, data);
    res.json(employee);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', checkAuth, hasRole(['ADMIN']), async (req: Request, res: Response) => {
  try {
    await employeeService.deleteEmployee(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

export default router;
