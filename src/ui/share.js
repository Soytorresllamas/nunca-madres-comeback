import { CTA_URL } from '../data/archetypes.js';
import { rasterizeToPng } from './shareCard.js';
import { track, EVENTS } from '../analytics.js';

const SHARE_TEXT = 'Hice el test de Nunca Madres y este es mi estilo para responder las preguntas necias 💜';
const SHARE_MSG = `${SHARE_TEXT} ${CTA_URL}`;

async function buildCardFile(cardNode) {
  const blob = await rasterizeToPng(cardNode);
  return new File([blob], 'mi-comeback-nunca-madres.png', { type: 'image/png' });
}

function downloadFile(file) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  link.click();
  URL.revokeObjectURL(link.href);
}

// Every channel now carries the result card image. Instagram and WhatsApp
// attach it through the Web Share API (native sheet on mobile); the copy
// button keeps the link in the clipboard and downloads the card so it can
// be pasted/attached. Desktop falls back to a download in all cases.
export async function shareResult(channel, cardNode) {
  track(EVENTS.RESULT_SHARED, { channel });

  const file = await buildCardFile(cardNode);
  const canShareFiles = !!(navigator.canShare && navigator.canShare({ files: [file] }));

  if (channel === 'copy') {
    try {
      await navigator.clipboard.writeText(SHARE_MSG);
    } catch (e) {
      // clipboard may be blocked; the download below is the fallback
    }
    downloadFile(file);
    return 'copied+card';
  }

  if (channel === 'whatsapp') {
    if (canShareFiles) {
      try {
        await navigator.share({ files: [file], text: SHARE_MSG });
        return 'shared';
      } catch (e) {
        if (e && e.name === 'AbortError') return 'cancelled';
      }
    }
    downloadFile(file);
    window.open(`https://wa.me/?text=${encodeURIComponent(SHARE_MSG)}`, '_blank', 'noopener');
    return 'downloaded+opened';
  }

  // instagram / default
  if (canShareFiles) {
    try {
      await navigator.share({ files: [file], text: SHARE_MSG });
      return 'shared';
    } catch (e) {
      if (e && e.name === 'AbortError') return 'cancelled';
    }
  }
  downloadFile(file);
  return 'downloaded';
}
