/**
 * Drupal JSON:API client for headless content delivery.
 * 
 * In development/v1, this falls back to local static data.
 * When Drupal CMS is provisioned, flip NEXT_PUBLIC_USE_CMS=true
 * and content will be fetched from the Drupal JSON:API endpoint.
 */

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

  async getSolutionAreas() {
    if (!USE_CMS) return null; // Fall back to static data
    return this.fetch<DrupalResource[]>('node/solution_area', {
      'sort': 'field_priority',
      'include': 'field_platform_ecosystem,field_advisory_assessment',
    });
  }

  async getSolutionBySlug(slug: string) {
    if (!USE_CMS) return null;
    return this.fetch<DrupalResource[]>('node/solution_area', {
      'filter[field_slug]': slug,
      'include': 'field_platform_ecosystem,field_advisory_assessment,field_expansion_sa',
    });
  }

  async getCaseStudies() {
    if (!USE_CMS) return null;
    return this.fetch<DrupalResource[]>('node/case_study', {
      'sort': '-created',
      'include': 'field_solution_areas',
    });
  }

  async getProofPoints() {
    if (!USE_CMS) return null;
    return this.fetch<DrupalResource[]>('node/proof_point', {
      'sort': 'field_priority',
    });
  }

  async getDifferentiators() {
    if (!USE_CMS) return null;
    return this.fetch<DrupalResource[]>('node/differentiator', {
      'sort': 'field_priority_order',
    });
  }

  async getAssessments() {
    if (!USE_CMS) return null;
    return this.fetch<DrupalResource[]>('node/assessment', {
      'include': 'field_linked_sa,field_dimensions',
    });
  }

  async submitAssessmentResult(data: {
    email: string;
    firstName: string;
    lastName: string;
    company: string;
    title: string;
    companySize: string;
    scores: Record<string, number>;
    totalScore: number;
    maturityLevel: string;
  }) {
    if (!USE_CMS) {
      // In dev mode, log to console and return success
      console.log('Assessment submission (dev):', data);
      return { success: true };
    }

    const response = await fetch(`${this.baseUrl}/api/assessment-submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    return response.json();
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

    const response = await fetch(`${this.baseUrl}/api/contact-submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    return response.json();
  }
}

export const drupalClient = new DrupalClient(DRUPAL_BASE_URL);
export default drupalClient;
