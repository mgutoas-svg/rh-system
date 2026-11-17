# RH System — GitHub Publication & VPS Deployment

## ✅ Part 1: GitHub Publication

### 1.1 Create GitHub Repository

```bash
# Go to github.com
# Click "New repository"
# Name: rh-system
# Description: Full-stack HR management system (MVP)
# Public or Private (your choice)
# DO NOT initialize with README/license
# Click "Create repository"
```

### 1.2 Push Local Repo to GitHub

```bash
cd C:\mario\projetos\rh-system

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/rh-system.git

# Rename branch to main (if needed)
git branch -M main

# Push all commits
git push -u origin main

# Verify
git remote -v
# Output should show: origin https://github.com/YOUR_USERNAME/rh-system.git
```

### 1.3 GitHub Configuration

**After first push, in GitHub web:**

1. Settings → Topics
   - Add: `hrm` `react` `typescript` `nodejs` `postgresql` `docker`

2. Settings → Actions
   - Enable GitHub Actions ✓

3. Insights → Code frequency
   - Verify 6 commits visible

---

## 🚀 Part 2: VPS Deployment

### 2.1 VPS Requirements

```
Minimum:
- OS: Ubuntu 22.04 LTS or Debian 12
- RAM: 2GB (dev), 4GB (production)
- CPU: 2 cores
- Storage: 20GB SSD
- Network: Static IP, SSH access

Recommended (Production):
- RAM: 8GB+
- CPU: 4 cores
- Storage: 100GB SSD
- Bandwidth: Unlimited
```

### 2.2 VPS Initial Setup (SSH)

```bash
# 1. SSH into VPS
ssh root@YOUR_VPS_IP

# 2. Update system
apt update && apt upgrade -y

# 3. Create app user
useradd -m -s /bin/bash appuser
usermod -aG sudo appuser
su - appuser

# 4. Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 5. Install pnpm
npm install -g pnpm

# 6. Install Docker
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker appuser

# 7. Install git
sudo apt install -y git

# 8. Create app directory
mkdir -p /home/appuser/apps
cd /home/appuser/apps
```

### 2.3 Clone & Setup

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/rh-system.git
cd rh-system

# Install dependencies
pnpm install

# Create .env from example
cp .env.example .env

# Edit .env with production values
nano .env
# Update:
# DATABASE_URL=postgresql://user:password@postgres:5432/rh_db
# JWT_SECRET=generate-strong-secret-here
# NODE_ENV=production
# API_URL=https://api.yourdomain.com

# Build
pnpm build
```

### 2.4 Database Setup

```bash
# Start PostgreSQL container
docker-compose up -d postgres

# Wait for PostgreSQL to start
sleep 10

# Run migrations
cd packages/db
pnpm prisma migrate deploy

# Seed admin user
pnpm db:seed

cd ../..
```

### 2.5 Backend Deployment

**Option A: Using PM2 (Recommended)**

```bash
# Install PM2 globally
sudo npm install -g pm2

# Create ecosystem.config.js
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'rh-api',
    script: './packages/api/dist/server.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
};
EOF

# Start API
pm2 start ecosystem.config.js

# Save PM2 config
pm2 save
pm2 startup
```

**Option B: Using Docker**

```bash
# Build API image
docker build -t rh-api:latest ./packages/api

# Run container
docker run -d \
  --name rh-api \
  --restart always \
  -e DATABASE_URL=postgresql://user:password@postgres:5432/rh_db \
  -e JWT_SECRET=your-secret \
  -e NODE_ENV=production \
  -p 3001:3001 \
  rh-api:latest
```

### 2.6 Frontend Deployment

**Option A: Static hosting (Vercel, Netlify)**

```bash
# Build static site
pnpm build --filter=app

# Upload dist/ to Vercel/Netlify via CLI or web
```

**Option B: Self-hosted with Nginx**

```bash
# Build
pnpm build --filter=app

# Copy to Nginx
sudo cp -r packages/app/dist /var/www/rh-frontend
sudo chown -R www-data:www-data /var/www/rh-frontend

# Create Nginx config
sudo cat > /etc/nginx/sites-available/rh-frontend << 'EOF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    root /var/www/rh-frontend;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/rh-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 2.7 SSL Certificate (HTTPS)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renew
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Update Nginx config
sudo nano /etc/nginx/sites-available/rh-frontend
# Add: ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
#      ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
```

### 2.8 Monitoring & Logs

```bash
# View API logs (PM2)
pm2 logs rh-api

# View API logs (Docker)
docker logs -f rh-api

# View database
docker logs -f rh-postgres

# System monitoring
htop
```

### 2.9 Backup Strategy

```bash
# Database backup
docker exec rh-postgres pg_dump -U rh_user rh_db > backup-$(date +%Y%m%d).sql

# Restore from backup
docker exec -i rh-postgres psql -U rh_user rh_db < backup-20240101.sql
```

---

## 🔄 Continuous Deployment

### GitHub Actions Auto-Deploy

```bash
# Add GitHub Secrets (in GitHub web):
# - VPS_HOST: your-vps-ip
# - VPS_USER: appuser
# - VPS_SSH_KEY: (private key content)

# Create .github/workflows/deploy.yml:
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /home/appuser/apps/rh-system
            git pull origin main
            pnpm install
            pnpm build
            pm2 restart rh-api
```

---

## 📋 Deployment Checklist

- [ ] GitHub repo created and pushed
- [ ] VPS provisioned and updated
- [ ] Node.js 20 and pnpm installed
- [ ] Docker and docker-compose installed
- [ ] PostgreSQL container running
- [ ] Database migrations applied
- [ ] Admin user seeded
- [ ] API built and running (port 3001)
- [ ] Frontend built and deployed
- [ ] Nginx configured (or Vercel/Netlify)
- [ ] SSL certificate installed
- [ ] Domain pointing to VPS
- [ ] Monitoring set up (PM2 or Docker logs)
- [ ] Backups configured
- [ ] CI/CD pipeline working

---

## 🚨 Troubleshooting

### API won't start
```bash
# Check logs
pm2 logs rh-api

# Check port 3001 is not in use
lsof -i :3001

# Verify .env has DATABASE_URL
cat .env | grep DATABASE_URL
```

### Database connection error
```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Test connection
psql postgresql://user:password@localhost:5432/rh_db
```

### Frontend showing blank page
```bash
# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Verify API is accessible
curl http://localhost:3001/health
```

---

**🎉 Ready for production deployment!**

Questions? Check DEPLOYMENT.md for more details.
