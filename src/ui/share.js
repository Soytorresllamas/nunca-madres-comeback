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

  if (channel === 'copy') {
    // Copy only the quiz's own link (so whoever gets it lands on the game).
    // No image download here.
    const quizUrl = window.location.origin + window.location.pathname;
    try {
      await navigator.clipboard.writeText(quizUrl);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = quizUrl;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch (_) {
        // ignore
      }
      document.body.removeChild(ta);
    }
    return 'copied';
  }

  const file = await buildCardFile(cardNode);
  const canShareFiles = !!(navigator.canShare && navigator.canShare({ files: [file] }));

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
