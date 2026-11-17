# Publishing RH System

## 1. Create GitHub Repository

```bash
# Create empty repo on GitHub (do NOT initialize with README)
# Then:

git remote add origin https://github.com/your-username/rh-system.git
git branch -M main
git push -u origin main
```

## 2. Verify Remote

```bash
git remote -v
git branch -a
```

## 3. Add GitHub Topics

Topics: `hrm` `react` `typescript` `nodejs` `postgresql` `docker`

## 4. Enable Discussions

GitHub Settings → Discussions ✓

## 5. First Release

```bash
git tag -a v0.1.0 -m "Initial MVP: Auth, CRUD, Payroll, Tests"
git push origin v0.1.0
```

## 6. Create Discussions

After pushing, create GitHub Discussions for:
- Announcements
- Q&A
- Ideas

---

**Repository is ready for publication!**
