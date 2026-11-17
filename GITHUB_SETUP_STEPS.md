# GitHub Repository Setup — Step by Step

## 🔐 Prerequisites

- GitHub account (create at github.com if you don't have one)
- Git installed on your machine (you have this ✓)
- SSH key configured (optional but recommended for future pushes)

---

## 📋 Step 1: Create Repository on GitHub (5 minutes)

### 1a. Go to GitHub

Open browser and go to: **https://github.com/new**

You should be logged in. If not, log in first.

### 1b. Fill in Repository Details

```
Repository name:        rh-system
Description:            Full-stack HR management system MVP
Visibility:             Public (or Private if you prefer)
Initialize with:        LEAVE BLANK (do NOT check any options)
```

**IMPORTANT:** Do NOT check:
- ❌ Add a README file
- ❌ Add .gitignore
- ❌ Add a license

### 1c. Click "Create repository"

You should see a screen with:
```
Quick setup — if you've done this kind of thing before

HTTPS  SSH  GitHub CLI
```

---

## 🔗 Step 2: Push Code to GitHub (5 minutes)

### 2a. Copy Your Repository URL

Look for the green "Code" button on GitHub. Click it and copy the URL.

It should look like:
```
https://github.com/YOUR_USERNAME/rh-system.git
```

### 2b. Run These Commands

Open PowerShell and run:

```powershell
cd C:\mario\projetos\rh-system

git remote add origin https://github.com/YOUR_USERNAME/rh-system.git

git branch -M main

git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### 2c. Enter Credentials (if prompted)

If you see:
```
Username for 'https://github.com':
```

- Enter your GitHub username
- Press Enter
- Paste your GitHub Personal Access Token or password
- Press Enter

**To create a Personal Access Token:**
1. Go to github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Check: `repo`, `workflow`
4. Click "Generate token"
5. Copy and use in terminal

### 2d. Wait for Upload

The push will take 1-2 minutes. You should see:
```
Counting objects: 55, done.
Compressing objects: 100% (45/45), done.
Writing objects: 100% (55/55), 2.50 MiB | 1.25 MiB/s, done.
Total 55 (delta 0), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 0% (0/0)
To https://github.com/YOUR_USERNAME/rh-system.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## ✅ Step 3: Verify on GitHub (2 minutes)

1. Refresh github.com/YOUR_USERNAME/rh-system
2. You should see:
   - ✓ 55 files listed
   - ✓ 9 commits in commit history
   - ✓ All your documentation visible

---

## 🎯 Step 4: Configure Repository (3 minutes)

**Back on GitHub web:**

### 4a. Add Topics

1. Click the gear ⚙️ icon (Settings) in the About section
2. Add topics: `hrm` `react` `typescript` `nodejs` `postgresql` `docker`
3. Click "Save changes"

### 4b. Enable GitHub Actions

1. Go to Settings tab
2. Click "Actions" in left sidebar
3. Click "General"
4. Make sure "Allow all actions and reusable workflows" is checked
5. Save

---

## ✨ You're Done!

Your repository is now on GitHub and your CI/CD pipeline should start running automatically!

### Next: Deploy to VPS

Follow `GITHUB_VPS_DEPLOY.md` for complete deployment instructions.

---

## 🆘 Troubleshooting

### "fatal: 'origin' does not appear to be a 'git' repository"

You're in the wrong directory. Make sure you're in:
```
C:\mario\projetos\rh-system
```

### "fatal: could not read Username"

Your GitHub credentials aren't saved. Use Personal Access Token:
1. Go to github.com/settings/tokens
2. Create new token (classic)
3. Paste when prompted

### "Everything up-to-date"

This means push was already successful! Check GitHub to verify.

### "Ref already exists"

The branch already exists on GitHub. That's normal. Check the repo online.

---

## 📞 Still Need Help?

1. GitHub Docs: https://docs.github.com/
2. Git Docs: https://git-scm.com/doc
3. Personal Access Token: https://github.com/settings/tokens
