# RH System — Full-Stack Monorepo MVP

MVP (6 semanas) de Sistema de Gestão de RH com autenticação, CRUD de funcionários, folha de pagamento básica.

## Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + Prisma
- **Database**: PostgreSQL 15
- **DevOps**: Docker Compose

## Instalação

### 1. Clone e instale

```bash
git clone https://github.com/seu-user/rh-system.git
cd rh-system
pnpm install
```

### 2. Configure .env

```bash
cp .env.example .env
```

### 3. Inicie com Docker

```bash
docker-compose up
```

Acesse:
- Frontend: http://localhost:5173
- API: http://localhost:3001
- DB: localhost:5432 (rh_user/rh_password)

### 4. Ou desenvolva localmente

```bash
# Terminal 1: API
cd packages/api
pnpm dev

# Terminal 2: Frontend
cd packages/app
pnpm dev

# Terminal 3: PostgreSQL
docker-compose up postgres
```

## Teste

```bash
pnpm test
```

## Funcionalidades MVP

✅ Autenticação JWT + 3 roles (Admin, RH, Funcionário)
✅ CRUD de Funcionários (GET/POST/PUT/DELETE)
✅ Folha de Pagamento (cálculo automático INSS 8%, IRRF 11%)
✅ Dashboard básico
✅ Protectedroutes
✅ React Query para estado
✅ Prisma ORM com 13 tabelas

## Próximas Fases (Semanas 7-32)

- Gestão de Férias
- Avaliações de Desempenho
- Pipeline de Recrutamento
- Contratos versionados
- Auditoria de mudanças
- Relatórios avançados
- Integração com banco
