import html2canvas from 'html2canvas';
import { track, EVENTS } from '../analytics.js';

const SHARE_TEXT = 'Hice el test de Nunca Madres y este es mi estilo para responder las preguntas necias 💜';

// The quiz's own URL — everything we share points back to the game so it
// keeps spreading. Adapts automatically to wherever it is deployed.
function quizUrl() {
  return window.location.origin + window.location.pathname;
}

async function buildCardFile(cardNode) {
  // Wait for images (logo) to decode so they don't render blank, then snapshot.
  const imgs = [...cardNode.querySelectorAll('img')];
  await Promise.all(imgs.map((img) => img.decode().catch(() => {})));
  const canvas = await html2canvas(cardNode, { backgroundColor: null, scale: 2, useCORS: true });
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  return new File([blob], 'mi-comeback-nunca-madres.png', { type: 'image/png' });
}

function downloadFile(file) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  link.click();
  URL.revokeObjectURL(link.href);
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  }
  fallbackCopy(text);
  return Promise.resolve();
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
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

export async function shareResult(channel, cardNode) {
  track(EVENTS.RESULT_SHARED, { channel });

  const url = quizUrl();

  if (channel === 'copy') {
    // Copy only the quiz link (no image download).
    await copyText(url);
    return 'copied';
  }

  const message = `${SHARE_TEXT} ${url}`;
  const file = await buildCardFile(cardNode);
  const canShareFiles = !!(navigator.canShare && navigator.canShare({ files: [file] }));

  if (channel === 'whatsapp') {
    if (canShareFiles) {
      try {
        await navigator.share({ files: [file], text: message });
        return 'shared';
      } catch (e) {
        if (e && e.name === 'AbortError') return 'cancelled';
      }
    }
    downloadFile(file);
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    return 'downloaded+opened';
  }

  // instagram / default
  if (canShareFiles) {
    try {
      await navigator.share({ files: [file], text: message });
      return 'shared';
    } catch (e) {
      if (e && e.name === 'AbortError') return 'cancelled';
    }
  }
  downloadFile(file);
  return 'downloaded';
}
