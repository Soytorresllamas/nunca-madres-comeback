import { describe, it, expect } from 'vitest';
import { createGame, start, answer, reset } from '../src/game/state.js';
import { scenes } from '../src/data/scenes.js';

describe('game state machine', () => {
  it('starts at the intro step', () => {
    const g = createGame(scenes);
    expect(g.step).toBe('intro');
    expect(g.index).toBe(0);
    expect(g.answers).toEqual([]);
  });

  it('start() moves to the first scene', () => {
    const g = start(createGame(scenes));
    expect(g.step).toBe('scene');
    expect(g.index).toBe(0);
  });

  it('answer() records the style and advances to the next scene', () => {
    let g = start(createGame(scenes));
    g = answer(g, 'zen');
    expect(g.answers).toEqual(['zen']);
    expect(g.step).toBe('scene');
    expect(g.index).toBe(1);
  });

  it('answering the last scene moves to the result step', () => {
    let g = start(createGame(scenes));
    for (let i = 0; i < scenes.length; i++) g = answer(g, 'zen');
    expect(g.answers).toHaveLength(6);
    expect(g.step).toBe('result');
  });

  it('reset() returns a fresh intro game', () => {
    let g = start(createGame(scenes));
    g = answer(g, 'directa');
    g = reset(g);
    expect(g.step).toBe('intro');
    expect(g.answers).toEqual([]);
  });

  it('treats state as immutable (returns new objects)', () => {
    const g0 = createGame(scenes);
    const g1 = start(g0);
    expect(g1).not.toBe(g0);
    expect(g0.step).toBe('intro');
  });
});
