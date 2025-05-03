'use client';

import { useCallback } from 'react';

type EventType = 
  | 'click_cta' 
  | 'scroll_section' 
  | 'form_submit' 
  | 'category_select'
  | 'view_event'
  | 'share_content';

type EventData = {
  section?: string;
  button?: string;
  category?: string;
  eventId?: string;
  value?: string | number;
  url?: string;
  [key: string]: any;
};
const GA_TRACKING_ID = 'G-SXN25GFEY4'
// Simple hook to provide analytics tracking methods
export function useAnalytics() {
  // Track custom events with Google Analytics
  const trackEvent = useCallback((eventType: EventType, eventData?: EventData) => {
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        // @ts-ignore - gtag is added by Google Analytics script
        window.gtag('event', eventType, eventData);
        console.log(`[Analytics] Tracked event: ${eventType}`, eventData);
      } catch (error) {
        console.error('[Analytics] Error tracking event:', error);
      }
    }
  }, []);
  
  // Track page views
  const trackPageView = useCallback((url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        // @ts-ignore - gtag is added by Google Analytics script
        window.gtag('config', GA_TRACKING_ID, {
          page_path: url,
        });
        console.log(`[Analytics] Page view: ${url}`);
      } catch (error) {
        console.error('[Analytics] Error tracking page view:', error);
      }
    }
  }, []);
  
  // Track CTA button clicks
  const trackCTAClick = useCallback((buttonName: string, section?: string) => {
    trackEvent('click_cta', {
      button: buttonName,
      section: section || 'unknown',
    });
  }, [trackEvent]);
  
  // Track form submissions
  const trackFormSubmit = useCallback((formName: string, success: boolean = true) => {
    trackEvent('form_submit', {
      form: formName,
      success: success,
    });
  }, [trackEvent]);
  
  // Track section scrolling/visibility
  const trackSectionView = useCallback((sectionId: string) => {
    trackEvent('scroll_section', {
      section: sectionId,
    });
  }, [trackEvent]);
  
  // Track social sharing
  const trackSocialShare = useCallback((platform: string, contentId?: string) => {
    trackEvent('share_content', {
      platform,
      contentId,
    });
  }, [trackEvent]);
  
  return {
    trackEvent,
    trackPageView,
    trackCTAClick,
    trackFormSubmit,
    trackSectionView,
    trackSocialShare,
  };
}