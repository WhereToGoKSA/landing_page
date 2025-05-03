'use client';

import { useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

export default function PageViewTracker() {
  const { trackPageView } = useAnalytics();
  
  useEffect(() => {
    // Track initial page view
    try {
      if (typeof window !== 'undefined') {
        // Track the initial page view
        trackPageView(window.location.pathname + window.location.search);
        
        // Set up navigation tracking
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        // Handle pushState
        history.pushState = function(...args) {
          originalPushState.apply(this, args);
          trackPageView(window.location.pathname + window.location.search);
        };
        
        // Handle replaceState
        history.replaceState = function(...args) {
          originalReplaceState.apply(this, args);
          trackPageView(window.location.pathname + window.location.search);
        };
        
        // Handle popstate (back/forward navigation)
        const handlePopState = () => {
          trackPageView(window.location.pathname + window.location.search);
        };
        
        window.addEventListener('popstate', handlePopState);
        
        // Clean up
        return () => {
          history.pushState = originalPushState;
          history.replaceState = originalReplaceState;
          window.removeEventListener('popstate', handlePopState);
        };
      }
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }, [trackPageView]);
  
  return null;
}