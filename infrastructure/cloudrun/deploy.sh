# infrastructure/cloudrun/deploy.sh
# Deploy React frontend to Cloud Run
#
# Prerequisites:
#   - gcloud CLI installed and authenticated
#   - GCP project created
#   - Artifact Registry repository created

set -euo pipefail

# Configuration — update these
PROJECT_ID="${GCP_PROJECT_ID:-tvameva-prod}"
REGION="${GCP_REGION:-us-central1}"
SERVICE_NAME="tvameva-web"
REPO_NAME="tvameva-images"
IMAGE_TAG="${IMAGE_TAG:-latest}"
IMAGE_URI="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${SERVICE_NAME}:${IMAGE_TAG}"

# Environment variables for the container
DRUPAL_BASE_URL="${DRUPAL_BASE_URL:-http://drupal-service.default.svc.cluster.local:8080}"
SITE_URL="${SITE_URL:-https://tvameva.ai}"
USE_CMS="${USE_CMS:-false}"

echo "==> Building Docker image..."
docker build \
  --build-arg DRUPAL_BASE_URL="${DRUPAL_BASE_URL}" \
  --build-arg SITE_URL="${SITE_URL}" \
  --build-arg NEXT_PUBLIC_USE_CMS="${USE_CMS}" \
  -t "${IMAGE_URI}" \
  .

echo "==> Pushing to Artifact Registry..."
docker push "${IMAGE_URI}"

echo "==> Deploying to Cloud Run..."
gcloud run deploy "${SERVICE_NAME}" \
  --project="${PROJECT_ID}" \
  --region="${REGION}" \
  --image="${IMAGE_URI}" \
  --platform=managed \
  --allow-unauthenticated \
  --port=3000 \
  --memory=512Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=10 \
  --set-env-vars="DRUPAL_BASE_URL=${DRUPAL_BASE_URL},SITE_URL=${SITE_URL},NEXT_PUBLIC_USE_CMS=${USE_CMS}" \
  --ingress=all

echo "==> Deployment complete."
gcloud run services describe "${SERVICE_NAME}" \
  --project="${PROJECT_ID}" \
  --region="${REGION}" \
  --format='value(status.url)'
