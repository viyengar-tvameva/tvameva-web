<?php

/**
 * @file
 * Tvameva Drupal settings.
 *
 * Database credentials are loaded from environment variables
 * set in the Kubernetes deployment manifest.
 */

$databases['default']['default'] = [
  'database' => getenv('DRUPAL_DB_NAME') ?: 'drupal',
  'username' => getenv('DRUPAL_DB_USER') ?: 'drupal',
  'password' => getenv('DRUPAL_DB_PASSWORD') ?: '',
  'host' => getenv('DRUPAL_DB_HOST') ?: 'localhost',
  'port' => getenv('DRUPAL_DB_PORT') ?: '3306',
  'driver' => 'mysql',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
];

$settings['hash_salt'] = 'a1b2c3d4e5f6789012345678abcdef0123456789abcdef0123456789abcdef01';

$settings['trusted_host_patterns'] = [
  '^localhost$',
  '^127\.0\.0\.1$',
  '^34\.56\.251\.119$',
  '^tvameva\.ai$',
  '^cms\.tvameva\.ai$',
  '.*\.run\.app$',
];

$settings['config_sync_directory'] = 'sites/default/files/config_sync';
$settings['file_public_path'] = 'sites/default/files';
$settings['file_temp_path'] = '/tmp';

$settings['cors.config'] = [
  'enabled' => TRUE,
  'allowedHeaders' => ['*'],
  'allowedMethods' => ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  'allowedOrigins' => [
    'http://localhost:3000',
    'https://tvameva.ai',
    'https://tvameva-web-120065922337.us-central1.run.app',
  ],
  'exposedHeaders' => TRUE,
  'maxAge' => 3600,
  'supportsCredentials' => FALSE,
];

$settings['install_profile'] = 'standard';
