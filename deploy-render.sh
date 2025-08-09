#!/bin/bash

# Render deployment script for Laravel
echo "🚀 Starting Render deployment..."

# Install PHP dependencies
echo "📦 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

# Install Node dependencies
echo "📦 Installing Node dependencies..."
npm ci

# Build frontend assets
echo "🏗️ Building frontend assets..."
npm run build

# Optimize Laravel for production
echo "⚡ Optimizing Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations (will run automatically on Render)
echo "🗃️ Running migrations..."
php artisan migrate --force

echo "✅ Deployment script completed!"

