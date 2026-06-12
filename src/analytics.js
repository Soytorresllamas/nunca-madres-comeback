export const EVENTS = {
  GAME_START: 'nm_game_start',
  SCENE_ANSWERED: 'nm_scene_answered',
  GAME_COMPLETED: 'nm_game_completed',
  RESULT_SHARED: 'nm_result_shared',
  CTA_CLICKED: 'nm_cta_clicked',
};

export function track(event, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
