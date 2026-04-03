#!/bin/bash
set -e

echo "=== Tvameva Drupal Startup ==="

# Wait for database to be reachable (using PDO, not mysqli)
echo "Waiting for database..."
for i in $(seq 1 30); do
  if php -r "
    \$h = getenv('DRUPAL_DB_HOST') ?: 'localhost';
    \$p = getenv('DRUPAL_DB_PORT') ?: '3306';
    \$u = getenv('DRUPAL_DB_USER') ?: 'drupal';
    \$pw = getenv('DRUPAL_DB_PASSWORD') ?: '';
    \$db = getenv('DRUPAL_DB_NAME') ?: 'drupal';
    try { new PDO(\"mysql:host=\$h;port=\$p;dbname=\$db\", \$u, \$pw, [PDO::ATTR_TIMEOUT => 5]); exit(0); }
    catch (Exception \$e) { exit(1); }
  " 2>/dev/null; then
    echo "Database is reachable."
    break
  fi
  echo "  Attempt $i/30 — waiting 2s..."
  sleep 2
done

# Check if Drupal is installed (has the key_value table)
INSTALLED=$(php -r "
  \$h = getenv('DRUPAL_DB_HOST') ?: 'localhost';
  \$p = getenv('DRUPAL_DB_PORT') ?: '3306';
  \$u = getenv('DRUPAL_DB_USER') ?: 'drupal';
  \$pw = getenv('DRUPAL_DB_PASSWORD') ?: '';
  \$db = getenv('DRUPAL_DB_NAME') ?: 'drupal';
  try {
    \$pdo = new PDO(\"mysql:host=\$h;port=\$p;dbname=\$db\", \$u, \$pw);
    \$r = \$pdo->query(\"SHOW TABLES LIKE 'key_value'\");
    echo \$r->rowCount() > 0 ? 'yes' : 'no';
  } catch (Exception \$e) { echo 'no'; }
" 2>/dev/null)

echo "Drupal installed: $INSTALLED"

if [ "$INSTALLED" = "no" ]; then
  echo "Drupal not installed. Running site install..."
  drush site:install standard \
    --db-url="mysql://${DRUPAL_DB_USER:-drupal}:${DRUPAL_DB_PASSWORD}@${DRUPAL_DB_HOST:-localhost}:${DRUPAL_DB_PORT:-3306}/${DRUPAL_DB_NAME:-drupal}" \
    --site-name="Tvameva CMS" \
    --account-name=admin \
    --account-pass=admin \
    --yes 2>&1 || true
  echo "Site install complete."
fi

# Ensure critical modules are enabled
echo "Ensuring core modules are enabled..."
drush en -y field field_ui node text options link menu_ui jsonapi serialization basic_auth rest webform webform_rest 2>&1 || true

# Ensure contact_inquiry webform exists
echo "Ensuring contact form exists..."
drush php:eval '
$webform = \Drupal\webform\Entity\Webform::load("contact_inquiry");
if (!$webform) {
  $webform = \Drupal\webform\Entity\Webform::create([
    "id" => "contact_inquiry",
    "title" => "Contact Inquiry",
    "status" => "open",
    "elements" => "name:\n  \"#type\": textfield\n  \"#title\": Name\n  \"#required\": true\nemail:\n  \"#type\": email\n  \"#title\": Email\n  \"#required\": true\ncompany:\n  \"#type\": textfield\n  \"#title\": Company\n  \"#required\": true\nmessage:\n  \"#type\": textarea\n  \"#title\": Message\n  \"#required\": true\ntype:\n  \"#type\": hidden\n  \"#title\": Type",
  ]);
  $handler_manager = \Drupal::service("plugin.manager.webform.handler");
  $handler = $handler_manager->createInstance("email", [
    "handler_id" => "email_notify",
    "label" => "Email notification",
    "status" => true,
    "settings" => [
      "to_mail" => "varada@tvameva.ai",
      "from_mail" => "default",
      "subject" => "New Contact Inquiry from [webform_submission:values:name]",
      "body" => "default",
      "reply_to" => "[webform_submission:values:email]",
    ],
  ]);
  $webform->addWebformHandler($handler);
  $webform->save();
  echo "Created contact_inquiry webform with email handler\n";
} else {
  echo "contact_inquiry webform already exists\n";
}
// Ensure anonymous can submit
user_role_grant_permissions("anonymous", ["restful post webform_rest_submit", "access any webform configuration"]);
echo "Permissions set\n";
' 2>&1 || true

# Configure SMTP mail system
echo "Configuring SMTP..."
drush php:eval '
$config = \Drupal::configFactory()->getEditable("smtp.settings");
$config->set("smtp_on", true);
$config->set("smtp_host", "smtp.gmail.com");
$config->set("smtp_port", "587");
$config->set("smtp_protocol", "tls");
$config->set("smtp_username", getenv("SMTP_USERNAME") ?: "varada@tvameva.ai");
$config->set("smtp_password", getenv("SMTP_PASSWORD") ?: "");
$config->set("smtp_from", getenv("SMTP_USERNAME") ?: "varada@tvameva.ai");
$config->set("smtp_fromname", "Tvameva");
$config->save();

$mail_config = \Drupal::configFactory()->getEditable("system.mail");
$mail_config->set("interface.default", "SMTPMailSystem");
$mail_config->save();

$site_config = \Drupal::configFactory()->getEditable("system.site");
$site_config->set("mail", getenv("SMTP_USERNAME") ?: "varada@tvameva.ai");
$site_config->save();
echo "SMTP configured\n";
' 2>&1 || true

# Rebuild caches so Drupal discovers all modules and routes
echo "Rebuilding caches..."
drush cr 2>&1 || true

echo "=== Drupal ready. Starting Apache. ==="

# Hand off to the original Drupal entrypoint (apache)
exec docker-php-entrypoint apache2-foreground
