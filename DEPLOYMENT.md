# Deployment Guide

Your Pet Medication Database is now ready to deploy! Here are several free options:

## Option 1: Vercel (Recommended - Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your repository
5. Vercel will auto-detect Vite and deploy!

**Your site will be live at:** `https://your-project-name.vercel.app`

## Option 2: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

**Your site will be live at:** `https://your-project-name.netlify.app`

## Option 3: GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Set source to "GitHub Actions"
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Your site will be live at:** `https://yourusername.github.io/repository-name`

## Quick Start (If you don't have Git set up yet)

1. **Initialize Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository:**
   - Go to github.com
   - Click "New repository"
   - Copy the commands shown

3. **Push to GitHub:**
   ```bash
   git remote add origin YOUR_REPO_URL
   git branch -M main
   git push -u origin main
   ```

4. **Deploy with Vercel (Easiest):**
   - Go to vercel.com
   - Click "Import Project"
   - Select your GitHub repo
   - Click "Deploy"
   - Done! You'll get a link instantly.

## Important Note

This app currently stores data in the browser's local storage. To add persistent cloud storage across users, you would need to set up a database (the project already has Supabase integration ready).

---

**Need help?** All three platforms offer free tiers and automatic deployments. Vercel is the quickest to get started!
