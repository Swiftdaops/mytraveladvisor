"use client";
import { useEffect } from 'react';
import posthog from 'posthog-js';

export default function PosthogInit() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST; // e.g. https://app.posthog.com or self-hosted
    if (!key || !host) {
      // no config provided — skip initialization
      console.warn('PostHog not initialized: set NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST');
      return;
    }

    if (!posthog.__loaded) {
      posthog.init(key, { api_host: host });
      posthog.__loaded = true;
    }

    // capture a page view
    posthog.capture('$pageview');

    // optional: record basic user agent / locale
    try {
      const info = {
        url: window.location.href,
        title: document.title,
        path: window.location.pathname,
        userAgent: navigator.userAgent,
        language: navigator.language,
      };
      posthog.capture('frontend_mounted', info);
    } catch (e) {
      // ignore
    }

    const onRouteChange = () => posthog.capture('$pageview');
    // Basic listener for SPA navigation using popstate
    window.addEventListener('popstate', onRouteChange);

    return () => {
      window.removeEventListener('popstate', onRouteChange);
    };
  }, []);

  return null;
}
