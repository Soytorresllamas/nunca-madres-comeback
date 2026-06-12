import { scenes } from './data/scenes.js';
import { PRIORITY } from './data/archetypes.js';
import { STYLES } from './data/scenes.js';
import { createGame, start, answer, reset } from './game/state.js';
import { tally, determineArchetype } from './game/scoring.js';
import { renderIntro, renderScene, renderResult } from './ui/render.js';
import { shareResult } from './ui/share.js';
import { track, EVENTS } from './analytics.js';

const root = document.getElementById('app');
let game = createGame(scenes);

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
    renderResult(root, {
      result,
      onShare: (channel) => shareResult(channel, document.getElementById('nm-card')),
      onCta: () => track(EVENTS.CTA_CLICKED, { archetype: result.primary }),
      onReplay: () => {
        game = reset(game);
        paint();
      },
    });
  }
}

paint();
