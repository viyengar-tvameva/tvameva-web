/**
 * Drupal JSON:API client for headless content delivery.
 *
 * ALL content is fetched from Drupal JSON:API when NEXT_PUBLIC_USE_CMS=true.
 * Falls back to static data in src/data/solutions.ts when CMS is disabled.
 */

import type { SolutionArea, ValueDriver, ProofPointCase, TechStackLayer, ExpansionConnection } from '@/data/solutions';
import type { Differentiator, ProofPoint, CaseStudy, PodRole } from '@/data/content';

// --- Blog Post Interface ---
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  excerpt: string;
  featuredImage?: string;
  publishedDate: string;
  author: string;
  authorTitle: string;
  category: string;
  relatedSA?: string;
  readingTime: number;
  seo?: { metaTitle: string; metaDescription: string };
  socialSnippets?: string[];
  linkedinSummary?: string;
  keyStats?: { stat: string; context: string }[];
  emailSections?: { subject: string; body: string; cta: string }[];
  ctaType?: 'demo' | 'contact';
}

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

    // Visual component data
    architectureDiagram: jsonFieldValue(a.field_architecture_diagram, undefined) || undefined,
    workflowSteps: jsonFieldValue(a.field_workflow_steps, undefined) || undefined,
    metricsComparison: jsonFieldValue(a.field_metrics_comparison, undefined) || undefined,
    relationshipGraph: jsonFieldValue(a.field_relationship_graph, undefined) || undefined,
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
     const response = await this.fetch<DrupalResource>('node/solution_area', {
  'sort': 'field_sa_priority',
});
const data = (Array.isArray(response.data) ? response.data : [response.data]) as DrupalResource[];
return data.map(mapDrupalToSolutionArea);
    } catch (error) {
      console.error('Failed to fetch solution areas from CMS:', error);
      return null;
    }
  }

  async getSolutionBySlug(slug: string): Promise<SolutionArea | null> {
    if (!USE_CMS) return null;
    try {
      const response = await this.fetch<DrupalResource>('node/solution_area', {
        'filter[field_slug]': slug,
      });
      const data = (Array.isArray(response.data) ? response.data : [response.data]) as DrupalResource[];
      if (data.length === 0) return null;
      return mapDrupalToSolutionArea(data[0]);
    } catch (error) {
      console.error(`Failed to fetch solution ${slug} from CMS:`, error);
      return null;
    }
  }

  async getDifferentiators(): Promise<Differentiator[] | null> {
    if (!USE_CMS) return null;
    try {
      const response = await this.fetch<DrupalResource>('node/differentiator', {
        'sort': 'field_priority_order',
      });
      const data = (Array.isArray(response.data) ? response.data : [response.data]) as DrupalResource[];
      return data.map((r) => ({
        id: r.attributes.title?.toLowerCase().replace(/\s+/g, '-') || '',
        priority: r.attributes.field_priority_order || 99,
        title: r.attributes.title || '',
        whatWeSay: textValue(r.attributes.field_what_we_say),
        whatBuyerHears: textValue(r.attributes.field_what_buyer_hears),
        icon: r.attributes.field_icon || '',
      }));
    } catch (error) {
      console.error('Failed to fetch differentiators from CMS:', error);
      return null;
    }
  }

  async getProofPoints(): Promise<ProofPoint[] | null> {
    if (!USE_CMS) return null;
    try {
      const response = await this.fetch<DrupalResource>('node/proof_point', {
        'sort': 'field_priority',
      });
      const data = (Array.isArray(response.data) ? response.data : [response.data]) as DrupalResource[];
      return data.map((r) => ({
        id: r.attributes.title?.toLowerCase().replace(/\s+/g, '-') || '',
        stat: r.attributes.field_stat_number || '',
        label: r.attributes.title || '',
        context: textValue(r.attributes.field_context),
      }));
    } catch (error) {
      console.error('Failed to fetch proof points from CMS:', error);
      return null;
    }
  }

  async getCaseStudies(): Promise<CaseStudy[] | null> {
    if (!USE_CMS) return null;
    try {
      const response = await this.fetch<DrupalResource>('node/case_study');
      const data = (Array.isArray(response.data) ? response.data : [response.data]) as DrupalResource[];
      return data.map((r) => ({
        id: r.attributes.title?.toLowerCase().replace(/\s+/g, '-') || '',
        title: r.attributes.title || '',
        vertical: r.attributes.field_vertical_label || '',
        companySize: r.attributes.field_company_size || '',
        challenge: textValue(r.attributes.field_challenge),
        result: textValue(r.attributes.field_result),
        metrics: jsonFieldValue(r.attributes.field_metrics_json, []),
        solutionAreas: jsonFieldValue(r.attributes.field_solution_areas_json, []),
      }));
    } catch (error) {
      console.error('Failed to fetch case studies from CMS:', error);
      return null;
    }
  }

  async getPodRoles(): Promise<PodRole[] | null> {
    if (!USE_CMS) return null;
    try {
      const response = await this.fetch<DrupalResource>('node/pod_role', {
        'sort': 'field_priority',
      });
      const data = (Array.isArray(response.data) ? response.data : [response.data]) as DrupalResource[];
      return data.map((r) => ({
        title: r.attributes.title || '',
        responsibility: textValue(r.attributes.field_responsibility),
        aiAugmentation: textValue(r.attributes.field_ai_augmentation),
        icon: r.attributes.field_icon || '',
        type: (r.attributes.field_role_type || 'agent') as 'agent' | 'human',
      }));
    } catch (error) {
      console.error('Failed to fetch pod roles from CMS:', error);
      return null;
    }
  }

  async getBlogPosts(): Promise<BlogPost[] | null> {
    if (!USE_CMS) return null;
    try {
      const response = await this.fetch<DrupalResource>('node/blog_post', {
        'sort': '-field_published_date',
      });
      const data = (Array.isArray(response.data) ? response.data : [response.data]) as DrupalResource[];
      return data.map((r) => this.mapDrupalToBlogPost(r));
    } catch (error) {
      console.error('Failed to fetch blog posts from CMS:', error);
      return null;
    }
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!USE_CMS) return null;
    try {
      const response = await this.fetch<DrupalResource>('node/blog_post', {
        'filter[field_slug]': slug,
      });
      const data = (Array.isArray(response.data) ? response.data : [response.data]) as DrupalResource[];
      if (data.length === 0) return null;
      return this.mapDrupalToBlogPost(data[0]);
    } catch (error) {
      console.error(`Failed to fetch blog post ${slug} from CMS:`, error);
      return null;
    }
  }

  private mapDrupalToBlogPost(r: DrupalResource): BlogPost {
    const a = r.attributes;
    return {
      id: a.field_slug || '',
      title: a.title || '',
      slug: a.field_slug || '',
      body: textValue(a.field_body),
      excerpt: textValue(a.field_excerpt),
      featuredImage: a.field_featured_image || undefined,
      publishedDate: a.field_published_date || '',
      author: a.field_author || '',
      authorTitle: a.field_author_title || '',
      category: a.field_category || '',
      relatedSA: a.field_related_sa || undefined,
      readingTime: a.field_reading_time || 5,
      seo: a.field_meta_title ? {
        metaTitle: a.field_meta_title,
        metaDescription: textValue(a.field_meta_description),
      } : undefined,
      socialSnippets: jsonFieldValue<string[]>(a.field_social_snippets, []),
      linkedinSummary: textValue(a.field_linkedin_summary) || undefined,
      keyStats: jsonFieldValue<{ stat: string; context: string }[]>(a.field_key_stats, []),
      emailSections: jsonFieldValue<{ subject: string; body: string; cta: string }[]>(a.field_email_sections, []),
      ctaType: (a.field_cta_type || 'demo') as 'demo' | 'contact',
    };
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
