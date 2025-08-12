FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www

# Install dependencies, PHP extensions, and nginx
RUN apt-get update && apt-get install -y \
    nginx \
    libpng-dev \
    libjpeg-dev \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    zip unzip curl git \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy composer binary from official composer image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application files
COPY . .

# Install composer dependencies (production)
RUN composer install --no-dev --optimize-autoloader

# Copy your nginx config to conf.d (NGINX loads *.conf files here by default)
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

# Set correct permissions for Laravel
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www

# Change PHP-FPM to listen on UNIX socket for better performance
RUN sed -i 's|listen = .*|listen = /var/run/php-fpm.sock|' /usr/local/etc/php-fpm.d/www.conf

# Expose port 8000 for NGINX
EXPOSE 8000

# Start both PHP-FPM and NGINX
CMD ["sh", "-c", "php-fpm -F -R & nginx -g 'daemon off;'"]
