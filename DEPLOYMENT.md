# Deployment Guide

## Produção

### 1. Build

```bash
pnpm build
```

### 2. Deploy Backend

Via Vercel, Railway, ou similar:

```bash
# Railway
railway up
```

### 3. Deploy Frontend

Via Vercel, Netlify:

```bash
# Vercel
vercel --prod
```

### 4. Database

Use PostgreSQL gerenciado (AWS RDS, Supabase, Railway).

### 5. Environment Variables

```
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=use-strong-secret
NODE_ENV=production
API_URL=https://api.yourdomain.com
```

## Monitoramento

- Logs: Check provider logs
- Errors: Set up Sentry
- Uptime: Use UptimeRobot
