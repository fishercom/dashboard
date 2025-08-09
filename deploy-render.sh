#!/bin/bash

# Render deployment script for Laravel
echo "🚀 Starting Render deployment..."

# Install Node dependencies
echo "📦 Installing Node dependencies..."
npm ci

# Build frontend assets
echo "🏗️ Building frontend assets..."
npm run build

echo "✅ Build completed! PHP dependencies and Laravel optimization will happen at runtime."

