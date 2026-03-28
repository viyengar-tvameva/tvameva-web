<?php
use Drupal\taxonomy\Entity\Vocabulary;
use Drupal\taxonomy\Entity\Term;
use Drupal\node\Entity\NodeType;
use Drupal\field\Entity\FieldStorageConfig;
use Drupal\field\Entity\FieldConfig;

$autoloader = require '/opt/drupal/web/autoload.php';
$kernel = \Drupal\Core\DrupalKernel::createFromRequest(
  \Symfony\Component\HttpFoundation\Request::createFromGlobals(),
  $autoloader,
  'prod'
);
$kernel->boot();
$kernel->preHandle(\Symfony\Component\HttpFoundation\Request::createFromGlobals());

echo "=== Creating Taxonomies ===\n";

if (!Vocabulary::load('platform_ecosystem')) {
  Vocabulary::create(['vid' => 'platform_ecosystem', 'name' => 'Platform Ecosystem'])->save();
  echo "Created: platform_ecosystem\n";
}
if (!Vocabulary::load('industry_vertical')) {
  Vocabulary::create(['vid' => 'industry_vertical', 'name' => 'Industry Vertical'])->save();
  echo "Created: industry_vertical\n";
}

echo "=== Creating Taxonomy Terms ===\n";
$platforms = ['Acquia', 'Google Cloud', 'Salesforce', 'Algolia', 'Threekit'];
foreach ($platforms as $name) {
  Term::create(['vid' => 'platform_ecosystem', 'name' => $name])->save();
  echo "Term: $name\n";
}
$verticals = ['ISV', 'Hi-Tech', 'Manufacturing', 'E-commerce'];
foreach ($verticals as $name) {
  Term::create(['vid' => 'industry_vertical', 'name' => $name])->save();
  echo "Term: $name\n";
}

echo "=== Creating Content Types ===\n";

if (!NodeType::load('solution_area')) {
  NodeType::create(['type' => 'solution_area', 'name' => 'Solution Area', 'description' => 'Tvameva solution areas'])->save();
  echo "Created: solution_area\n";
}
if (!NodeType::load('case_study')) {
  NodeType::create(['type' => 'case_study', 'name' => 'Case Study', 'description' => 'Anonymized client case studies'])->save();
  echo "Created: case_study\n";
}
if (!NodeType::load('proof_point')) {
  NodeType::create(['type' => 'proof_point', 'name' => 'Proof Point', 'description' => 'Statistical proof points'])->save();
  echo "Created: proof_point\n";
}
if (!NodeType::load('differentiator')) {
  NodeType::create(['type' => 'differentiator', 'name' => 'Differentiator', 'description' => 'Key differentiators'])->save();
  echo "Created: differentiator\n";
}
if (!NodeType::load('connector')) {
  NodeType::create(['type' => 'connector', 'name' => 'Connector', 'description' => 'Pre-built connector IP'])->save();
  echo "Created: connector\n";
}

echo "=== Creating Fields for Solution Area ===\n";

$sa_fields = [
  'field_slug' => ['type' => 'string', 'label' => 'URL Slug'],
  'field_tagline' => ['type' => 'string', 'label' => 'Tagline'],
  'field_headline' => ['type' => 'string_long', 'label' => 'Page Headline'],
  'field_platform_anchor' => ['type' => 'string', 'label' => 'Platform Anchor'],
  'field_value_prop' => ['type' => 'text_long', 'label' => 'Value Proposition'],
  'field_key_ip_name' => ['type' => 'string', 'label' => 'Key IP Name'],
  'field_key_ip_description' => ['type' => 'string_long', 'label' => 'Key IP Description'],
  'field_pricing_pays_for' => ['type' => 'string', 'label' => 'Client Pays For'],
  'field_pricing_not_for' => ['type' => 'string', 'label' => 'Client Does Not Pay For'],
  'field_advisory_name' => ['type' => 'string', 'label' => 'Advisory Assessment Name'],
  'field_advisory_description' => ['type' => 'text_long', 'label' => 'Advisory Description'],
  'field_advisory_cta' => ['type' => 'string', 'label' => 'Advisory CTA Text'],
  'field_color' => ['type' => 'string', 'label' => 'Brand Color Key'],
  'field_icon' => ['type' => 'string', 'label' => 'Icon Name'],
  'field_priority' => ['type' => 'integer', 'label' => 'Sort Order'],
];

foreach ($sa_fields as $field_name => $config) {
  if (!FieldStorageConfig::loadByName('node', $field_name)) {
    FieldStorageConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'type' => $config['type'],
      'cardinality' => 1,
    ])->save();
  }
  if (!FieldConfig::loadByName('node', 'solution_area', $field_name)) {
    FieldConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'bundle' => 'solution_area',
      'label' => $config['label'],
    ])->save();
    echo "Field: $field_name -> solution_area\n";
  }
}

$multi_fields = [
  'field_outcome_metrics' => ['type' => 'string', 'label' => 'Outcome Metrics'],
  'field_capabilities' => ['type' => 'string', 'label' => 'Capabilities'],
];
foreach ($multi_fields as $field_name => $config) {
  if (!FieldStorageConfig::loadByName('node', $field_name)) {
    FieldStorageConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'type' => $config['type'],
      'cardinality' => -1,
    ])->save();
  }
  if (!FieldConfig::loadByName('node', 'solution_area', $field_name)) {
    FieldConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'bundle' => 'solution_area',
      'label' => $config['label'],
    ])->save();
    echo "Field: $field_name -> solution_area (multi)\n";
  }
}

if (!FieldStorageConfig::loadByName('node', 'field_platform_ecosystem')) {
  FieldStorageConfig::create([
    'field_name' => 'field_platform_ecosystem',
    'entity_type' => 'node',
    'type' => 'entity_reference',
    'cardinality' => -1,
    'settings' => ['target_type' => 'taxonomy_term'],
  ])->save();
}
if (!FieldConfig::loadByName('node', 'solution_area', 'field_platform_ecosystem')) {
  FieldConfig::create([
    'field_name' => 'field_platform_ecosystem',
    'entity_type' => 'node',
    'bundle' => 'solution_area',
    'label' => 'Platform Ecosystem',
    'settings' => ['handler_settings' => ['target_bundles' => ['platform_ecosystem' => 'platform_ecosystem']]],
  ])->save();
  echo "Field: field_platform_ecosystem -> solution_area (ref)\n";
}

if (!FieldStorageConfig::loadByName('node', 'field_expansion_sa')) {
  FieldStorageConfig::create([
    'field_name' => 'field_expansion_sa',
    'entity_type' => 'node',
    'type' => 'entity_reference',
    'cardinality' => 1,
    'settings' => ['target_type' => 'node'],
  ])->save();
}
if (!FieldConfig::loadByName('node', 'solution_area', 'field_expansion_sa')) {
  FieldConfig::create([
    'field_name' => 'field_expansion_sa',
    'entity_type' => 'node',
    'bundle' => 'solution_area',
    'label' => 'Expansion Solution Area',
    'settings' => ['handler_settings' => ['target_bundles' => ['solution_area' => 'solution_area']]],
  ])->save();
  echo "Field: field_expansion_sa -> solution_area (self-ref)\n";
}

if (!FieldStorageConfig::loadByName('node', 'field_expansion_description')) {
  FieldStorageConfig::create([
    'field_name' => 'field_expansion_description',
    'entity_type' => 'node',
    'type' => 'text_long',
    'cardinality' => 1,
  ])->save();
}
if (!FieldConfig::loadByName('node', 'solution_area', 'field_expansion_description')) {
  FieldConfig::create([
    'field_name' => 'field_expansion_description',
    'entity_type' => 'node',
    'bundle' => 'solution_area',
    'label' => 'Expansion Description',
  ])->save();
  echo "Field: field_expansion_description -> solution_area\n";
}

echo "=== Creating Fields for Case Study ===\n";

$cs_fields = [
  'field_company_size' => ['type' => 'string', 'label' => 'Company Size'],
  'field_challenge' => ['type' => 'text_long', 'label' => 'Challenge'],
  'field_result' => ['type' => 'text_long', 'label' => 'Result'],
  'field_anonymized' => ['type' => 'boolean', 'label' => 'Anonymized'],
];
foreach ($cs_fields as $field_name => $config) {
  if (!FieldStorageConfig::loadByName('node', $field_name)) {
    FieldStorageConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'type' => $config['type'],
      'cardinality' => 1,
    ])->save();
  }
  if (!FieldConfig::loadByName('node', 'case_study', $field_name)) {
    FieldConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'bundle' => 'case_study',
      'label' => $config['label'],
    ])->save();
    echo "Field: $field_name -> case_study\n";
  }
}

if (!FieldStorageConfig::loadByName('node', 'field_vertical')) {
  FieldStorageConfig::create([
    'field_name' => 'field_vertical',
    'entity_type' => 'node',
    'type' => 'entity_reference',
    'cardinality' => 1,
    'settings' => ['target_type' => 'taxonomy_term'],
  ])->save();
}
if (!FieldConfig::loadByName('node', 'case_study', 'field_vertical')) {
  FieldConfig::create([
    'field_name' => 'field_vertical',
    'entity_type' => 'node',
    'bundle' => 'case_study',
    'label' => 'Industry Vertical',
    'settings' => ['handler_settings' => ['target_bundles' => ['industry_vertical' => 'industry_vertical']]],
  ])->save();
  echo "Field: field_vertical -> case_study (ref)\n";
}

echo "=== Creating Fields for Proof Point ===\n";

$pp_fields = [
  'field_stat_number' => ['type' => 'string', 'label' => 'Stat Number'],
  'field_context' => ['type' => 'text_long', 'label' => 'Context'],
];
foreach ($pp_fields as $field_name => $config) {
  if (!FieldStorageConfig::loadByName('node', $field_name)) {
    FieldStorageConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'type' => $config['type'],
      'cardinality' => 1,
    ])->save();
  }
  if (!FieldConfig::loadByName('node', 'proof_point', $field_name)) {
    FieldConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'bundle' => 'proof_point',
      'label' => $config['label'],
    ])->save();
    echo "Field: $field_name -> proof_point\n";
  }
}
if (!FieldConfig::loadByName('node', 'proof_point', 'field_priority')) {
  FieldConfig::create([
    'field_name' => 'field_priority',
    'entity_type' => 'node',
    'bundle' => 'proof_point',
    'label' => 'Sort Order',
  ])->save();
  echo "Field: field_priority -> proof_point\n";
}

echo "=== Creating Fields for Differentiator ===\n";

$diff_fields = [
  'field_what_we_say' => ['type' => 'text_long', 'label' => 'What We Say'],
  'field_what_buyer_hears' => ['type' => 'text_long', 'label' => 'What Buyer Hears'],
  'field_priority_order' => ['type' => 'integer', 'label' => 'Priority Order'],
];
foreach ($diff_fields as $field_name => $config) {
  if (!FieldStorageConfig::loadByName('node', $field_name)) {
    FieldStorageConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'type' => $config['type'],
      'cardinality' => 1,
    ])->save();
  }
  if (!FieldConfig::loadByName('node', 'differentiator', $field_name)) {
    FieldConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'bundle' => 'differentiator',
      'label' => $config['label'],
    ])->save();
    echo "Field: $field_name -> differentiator\n";
  }
}
if (!FieldConfig::loadByName('node', 'differentiator', 'field_icon')) {
  FieldConfig::create([
    'field_name' => 'field_icon',
    'entity_type' => 'node',
    'bundle' => 'differentiator',
    'label' => 'Icon Name',
  ])->save();
  echo "Field: field_icon -> differentiator\n";
}

echo "=== Creating Fields for Connector ===\n";

$conn_fields = [
  'field_time_saved' => ['type' => 'string', 'label' => 'Time Saved'],
  'field_production_status' => ['type' => 'string', 'label' => 'Production Status'],
];
foreach ($conn_fields as $field_name => $config) {
  if (!FieldStorageConfig::loadByName('node', $field_name)) {
    FieldStorageConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'type' => $config['type'],
      'cardinality' => 1,
    ])->save();
  }
  if (!FieldConfig::loadByName('node', 'connector', $field_name)) {
    FieldConfig::create([
      'field_name' => $field_name,
      'entity_type' => 'node',
      'bundle' => 'connector',
      'label' => $config['label'],
    ])->save();
    echo "Field: $field_name -> connector\n";
  }
}
if (!FieldConfig::loadByName('node', 'connector', 'field_expansion_sa')) {
  FieldConfig::create([
    'field_name' => 'field_expansion_sa',
    'entity_type' => 'node',
    'bundle' => 'connector',
    'label' => 'Linked Solution Area',
    'settings' => ['handler_settings' => ['target_bundles' => ['solution_area' => 'solution_area']]],
  ])->save();
  echo "Field: field_expansion_sa -> connector (SA ref)\n";
}

echo "\n=== CONTENT MODEL COMPLETE ===\n";
echo "Content types: solution_area, case_study, proof_point, differentiator, connector\n";
echo "Taxonomies: platform_ecosystem, industry_vertical\n";
echo "JSON:API endpoints ready at /jsonapi/node/{type}\n";
