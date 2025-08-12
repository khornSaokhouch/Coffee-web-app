#!/bin/sh
set -e

# Clear and cache configs, routes, views
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Start PHP-FPM (adjust path/version if needed)
/usr/sbin/php-fpm7.4 -F
