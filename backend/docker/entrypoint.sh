#!/bin/bash

# Exit on error
set -e

# Run Laravel optimizations
php artisan config:clear
php artisan route:clear
php artisan view:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run database migrations
php artisan migrate --force || true

# Start PHP-FPM (foreground) and Nginx
php-fpm -F -R & nginx -g "daemon off;"
