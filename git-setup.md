# 🚀 Git Setup Guide for CEO Strategy Hub

## Prerequisites
- Git installed on your system
- GitHub account
- Terminal/Command Prompt access

## Step 1: Initialize Local Repository

```bash
# Navigate to your project directory
cd "c:\Users\Amine Ghariani\OneDrive\Bureau\Notion2"

# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: CEO Strategy Hub website"
```

## Step 2: Connect to GitHub Repository

```bash
# Add remote origin (replace with your actual repo URL)
git remote add origin https://github.com/amine2zz/CEO_PRD_2025.git

# Verify remote connection
git remote -v
```

## Step 3: Push to GitHub

```bash
# Push to main branch
git push -u origin main

# If you get an error about existing content, force push (be careful!)
git push -u origin main --force
```

## Step 4: Enable GitHub Pages

1. Go to your repository: https://github.com/amine2zz/CEO_PRD_2025
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select "Deploy from a branch"
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

Your site will be available at: `https://amine2zz.github.io/CEO_PRD_2025/`

## Step 5: Future Updates

```bash
# Make changes to your files
# Then add, commit, and push:

git add .
git commit -m "Enhanced dynamics and improved features"
git push origin main
```

## Troubleshooting

### If you get authentication errors:
```bash
# Use personal access token instead of password
# Generate token at: https://github.com/settings/tokens

# Or configure SSH key for easier access
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"
```

### If repository already exists:
```bash
# Clone existing repo instead
git clone https://github.com/amine2zz/CEO_PRD_2025.git
cd CEO_PRD_2025

# Copy your files here, then:
git add .
git commit -m "Updated website with enhanced features"
git push origin main
```

### If main branch doesn't exist:
```bash
# Create and switch to main branch
git checkout -b main
git push -u origin main
```

## Quick Commands Reference

```bash
# Check status
git status

# See commit history
git log --oneline

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes
git pull origin main

# See differences
git diff
```

## File Structure After Setup
```
CEO_PRD_2025/
├── index.html
├── user-journey.html
├── ai-tools.html
├── dashboard.html
├── architecture.html
├── roadmap.html
├── styles.css
├── enhanced-dynamics.js
└── README.md
```