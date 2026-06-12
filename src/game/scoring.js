export function tally(answerStyles, styles) {
  const counts = Object.fromEntries(styles.map((s) => [s, 0]));
  for (const style of answerStyles) {
    if (style in counts) counts[style] += 1;
  }
  return counts;
}

export function determineArchetype(counts, priority) {
  const ranked = [...priority].sort((a, b) => {
    if (counts[b] !== counts[a]) return counts[b] - counts[a];
    return priority.indexOf(a) - priority.indexOf(b);
  });

  const primary = ranked[0];
  const second = ranked[1];
  const withinOne = counts[primary] - counts[second] <= 1 && counts[second] > 0;

  return { primary, secondary: withinOne ? second : null };
}
