FROM drupal:10-apache

# Install Drush
RUN composer require drush/drush --working-dir=/opt/drupal && \
    ln -sf /opt/drupal/vendor/bin/drush /usr/local/bin/drush

# Ensure settings directory exists and is writable during build
RUN chmod 755 /opt/drupal/web/sites/default && \
    mkdir -p /opt/drupal/web/sites/default/files/config_sync && \
    chown -R www-data:www-data /opt/drupal/web/sites/default/files

# Copy default settings.php (overridden by ConfigMap in K8s)
COPY settings.php /opt/drupal/web/sites/default/settings.php
RUN chown www-data:www-data /opt/drupal/web/sites/default/settings.php

EXPOSE 80
