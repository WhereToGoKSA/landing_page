'use client';

import { useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

export default function PageViewTracker() {
  const analytics = useAnalytics();
  
  useEffect(() => {
    // Track initial page view
    try {
      if (typeof window !== 'undefined') {
        // Track the initial page view
        analytics.trackPageView(window.location.pathname + window.location.search);
        
        // Set up navigation tracking
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        // Handle pushState
        history.pushState = function() {
          // @ts-ignore
          originalPushState.apply(this, arguments);
          analytics.trackPageView(window.location.pathname + window.location.search);
        };
        
        // Handle replaceState
        history.replaceState = function() {
          // @ts-ignore
          originalReplaceState.apply(this, arguments);
          analytics.trackPageView(window.location.pathname + window.location.search);
        };
        
        // Handle popstate (back/forward navigation)
        const handlePopState = () => {
          analytics.trackPageView(window.location.pathname + window.location.search);
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
  }, [analytics]);
  
  return null;
}