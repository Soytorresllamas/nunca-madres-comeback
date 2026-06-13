import { scenes } from './data/scenes.js';
import { PRIORITY } from './data/archetypes.js';
import { STYLES } from './data/scenes.js';
import { createGame, start, answer, reset } from './game/state.js';
import { tally, determineArchetype } from './game/scoring.js';
import { renderIntro, renderScene, renderCalculating, renderResult } from './ui/render.js';
import { shareResult } from './ui/share.js';
import { track, EVENTS, initAnalytics } from './analytics.js';

// Pega aquí el ID de GA4 (formato G-XXXXXXXXXX) para activar la medición.
// Vacío = no envía nada (los eventos siguen yendo a dataLayer para GTM).
const GA4_MEASUREMENT_ID = 'G-VB8SCYWBNK';
initAnalytics(GA4_MEASUREMENT_ID);

const root = document.getElementById('app');
let game = createGame(scenes);
let revealed = false;

function paint() {
  if (game.step === 'intro') {
    renderIntro(root, {
      onStart: () => {
        track(EVENTS.GAME_START);
        game = start(game);
        paint();
      },
    });
  } else if (game.step === 'scene') {
    const scene = game.scenes[game.index];
    renderScene(root, {
      scene,
      index: game.index,
      total: game.scenes.length,
      onAnswer: (style) => {
        track(EVENTS.SCENE_ANSWERED, { scene: scene.id, style });
        game = answer(game, style);
        if (game.step === 'result') {
          const result = determineArchetype(tally(game.answers, STYLES), PRIORITY);
          track(EVENTS.GAME_COMPLETED, { archetype: result.primary, secondary: result.secondary });
        }
        paint();
      },
    });
  } else {
    const result = determineArchetype(tally(game.answers, STYLES), PRIORITY);
    if (!revealed) {
      renderCalculating(root);
      setTimeout(() => {
        revealed = true;
        paint();
      }, 1300);
      return;
    }
    renderResult(root, {
      result,
      onShare: (channel) => shareResult(channel, document.getElementById('nm-card')),
      onCta: () => track(EVENTS.CTA_CLICKED, { archetype: result.primary }),
      onReplay: () => {
        game = reset(game);
        revealed = false;
        paint();
      },
    });
  }
}

paint();
