'use client';

import { useRef, useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

interface TrackViewProps {
  sectionId: string;
  children: React.ReactNode;
  threshold?: number;
  once?: boolean;
}

export function TrackViewSection({ 
  sectionId, 
  children, 
  threshold = 0.5, 
  once = true 
}: TrackViewProps) {
  const analytics = useAnalytics();
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasTracked.current)) {
            analytics.trackSectionView(sectionId);
            hasTracked.current = true;
            
            if (once) {
              observer.disconnect();
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [sectionId, analytics, threshold, once]);

  return <div ref={sectionRef}>{children}</div>;
}