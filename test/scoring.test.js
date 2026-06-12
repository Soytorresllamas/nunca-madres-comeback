import { describe, it, expect } from 'vitest';
import { tally, determineArchetype } from '../src/game/scoring.js';
import { STYLES } from '../src/data/scenes.js';
import { PRIORITY } from '../src/data/archetypes.js';

describe('tally', () => {
  it('counts each style and zero-fills the rest', () => {
    const result = tally(['zen', 'zen', 'directa'], STYLES);
    expect(result).toEqual({ zen: 2, sarcastica: 0, diplomatica: 0, directa: 1 });
  });
});

describe('determineArchetype', () => {
  it('returns the clear winner with no secondary when lead > 1', () => {
    const t = { zen: 3, sarcastica: 1, diplomatica: 1, directa: 1 };
    expect(determineArchetype(t, PRIORITY)).toEqual({ primary: 'zen', secondary: null });
  });

  it('returns a sweep with no secondary', () => {
    const t = { zen: 0, sarcastica: 6, diplomatica: 0, directa: 0 };
    expect(determineArchetype(t, PRIORITY)).toEqual({ primary: 'sarcastica', secondary: null });
  });

  it('adds a secondary when a different style is within 1 point', () => {
    const t = { zen: 3, sarcastica: 2, diplomatica: 1, directa: 0 };
    expect(determineArchetype(t, PRIORITY)).toEqual({ primary: 'zen', secondary: 'sarcastica' });
  });

  it('breaks a primary tie using PRIORITY order (zen before sarcastica)', () => {
    const t = { zen: 2, sarcastica: 2, diplomatica: 1, directa: 1 };
    expect(determineArchetype(t, PRIORITY)).toEqual({ primary: 'zen', secondary: 'sarcastica' });
  });

  it('breaks a primary tie favouring diplomatica over sarcastica', () => {
    const t = { zen: 0, sarcastica: 3, diplomatica: 3, directa: 0 };
    expect(determineArchetype(t, PRIORITY)).toEqual({ primary: 'diplomatica', secondary: 'sarcastica' });
  });

  it('picks the secondary by PRIORITY when several tie for second', () => {
    const t = { zen: 2, sarcastica: 2, diplomatica: 2, directa: 0 };
    expect(determineArchetype(t, PRIORITY)).toEqual({ primary: 'zen', secondary: 'diplomatica' });
  });
});
