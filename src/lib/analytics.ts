// Thin analytics wrapper. No-ops when no provider is configured. Wire a real
// provider (PostHog, Plausible, GA4) by setting NEXT_PUBLIC_ANALYTICS_*.
//
// Usage from client components:
//   track('signup_submit', { source: 'landing' })

type Props = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void
    posthog?: { capture: (event: string, props?: Props) => void }
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: string, props?: Props): void {
  if (typeof window === 'undefined') return
  try {
    if (window.plausible) {
      window.plausible(event, props ? { props } : undefined)
      return
    }
    if (window.posthog) {
      window.posthog.capture(event, props)
      return
    }
    if (window.gtag) {
      window.gtag('event', event, props ?? {})
      return
    }
    // Dev fallback — only logs in development to avoid console spam in prod.
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', event, props ?? {})
    }
  } catch {
    // analytics must never break the app
  }
}

export function pageview(path: string): void {
  track('pageview', { path })
}
