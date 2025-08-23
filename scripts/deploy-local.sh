#!/bin/bash

# Local deployment script for Gael Social Web Client
# Usage: ./scripts/deploy-local.sh [production|staging]

set -e

ENVIRONMENT=${1:-production}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🚀 Starting local deployment for environment: $ENVIRONMENT"

# Check required tools
command -v aws >/dev/null 2>&1 || { echo "❌ AWS CLI is required but not installed."; exit 1; }
command -v yarn >/dev/null 2>&1 || { echo "❌ Yarn is required but not installed."; exit 1; }

# Load environment variables
if [ "$ENVIRONMENT" = "production" ]; then
    if [ -f "$PROJECT_ROOT/.env.production" ]; then
        export $(cat "$PROJECT_ROOT/.env.production" | grep -v '^#' | xargs)
    fi
    S3_BUCKET=${S3_BUCKET_NAME:-"gael-social-app-prod"}
    CLOUDFRONT_ID=${CLOUDFRONT_DISTRIBUTION_ID:-""}
elif [ "$ENVIRONMENT" = "staging" ]; then
    if [ -f "$PROJECT_ROOT/.env.staging" ]; then
        export $(cat "$PROJECT_ROOT/.env.staging" | grep -v '^#' | xargs)
    fi
    S3_BUCKET=${S3_BUCKET_NAME_STAGING:-"gael-social-app-staging"}
    CLOUDFRONT_ID=${CLOUDFRONT_DISTRIBUTION_ID_STAGING:-""}
else
    echo "❌ Invalid environment. Use 'production' or 'staging'"
    exit 1
fi

echo "📦 Installing dependencies..."
cd "$PROJECT_ROOT"
yarn install --frozen-lockfile

echo "🌐 Building internationalization..."
yarn intl:build

echo "🏗️ Building web application for $ENVIRONMENT..."
NODE_ENV=production EXPO_PUBLIC_ENV="$ENVIRONMENT" yarn build-web

if [ ! -d "web-build" ]; then
    echo "❌ Build failed - web-build directory not found"
    exit 1
fi

echo "📊 Build size:"
du -sh web-build

if [ -z "$S3_BUCKET" ]; then
    echo "⚠️ No S3 bucket configured. Build completed but not deployed."
    echo "📁 Built files are in: web-build/"
    exit 0
fi

echo "☁️ Deploying to S3 bucket: $S3_BUCKET"

# Upload static assets with long cache
echo "📤 Uploading static assets..."
aws s3 sync web-build/ "s3://$S3_BUCKET/" \
    --delete \
    --exclude "*.html" \
    --cache-control "public,max-age=31536000,immutable" \
    --quiet

# Upload HTML files with no cache
echo "📤 Uploading HTML files..."
aws s3 sync web-build/ "s3://$S3_BUCKET/" \
    --exclude "*" \
    --include "*.html" \
    --cache-control "public,max-age=0,must-revalidate" \
    --content-type "text/html" \
    --quiet

# Invalidate CloudFront if configured
if [ -n "$CLOUDFRONT_ID" ]; then
    echo "🔄 Invalidating CloudFront distribution: $CLOUDFRONT_ID"
    aws cloudfront create-invalidation \
        --distribution-id "$CLOUDFRONT_ID" \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text
else
    echo "⚠️ No CloudFront distribution ID configured - skipping invalidation"
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Your app should be available at your configured domain"

# Open browser if on macOS
if [[ "$OSTYPE" == "darwin"* ]] && [ -n "$EXPO_PUBLIC_WEB_HOST" ]; then
    echo "🔗 Opening $EXPO_PUBLIC_WEB_HOST"
    open "$EXPO_PUBLIC_WEB_HOST"
fi