export function createGame(scenes) {
  return { step: 'intro', index: 0, answers: [], scenes };
}

export function start(game) {
  return { ...game, step: 'scene', index: 0 };
}

export function answer(game, style) {
  const answers = [...game.answers, style];
  const nextIndex = game.index + 1;
  const done = nextIndex >= game.scenes.length;
  return {
    ...game,
    answers,
    index: done ? game.index : nextIndex,
    step: done ? 'result' : 'scene',
  };
}

export function reset(game) {
  return createGame(game.scenes);
}
