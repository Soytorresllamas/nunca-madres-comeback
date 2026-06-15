import { describe, it, expect } from 'vitest';
import { scenes, STYLES } from '../src/data/scenes.js';

describe('scenes data', () => {
  it('has exactly 6 scenes', () => {
    expect(scenes).toHaveLength(6);
  });

  it('defines the 4 canonical styles', () => {
    expect(STYLES).toEqual(['zen', 'sarcastica', 'diplomatica', 'directa']);
  });

  it('each scene has a unique id', () => {
    const ids = scenes.map((s) => s.id);
    expect(new Set(ids).size).toBe(6);
  });

  it('each scene has exactly one option per style', () => {
    for (const scene of scenes) {
      const styles = scene.options.map((o) => o.style).sort();
      expect(styles).toEqual([...STYLES].sort());
    }
  });

  it('every scene field and option text is a non-empty string', () => {
    for (const scene of scenes) {
      for (const key of ['id', 'faceta', 'icon', 'speaker', 'question']) {
        expect(typeof scene[key]).toBe('string');
        expect(scene[key].length).toBeGreaterThan(0);
      }
      for (const o of scene.options) {
        expect(o.text.trim().length).toBeGreaterThan(0);
      }
    }
  });
});

import { archetypes, PRIORITY, CLOSING_LINE, CTA_URL } from '../src/data/archetypes.js';
import { STYLES as STYLE_KEYS } from '../src/data/scenes.js';

describe('archetypes data', () => {
  it('has one archetype per style', () => {
    expect(Object.keys(archetypes).sort()).toEqual([...STYLE_KEYS].sort());
  });

  it('PRIORITY lists all 4 styles with Zen first and Directa last', () => {
    expect(PRIORITY).toEqual(['zen', 'diplomatica', 'sarcastica', 'directa']);
  });

  it('each archetype has the required display fields', () => {
    for (const key of STYLE_KEYS) {
      const a = archetypes[key];
      for (const f of ['name', 'tagline', 'icon', 'color', 'bg', 'description']) {
        expect(typeof a[f]).toBe('string');
        expect(a[f].length).toBeGreaterThan(0);
      }
    }
  });

  it('exposes the warm closing line and the Círculo CTA url', () => {
    expect(CLOSING_LINE.length).toBeGreaterThan(0);
    expect(CTA_URL).toBe('https://nunca-madres.mykajabi.com/circulo-nunca-madres');
  });
});
