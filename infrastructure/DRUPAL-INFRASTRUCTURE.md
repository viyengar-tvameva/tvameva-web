# Drupal Infrastructure — Configuration & Deployment Guide

**Project:** tvameva.ai
**Drupal Version:** 10.6.5
**PHP Version:** 8.4.19
**Cluster:** GKE Autopilot (tvameva-website project)
**Database:** Cloud SQL MySQL (34.134.209.31:3306)
**Last Updated:** March 29, 2026

---

## Problem Statement

The current Drupal deployment has four infrastructure issues that cause the install wizard to appear on every pod restart and prevent reliable CMS management:

1. **No `settings.php` persistence** — The file is generated at install time but lives in ephemeral container storage. When the pod restarts, it's lost, triggering the install wizard.
2. **No Drush in the Docker image** — The stock `drupal:10-apache` image doesn't include Drush. CLI management fails after pod restarts because the PATH changes.
3. **Missing `hash_salt`** — Without a persistent `settings.php`, the hash salt is regenerated on each install attempt, breaking sessions and CSRF tokens.
4. **`image` module conflict** — The standard install profile creates config for the `image` module's field types, but the module isn't fully enabled, causing JSON:API routing errors.

---

## Solution Architecture

```
┌─────────────────────────────────────────────────────┐
│ GKE Autopilot Cluster (tvameva-website)             │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ Namespace: drupal                           │    │
│  │                                             │    │
│  │  ┌─────────────────────────────────────┐    │    │
│  │  │ Deployment: drupal                  │    │    │
│  │  │ Image: tvameva-drupal:latest        │    │    │
│  │  │   (custom image with Drush)         │    │    │
│  │  │                                     │    │    │
│  │  │ Volumes:                            │    │    │
│  │  │  /var/www/html/sites/default/files  │────┼──▶ PVC: drupal-files-pvc (10Gi)
│  │  │  /var/www/html/modules/custom       │────┼──▶ PVC: drupal-modules-pvc (5Gi)
│  │  │  /var/www/html/sites/default/       │    │    │
│  │  │    settings.php (from ConfigMap)    │────┼──▶ ConfigMap: drupal-settings
│  │  └─────────────────────────────────────┘    │    │
│  │                                             │    │
│  │  Services:                                  │    │
│  │  - drupal-service (ClusterIP:8080)          │    │
│  │  - drupal-external (LoadBalancer:80)        │    │
│  │    External IP: 34.56.251.119               │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  Cloud SQL MySQL:                                   │
│  - Host: 34.134.209.31:3306                         │
│  - Database: drupal                                 │
│  - User: drupal                                     │
└─────────────────────────────────────────────────────┘
```

---

## Step 1: Custom Dockerfile with Drush

Create `infrastructure/drupal/Dockerfile`:

```dockerfile
# =============================================================================
# Tvameva Drupal — Custom image with Drush and required modules
# =============================================================================
FROM drupal:10-apache

# Install Drush globally
RUN composer require drush/drush --working-dir=/opt/drupal && \
    ln -sf /opt/drupal/vendor/bin/drush /usr/local/bin/drush

# Ensure the image module and its dependencies are available
RUN drush pm:install image --root=/opt/drupal/web -y 2>/dev/null || true

# Install jsonapi_extras for better JSON:API control (optional)
# RUN composer require drupal/jsonapi_extras --working-dir=/opt/drupal

# Ensure settings directory is writable during install
RUN chmod 755 /opt/drupal/web/sites/default && \
    mkdir -p /opt/drupal/web/sites/default/files && \
    chown -R www-data:www-data /opt/drupal/web/sites/default/files

# Copy custom settings.php (will be overridden by ConfigMap in K8s)
COPY settings.php /opt/drupal/web/sites/default/settings.php

EXPOSE 80
```

---

## Step 2: Persistent settings.php

Create `infrastructure/drupal/settings.php`:

```php
<?php

/**
 * Tvameva Drupal — settings.php
 *
 * This file is mounted as a ConfigMap in Kubernetes.
 * Database credentials come from environment variables.
 */

// Database configuration from environment variables
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

// Hash salt — MUST be persistent across pod restarts
// Generate with: php -r "echo bin2hex(random_bytes(32));"
$settings['hash_salt'] = 'a1b2c3d4e5f6789012345678abcdef0123456789abcdef0123456789abcdef01';

// Trusted host patterns
$settings['trusted_host_patterns'] = [
  '^localhost$',
  '^127\.0\.0\.1$',
  '^34\.56\.251\.119$',
  '^tvameva\.ai$',
  '^cms\.tvameva\.ai$',
  '.*\.run\.app$',
];

// Config sync directory
$settings['config_sync_directory'] = 'sites/default/files/config_sync';

// File paths
$settings['file_public_path'] = 'sites/default/files';
$settings['file_temp_path'] = '/tmp';

// CORS configuration for React frontend
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

// Performance
$settings['cache']['bins']['render'] = 'cache.backend.database';
$settings['cache']['bins']['discovery_migration'] = 'cache.backend.memory';

// Disable install task redirect — CRITICAL
// This prevents the install wizard from appearing after pod restarts
$settings['install_profile'] = 'standard';
```

---

## Step 3: Kubernetes ConfigMap for settings.php

Create `infrastructure/drupal/k8s-configmap-settings.yaml`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: drupal-settings
  namespace: drupal
data:
  settings.php: |
    <?php
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
```

---

## Step 4: Updated Deployment Manifest

Create `infrastructure/drupal/k8s-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: drupal
  namespace: drupal
  labels:
    app: drupal
spec:
  replicas: 1
  selector:
    matchLabels:
      app: drupal
  template:
    metadata:
      labels:
        app: drupal
    spec:
      containers:
      - name: drupal
        image: us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-drupal:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            cpu: 250m
            memory: 512Mi
          limits:
            cpu: "1"
            memory: 1Gi
        env:
        - name: DRUPAL_DB_HOST
          value: "34.134.209.31"
        - name: DRUPAL_DB_PORT
          value: "3306"
        - name: DRUPAL_DB_NAME
          value: "drupal"
        - name: DRUPAL_DB_USER
          value: "drupal"
        - name: DRUPAL_DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: drupal-secrets
              key: db-password
        volumeMounts:
        - name: drupal-files
          mountPath: /var/www/html/sites/default/files
        - name: drupal-modules
          mountPath: /var/www/html/modules/custom
        - name: drupal-settings
          mountPath: /var/www/html/sites/default/settings.php
          subPath: settings.php
          readOnly: true
        livenessProbe:
          httpGet:
            path: /user/login
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /jsonapi
            port: 80
          initialDelaySeconds: 15
          periodSeconds: 10
      volumes:
      - name: drupal-files
        persistentVolumeClaim:
          claimName: drupal-files-pvc
      - name: drupal-modules
        persistentVolumeClaim:
          claimName: drupal-modules-pvc
      - name: drupal-settings
        configMap:
          name: drupal-settings
      tolerations:
      - key: kubernetes.io/arch
        value: amd64
        effect: NoSchedule
```

---

## Step 5: Service Manifests

Create `infrastructure/drupal/k8s-services.yaml`:

```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: drupal-service
  namespace: drupal
spec:
  type: ClusterIP
  selector:
    app: drupal
  ports:
  - port: 8080
    targetPort: 80
    name: http
---
apiVersion: v1
kind: Service
metadata:
  name: drupal-external
  namespace: drupal
spec:
  type: LoadBalancer
  selector:
    app: drupal
  ports:
  - port: 80
    targetPort: 80
    name: http
```

---

## Deployment Instructions

### Prerequisites
- `gcloud` CLI authenticated to `tvameva-website` project
- `kubectl` configured for the GKE cluster
- Docker installed locally
- Artifact Registry repository `tvameva-images` exists

### A. Build and Push Custom Drupal Image

```bash
cd infrastructure/drupal

# Build the custom image
docker build -t us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-drupal:latest .

# Push to Artifact Registry
docker push us-central1-docker.pkg.dev/tvameva-website/tvameva-images/tvameva-drupal:latest
```

### B. Apply Kubernetes Resources

```bash
# 1. Apply the ConfigMap (settings.php)
kubectl apply -f k8s-configmap-settings.yaml

# 2. Apply the updated Deployment
kubectl apply -f k8s-deployment.yaml

# 3. Apply services (if not already created)
kubectl apply -f k8s-services.yaml

# 4. Wait for rollout
kubectl rollout status deployment/drupal -n drupal

# 5. Verify pod is running
kubectl get pods -n drupal
```

### C. Initial Drupal Setup (first deployment only)

```bash
# Port-forward to access Drupal locally
kubectl port-forward deployment/drupal -n drupal 8080:80

# In another terminal — verify Drush works
kubectl exec -n drupal deployment/drupal -- drush status

# Set admin password
kubectl exec -n drupal deployment/drupal -- drush user:password admin "tvameva2026"

# Enable required modules
kubectl exec -n drupal deployment/drupal -- drush en jsonapi serialization image -y

# Fix install state (if install wizard appears)
kubectl exec -n drupal deployment/drupal -- drush state:set system.install_task done

# Clear cache
kubectl exec -n drupal deployment/drupal -- drush cr

# Verify JSON:API
curl http://localhost:8080/jsonapi
```

### D. Create Content Types and Populate (after fresh install)

See the Drush field creation commands in the main project TASKS.md.
These only need to be run once — the database on Cloud SQL persists.

### E. Port-Forward for Local Development

```bash
# Terminal 1 — keep this open
kubectl port-forward deployment/drupal -n drupal 8080:80

# Terminal 2 — React dev server
cd C:\Users\varad\tvameva-web
set NEXT_PUBLIC_USE_CMS=true
set NEXT_PUBLIC_DRUPAL_BASE_URL=http://localhost:8080
npm run dev
```

### F. Production DNS

| Service | URL | Target |
|---------|-----|--------|
| React frontend | https://tvameva.ai | Cloud Run: tvameva-web |
| Drupal CMS admin | http://34.56.251.119 | LoadBalancer: drupal-external |
| Drupal JSON:API | http://34.56.251.119/jsonapi | LoadBalancer: drupal-external |

For production, the React frontend's `NEXT_PUBLIC_DRUPAL_BASE_URL` should point to the LoadBalancer IP or a dedicated CMS subdomain (e.g., `https://cms.tvameva.ai`).

---

## Quick Fix: Current Pod (without rebuilding image)

If you need to fix the current pod immediately without building a custom image:

### 1. Create and apply the ConfigMap
```bash
kubectl apply -f k8s-configmap-settings.yaml
```

### 2. Patch the deployment to mount settings.php
```bash
kubectl patch deployment drupal -n drupal --type=json -p='[
  {"op":"add","path":"/spec/template/spec/volumes/-","value":{"name":"drupal-settings","configMap":{"name":"drupal-settings"}}},
  {"op":"add","path":"/spec/template/spec/containers/0/volumeMounts/-","value":{"name":"drupal-settings","mountPath":"/opt/drupal/web/sites/default/settings.php","subPath":"settings.php","readOnly":true}}
]'
```

### 3. Install Drush in the running pod (temporary — lost on restart)
```bash
kubectl exec -n drupal deployment/drupal -- composer require drush/drush --working-dir=/opt/drupal
kubectl exec -n drupal deployment/drupal -- ln -sf /opt/drupal/vendor/bin/drush /usr/local/bin/drush
```

### 4. Verify
```bash
kubectl exec -n drupal deployment/drupal -- drush status
```

---

## Environment Variables Reference

| Variable | Value | Source |
|----------|-------|--------|
| `DRUPAL_DB_HOST` | 34.134.209.31 | Deployment env |
| `DRUPAL_DB_PORT` | 3306 | Deployment env |
| `DRUPAL_DB_NAME` | drupal | Deployment env |
| `DRUPAL_DB_USER` | drupal | Deployment env |
| `DRUPAL_DB_PASSWORD` | (from secret) | K8s Secret: drupal-secrets |
| `NEXT_PUBLIC_USE_CMS` | true | React .env.local |
| `NEXT_PUBLIC_DRUPAL_BASE_URL` | http://localhost:8080 (dev) / http://34.56.251.119 (prod) | React .env.local |

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Install wizard appears | No `settings.php` or missing `hash_salt` | Apply ConfigMap, remount settings.php |
| `drush: not found` | Stock image doesn't include Drush | Build custom image or `composer require drush/drush` in pod |
| JSON:API returns `image` plugin error | `image` module not enabled | `drush en image -y` or delete orphaned field configs |
| CORS errors from React | Missing CORS config in settings.php | Apply ConfigMap with `cors.config` |
| Content fields not in edit form | Form display not configured | Run form display Drush/PHP command |
| Pod restarts lose settings | settings.php not on PVC or ConfigMap | Mount settings.php from ConfigMap |
| Database connection failed in PHP CLI | CLI doesn't load settings.php from ConfigMap mount path | Use `drush` instead of raw `php -r` for Drupal operations |
