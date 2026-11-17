import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generateToken, hashPassword, verifyPassword } from '../services/authService';
import { checkAuth } from '../middleware/auth';
import { loginSchema } from '@rh-system/shared';

const router = Router();
const prisma = new PrismaClient();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(user.id, user.role);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/me', checkAuth, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/logout', checkAuth, (req: Request, res: Response) => {
  res.json({ message: 'Logged out' });
});

export default router;
