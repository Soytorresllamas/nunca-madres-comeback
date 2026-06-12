import { archetypes, CLOSING_LINE, CTA_URL } from '../data/archetypes.js';
import { icon } from './icons.js';

const LOGO_SRC = './logo-nunca-madres-negro.avif';

export function renderIntro(root, { onStart }) {
  root.classList.add('nm-cover-mode');
  root.innerHTML = `
    <div class="nm-cover">
      ${icon('asterisk', { size: 20, cls: 'nm-cover-ast', style: 'top:60px;right:32px' })}
      ${icon('asterisk', { size: 18, cls: 'nm-cover-ast', style: 'bottom:206px;left:30px' })}
      <span class="nm-float" style="top:102px;left:20px;color:rgba(114,36,62,.5);font-size:14px;transform:rotate(-6deg)">¿y el reloj biológico?</span>
      <span class="nm-float" style="top:158px;right:16px;color:rgba(255,46,136,.5);font-size:15px;transform:rotate(6deg)">te vas a arrepentir…</span>
      <span class="nm-float" style="bottom:160px;left:18px;color:rgba(114,36,62,.5);font-size:14px;transform:rotate(7deg)">¿y quién te cuida?</span>
      <span class="nm-float" style="bottom:118px;right:20px;color:rgba(255,46,136,.45);font-size:13px;transform:rotate(-5deg)">¿no te sientes vacía?</span>
      <img class="nm-logo nm-logo--md" src="${LOGO_SRC}" alt="Nunca Madres" />
      <div class="nm-cover-mid">
        <div class="nm-speech">¿Y los hijos pa' cuándo?</div>
        <p class="nm-cover-sub">Spoiler: tú decides. Y tienes mil formas de contestar.</p>
      </div>
      <div class="nm-cover-foot">
        <span class="nm-cover-meta">Descúbrelo en 6 escenas</span>
        <button class="nm-cta-primary nm-cta-purple" type="button" id="nm-start">Empezar</button>
      </div>
    </div>`;
  root.querySelector('#nm-start').addEventListener('click', onStart);
}

export function renderScene(root, { scene, index, total, onAnswer }) {
  root.classList.remove('nm-cover-mode');
  const dots = Array.from({ length: total }, (_, i) =>
    `<span class="${i <= index ? 'is-done' : ''}"></span>`,
  ).join('');
  const options = scene.options
    .map(
      (o) => `
      <button class="nm-option" type="button" data-style="${o.style}">
        <span class="nm-text">${o.text}</span>
      </button>`,
    )
    .join('');
  root.innerHTML = `
    <div class="nm-topbar">
      <img class="nm-logo nm-logo--sm" src="${LOGO_SRC}" alt="Nunca Madres" />
      <span class="nm-count">${index + 1} / ${total}</span>
    </div>
    <div class="nm-progress">${dots}</div>
    <div class="nm-chip">${icon('asterisk', { size: 18, cls: 'nm-ast' })} ${scene.faceta}</div>
    <div class="nm-bubble">
      <div class="nm-avatar">${icon(scene.icon, { size: 20 })}</div>
      <div class="nm-bubble-body">
        <p class="nm-speaker">${scene.speaker}</p>
        <p class="nm-question">${scene.question}</p>
      </div>
    </div>
    <p style="margin:0 0 8px;font-size:13px;color:var(--nm-muted)">¿Cómo respondes?</p>
    <div class="nm-options">${options}</div>`;
  root.querySelectorAll('.nm-option').forEach((btn) => {
    btn.addEventListener('click', () => onAnswer(btn.dataset.style));
  });
}

export function buildResultCardHtml(result) {
  const a = archetypes[result.primary];
  const toque = result.secondary
    ? `<p class="nm-tagline">con un toque de ${archetypes[result.secondary].name.replace('La ', '')}</p>`
    : '';
  return `
    <div class="nm-card" id="nm-card" style="background:${a.bg}">
      ${icon('asterisk', { size: 18, cls: 'nm-confetti', style: 'top:14px;left:16px' })}
      ${icon('asterisk', { size: 24, cls: 'nm-confetti', style: 'top:40px;right:20px' })}
      ${icon('asterisk', { size: 15, cls: 'nm-confetti', style: 'bottom:18px;left:18px' })}
      <p class="nm-kicker">Tu resultado</p>
      <div class="nm-badge">${icon(a.icon, { size: 34, cls: 'nm-badge-icon' })}</div>
      <p class="nm-name">${a.name}</p>
      <p class="nm-tagline">${a.tagline}</p>
      ${toque}
      <p class="nm-desc">${a.description}</p>
      <p class="nm-closing">"${CLOSING_LINE}"</p>
    </div>`;
}

export function renderResult(root, { result, onShare, onCta, onReplay }) {
  root.classList.remove('nm-cover-mode');
  root.innerHTML = `
    <div class="nm-topbar nm-topbar--center">
      <img class="nm-logo nm-logo--sm" src="${LOGO_SRC}" alt="Nunca Madres" />
    </div>
    <h2 class="sr-only">Tu estilo para responder es ${archetypes[result.primary].name}</h2>
    ${buildResultCardHtml(result)}
    <div class="nm-result-actions">
      <a class="nm-cta-primary" id="nm-cta" href="${CTA_URL}" target="_blank" rel="noopener"
         style="background:var(--nm-purple)">Únete al Círculo Nunca Madres <span aria-hidden="true">→</span></a>
      <div class="nm-share-row">
        <button type="button" data-channel="whatsapp" aria-label="Compartir por WhatsApp">${icon('whatsapp', { size: 22 })}</button>
        <button type="button" data-channel="instagram" aria-label="Compartir en Instagram">${icon('instagram', { size: 22 })}</button>
        <button type="button" data-channel="copy" aria-label="Copiar liga">${icon('link', { size: 22 })}</button>
      </div>
      <button class="nm-replay" type="button" id="nm-replay">Volver a jugar</button>
    </div>`;
  root.querySelectorAll('.nm-share-row button').forEach((btn) => {
    btn.addEventListener('click', () => onShare(btn.dataset.channel, result));
  });
  root.querySelector('#nm-cta').addEventListener('click', onCta);
  root.querySelector('#nm-replay').addEventListener('click', onReplay);
}
