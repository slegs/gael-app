# Security Setup Checklist - Solo Developer

Use this checklist to configure security for your public Gael Social repository (single developer setup).

## 🚀 Quick Start

### 1. GitHub Environment Setup

**Go to:** Repository → Settings → Environments

**Create these environments:**

#### Production Environment
1. Click **"New environment"** 
2. Name: `prod`
3. **Protection rules (Optional for solo dev):**
   - ⚠️ Wait timer: `60` seconds (1 minute) - gives you time to cancel if needed
   - ✅ Deployment branches: Select "Selected branches" → Add `main`
   - ❌ Required reviewers: Skip (you're the only developer)

#### Dev Environment  
1. Click **"New environment"**
2. Name: `dev`
3. **Protection rules:**
   - ✅ Deployment branches: Select "Selected branches" → Add `dev`, `main`
   - ❌ Required reviewers: Skip (not needed for dev)

### 2. Environment Variables & Secrets

#### Production Environment

**Variables** (Repository → Settings → Environments → prod → Variables):
```
CUSTOM_DOMAIN = app.gael.social
CLOUDFRONT_DOMAIN = d1234567890.cloudfront.net
ENVIRONMENT_NAME = production
```

**Secrets** (Repository → Settings → Environments → prod → Secrets):
```
AWS_ACCESS_KEY_ID = AKIA...
AWS_SECRET_ACCESS_KEY = xyz123...
AWS_REGION = us-east-1
S3_BUCKET_NAME = gael-social-app-prod
CLOUDFRONT_DISTRIBUTION_ID = E1234567890ABC
```

#### Dev Environment

**Variables** (Repository → Settings → Environments → dev → Variables):
```
DEV_DOMAIN = dev.gael.social
CLOUDFRONT_DOMAIN = d0987654321.cloudfront.net
ENVIRONMENT_NAME = dev
```

**Secrets** (Repository → Settings → Environments → dev → Secrets):
```
AWS_ACCESS_KEY_ID = AKIA...
AWS_SECRET_ACCESS_KEY = xyz123...
AWS_REGION = us-east-1
S3_BUCKET_NAME = gael-social-app-dev
CLOUDFRONT_DISTRIBUTION_ID = E0987654321XYZ
```

### 3. Branch Protection Rules (Simplified for Solo Dev)

**Go to:** Repository → Settings → Branches → Add rule

**Branch name pattern:** `main`

**Protection settings (Minimal for solo dev):**
- ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date before merging
  - **Required status checks:** Add these once workflows have run:
    - `test`
    - `security-audit` 
    - `build-dev`
- ⚠️ Require a pull request before merging (Optional - you can push directly if you prefer)
  - If enabled: ✅ Allow bypass of settings above (so you can merge your own PRs)
- ✅ Require conversation resolution before merging (good practice even solo)

### 4. Security Features

**Go to:** Repository → Settings → Code security and analysis

**Enable these features:**
- ✅ Dependency graph
- ✅ Dependabot alerts
- ✅ Dependabot security updates
- ✅ Dependabot version updates (create `.github/dependabot.yml`)
- ✅ Secret scanning
- ✅ Push protection for secret scanning
- ✅ Code scanning (CodeQL)

### 5. Create Dependabot Config (Optional for Solo Dev)

Create `.github/dependabot.yml` (if you want automated dependency updates):
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "sunday"
      time: "02:00"
      timezone: "UTC"
    open-pull-requests-limit: 3
    assignees:
      - "paulwalsh"
    commit-message:
      prefix: "deps"
      include: "scope"
  
  - package-ecosystem: "github-actions"
    directory: "/.github/workflows"
    schedule:
      interval: "monthly"
    assignees:
      - "paulwalsh"
```

## 🔐 AWS Security Setup

### 1. Create IAM Users

**For Production:**
```bash
aws iam create-user --user-name gael-social-github-prod
aws iam attach-user-policy --user-name gael-social-github-prod --policy-arn arn:aws:iam::YOUR-ACCOUNT:policy/GaelSocialDeploymentPolicy
aws iam create-access-key --user-name gael-social-github-prod
```

**For Staging:**
```bash
aws iam create-user --user-name gael-social-github-staging  
aws iam attach-user-policy --user-name gael-social-github-staging --policy-arn arn:aws:iam::YOUR-ACCOUNT:policy/GaelSocialDeploymentPolicy
aws iam create-access-key --user-name gael-social-github-staging
```

### 2. IAM Policy

Create `GaelSocialDeploymentPolicy`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl", 
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::gael-social-app-prod",
        "arn:aws:s3:::gael-social-app-prod/*",
        "arn:aws:s3:::gael-social-app-staging",
        "arn:aws:s3:::gael-social-app-staging/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

## ✅ Verification Checklist (Solo Developer)

After setup, verify:

- [ ] GitHub Environments created (`prod` and `dev`)
- [ ] Environment secrets and variables configured for both environments
- [ ] Branch protection rules enabled on `main` (minimal set)
- [ ] CODEOWNERS file committed (optional rules enabled)
- [ ] Secret scanning enabled with push protection
- [ ] AWS IAM users created with least privilege
- [ ] Security workflows pass (push a test commit to `dev`)
- [ ] Deployments work (push to `dev` and `main` branches)
- [ ] Dependabot configured (if you chose to enable it)

## 🚨 Testing Your Security

1. **Test Branch Protection:**
   - Try to push directly to `main` (should be blocked)
   - Create PR without required status checks (should be blocked)

2. **Test Environment Protection:**
   - Push to `main` and verify deployment requires approval
   - Check that non-authorized users can't approve

3. **Test Secret Detection:**
   - Try committing a fake AWS key (should be blocked by push protection)

4. **Test Dependency Security:**
   - Check that Dependabot creates security update PRs
   - Verify security audit workflow runs and passes

## 📞 Support

If you need help with any of these steps:

1. **GitHub Docs:** https://docs.github.com/en/actions/deployment/targeting-different-environments
2. **AWS Docs:** https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html  
3. **Security Guide:** See `SECURITY.md` in this repository

---

---

## 🎯 Solo Developer Summary

This streamlined setup gives you:

- ✅ **Two clean environments**: `dev` and `prod`
- ✅ **Two simple branches**: `dev` for development, `main` for production
- ✅ **Minimal security overhead**: Protection without bureaucracy
- ✅ **Environment isolation**: Secrets are safely separated
- ✅ **Automated deployments**: Push and deploy automatically

**Workflow:**
1. **Develop on `dev` branch** → Auto-deploys to dev environment
2. **Merge to `main` branch** → Auto-deploys to production environment
3. **Security runs automatically** on all pushes and PRs

**Remember:** This setup provides strong security for your public repository while keeping things simple for solo development!