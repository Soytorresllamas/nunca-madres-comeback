const PATHS = {
  asterisk:
    '<line x1="12" y1="3" x2="12" y2="21"/><line x1="4.2" y1="7.5" x2="19.8" y2="16.5"/><line x1="19.8" y1="7.5" x2="4.2" y2="16.5"/>',
  leaf:
    '<path d="M4 20c0-9 7-15 16-15 0 9-7 15-16 15z"/><path d="M4 20c3-6 8-9 13-10"/>',
  smile:
    '<circle cx="12" cy="12" r="9"/><path d="M8.5 13.8c1.2 1.6 5.8 1.6 7 0"/><circle cx="9.2" cy="10" r="1.1" fill="currentColor" stroke="none"/><circle cx="14.8" cy="10" r="1.1" fill="currentColor" stroke="none"/>',
  bubble: '<path d="M4 5h16v10H9l-4 3.5V15H4z"/>',
  flame:
    '<path d="M12 3c2.5 3.5 6 5.5 6 9.5a6 6 0 0 1-12 0c0-2 .8-3.2 1.8-4.2.4 1.8 1.9 1.9 1.9.1C9.6 6.6 10.4 4.8 12 3z"/>',
  whatsapp:
    '<path d="M20.5 11.5a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5l1.5-4.4A8.5 8.5 0 1 1 20.5 11.5z"/><path d="M8.6 8.6c-.3 1 .2 2.4 1.4 3.6s2.6 1.7 3.6 1.4c.5-.2.7-1 .4-1.4-.2-.2-.8-.6-1.2-.7-.3-.1-.5.1-.7.3-.2.2-.5.2-.8 0a4 4 0 0 1-1.2-1.2c-.2-.3-.2-.6 0-.8.2-.2.4-.4.3-.7-.1-.4-.5-1-.7-1.2-.4-.3-1.2-.1-1.4.4z" fill="currentColor" stroke="none"/>',
  instagram:
    '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="16.8" cy="7.2" r="1.1" fill="currentColor" stroke="none"/>',
  link:
    '<path d="M10.5 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7l-1.3 1.3"/><path d="M13.5 10.5a4 4 0 0 0-5.7 0l-2.3 2.3a4 4 0 0 0 5.7 5.7l1.3-1.3"/>',
  home:
    '<path d="M3 11l9-7 9 7"/><path d="M5 10v9h14v-9"/><path d="M10 19v-5h4v5"/>',
  briefcase:
    '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="3" y1="12.5" x2="21" y2="12.5"/>',
  medical:
    '<rect x="3" y="4" width="18" height="16" rx="3"/><line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/>',
  rings:
    '<circle cx="9.5" cy="13.5" r="5"/><circle cx="14.5" cy="13.5" r="5"/>',
  coffee:
    '<path d="M4 8h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M17 9h1.5a2.5 2.5 0 0 1 0 5H17"/><line x1="7" y1="2.5" x2="7" y2="4.5"/><line x1="11" y1="2.5" x2="11" y2="4.5"/>',
  armchair:
    '<rect x="4" y="10" width="16" height="7" rx="2"/><path d="M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><line x1="6.5" y1="17" x2="6.5" y2="19.5"/><line x1="17.5" y1="17" x2="17.5" y2="19.5"/>',
};

export function icon(name, { size = 20, cls = '', style = '' } = {}) {
  const body = PATHS[name] || PATHS.asterisk;
  const styleAttr = style ? ` style="${style}"` : '';
  return `<svg class="nm-icon ${cls}"${styleAttr} width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
