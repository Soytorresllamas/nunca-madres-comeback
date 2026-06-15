import { STYLES } from '../data/scenes.js';
import { PRIORITY } from '../data/archetypes.js';

export function tally(answerStyles) {
  const counts = Object.fromEntries(STYLES.map((s) => [s, 0]));
  for (const style of answerStyles) {
    if (style in counts) counts[style] += 1;
  }
  return counts;
}

export function determineArchetype(counts) {
  const ranked = [...PRIORITY].sort((a, b) => {
    if (counts[b] !== counts[a]) return counts[b] - counts[a];
    return PRIORITY.indexOf(a) - PRIORITY.indexOf(b);
  });

  const primary = ranked[0];
  const second = ranked[1];
  const withinOne = counts[primary] - counts[second] <= 1 && counts[second] > 0;

  return { primary, secondary: withinOne ? second : null };
}
