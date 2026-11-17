import { Router, Request, Response } from 'express';
import { checkAuth, hasRole } from '../middleware/auth';
import * as payrollService from '../services/payrollService';

const router = Router();

router.get('/', checkAuth, hasRole(['ADMIN', 'RH']), async (req: Request, res: Response) => {
  try {
    const runs = await payrollService.getPayrollRuns();
    res.json(runs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', checkAuth, hasRole(['ADMIN', 'RH']), async (req: Request, res: Response) => {
  try {
    const run = await payrollService.getPayrollRunById(req.params.id);
    if (!run) return res.status(404).json({ error: 'Payroll not found' });
    res.json(run);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', checkAuth, hasRole(['ADMIN', 'RH']), async (req: Request, res: Response) => {
  const { mes, ano } = req.body;

  if (!mes || !ano) {
    return res.status(400).json({ error: 'mes e ano são obrigatórios' });
  }

  try {
    const run = await payrollService.generatePayrollRun(mes, ano);
    res.status(201).json(run);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
