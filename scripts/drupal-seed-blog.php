<?php
/**
 * Drupal Blog Post Seed Script
 *
 * Creates/updates blog_post nodes from JSON files.
 * Automatically creates the blog_post content type and fields if they don't exist.
 *
 * Usage:
 *   php /tmp/seed-blog.php /tmp/blog-post.json
 *   echo '{}' | php /tmp/seed-blog.php -
 */

use Drupal\node\Entity\Node;
use Drupal\field\Entity\FieldStorageConfig;
use Drupal\field\Entity\FieldConfig;

// Bootstrap Drupal
$autoloader = require '/opt/drupal/web/autoload.php';
$kernel = \Drupal\Core\DrupalKernel::createFromRequest(
  \Symfony\Component\HttpFoundation\Request::createFromGlobals(),
  $autoloader,
  'prod'
);
$kernel->boot();
$kernel->preHandle(\Symfony\Component\HttpFoundation\Request::createFromGlobals());

// Parse arguments
$source = $argv[1] ?? '/tmp/blog-post.json';

echo "=== Drupal Blog Post Seed ===\n";

// Read JSON
if ($source === '-') {
  $json = file_get_contents('php://stdin');
} else {
  if (!file_exists($source)) {
    fwrite(STDERR, "ERROR: JSON file not found: {$source}\n");
    exit(1);
  }
  $json = file_get_contents($source);
}

$data = json_decode($json, true);
if (json_last_error() !== JSON_ERROR_NONE) {
  fwrite(STDERR, "ERROR: Invalid JSON: " . json_last_error_msg() . "\n");
  exit(1);
}

echo "Payload loaded: " . strlen($json) . " bytes\n";

// Content guardrails
$restricted = ['Omnissa', 'SiTime'];
foreach ($restricted as $name) {
  if (stripos($json, $name) !== false) {
    fwrite(STDERR, "GUARDRAIL VIOLATION: Found restricted name '{$name}'. Aborting.\n");
    exit(2);
  }
}
echo "Guardrails: PASSED\n";

// Ensure blog_post content type exists
$type_storage = \Drupal::entityTypeManager()->getStorage('node_type');
if (!$type_storage->load('blog_post')) {
  $type_storage->create([
    'type' => 'blog_post',
    'name' => 'Blog Post',
    'description' => 'Blog articles for tvameva.ai',
  ])->save();
  echo "Created content type: blog_post\n";
}

// Ensure fields exist
$fields = [
  'field_slug'              => ['type' => 'string', 'label' => 'Slug'],
  'field_body'              => ['type' => 'text_long', 'label' => 'Body'],
  'field_excerpt'           => ['type' => 'text_long', 'label' => 'Excerpt'],
  'field_featured_image'    => ['type' => 'string', 'label' => 'Featured Image URL'],
  'field_published_date'    => ['type' => 'string', 'label' => 'Published Date'],
  'field_author'            => ['type' => 'string', 'label' => 'Author'],
  'field_author_title'      => ['type' => 'string', 'label' => 'Author Title'],
  'field_category'          => ['type' => 'string', 'label' => 'Category'],
  'field_related_sa'        => ['type' => 'string', 'label' => 'Related Solution Area'],
  'field_reading_time'      => ['type' => 'integer', 'label' => 'Reading Time (minutes)'],
  'field_meta_title'        => ['type' => 'string', 'label' => 'SEO Meta Title'],
  'field_meta_description'  => ['type' => 'text_long', 'label' => 'SEO Meta Description'],
  'field_social_snippets'   => ['type' => 'text_long', 'label' => 'Social Snippets (JSON)'],
  'field_linkedin_summary'  => ['type' => 'text_long', 'label' => 'LinkedIn Summary'],
  'field_key_stats'         => ['type' => 'text_long', 'label' => 'Key Stats (JSON)'],
  'field_email_sections'    => ['type' => 'text_long', 'label' => 'Email Sections (JSON)'],
  'field_cta_type'          => ['type' => 'string', 'label' => 'CTA Type'],
];

foreach ($fields as $field_name => $config) {
  if (!FieldStorageConfig::loadByName('node', $field_name)) {
    FieldStorageConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'type' => $config['type'],
      'cardinality' => 1,
    ])->save();
  }
  if (!FieldConfig::loadByName('node', 'blog_post', $field_name)) {
    FieldConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'bundle' => 'blog_post',
      'label' => $config['label'],
    ])->save();
  }
}
echo "Fields: OK\n";

// Helper
function text_long_val($value) {
  if ($value === null || $value === '') return null;
  return ['value' => $value, 'format' => 'basic_html'];
}

function json_field_val($value) {
  if ($value === null || (is_array($value) && empty($value))) return null;
  return text_long_val(json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

// Build field values
$slug = $data['slug'] ?? '';
$node_fields = [
  'title'                   => $data['title'] ?? 'Untitled',
  'field_slug'              => $slug,
  'field_body'              => text_long_val($data['body'] ?? ''),
  'field_excerpt'           => text_long_val($data['excerpt'] ?? ''),
  'field_featured_image'    => $data['featuredImage'] ?? '',
  'field_published_date'    => $data['publishedDate'] ?? date('Y-m-d'),
  'field_author'            => $data['author'] ?? 'Varada Iyengar',
  'field_author_title'      => $data['authorTitle'] ?? 'Founder, Tvameva',
  'field_category'          => $data['category'] ?? '',
  'field_related_sa'        => $data['relatedSA'] ?? '',
  'field_reading_time'      => $data['readingTime'] ?? 5,
  'field_meta_title'        => $data['seo']['metaTitle'] ?? $data['title'] ?? '',
  'field_meta_description'  => text_long_val($data['seo']['metaDescription'] ?? ''),
  'field_social_snippets'   => json_field_val($data['socialSnippets'] ?? null),
  'field_linkedin_summary'  => text_long_val($data['linkedinSummary'] ?? null),
  'field_key_stats'         => json_field_val($data['keyStats'] ?? null),
  'field_email_sections'    => json_field_val($data['emailSections'] ?? null),
  'field_cta_type'          => $data['ctaType'] ?? 'demo',
];

// Check for existing
$query = \Drupal::entityQuery('node')
  ->condition('type', 'blog_post')
  ->condition('field_slug', $slug)
  ->accessCheck(FALSE);
$nids = $query->execute();

if (!empty($nids)) {
  $nid = reset($nids);
  $node = Node::load($nid);
  foreach ($node_fields as $k => $v) {
    if ($v !== null) {
      try { $node->set($k, $v); } catch (\Exception $e) {}
    }
  }
  $node->save();
  echo "UPDATED: {$node_fields['title']} (nid={$node->id()})\n";
} else {
  $node_data = array_merge(['type' => 'blog_post'], $node_fields);
  $node_data = array_filter($node_data, fn($v) => $v !== null);
  $node = Node::create($node_data);
  $node->save();
  echo "CREATED: {$node_fields['title']} (nid={$node->id()})\n";
}

// Verify
$verify = Node::load($node->id());
echo "\n=== Verification ===\n";
echo "Title: " . $verify->getTitle() . "\n";
echo "Slug: " . $verify->get('field_slug')->value . "\n";
echo "Category: " . $verify->get('field_category')->value . "\n";
echo "Author: " . $verify->get('field_author')->value . "\n";
echo "Status: " . ($verify->isPublished() ? 'Published' : 'Unpublished') . "\n";

echo "\n=== BLOG SEED COMPLETE ===\n";
