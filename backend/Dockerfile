# FROM php:8.2-fpm

# WORKDIR /var/www

# RUN apt-get update && apt-get install -y \
#     nginx \
#     libpng-dev \
#     libjpeg-dev \
#     libpq-dev \
#     libonig-dev \
#     libxml2-dev \
#     zip unzip curl git \
#     && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# COPY . .

# RUN composer install --no-dev --optimize-autoloader

# COPY ./docker/nginx.conf /etc/nginx/sites-available/default

# RUN chown -R www-data:www-data /var/www \
#     && chmod -R 755 /var/www

# # Change PHP-FPM to listen on TCP 9000
# RUN sed -i 's/listen = .*/listen = 127.0.0.1:9000/' /usr/local/etc/php-fpm.d/www.conf

# EXPOSE 8000

# CMD php-fpm -F -R & nginx -g 'daemon off;'
FROM php:8.2-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    zip unzip curl git libxml2-dev libzip-dev libpng-dev libjpeg-dev libonig-dev \
    sqlite3 libsqlite3-dev

RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /var/www
COPY --chown=www-data:www-data . /var/www

RUN chmod -R 755 /var/www
RUN composer install

COPY .env.example .env
RUN php artisan key:generate

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000
