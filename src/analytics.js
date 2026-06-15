export const EVENTS = {
  GAME_START: 'nm_game_start',
  SCENE_ANSWERED: 'nm_scene_answered',
  GAME_COMPLETED: 'nm_game_completed',
  RESULT_SHARED: 'nm_result_shared',
  CTA_CLICKED: 'nm_cta_clicked',
};

// Loads GA4 (gtag) when a measurement id is provided. No id => analytics
// is a no-op.
export function initAnalytics(measurementId) {
  if (typeof window === 'undefined' || !measurementId) return;
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
  document.head.appendChild(s);
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
}

export function track(event, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
}
