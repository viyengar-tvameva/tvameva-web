<?php
/**
 * Drupal Content Seed Script — Non-Solution Content Types
 *
 * Seeds differentiators, proof points, case studies, and pod roles.
 * Reads a JSON payload from file or stdin.
 *
 * Usage:
 *   php /tmp/seed-content.php /tmp/content.json
 *   echo '{}' | php /tmp/seed-content.php -
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
$source = $argv[1] ?? '/tmp/content.json';

echo "=== Drupal Content Seed ===\n";

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

// Content guardrails
$restricted = ['LTTS', 'Omnissa', 'SiTime'];
foreach ($restricted as $name) {
  if (stripos($json, $name) !== false) {
    fwrite(STDERR, "GUARDRAIL VIOLATION: Found restricted name '{$name}'. Aborting.\n");
    exit(2);
  }
}
echo "Guardrails: PASSED\n";

/** Helper: wrap text_long */
function text_long_val($value) {
  if ($value === null || $value === '') return null;
  return ['value' => $value, 'format' => 'plain_text'];
}

/** Helper: ensure field exists on a bundle */
function ensure_field($field_name, $bundle, $config) {
  $cardinality = $config['cardinality'] ?? 1;
  if (!FieldStorageConfig::loadByName('node', $field_name)) {
    FieldStorageConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'type' => $config['type'],
      'cardinality' => $cardinality,
    ])->save();
  }
  if (!FieldConfig::loadByName('node', $bundle, $field_name)) {
    FieldConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'bundle' => $bundle,
      'label' => $config['label'],
    ])->save();
  }
}

/** Helper: create or update a node by a unique field */
function upsert_node($type, $unique_field, $unique_value, $fields) {
  $query = \Drupal::entityQuery('node')
    ->condition('type', $type)
    ->condition($unique_field, $unique_value)
    ->accessCheck(FALSE);
  $nids = $query->execute();

  if (!empty($nids)) {
    $node = Node::load(reset($nids));
    foreach ($fields as $k => $v) {
      if ($v !== null) {
        try { $node->set($k, $v); } catch (\Exception $e) {}
      }
    }
    $node->save();
    echo "  UPDATED: {$fields['title']} (nid={$node->id()})\n";
  } else {
    $node_data = array_merge(['type' => $type], $fields);
    $node_data = array_filter($node_data, fn($v) => $v !== null);
    $node = Node::create($node_data);
    $node->save();
    echo "  CREATED: {$fields['title']} (nid={$node->id()})\n";
  }
}

// ===== DIFFERENTIATORS =====
echo "\n--- Differentiators ---\n";
// Ensure fields exist
$diff_fields = [
  'field_what_we_say' => ['type' => 'text_long', 'label' => 'What We Say'],
  'field_what_buyer_hears' => ['type' => 'text_long', 'label' => 'What Buyer Hears'],
  'field_priority_order' => ['type' => 'integer', 'label' => 'Priority Order'],
  'field_icon' => ['type' => 'string', 'label' => 'Icon'],
];
foreach ($diff_fields as $fn => $cfg) {
  ensure_field($fn, 'differentiator', $cfg);
}

foreach (($data['differentiators'] ?? []) as $d) {
  upsert_node('differentiator', 'title', $d['title'], [
    'title' => $d['title'],
    'field_what_we_say' => text_long_val($d['whatWeSay']),
    'field_what_buyer_hears' => text_long_val($d['whatBuyerHears']),
    'field_priority_order' => $d['priority'] ?? 99,
    'field_icon' => $d['icon'] ?? '',
  ]);
}

// ===== PROOF POINTS =====
echo "\n--- Proof Points ---\n";
$pp_fields = [
  'field_stat_number' => ['type' => 'string', 'label' => 'Stat Number'],
  'field_context' => ['type' => 'text_long', 'label' => 'Context'],
  'field_priority' => ['type' => 'integer', 'label' => 'Priority'],
];
foreach ($pp_fields as $fn => $cfg) {
  ensure_field($fn, 'proof_point', $cfg);
}

$pp_priority = 1;
foreach (($data['proofPoints'] ?? []) as $pp) {
  upsert_node('proof_point', 'title', $pp['label'], [
    'title' => $pp['label'],
    'field_stat_number' => $pp['stat'],
    'field_context' => text_long_val($pp['context']),
    'field_priority' => $pp_priority++,
  ]);
}

// ===== CASE STUDIES =====
echo "\n--- Case Studies ---\n";
$cs_fields = [
  'field_company_size' => ['type' => 'string', 'label' => 'Company Size'],
  'field_challenge' => ['type' => 'text_long', 'label' => 'Challenge'],
  'field_result' => ['type' => 'text_long', 'label' => 'Result'],
  'field_metrics_json' => ['type' => 'text_long', 'label' => 'Metrics (JSON)'],
  'field_solution_areas_json' => ['type' => 'text_long', 'label' => 'Solution Areas (JSON)'],
  'field_vertical_label' => ['type' => 'string', 'label' => 'Vertical Label'],
];
foreach ($cs_fields as $fn => $cfg) {
  ensure_field($fn, 'case_study', $cfg);
}

foreach (($data['caseStudies'] ?? []) as $cs) {
  upsert_node('case_study', 'title', $cs['title'], [
    'title' => $cs['title'],
    'field_company_size' => $cs['companySize'] ?? '',
    'field_challenge' => text_long_val($cs['challenge']),
    'field_result' => text_long_val($cs['result']),
    'field_metrics_json' => text_long_val(json_encode($cs['metrics'] ?? [])),
    'field_solution_areas_json' => text_long_val(json_encode($cs['solutionAreas'] ?? [])),
    'field_vertical_label' => $cs['vertical'] ?? '',
  ]);
}

// ===== POD ROLES =====
echo "\n--- Pod Roles ---\n";
// Check if pod_role content type exists; if not, create it
$type_storage = \Drupal::entityTypeManager()->getStorage('node_type');
if (!$type_storage->load('pod_role')) {
  $type_storage->create([
    'type' => 'pod_role',
    'name' => 'Pod Role',
    'description' => 'Pod team role descriptions',
  ])->save();
  echo "  Created content type: pod_role\n";
}

$pr_fields = [
  'field_responsibility' => ['type' => 'text_long', 'label' => 'Responsibility'],
  'field_ai_augmentation' => ['type' => 'text_long', 'label' => 'AI Augmentation'],
  'field_icon' => ['type' => 'string', 'label' => 'Icon'],
  'field_priority' => ['type' => 'integer', 'label' => 'Priority'],
];
foreach ($pr_fields as $fn => $cfg) {
  ensure_field($fn, 'pod_role', $cfg);
}

$pr_priority = 1;
foreach (($data['podRoles'] ?? []) as $pr) {
  upsert_node('pod_role', 'title', $pr['title'], [
    'title' => $pr['title'],
    'field_responsibility' => text_long_val($pr['responsibility']),
    'field_ai_augmentation' => text_long_val($pr['aiAugmentation']),
    'field_icon' => $pr['icon'] ?? '',
    'field_priority' => $pr_priority++,
  ]);
}

echo "\n=== CONTENT SEED COMPLETE ===\n";
