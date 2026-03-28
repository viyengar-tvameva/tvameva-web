#!/bin/bash
# infrastructure/gcp-setup.sh
# One-time GCP project setup for tvameva.ai
#
# Run: bash infrastructure/gcp-setup.sh
#
# This script:
# 1. Creates a GCP project (or uses existing)
# 2. Enables required APIs
# 3. Creates Artifact Registry for Docker images
# 4. Creates a GKE Autopilot cluster for Drupal
# 5. Sets up Cloud Run for the React frontend
# 6. Configures Cloud SQL (MySQL) for Drupal

set -euo pipefail

# ==========================================
# CONFIGURATION — Update these values
# ==========================================
PROJECT_ID="${GCP_PROJECT_ID:-tvameva-prod}"
REGION="${GCP_REGION:-us-central1}"
ZONE="${GCP_ZONE:-us-central1-a}"
BILLING_ACCOUNT="${GCP_BILLING_ACCOUNT:-}"  # Required for new projects
CLUSTER_NAME="tvameva-gke"
SQL_INSTANCE="tvameva-drupal-db"
SQL_DB_NAME="drupal"
SQL_USER="drupal"
SQL_PASSWORD="${DRUPAL_DB_PASSWORD:-$(openssl rand -base64 24)}"
REPO_NAME="tvameva-images"

echo "=========================================="
echo "Tvameva GCP Infrastructure Setup"
echo "Project: ${PROJECT_ID}"
echo "Region:  ${REGION}"
echo "=========================================="

# ==========================================
# 1. Project Setup
# ==========================================
echo ""
echo "==> Step 1: Project setup..."

# Check if project exists
if gcloud projects describe "${PROJECT_ID}" &>/dev/null; then
  echo "    Project ${PROJECT_ID} already exists."
else
  echo "    Creating project ${PROJECT_ID}..."
  gcloud projects create "${PROJECT_ID}" --name="Tvameva Production"
  if [ -n "${BILLING_ACCOUNT}" ]; then
    gcloud billing projects link "${PROJECT_ID}" --billing-account="${BILLING_ACCOUNT}"
  else
    echo "    WARNING: No billing account set. Link one manually:"
    echo "    gcloud billing projects link ${PROJECT_ID} --billing-account=YOUR_ACCOUNT"
  fi
fi

gcloud config set project "${PROJECT_ID}"

# ==========================================
# 2. Enable APIs
# ==========================================
echo ""
echo "==> Step 2: Enabling required APIs..."

APIS=(
  "container.googleapis.com"        # GKE
  "run.googleapis.com"               # Cloud Run
  "artifactregistry.googleapis.com"  # Container images
  "sqladmin.googleapis.com"          # Cloud SQL
  "compute.googleapis.com"           # Compute Engine (for GKE nodes)
  "dns.googleapis.com"               # Cloud DNS
  "certificatemanager.googleapis.com" # SSL certs
  "secretmanager.googleapis.com"     # Secrets
)

for api in "${APIS[@]}"; do
  echo "    Enabling ${api}..."
  gcloud services enable "${api}" --project="${PROJECT_ID}" 2>/dev/null || true
done

# ==========================================
# 3. Artifact Registry
# ==========================================
echo ""
echo "==> Step 3: Creating Artifact Registry..."

if gcloud artifacts repositories describe "${REPO_NAME}" \
  --location="${REGION}" --project="${PROJECT_ID}" &>/dev/null; then
  echo "    Repository ${REPO_NAME} already exists."
else
  gcloud artifacts repositories create "${REPO_NAME}" \
    --repository-format=docker \
    --location="${REGION}" \
    --project="${PROJECT_ID}" \
    --description="Tvameva Docker images"
fi

# Configure Docker auth
gcloud auth configure-docker "${REGION}-docker.pkg.dev" --quiet

# ==========================================
# 4. Cloud SQL (MySQL for Drupal)
# ==========================================
echo ""
echo "==> Step 4: Creating Cloud SQL instance for Drupal..."

if gcloud sql instances describe "${SQL_INSTANCE}" --project="${PROJECT_ID}" &>/dev/null; then
  echo "    Cloud SQL instance ${SQL_INSTANCE} already exists."
else
  gcloud sql instances create "${SQL_INSTANCE}" \
    --project="${PROJECT_ID}" \
    --region="${REGION}" \
    --database-version=MYSQL_8_0 \
    --tier=db-f1-micro \
    --storage-size=10 \
    --storage-auto-increase \
    --backup-start-time="03:00" \
    --availability-type=zonal

  # Create database
  gcloud sql databases create "${SQL_DB_NAME}" \
    --instance="${SQL_INSTANCE}" \
    --project="${PROJECT_ID}"

  # Create user
  gcloud sql users create "${SQL_USER}" \
    --instance="${SQL_INSTANCE}" \
    --project="${PROJECT_ID}" \
    --password="${SQL_PASSWORD}"
fi

# Store DB password in Secret Manager
echo ""
echo "==> Storing credentials in Secret Manager..."
echo -n "${SQL_PASSWORD}" | gcloud secrets create drupal-db-password \
  --data-file=- --project="${PROJECT_ID}" 2>/dev/null || \
echo -n "${SQL_PASSWORD}" | gcloud secrets versions add drupal-db-password \
  --data-file=- --project="${PROJECT_ID}" 2>/dev/null || true

# ==========================================
# 5. GKE Autopilot Cluster (for Drupal)
# ==========================================
echo ""
echo "==> Step 5: Creating GKE Autopilot cluster..."

if gcloud container clusters describe "${CLUSTER_NAME}" \
  --region="${REGION}" --project="${PROJECT_ID}" &>/dev/null; then
  echo "    GKE cluster ${CLUSTER_NAME} already exists."
else
  gcloud container clusters create-auto "${CLUSTER_NAME}" \
    --project="${PROJECT_ID}" \
    --region="${REGION}" \
    --release-channel=regular
fi

# Get credentials
gcloud container clusters get-credentials "${CLUSTER_NAME}" \
  --region="${REGION}" --project="${PROJECT_ID}"

# ==========================================
# 6. Summary
# ==========================================
echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "GCP Project:        ${PROJECT_ID}"
echo "Region:             ${REGION}"
echo "Artifact Registry:  ${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}"
echo "GKE Cluster:        ${CLUSTER_NAME}"
echo "Cloud SQL Instance: ${SQL_INSTANCE}"
echo "Cloud SQL Database: ${SQL_DB_NAME}"
echo ""
echo "Next steps:"
echo "  1. Deploy Drupal to GKE:  kubectl apply -f infrastructure/gke/"
echo "  2. Deploy React to Cloud Run: bash infrastructure/cloudrun/deploy.sh"
echo "  3. Configure DNS for tvameva.ai"
echo "  4. Set up SSL certificates"
echo ""
echo "DB Password stored in Secret Manager: drupal-db-password"
echo "=========================================="
