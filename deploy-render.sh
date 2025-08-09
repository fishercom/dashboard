#!/bin/bash

# Render deployment script for Laravel
echo "🚀 Starting Render deployment..."

# Set PHP path for Render
export PATH="/opt/render/project/src/vendor/bin:/usr/local/bin:$PATH"

# Install PHP dependencies
echo "📦 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

# Install Node dependencies
echo "📦 Installing Node dependencies..."
npm ci

# Build frontend assets
echo "🏗️ Building frontend assets..."
npm run build

echo "✅ Build completed! Laravel optimization will happen at runtime."

