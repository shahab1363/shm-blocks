FROM wordpress:6.4-php8.2-apache

# Install additional PHP extensions and tools
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    vim \
    less \
    sudo \
    mariadb-client \
    && rm -rf /var/lib/apt/lists/*

# Install WP-CLI
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp

# Configure Apache for WordPress
RUN a2enmod rewrite

# Set up www-data user for development
RUN usermod -s /bin/bash www-data \
    && echo "www-data ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Create working directory for the plugin
RUN mkdir -p /var/www/html/wp-content/plugins/shm-blocks

# Set ownership
RUN chown -R www-data:www-data /var/www/html

WORKDIR /var/www/html/wp-content/plugins/shm-blocks
