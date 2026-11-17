import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import employeeRoutes from './routes/employees';
import payrollRoutes from './routes/payroll';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/payroll', payrollRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

export default app;
