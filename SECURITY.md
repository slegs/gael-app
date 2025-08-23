# Security Guide for Public Repository Deployments

This guide covers securing deployment variables and infrastructure for a public GitHub repository.

## 🔒 GitHub Security Features

### 1. GitHub Environments

GitHub Environments provide deployment protection for public repositories:

#### Setting Up Environments

1. Go to your repository → **Settings** → **Environments**
2. Create the following environments:
   - **`production`** - For main branch deployments
   - **`staging`** - For staging deployments  
   - **`preview`** - For PR previews

#### Environment Protection Rules

For each environment, configure:

**Production Environment:**
- ✅ **Required reviewers**: Add team members who must approve deployments
- ✅ **Wait timer**: Add 5-10 minute delay for production deployments
- ✅ **Deployment branches**: Restrict to `main` branch only
- ✅ **Prevent self-review**: Require different person to approve

**Staging Environment:**
- ✅ **Deployment branches**: Restrict to `develop`, `staging`, `main`
- ⚠️ **Required reviewers**: Optional, but recommended for team repos

**Preview Environment:**
- ✅ **Deployment branches**: Allow all branches (for PR previews)
- ⚠️ **No protection rules needed** (read-only environment)

### 2. Environment Secrets vs Repository Secrets

**Environment Secrets** (Recommended for sensitive data):
- Only accessible when deploying to that specific environment
- Protected by environment rules
- Can be overridden per environment

**Repository Secrets** (Use for non-sensitive data):
- Accessible to all workflows
- Good for build-time variables
- Less secure for deployment credentials

## 🏗️ Environment Setup Instructions

### Step 1: Create GitHub Environments

```bash
# Navigate to your repo on GitHub:
# Settings → Environments → New environment

# Create these environments:
# - production
# - staging  
# - preview
```

### Step 2: Configure Environment Variables

#### Production Environment Variables

Navigate to **Environments → production → Add variable**:

**Variables (non-sensitive):**
- `CUSTOM_DOMAIN`: `app.gael.social`
- `CLOUDFRONT_DOMAIN`: `d1234567890.cloudfront.net`
- `ENVIRONMENT_NAME`: `production`

Navigate to **Environments → production → Add secret**:

**Secrets (sensitive):**
- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key  
- `AWS_REGION`: `us-east-1`
- `S3_BUCKET_NAME`: `gael-social-app-prod`
- `CLOUDFRONT_DISTRIBUTION_ID`: `E1234567890ABC`

#### Staging Environment

**Variables:**
- `STAGING_DOMAIN`: `staging.gael.social`
- `CLOUDFRONT_DOMAIN`: `d0987654321.cloudfront.net`
- `ENVIRONMENT_NAME`: `staging`

**Secrets:**
- `AWS_ACCESS_KEY_ID`: Staging AWS access key
- `AWS_SECRET_ACCESS_KEY`: Staging AWS secret key
- `S3_BUCKET_NAME`: `gael-social-app-staging`
- `CLOUDFRONT_DISTRIBUTION_ID`: `E0987654321XYZ`

### Step 3: Set Environment Protection Rules

#### Production Environment Protection:
1. **Required reviewers**: Add 1-2 team members
2. **Wait timer**: 300 seconds (5 minutes)
3. **Deployment branches**: Selected branches → `main`
4. **Prevent self-review**: ✅ Enabled

#### Staging Environment Protection:
1. **Deployment branches**: Selected branches → `main`, `develop`, `staging`
2. **Required reviewers**: Optional (recommended for teams)

## 🛡️ Additional Security Measures

### 1. Branch Protection Rules

Configure branch protection for `main`:

**Settings → Branches → Add rule**:
- ✅ **Require status checks**: CI must pass
- ✅ **Require up-to-date branches**
- ✅ **Require pull request reviews**: Minimum 1 reviewer
- ✅ **Dismiss stale reviews**
- ✅ **Require review from code owners** (if using CODEOWNERS)
- ✅ **Restrict pushes to matching branches**

### 2. CODEOWNERS File

Create `.github/CODEOWNERS`:

```
# Global owners
* @your-username @team-lead

# Deployment workflows
.github/workflows/ @your-username @devops-team

# Security and configuration
SECURITY.md @your-username @security-team
.env.* @your-username @devops-team
webpack.config.js @your-username @frontend-team
```

### 3. Dependabot Security Updates

Enable Dependabot in **Settings → Security & analysis**:
- ✅ **Dependency graph**
- ✅ **Dependabot alerts**  
- ✅ **Dependabot security updates**

### 4. Secret Scanning

GitHub automatically scans for secrets, but you can enhance it:
- ✅ **Secret scanning alerts**
- ✅ **Push protection** (prevents pushing secrets)

## 🔐 AWS Security Best Practices

### 1. Least Privilege IAM Policy

Create IAM users with minimal required permissions:

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
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::gael-social-app-prod/*",
        "arn:aws:s3:::gael-social-app-staging/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::gael-social-app-prod",
        "arn:aws:s3:::gael-social-app-staging"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": [
        "arn:aws:cloudfront::*:distribution/E1234567890ABC",
        "arn:aws:cloudfront::*:distribution/E0987654321XYZ"
      ]
    }
  ]
}
```

### 2. Separate IAM Users

Create separate IAM users for each environment:
- `gael-social-github-prod`
- `gael-social-github-staging`

### 3. AWS CloudTrail

Enable CloudTrail to monitor API calls from GitHub Actions.

### 4. S3 Bucket Security

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyInsecureConnections",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::gael-social-app-prod",
        "arn:aws:s3:::gael-social-app-prod/*"
      ],
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}
```

## 🚨 Security Monitoring

### 1. GitHub Security Alerts

Monitor these regularly:
- **Security advisories**
- **Dependabot alerts**  
- **Secret scanning alerts**
- **Code scanning alerts** (if enabled)

### 2. AWS Monitoring

Set up CloudWatch alarms for:
- **Unusual S3 API calls**
- **CloudFront error rates**
- **Failed deployments**

### 3. Deployment Monitoring

The workflows include built-in monitoring:
- ✅ **Deployment success/failure notifications**
- ✅ **Build size monitoring**
- ✅ **Performance budget warnings**

## 🔄 Rotation and Maintenance

### Regular Tasks:

**Monthly:**
- [ ] Rotate AWS access keys
- [ ] Review GitHub environment access
- [ ] Update dependencies

**Quarterly:**
- [ ] Review IAM policies
- [ ] Audit deployment logs  
- [ ] Update protection rules

**Annually:**
- [ ] Security audit
- [ ] Review all secrets and variables
- [ ] Update security documentation

## 🆘 Incident Response

### If Secrets Are Compromised:

1. **Immediate actions:**
   - Rotate affected AWS credentials
   - Revoke compromised secrets in GitHub
   - Check CloudTrail for unauthorized activity

2. **Investigation:**
   - Review deployment logs
   - Check for unauthorized deployments
   - Scan for data breaches

3. **Recovery:**
   - Update all affected credentials
   - Redeploy with new secrets
   - Document lessons learned

### Emergency Contacts:

- **AWS Security:** Report through AWS Support
- **GitHub Security:** security@github.com
- **Team Lead:** [Your contact information]

---

## ✅ Security Checklist

Before going live, ensure:

- [ ] GitHub Environments configured with protection rules
- [ ] AWS IAM users have least privilege access
- [ ] Branch protection enabled on `main` branch
- [ ] CODEOWNERS file configured
- [ ] Dependabot enabled
- [ ] Secret scanning enabled
- [ ] CloudTrail logging enabled
- [ ] Monitoring and alerting configured
- [ ] Incident response plan documented
- [ ] Team trained on security procedures

**Remember**: Security is an ongoing process, not a one-time setup!