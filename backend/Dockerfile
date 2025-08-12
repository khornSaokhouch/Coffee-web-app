FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    zip unzip curl git libxml2-dev libzip-dev libpng-dev libjpeg-dev libonig-dev \
    sqlite3 libsqlite3-dev nginx \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy app files and set ownership
COPY --chown=www-data:www-data . /var/www

# Install PHP dependencies for production
RUN composer install --no-dev --optimize-autoloader

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Copy Nginx config (make sure this path is correct relative to Dockerfile)
COPY ./docker/nginx.conf /etc/nginx/sites-available/default

# Expose port 8080, which Sevalla expects
EXPOSE 8080

# Start Nginx and PHP-FPM
CMD service nginx start && php-fpm
