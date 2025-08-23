# Deployment Guide: Gael Social Web Client

This guide covers deploying the Gael Social web client to AWS S3 + CloudFront using GitHub Actions.

## Prerequisites

### 1. AWS Resources Setup

Create the following AWS resources:

#### S3 Buckets
```bash
# Production bucket
aws s3 mb s3://gael-social-app-prod --region us-east-1

# Staging bucket (optional)
aws s3 mb s3://gael-social-app-staging --region us-east-1
```

#### S3 Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::gael-social-app-prod/*"
    }
  ]
}
```

#### CloudFront Distribution
1. Create CloudFront distribution pointing to S3 bucket
2. Set default root object to `index.html`
3. Configure custom error pages:
   - 404 → `/index.html` (for SPA routing)
   - 403 → `/index.html` (for SPA routing)

### 2. IAM User for GitHub Actions

Create IAM user with programmatic access and attach policy:

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

## GitHub Repository Setup

### 1. Repository Secrets

Go to your GitHub repo → Settings → Secrets and variables → Actions, and add:

#### Production Secrets
- `AWS_ACCESS_KEY_ID`: IAM user access key
- `AWS_SECRET_ACCESS_KEY`: IAM user secret key
- `AWS_REGION`: AWS region (e.g., `us-east-1`)
- `S3_BUCKET_NAME`: Production S3 bucket name
- `CLOUDFRONT_DISTRIBUTION_ID`: CloudFront distribution ID
- `CUSTOM_DOMAIN`: Your custom domain (optional, e.g., `app.gael.social`)

#### Staging Secrets (if using staging)
- `AWS_ACCESS_KEY_ID_STAGING`
- `AWS_SECRET_ACCESS_KEY_STAGING`
- `S3_BUCKET_NAME_STAGING`
- `CLOUDFRONT_DISTRIBUTION_ID_STAGING`

#### Optional Secrets
- `CODECOV_TOKEN`: For code coverage reporting
- `SENTRY_AUTH_TOKEN`: For error monitoring

### 2. Environment Variables

The deployment uses environment-specific `.env` files:

- `.env.production`: Production configuration
- `.env.staging`: Staging configuration

## Deployment Workflows

### Production Deployment

**Triggers:** Push to `main` branch or manual dispatch

**Workflow:** `.github/workflows/deploy-web.yml`

**Steps:**
1. Install dependencies with caching
2. Build internationalization files
3. Build optimized web bundle
4. Deploy to S3 with proper cache headers
5. Invalidate CloudFront cache
6. Post deployment summary

### Staging Deployment

**Triggers:** Push to `develop`/`staging` branch or PRs to `main`

**Workflow:** `.github/workflows/deploy-staging.yml`

**Steps:**
1. Run linting and type checking
2. Build staging version
3. Deploy to staging S3 (only on push, not PRs)

### Continuous Integration

**Triggers:** All pushes and PRs

**Workflow:** `.github/workflows/ci.yml`

**Steps:**
1. Run tests with coverage
2. Security audit
3. Bundle size reporting

## Manual Deployment

### Local Build & Deploy

```bash
# Install dependencies
yarn install

# Build for production
yarn build-web

# Deploy to S3 (requires AWS CLI configured)
aws s3 sync web-build/ s3://your-bucket-name/ --delete

# Invalidate CloudFront
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

### Environment-Specific Builds

```bash
# Production build
NODE_ENV=production EXPO_PUBLIC_ENV=production yarn build-web

# Staging build
NODE_ENV=production EXPO_PUBLIC_ENV=staging yarn build-web
```

## Configuration

### Custom Domain Setup

1. **Route 53**: Create hosted zone for your domain
2. **Certificate**: Request SSL certificate in `us-east-1`
3. **CloudFront**: Add alternate domain name and SSL certificate
4. **Route 53**: Create A record pointing to CloudFront distribution

### Environment Variables

Key environment variables for deployment:

- `EXPO_PUBLIC_ENV`: Environment name (`production`, `staging`)
- `EXPO_PUBLIC_ATP_PDS_HOST`: Your PDS server URL
- `EXPO_PUBLIC_WEB_HOST`: Your web app domain
- `EXPO_PUBLIC_DEBUG`: Enable/disable debug features

## Cache Strategy

The deployment uses optimized caching:

- **Static assets** (JS, CSS, images): 1 year cache with immutable
- **HTML files**: No cache, must revalidate
- **Staging**: Shorter cache times for testing

## Monitoring & Troubleshooting

### Build Monitoring

- Check GitHub Actions logs for build failures
- Monitor bundle size in deployment summaries
- Review test coverage reports

### Common Issues

1. **Build failures**: Check dependency versions and environment variables
2. **404 errors**: Ensure CloudFront redirects 404/403 to `index.html`
3. **Cache issues**: Invalidate CloudFront distribution
4. **DNS issues**: Verify Route 53 and CloudFront domain configuration

### Performance Monitoring

Consider adding:
- **Sentry**: Error tracking and performance monitoring
- **Analytics**: User behavior tracking
- **Lighthouse CI**: Automated performance audits

## Cost Optimization

- **S3**: Use appropriate storage class
- **CloudFront**: Monitor usage and configure appropriate cache behaviors
- **Route 53**: Monitor DNS query costs

## Security

- **S3 bucket**: Block public access except through CloudFront
- **CloudFront**: Use security headers and WAF if needed
- **SSL**: Always use HTTPS
- **Secrets**: Never commit secrets to repository