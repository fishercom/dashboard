#!/bin/bash

echo "🚀 Starting Laravel application..."

# Run migrations
echo "🗃️ Running migrations..."
php artisan migrate --force

# Optimize Laravel for production
echo "⚡ Optimizing Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start the server
echo "🌐 Starting web server..."
php artisan serve --host=0.0.0.0 --port=$PORT
