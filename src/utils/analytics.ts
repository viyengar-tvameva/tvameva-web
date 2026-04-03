/**
 * GA4 Event Tracking Utility
 *
 * Usage:
 *   import { trackEvent } from '@/utils/analytics';
 *   trackEvent('cta_click', { cta_type: 'book_demo', page: 'engageos' });
 */

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(eventName: string, params?: EventParams) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}

// Pre-defined event helpers

export function trackCTAClick(ctaType: string, page: string, destination?: string) {
  trackEvent('cta_click', {
    cta_type: ctaType,
    page,
    destination: destination || '',
  });
}

export function trackFormSubmission(formType: 'contact' | 'careers' | 'assessment', page: string) {
  trackEvent('form_submission', {
    form_type: formType,
    page,
  });
}

export function trackSolutionView(solutionName: string) {
  trackEvent('solution_view', {
    solution_name: solutionName,
  });
}

export function trackCalendlyClick(page: string) {
  trackEvent('calendly_click', {
    page,
    cta_type: 'book_demo',
  });
}

export function trackAssessmentStart() {
  trackEvent('assessment_start', {
    assessment_type: 'ai_maturity',
  });
}

export function trackAssessmentComplete(score: number, level: string) {
  trackEvent('assessment_complete', {
    assessment_type: 'ai_maturity',
    score,
    maturity_level: level,
  });
}

export function trackNavigation(destination: string, source: string) {
  trackEvent('navigation', {
    destination,
    source,
  });
}

export function trackExternalLink(url: string, page: string) {
  trackEvent('external_link_click', {
    url,
    page,
  });
}
