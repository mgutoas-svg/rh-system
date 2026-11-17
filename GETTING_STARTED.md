# RH System — Getting Started

**Status:** ✅ Production-ready MVP  
**Version:** 0.1.0  
**Last Updated:** 2026-11-17

---

## 🚀 Quick Start (5 minutes)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/rh-system.git
cd rh-system
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Start local development
```bash
# Option A: Docker Compose (recommended)
docker-compose up

# Option B: Manual setup
docker-compose up postgres
cd packages/api && pnpm dev    # Terminal 1
cd packages/app && pnpm dev    # Terminal 2
```

### 4. Access the application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001
- **API Health:** http://localhost:3001/health

### 5. Login
- **Email:** admin@example.com
- **Password:** admin123

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Project overview & local setup |
| [docs/API.md](docs/API.md) | API endpoints & authentication |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment guide |
| [GITHUB_VPS_DEPLOY.md](GITHUB_VPS_DEPLOY.md) | GitHub + VPS step-by-step |
| [PUBLISH.md](PUBLISH.md) | GitHub publication checklist |

---

## 🏗️ Project Structure

```
packages/
├── app/              React 18 frontend (Vite)
├── api/              Node.js Express backend
├── db/               Prisma ORM & schema
└── shared/           Shared types & validators
```

**Key Files:**
- `docker-compose.yml` — Local development
- `.env.example` — Environment variables template
- `package.json` — Workspace root (pnpm)
- `turbo.json` — Build pipeline

---

## ⚙️ Configuration

### Local Development

1. Copy `.env.example` to `.env`
2. Update if needed (defaults work locally)

```bash
DATABASE_URL=postgresql://rh_user:rh_password@localhost:5432/rh_db
JWT_SECRET=dev-secret-change-in-production
NODE_ENV=development
PORT=3001
```

### Production

See [GITHUB_VPS_DEPLOY.md](GITHUB_VPS_DEPLOY.md) for full instructions.

---

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Specific package
pnpm test --filter=api
```

---

## 📦 Build

```bash
# Build all packages
pnpm build

# Build specific package
pnpm build --filter=api
pnpm build --filter=app

# Output locations:
# - Frontend: packages/app/dist
# - Backend: packages/api/dist
```

---

## 🔄 Development Workflow

### Add a new dependency
```bash
# Global
pnpm add lodash

# To specific package
pnpm --filter=api add express
```

### Create a new API endpoint
```bash
# 1. Add route in packages/api/src/routes/
# 2. Add service in packages/api/src/services/
# 3. Add types in packages/shared/src/types/
# 4. Add tests in packages/api/tests/
# 5. Update packages/api/src/index.ts
```

### Update database schema
```bash
# 1. Edit packages/db/prisma/schema.prisma
# 2. Create migration
cd packages/db
pnpm prisma migrate dev --name descriptive_name

# 3. Test
pnpm test

# 4. Commit
git add .
git commit -m "feat: update schema"
```

---

## 📊 Features (MVP)

✅ **Authentication**
- JWT tokens (24h expiration)
- Role-based access control (ADMIN, RH, GERENTE, FUNCIONARIO)
- Password hashing (bcrypt)

✅ **Employee Management**
- CRUD operations
- Status tracking (ativo, inativo, férias, afastado)
- Department & position assignment

✅ **Payroll**
- Automatic calculation (INSS 8%, IRRF 11%)
- Monthly run generation
- Item tracking

✅ **Data & Validation**
- 13 database tables (Prisma)
- Zod schema validation
- TypeScript strict mode

✅ **DevOps**
- Docker Compose (local dev)
- GitHub Actions CI/CD
- Ready for cloud deployment

---

## 🐛 Troubleshooting

### "Port 3001 already in use"
```bash
# Find process
lsof -i :3001

# Kill process
kill -9 <PID>
```

### "Cannot connect to database"
```bash
# Check Docker
docker ps

# Verify DATABASE_URL in .env
# Start PostgreSQL
docker-compose up postgres
```

### "pnpm command not found"
```bash
# Install pnpm globally
npm install -g pnpm

# Or use npx
npx pnpm install
```

---

## 🔐 Security Notes

⚠️ **Before Production:**
- [ ] Change JWT_SECRET to strong random value
- [ ] Update admin password
- [ ] Enable HTTPS/SSL
- [ ] Set up database backups
- [ ] Configure firewall rules
- [ ] Add rate limiting
- [ ] Set CORS properly
- [ ] Enable logging & monitoring

---

## 📞 Support

For issues, questions, or contributions:
- 📋 Check [docs/](docs/) folder
- 🐛 Open GitHub issue
- 💬 Discussions section
- 📧 contact@yourdomain.com

---

## 📄 License

[Add license here]

---

**Happy coding! 🚀**
