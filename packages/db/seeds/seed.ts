import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      passwordHash: hash,
      role: 'ADMIN'
    }
  });
  
  console.log('Created admin user:', admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.\());
