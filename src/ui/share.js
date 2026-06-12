import { CTA_URL } from '../data/archetypes.js';
import { rasterizeToPng } from './shareCard.js';
import { track, EVENTS } from '../analytics.js';

const SHARE_TEXT = 'Hice el test de Nunca Madres y este es mi estilo para responder las preguntas necias 💜';

export async function shareResult(channel, cardNode) {
  track(EVENTS.RESULT_SHARED, { channel });

  if (channel === 'copy') {
    await navigator.clipboard.writeText(`${SHARE_TEXT} ${CTA_URL}`);
    return 'copied';
  }

  if (channel === 'whatsapp') {
    const url = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${CTA_URL}`)}`;
    window.open(url, '_blank', 'noopener');
    return 'opened';
  }

  const blob = await rasterizeToPng(cardNode);
  const file = new File([blob], 'mi-comeback.png', { type: 'image/png' });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({ files: [file], text: SHARE_TEXT });
    return 'shared';
  }

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'mi-comeback.png';
  link.click();
  URL.revokeObjectURL(link.href);
  return 'downloaded';
}
