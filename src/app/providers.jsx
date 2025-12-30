"use client";
import { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

export default function PostHogProviderWrapper({ children }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
    if (!key) {
      console.warn('PostHog not initialized: NEXT_PUBLIC_POSTHOG_KEY is not set');
      return;
    }

    if (!posthog.__loaded) {
      posthog.init(key, {
        api_host: host,
        // Use recommended defaults for automatic pageview and pageleave capture
        defaults: '2025-05-24',
        // Enable exception capturing for error tracking
        capture_exceptions: true,
        // Keep person_profiles option for identified users only
        person_profiles: 'identified_only',
        // Enable debug mode in development
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug();
        },
      });
      posthog.__loaded = true;
    }
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
