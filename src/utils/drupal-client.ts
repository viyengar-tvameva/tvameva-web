/**
 * Drupal JSON:API client for headless content delivery.
 *
 * ALL content is fetched from Drupal JSON:API when NEXT_PUBLIC_USE_CMS=true.
 * Falls back to static data in src/data/solutions.ts when CMS is disabled.
 */

import type { SolutionArea, ValueDriver, ProofPointCase, TechStackLayer, ExpansionConnection } from '@/data/solutions';

const DRUPAL_BASE_URL = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL || 'http://localhost:8080';
const USE_CMS = process.env.NEXT_PUBLIC_USE_CMS === 'true';

interface DrupalJsonApiResponse<T = any> {
  data: T | T[];
  included?: any[];
  links?: Record<string, { href: string }>;
  meta?: Record<string, any>;
}

interface DrupalResource {
  id: string;
  type: string;
  attributes: Record<string, any>;
  relationships?: Record<string, any>;
}

// ---------------------------------------------------------------------------
// Field value helpers
// ---------------------------------------------------------------------------

/** Extract plain text from a Drupal text_long field, stripping HTML tags */
function textValue(field: any): string {
  if (!field) return '';
  if (typeof field === 'string') return field.replace(/<[^>]*>/g, '').trim();
  const raw = field.value || field.processed || '';
  return raw.replace(/<[^>]*>/g, '').trim();
}

/** Extract string array from a multi-value string field */
function stringArrayValue(field: any): string[] {
  if (!field) return [];
  if (Array.isArray(field)) return field.map((v: any) => (typeof v === 'string' ? v : v?.value || ''));
  return [];
}

/** Parse a JSON string field into typed data, with fallback */
function jsonFieldValue<T>(field: any, fallback: T): T {
  if (!field) return fallback;
  const raw = typeof field === 'string' ? field : field.value || field.processed || '';
  const clean = raw.replace(/<[^>]*>/g, '').trim();
  if (!clean) return fallback;
  try {
    return JSON.parse(clean) as T;
  } catch (e) {
    console.warn('Failed to parse JSON field:', e);
    return fallback;
  }
}

// ---------------------------------------------------------------------------
// Transform Drupal JSON:API resource → SolutionArea
// ---------------------------------------------------------------------------

function mapDrupalToSolutionArea(resource: DrupalResource): SolutionArea {
  const a = resource.attributes;

  // Parse JSON fields
  const valueDrivers = jsonFieldValue<ValueDriver[]>(a.field_value_drivers, []);
  const proofPoints = jsonFieldValue<ProofPointCase[]>(a.field_proof_points, []);
  const techStackLayers = jsonFieldValue<TechStackLayer[]>(a.field_tech_stack_layers, []);
  const techStackConnectors = jsonFieldValue<{ name: string; description: string }[]>(a.field_tech_stack_connectors, []);
  const marketStats = jsonFieldValue<{ stat: string; value: string; context: string }[]>(a.field_market_stats, []);
  const expansionConnections = jsonFieldValue<ExpansionConnection[]>(a.field_expansion_connections, []);
  const aiAgentTypes = jsonFieldValue<{ name: string; description: string }[]>(a.field_ai_agent_types, []);
  const heroCTAs = jsonFieldValue<{ label: string; href: string; variant: 'primary' | 'secondary' }[]>(a.field_hero_ctas, []);

  return {
    // Core fields
    id: a.field_slug || '',
    name: a.title || '',
    slug: a.field_slug || '',
    tagline: a.field_tagline || '',
    headline: textValue(a.field_hero_headline) || a.title || '',
    platformAnchor: a.field_platform_anchor || '',
    platformPartners: stringArrayValue(a.field_platform_partners),
    valueProp: textValue(a.field_value_prop),
    keyIP: {
      name: a.field_key_ip_name || '',
      description: textValue(a.field_key_ip_description),
    },
    outcomeMetrics: stringArrayValue(a.field_outcome_metrics),
    pricingContrast: {
      paysFor: a.field_pays_for || '',
      notFor: a.field_not_for || '',
    },
    marketStats: marketStats.map((s) => ({ stat: s.stat, value: s.value })),
    expansionSA: {
      id: a.field_expansion_sa_id || '',
      description: textValue(a.field_expansion_sa_desc),
    },
    advisory: {
      name: a.field_advisory_name || '',
      description: textValue(a.field_advisory_description),
      cta: a.field_advisory_cta || '',
    },
    capabilities: stringArrayValue(a.field_capabilities),
    color: a.field_color || 'teal',
    icon: a.field_icon || 'Layout',

    // Enriched fields
    heroSubheadline: textValue(a.field_hero_subheadline) || undefined,
    heroCTAs: heroCTAs.length > 0 ? heroCTAs : undefined,

    challenge: textValue(a.field_challenge_headline)
      ? {
          headline: textValue(a.field_challenge_headline),
          body: textValue(a.field_challenge_body),
        }
      : undefined,

    valueDrivers: valueDrivers.length > 0 ? valueDrivers : undefined,

    podModel: textValue(a.field_pod_headline)
      ? {
          headline: textValue(a.field_pod_headline),
          body: textValue(a.field_pod_body),
          roles: stringArrayValue(a.field_pod_roles),
          aiAgentTypes: aiAgentTypes,
        }
      : undefined,

    techStack: textValue(a.field_stack_headline)
      ? {
          headline: textValue(a.field_stack_headline),
          body: textValue(a.field_stack_body),
          layers: techStackLayers,
          connectors: techStackConnectors,
        }
      : undefined,

    proofPoints: proofPoints.length > 0 ? proofPoints : undefined,

    marketContext: textValue(a.field_market_headline)
      ? {
          headline: textValue(a.field_market_headline),
          stats: marketStats,
        }
      : undefined,

    expansionPath: textValue(a.field_expansion_headline)
      ? {
          headline: textValue(a.field_expansion_headline),
          body: textValue(a.field_expansion_body),
          connections: expansionConnections,
        }
      : undefined,

    advisoryExtended: textValue(a.field_advisory_ext_headline)
      ? {
          headline: textValue(a.field_advisory_ext_headline),
          body: textValue(a.field_advisory_ext_body),
          scopeItems: stringArrayValue(a.field_advisory_scope),
          pricingNote: textValue(a.field_advisory_pricing) || undefined,
        }
      : undefined,

    seo: a.field_meta_title
      ? {
          metaTitle: a.field_meta_title || '',
          metaDescription: textValue(a.field_meta_description),
        }
      : undefined,
  };
}

// ---------------------------------------------------------------------------
// Drupal Client
// ---------------------------------------------------------------------------

class DrupalClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(endpoint: string, params?: Record<string, string>): Promise<DrupalJsonApiResponse<T>> {
    const url = new URL(`${this.baseUrl}/jsonapi/${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      next: { revalidate: 300 }, // ISR: revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Drupal API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getSolutionAreas(): Promise<SolutionArea[] | null> {
    if (!USE_CMS) return null;
    try {
      const response = await this.fetch<DrupalResource[]>('node/solution_area', {
        'sort': 'field_sa_priority',
      });
      const data = Array.isArray(response.data) ? response.data : [response.data];
      return data.map(mapDrupalToSolutionArea);
    } catch (error) {
      console.error('Failed to fetch solution areas from CMS:', error);
      return null;
    }
  }

  async getSolutionBySlug(slug: string): Promise<SolutionArea | null> {
    if (!USE_CMS) return null;
    try {
      const response = await this.fetch<DrupalResource[]>('node/solution_area', {
        'filter[field_slug]': slug,
      });
      const data = Array.isArray(response.data) ? response.data : [response.data];
      if (data.length === 0) return null;
      return mapDrupalToSolutionArea(data[0]);
    } catch (error) {
      console.error(`Failed to fetch solution ${slug} from CMS:`, error);
      return null;
    }
  }

  async submitContactForm(data: {
    name: string;
    email: string;
    company: string;
    message: string;
    type: 'general' | 'assessment';
  }) {
    if (!USE_CMS) {
      console.log('Contact form submission (dev):', data);
      return { success: true };
    }

    const response = await fetch(`${this.baseUrl}/webform_rest/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        webform_id: 'contact_inquiry',
        ...data,
      }),
    });

    return response.json();
  }
}

export const drupalClient = new DrupalClient(DRUPAL_BASE_URL);
export default drupalClient;
