import { EVENTS } from '../../data/mock.js';

const TYPE_ICONS = {
  classify: 'CL', draft: 'DR', user_approve: 'OK', detect_reply: 'RP',
  user_confirm_close: 'DN', bounced: 'ND', user_correction: 'SC', scan: 'QT', memory_update: 'MN'
};
const TYPE_BG = {
  classify: 'var(--cw-teal)', draft: 'var(--cw-accent)',
  user_approve: 'var(--cw-green)', detect_reply: 'var(--cw-green)',
  user_confirm_close: 'var(--cw-green)', bounced: '#dc2626',
  user_correction: '#ca8a04', scan: 'var(--cw-ink-2)', memory_update: '#8b5cf6'
};
const TYPE_LABELS = {
  classify: 'Phân loại', draft: 'Soạn draft', user_approve: 'Duyệt',
  detect_reply: 'Phát hiện reply', user_confirm_close: 'Đóng',
  bounced: 'Bounce', user_correction: 'Sửa', scan: 'Quét', memory_update: 'Memory'
};

let expanded = new Set();

export function render() {
  const events = EVENTS;
  document.getElementById('page-s6').innerHTML = `
    <div class="flex items-center justify-between mb-4">
      <h2 style="font-size:var(--cw-fs-h2);font-weight:650">Activity Log</h2>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        <span class="badge badge-gray" onclick="App.logFilter('all')" style="cursor:pointer;background:var(--cw-accent-soft);color:var(--cw-ink)">Tất cả</span>
        <span class="badge badge-gray" onclick="App.logFilter('hom_nay')" style="cursor:pointer">Hôm nay</span>
        <span class="badge badge-gray" onclick="App.logFilter('tuan_nay')" style="cursor:pointer">Tuần này</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${events.map((ev, i) => `
        <div class="card event-item" onclick="App.toggleEvent(${i})" 
             style="${ev.type === 'bounced' ? 'border-left:3px solid #dc2626' : ''}">
          <div class="flex items-center gap-2 mb-1" style="flex-wrap:wrap">
            <span style="font-size:var(--cw-fs-meta);color:var(--cw-ink-3)">${ev.time}</span>
            <span class="badge" style="background:${TYPE_BG[ev.type] || 'var(--cw-card-2)'};color:#fff">
              ${TYPE_ICONS[ev.type] || '--'} ${TYPE_LABELS[ev.type] || ev.type.replace('_', ' ')}
            </span>
            <span class="font-semibold text-sm">${ev.id || ''}</span>
            <span style="font-size:var(--cw-fs-sm);color:var(--cw-ink-2)">${ev.detail}</span>
          </div>
          ${expanded.has(i) ? renderExpanded(ev) : ''}
        </div>
      `).join('')}
    </div>
    <div class="flex items-center justify-between mt-4">
      <span style="font-size:var(--cw-fs-sm);color:var(--cw-ink-2);cursor:pointer">Xem thêm 32 sự kiện...</span>
      <button class="btn btn-outline btn-sm" onclick="toast('Xuất CSV (simulated)')">Xuất CSV</button>
    </div>
  `;
}

function renderExpanded(ev) {
  let html = '<div style="margin-left:44px;margin-top:8px;padding-top:8px;border-top:1px solid var(--cw-border);font-size:var(--cw-fs-sm)">';
  if (ev.thought) html += `<div class="mb-1"><span class="text-muted">Agent nghĩ:</span> ${ev.thought}</div>`;
  if (ev.signals) html += `<div class="mb-1"><span class="text-muted">Tín hiệu:</span> ${ev.signals}</div>`;
  if (ev.memory) html += `<div style="color:var(--cw-teal)"><span class="text-muted">Memory impact:</span> ${ev.memory}</div>`;
  html += '</div>';
  return html;
}

export function toggleEvent(i) {
  if (expanded.has(i)) expanded.delete(i); else expanded.add(i);
  render();
}

export function setFilter(f) {
  render();
}
