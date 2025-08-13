
FROM php:8.2-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    zip unzip curl git \
    libzip-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    pkg-config \
    libicu-dev \
    g++ \
    make \
    autoconf \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo pdo_mysql pdo_pgsql pdo_sqlite mbstring exif pcntl bcmath gd zip intl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --no-dev --optimize-autoloader

COPY ./docker/nginx.conf /etc/nginx/sites-available/default

RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www

# Change PHP-FPM to listen on TCP 9000
RUN sed -i 's/listen = .*/listen = 127.0.0.1:9000/' /usr/local/etc/php-fpm.d/www.conf

EXPOSE 8000

CMD php-fpm -F -R & nginx -g 'daemon off;'
