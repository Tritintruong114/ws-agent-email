import { EVENTS } from '../../data/mock.js';

const TYPE_ICONS = {
  classify: '📋', draft: '✍️', user_approve: '✅', detect_reply: '📥',
  user_confirm_close: '🔒', bounced: '🔴', user_correction: '✏️', scan: '🔄', memory_update: '🧠'
};
const TYPE_BG = {
  classify: 'var(--cw-teal)', draft: 'var(--cw-accent)',
  user_approve: 'var(--cw-green)', detect_reply: 'var(--cw-green)',
  user_confirm_close: 'var(--cw-green)', bounced: '#dc2626',
  user_correction: '#ca8a04', scan: 'var(--cw-ink-2)', memory_update: '#8b5cf6'
};

let expanded = new Set();

export function render() {
  const events = EVENTS;
  document.getElementById('page-s6').innerHTML = `
    <div class="flex items-center justify-between mb-4">
      <h2 style="font-size:var(--cw-fs-h2);font-weight:650">Activity Log</h2>
      <div class="flex gap-2 flex-wrap">
        <span class="badge badge-gray" onclick="App.logFilter('all')" style="cursor:pointer">Tat ca</span>
        <span class="badge badge-gray" onclick="App.logFilter('hom_nay')" style="cursor:pointer;background:var(--cw-accent-soft);color:var(--cw-ink)">Hom nay</span>
        <span class="badge badge-gray" onclick="App.logFilter('tuan_nay')" style="cursor:pointer">Tuan nay</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${events.map((ev, i) => `
        <div class="card event-item" onclick="App.toggleEvent(${i})" 
             style="${ev.type === 'bounced' ? 'border-left:3px solid #dc2626' : ''}">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-meta text-muted">${ev.time}</span>
            <span class="badge" style="background:${TYPE_BG[ev.type] || 'var(--cw-card-2)'};color:#fff">
              ${TYPE_ICONS[ev.type] || '📌'} ${ev.type.replace('_', ' ')}
            </span>
            <span class="font-semibold text-sm">${ev.id || ''}</span>
            <span class="text-sm text-muted">${ev.detail}</span>
          </div>
          ${expanded.has(i) ? renderExpanded(ev) : ''}
        </div>
      `).join('')}
    </div>
    <div class="flex items-center justify-between mt-4">
      <span class="text-sm text-muted" style="cursor:pointer">Xem them 32 su kien...</span>
      <button class="btn btn-outline btn-sm" onclick="toast('📥 Export CSV (simulated)')">📥 Xuat CSV</button>
    </div>
  `;
}

function renderExpanded(ev) {
  let html = '<div style="margin-left:44px;margin-top:8px;padding-top:8px;border-top:1px solid var(--cw-border)">';
  if (ev.thought) html += `<div class="text-meta text-muted mb-1"><strong>Agent nghi:</strong> ${ev.thought}</div>`;
  if (ev.signals) html += `<div class="text-meta text-muted mb-1"><strong>Tin hieu:</strong> ${ev.signals}</div>`;
  if (ev.memory) html += `<div class="text-meta text-muted" style="color:var(--cw-teal)"><strong>Memory impact:</strong> ${ev.memory}</div>`;
  html += '</div>';
  return html;
}

export function toggleEvent(i) {
  if (expanded.has(i)) expanded.delete(i); else expanded.add(i);
  render();
}

export function setFilter(f) {
  // In a real app, filter events; for demo just re-render
  render();
}