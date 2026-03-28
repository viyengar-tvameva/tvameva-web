# Drupal Content Model — Tvameva CMS
# 
# This document defines the content types, fields, and taxonomies
# to be created in Drupal 10/11 for headless JSON:API delivery.
#
# Setup: Install Drupal with JSON:API module (core in D10+).
# Enable: jsonapi, serialization, rest, basic_auth
# Configure: /admin/config/services/jsonapi → Read-only for anonymous

# ============================================================
# TAXONOMIES
# ============================================================

## Platform Ecosystem (machine name: platform_ecosystem)
# Terms: Acquia, Google Cloud, Salesforce, Algolia, Threekit

## Industry Vertical (machine name: industry_vertical)
# Terms: ISV, Hi-Tech, Manufacturing, E-commerce

## Assessment Dimension (machine name: assessment_dimension)
# Terms: Strategy & Leadership, Data Readiness, Technology Stack,
#         People & Skills, Process & Operations

## Maturity Level (machine name: maturity_level)
# Terms: Foundational, Developing, Advancing, Leading

# ============================================================
# CONTENT TYPES
# ============================================================

## 1. Solution Area (machine name: solution_area)
## ---
## Fields:
##   - title (string, required) — e.g., "EngageOS"
##   - field_slug (string, required, unique) — URL path component
##   - field_tagline (string) — e.g., "Digital Experience Modernization"
##   - field_headline (string, long) — page H1
##   - field_platform_anchor (string) — e.g., "Acquia / Drupal"
##   - field_platform_ecosystem (entity reference → platform_ecosystem, multi)
##   - field_value_prop (text, formatted, long) — rich text value proposition
##   - field_key_ip_name (string) — connector/IP name
##   - field_key_ip_description (text, long) — IP description
##   - field_outcome_metrics (string, unlimited) — list of outcome metrics
##   - field_pricing_pays_for (string) — what client pays for
##   - field_pricing_not_for (string) — what client does NOT pay for
##   - field_market_stats (paragraph: field_stat_value + field_stat_label)
##   - field_expansion_sa (entity reference → solution_area) — cross-sell SA
##   - field_expansion_description (text, long)
##   - field_advisory_name (string) — assessment name
##   - field_advisory_description (text, long)
##   - field_advisory_cta (string) — CTA button text
##   - field_capabilities (string, unlimited) — capability list
##   - field_color (string) — brand color key
##   - field_icon (string) — Lucide icon name
##   - field_priority (integer) — sort order
##   - field_hero_image (image, optional)

## 2. Case Study (machine name: case_study)
## ---
## Fields:
##   - title (string, required)
##   - field_vertical (entity reference → industry_vertical)
##   - field_company_size (string) — e.g., "Fortune 500"
##   - field_challenge (text, formatted, long)
##   - field_result (text, formatted, long)
##   - field_metrics (paragraph: field_metric_label + field_metric_value)
##   - field_solution_areas (entity reference → solution_area, multi)
##   - field_anonymized (boolean, default true)
##   - field_quote (text, long, optional)

## 3. Proof Point (machine name: proof_point)
## ---
## Fields:
##   - title (string, required) — used as label
##   - field_stat_number (string) — e.g., "67%"
##   - field_context (text, long)
##   - field_linked_sa (entity reference → solution_area, optional)
##   - field_priority (integer)

## 4. Differentiator (machine name: differentiator)
## ---
## Fields:
##   - title (string, required)
##   - field_what_we_say (text, long)
##   - field_what_buyer_hears (text, long)
##   - field_priority_order (integer, 1-4)
##   - field_icon (string)

## 5. Pod Role (machine name: pod_role)
## ---
## Fields:
##   - title (string, required) — role title
##   - field_responsibility (text, long)
##   - field_ai_augmentation (text, long)
##   - field_icon (string)
##   - field_sort_order (integer)

## 6. Connector (machine name: connector)
## ---
## Fields:
##   - title (string, required) — connector name
##   - field_description (text, long)
##   - field_platforms (string, unlimited)
##   - field_time_saved (string) — e.g., "6–8 weeks"
##   - field_production_status (list: Production, Beta, Development)
##   - field_linked_sa (entity reference → solution_area)

## 7. Assessment (machine name: assessment)
## ---
## Fields:
##   - title (string, required) — e.g., "AI Maturity Assessment"
##   - field_slug (string, unique)
##   - field_description (text, formatted, long)
##   - field_scope (text, long)
##   - field_linked_sa (entity reference → solution_area, optional)
##   - field_appears_on (string, unlimited) — page locations
##   - field_price_range (string) — e.g., "$25,000–$50,000"

## 8. Page (machine name: page) [use default Basic Page]
## ---
## Fields:
##   - title, body (default)
##   - field_hero_headline (string)
##   - field_hero_subhead (text, long)
##   - field_meta_description (string)

# ============================================================
# PARAGRAPH TYPES (for structured sub-content)
# ============================================================

## Market Stat (machine name: market_stat)
##   - field_stat_value (string) — e.g., "67%"
##   - field_stat_label (string) — e.g., "US enterprises on Drupal"

## Metric (machine name: metric)
##   - field_metric_label (string) — e.g., "FTE reduction"
##   - field_metric_value (string) — e.g., "47 → 16"

# ============================================================
# JSON:API ENDPOINTS (after setup)
# ============================================================
#
# GET /jsonapi/node/solution_area
# GET /jsonapi/node/solution_area?filter[field_slug]=engageos
# GET /jsonapi/node/case_study?include=field_solution_areas
# GET /jsonapi/node/proof_point?sort=field_priority
# GET /jsonapi/node/differentiator?sort=field_priority_order
# GET /jsonapi/node/connector?include=field_linked_sa
# GET /jsonapi/node/assessment?include=field_linked_sa
# GET /jsonapi/node/pod_role?sort=field_sort_order
#
# ============================================================
# CORS Configuration (settings.php)
# ============================================================
#
# Add to sites/default/settings.php:
#
# $settings['cors'] = [
#   'enabled' => TRUE,
#   'allowedHeaders' => ['Content-Type', 'Authorization'],
#   'allowedMethods' => ['GET', 'POST', 'OPTIONS'],
#   'allowedOrigins' => ['https://tvameva.ai', 'http://localhost:3000'],
#   'maxAge' => 3600,
# ];
#
# ============================================================
# Modules to Install
# ============================================================
#
# Core: jsonapi, serialization, rest, basic_auth
# Contrib:
#   - paragraphs (structured content)
#   - pathauto (URL aliases)
#   - metatag (SEO)
#   - webform (contact/assessment forms)
#   - simple_oauth (API authentication for writes)
#   - jsonapi_extras (customize JSON:API output)
#   - cors (CORS headers)
