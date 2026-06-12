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
      for (const key of ['id', 'faceta', 'icon', 'speaker', 'speakerInitials', 'question']) {
        expect(typeof scene[key]).toBe('string');
        expect(scene[key].length).toBeGreaterThan(0);
      }
      for (const o of scene.options) {
        expect(o.text.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
