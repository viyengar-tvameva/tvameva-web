<?php
/**
 * Drupal Solution Area Seed Script
 *
 * Reads a JSON payload (from file or stdin) and creates/updates a solution_area
 * node in Drupal via the Entity API. Designed to run inside the Drupal pod.
 *
 * Usage:
 *   php /tmp/seed.php <slug>                 # reads /tmp/<slug>.json
 *   php /tmp/seed.php <slug> /path/to.json   # reads specified file
 *   echo '{}' | php /tmp/seed.php <slug> -   # reads from stdin
 *
 * Executed via kubectl:
 *   kubectl cp scripts/drupal-seed-solution.php $POD:/tmp/seed.php
 *   kubectl cp /tmp/insightlens.json $POD:/tmp/insightlens.json
 *   kubectl exec -it $POD -- php /tmp/seed.php insightlens
 */

use Drupal\node\Entity\Node;
use Drupal\field\Entity\FieldStorageConfig;
use Drupal\field\Entity\FieldConfig;

// ---------------------------------------------------------------------------
// Bootstrap Drupal
// ---------------------------------------------------------------------------
$autoloader = require '/opt/drupal/web/autoload.php';
$kernel = \Drupal\Core\DrupalKernel::createFromRequest(
  \Symfony\Component\HttpFoundation\Request::createFromGlobals(),
  $autoloader,
  'prod'
);
$kernel->boot();
$kernel->preHandle(\Symfony\Component\HttpFoundation\Request::createFromGlobals());

// ---------------------------------------------------------------------------
// Parse arguments
// ---------------------------------------------------------------------------
$slug = $argv[1] ?? null;
$source = $argv[2] ?? "/tmp/{$slug}.json";

if (!$slug) {
  fwrite(STDERR, "Usage: php seed.php <slug> [json-file|-]\n");
  exit(1);
}

echo "=== Drupal Solution Area Seed ===\n";
echo "Slug: {$slug}\n";

// ---------------------------------------------------------------------------
// Read JSON payload
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Content guardrails check
// ---------------------------------------------------------------------------
$restricted = ['LTTS', 'Omnissa', 'SiTime'];
foreach ($restricted as $name) {
  if (stripos($json, $name) !== false) {
    fwrite(STDERR, "GUARDRAIL VIOLATION: Found restricted name '{$name}' in payload. Aborting.\n");
    exit(2);
  }
}
echo "Guardrails: PASSED\n";

// ---------------------------------------------------------------------------
// Ensure enriched fields exist
// ---------------------------------------------------------------------------
$enriched_fields = [
  'field_hero_subheadline'      => ['type' => 'text_long', 'label' => 'Hero Subheadline'],
  'field_hero_ctas'             => ['type' => 'text_long', 'label' => 'Hero CTAs (JSON)'],
  'field_challenge_headline'    => ['type' => 'text_long', 'label' => 'Challenge Headline'],
  'field_challenge_body'        => ['type' => 'text_long', 'label' => 'Challenge Body'],
  'field_value_drivers'         => ['type' => 'text_long', 'label' => 'Value Drivers (JSON)'],
  'field_pod_headline'          => ['type' => 'text_long', 'label' => 'Pod Model Headline'],
  'field_pod_body'              => ['type' => 'text_long', 'label' => 'Pod Model Body'],
  'field_pod_roles'             => ['type' => 'string', 'label' => 'Pod Roles', 'cardinality' => -1],
  'field_ai_agent_types'        => ['type' => 'text_long', 'label' => 'AI Agent Types (JSON)'],
  'field_stack_headline'        => ['type' => 'text_long', 'label' => 'Tech Stack Headline'],
  'field_stack_body'            => ['type' => 'text_long', 'label' => 'Tech Stack Body'],
  'field_tech_stack_layers'     => ['type' => 'text_long', 'label' => 'Tech Stack Layers (JSON)'],
  'field_tech_stack_connectors' => ['type' => 'text_long', 'label' => 'Tech Stack Connectors (JSON)'],
  'field_proof_points'          => ['type' => 'text_long', 'label' => 'Proof Points (JSON)'],
  'field_market_headline'       => ['type' => 'text_long', 'label' => 'Market Context Headline'],
  'field_market_stats'          => ['type' => 'text_long', 'label' => 'Market Stats (JSON)'],
  'field_expansion_headline'    => ['type' => 'text_long', 'label' => 'Expansion Path Headline'],
  'field_expansion_body'        => ['type' => 'text_long', 'label' => 'Expansion Path Body'],
  'field_expansion_connections' => ['type' => 'text_long', 'label' => 'Expansion Connections (JSON)'],
  'field_expansion_sa_id'       => ['type' => 'string', 'label' => 'Expansion SA ID'],
  'field_expansion_sa_desc'     => ['type' => 'text_long', 'label' => 'Expansion SA Description'],
  'field_advisory_ext_headline' => ['type' => 'text_long', 'label' => 'Advisory Extended Headline'],
  'field_advisory_ext_body'     => ['type' => 'text_long', 'label' => 'Advisory Extended Body'],
  'field_advisory_scope'        => ['type' => 'string', 'label' => 'Advisory Scope Items', 'cardinality' => -1],
  'field_advisory_pricing'      => ['type' => 'text_long', 'label' => 'Advisory Pricing Note'],
  'field_meta_title'            => ['type' => 'string', 'label' => 'SEO Meta Title'],
  'field_meta_description'      => ['type' => 'text_long', 'label' => 'SEO Meta Description'],
  'field_sa_priority'           => ['type' => 'integer', 'label' => 'Sort Priority'],
  'field_platform_partners'     => ['type' => 'string', 'label' => 'Platform Partners', 'cardinality' => -1],
  'field_pays_for'              => ['type' => 'string', 'label' => 'Client Pays For'],
  'field_not_for'               => ['type' => 'string', 'label' => 'Client Does Not Pay For'],
  'field_architecture_diagram'  => ['type' => 'text_long', 'label' => 'Architecture Diagram (JSON)'],
  'field_workflow_steps'        => ['type' => 'text_long', 'label' => 'Workflow Steps (JSON)'],
  'field_metrics_comparison'    => ['type' => 'text_long', 'label' => 'Metrics Comparison (JSON)'],
  'field_relationship_graph'    => ['type' => 'text_long', 'label' => 'Relationship Graph (JSON)'],
];

$fields_created = 0;
foreach ($enriched_fields as $field_name => $config) {
  $cardinality = $config['cardinality'] ?? 1;

  if (!FieldStorageConfig::loadByName('node', $field_name)) {
    FieldStorageConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'type' => $config['type'],
      'cardinality' => $cardinality,
    ])->save();
    echo "  Created field storage: {$field_name}\n";
    $fields_created++;
  }

  if (!FieldConfig::loadByName('node', 'solution_area', $field_name)) {
    FieldConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'bundle' => 'solution_area',
      'label' => $config['label'],
    ])->save();
    echo "  Attached to solution_area: {$field_name}\n";
    $fields_created++;
  }
}

if ($fields_created > 0) {
  echo "Fields bootstrap: {$fields_created} field configs created\n";
} else {
  echo "Fields bootstrap: All fields already exist\n";
}

// ---------------------------------------------------------------------------
// Check for existing node
// ---------------------------------------------------------------------------
$query = \Drupal::entityQuery('node')
  ->condition('type', 'solution_area')
  ->condition('field_slug', $slug)
  ->accessCheck(FALSE);
$nids = $query->execute();

$is_update = !empty($nids);
$node = null;

if ($is_update) {
  $nid = reset($nids);
  $node = Node::load($nid);
  echo "Mode: UPDATE (nid={$nid}, uuid={$node->uuid()})\n";
} else {
  echo "Mode: CREATE\n";
}

// ---------------------------------------------------------------------------
// Build field values
// ---------------------------------------------------------------------------

/** Wrap a value for a text_long Drupal field */
function text_long_val($value) {
  if ($value === null || $value === '') return null;
  return ['value' => $value, 'format' => 'plain_text'];
}

/** JSON-encode an array/object for storage in a text_long field */
function json_field_val($value) {
  if ($value === null || (is_array($value) && empty($value))) return null;
  return text_long_val(json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
}

$fields = [];

// Core fields
$fields['title']                    = $data['name'] ?? $data['title'] ?? $slug;
$fields['field_slug']               = $slug;
$fields['field_tagline']            = $data['tagline'] ?? '';
$fields['field_headline']           = $data['headline'] ?? '';
$fields['field_platform_anchor']    = $data['platformAnchor'] ?? '';
$fields['field_platform_partners']  = $data['platformPartners'] ?? [];
$fields['field_value_prop']         = text_long_val($data['valueProp'] ?? '');
$fields['field_key_ip_name']        = $data['keyIP']['name'] ?? '';
$fields['field_key_ip_description'] = $data['keyIP']['description'] ?? '';
$fields['field_outcome_metrics']    = $data['outcomeMetrics'] ?? [];
$fields['field_pays_for']           = $data['pricingContrast']['paysFor'] ?? '';
$fields['field_not_for']            = $data['pricingContrast']['notFor'] ?? '';
$fields['field_advisory_name']      = $data['advisory']['name'] ?? '';
$fields['field_advisory_description'] = text_long_val($data['advisory']['description'] ?? '');
$fields['field_advisory_cta']       = $data['advisory']['cta'] ?? '';
$fields['field_capabilities']       = $data['capabilities'] ?? [];
$fields['field_color']              = $data['color'] ?? 'teal';
$fields['field_icon']               = $data['icon'] ?? 'Layout';
$fields['field_sa_priority']        = $data['priority'] ?? 99;

// Expansion SA (stored as flat fields, not entity reference for simplicity)
$fields['field_expansion_sa_id']    = $data['expansionSA']['id'] ?? '';
$fields['field_expansion_sa_desc']  = text_long_val($data['expansionSA']['description'] ?? '');

// Market stats (core level)
$fields['field_market_stats']       = json_field_val($data['marketStats'] ?? []);

// Enriched fields
$fields['field_hero_subheadline']   = text_long_val($data['heroSubheadline'] ?? null);
$fields['field_hero_ctas']          = json_field_val($data['heroCTAs'] ?? null);

if (!empty($data['challenge'])) {
  $fields['field_challenge_headline'] = text_long_val($data['challenge']['headline'] ?? '');
  $fields['field_challenge_body']     = text_long_val($data['challenge']['body'] ?? '');
}

$fields['field_value_drivers']      = json_field_val($data['valueDrivers'] ?? null);

if (!empty($data['podModel'])) {
  $fields['field_pod_headline']     = text_long_val($data['podModel']['headline'] ?? '');
  $fields['field_pod_body']         = text_long_val($data['podModel']['body'] ?? '');
  $fields['field_pod_roles']        = $data['podModel']['roles'] ?? [];
  $fields['field_ai_agent_types']   = json_field_val($data['podModel']['aiAgentTypes'] ?? null);
}

if (!empty($data['techStack'])) {
  $fields['field_stack_headline']        = text_long_val($data['techStack']['headline'] ?? '');
  $fields['field_stack_body']            = text_long_val($data['techStack']['body'] ?? '');
  $fields['field_tech_stack_layers']     = json_field_val($data['techStack']['layers'] ?? null);
  $fields['field_tech_stack_connectors'] = json_field_val($data['techStack']['connectors'] ?? null);
}

$fields['field_proof_points']       = json_field_val($data['proofPoints'] ?? null);

if (!empty($data['marketContext'])) {
  $fields['field_market_headline']  = text_long_val($data['marketContext']['headline'] ?? '');
  // stats already set above from marketStats
}

if (!empty($data['expansionPath'])) {
  $fields['field_expansion_headline']    = text_long_val($data['expansionPath']['headline'] ?? '');
  $fields['field_expansion_body']        = text_long_val($data['expansionPath']['body'] ?? '');
  $fields['field_expansion_connections'] = json_field_val($data['expansionPath']['connections'] ?? null);
}

if (!empty($data['advisoryExtended'])) {
  $fields['field_advisory_ext_headline'] = text_long_val($data['advisoryExtended']['headline'] ?? '');
  $fields['field_advisory_ext_body']     = text_long_val($data['advisoryExtended']['body'] ?? '');
  $fields['field_advisory_scope']        = $data['advisoryExtended']['scopeItems'] ?? [];
  $fields['field_advisory_pricing']      = text_long_val($data['advisoryExtended']['pricingNote'] ?? null);
}

if (!empty($data['seo'])) {
  $fields['field_meta_title']       = $data['seo']['metaTitle'] ?? '';
  $fields['field_meta_description'] = text_long_val($data['seo']['metaDescription'] ?? '');
}

// Visual component data
$fields['field_architecture_diagram'] = json_field_val($data['architectureDiagram'] ?? null);
$fields['field_workflow_steps']       = json_field_val($data['workflowSteps'] ?? null);
$fields['field_metrics_comparison']   = json_field_val($data['metricsComparison'] ?? null);
$fields['field_relationship_graph']   = json_field_val($data['relationshipGraph'] ?? null);

// ---------------------------------------------------------------------------
// Create or Update
// ---------------------------------------------------------------------------
$updated_count = 0;

if ($is_update) {
  foreach ($fields as $field_name => $value) {
    if ($value === null) continue;
    try {
      $node->set($field_name, $value);
      $updated_count++;
    } catch (\Exception $e) {
      fwrite(STDERR, "  WARN: Could not set {$field_name}: {$e->getMessage()}\n");
    }
  }
  $node->save();
  echo "UPDATED: {$fields['title']} (nid={$node->id()}, uuid={$node->uuid()})\n";
  echo "Fields updated: {$updated_count}\n";
} else {
  $node_data = ['type' => 'solution_area'];
  foreach ($fields as $field_name => $value) {
    if ($value === null) continue;
    $node_data[$field_name] = $value;
  }

  try {
    $node = Node::create($node_data);
    $node->save();
    echo "CREATED: {$fields['title']} (nid={$node->id()}, uuid={$node->uuid()})\n";
  } catch (\Exception $e) {
    fwrite(STDERR, "ERROR creating node: {$e->getMessage()}\n");
    exit(1);
  }
}

// ---------------------------------------------------------------------------
// Verification
// ---------------------------------------------------------------------------
echo "\n=== Verification ===\n";
$verify = Node::load($node->id());
if ($verify) {
  echo "Title: " . $verify->getTitle() . "\n";
  echo "Slug: " . $verify->get('field_slug')->value . "\n";
  echo "UUID: " . $verify->uuid() . "\n";
  echo "Status: " . ($verify->isPublished() ? 'Published' : 'Unpublished') . "\n";

  // Spot-check a few fields
  $checks = ['field_tagline', 'field_color', 'field_icon', 'field_sa_priority'];
  foreach ($checks as $check) {
    try {
      $val = $verify->get($check)->value;
      echo "{$check}: {$val}\n";
    } catch (\Exception $e) {
      // field might not exist yet
    }
  }

  // Check JSON fields have content
  $json_checks = ['field_value_drivers', 'field_proof_points', 'field_tech_stack_layers'];
  foreach ($json_checks as $check) {
    try {
      $val = $verify->get($check)->value;
      if ($val) {
        $decoded = json_decode($val, true);
        $count = is_array($decoded) ? count($decoded) : 0;
        echo "{$check}: {$count} items\n";
      }
    } catch (\Exception $e) {
      // field might not exist yet
    }
  }
} else {
  fwrite(STDERR, "ERROR: Could not reload node for verification!\n");
  exit(1);
}

echo "\n=== SEED COMPLETE ===\n";
