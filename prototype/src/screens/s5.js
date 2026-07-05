import { state, save, toast } from '../state.js';
import { VOICE_PROFILE, SUGGESTIONS } from '../../data/mock.js';

const TABS = ['Co ban', 'Nang cao', 'Goi y'];
let accepted = new Set();
let rejected = new Set();

export function render() {
  if (!state.memoryTab) save('memoryTab', 0);
  const tab = state.memoryTab || 0;
  const vp = VOICE_PROFILE;
  document.getElementById('page-s5').innerHTML = `
    <h2 style="font-size:var(--cw-fs-h2);font-weight:650;margin-bottom:4px">Operating Memory</h2>
    <div class="tabs">
      ${TABS.map((t,i) => `<span class="tab ${i === tab ? 'active' : ''}" onclick="App.memoryTab(${i})">${t}</span>`).join('')}
    </div>
    ${tab === 0 ? renderCoBan(vp) : tab === 1 ? renderNangCao(vp) : renderGoiY()}
  `;
}

function renderCoBan(vp) {
  return `
    <div class="card mb-3">
      <div class="text-label mb-2">Identity Summary</div>
      <div class="flex gap-3 text-sm flex-wrap">
        <span>💼 <strong>Viec chinh:</strong> Tu van B2B</span>
        <span>👥 <strong>Khach:</strong> Startup goi von + Agency nho</span>
        <span>🗣️ <strong>Giong:</strong> Trang trong, co so lieu</span>
        <span>⏰ <strong>Gio lam:</strong> Sang - 22h, reply toi muon</span>
      </div>
    </div>
    <div class="card mb-3">
      <div class="text-label mb-2">Voice Profile</div>
      <div class="text-sm mb-3">
        ${vp.samples.map(s => `<div style="padding:8px;background:var(--cw-card-2);border-radius:6px;margin-bottom:6px">${s}</div>`).join('')}
      </div>
      <div class="flex gap-2 items-center text-sm flex-wrap">
        <span class="text-muted">Tranh:</span>
        ${vp.avoided.map(a => `<span class="badge badge-gray" style="cursor:pointer" onclick="toast('Da bo: ${a}')">${a} ✕</span>`).join(' ')}
      </div>
    </div>
    <div class="flex gap-3 text-sm flex-wrap">
      <span class="text-muted">⏱ Cadence: 3 ngay / 3 lan / 22h-8h yen</span>
      <span class="text-muted">🚫 Exclude: 2 contact, 1 domain</span>
    </div>
  `;
}

function renderNangCao(vp) {
  const tb = vp.toneByRelationship;
  return `
    <div class="card mb-3">
      <div class="text-label mb-2">Giong theo quan he</div>
      <div class="flex gap-3 text-sm flex-wrap">
        <span><strong>Khach moi:</strong> ${tb.new}</span>
        <span><strong>Khach cu:</strong> ${tb.existing}</span>
        <span><strong>Doi tac:</strong> ${tb.partner}</span>
      </div>
    </div>
    <div class="card mb-3">
      <div class="text-label mb-2">Draft mau duoc duyet</div>
      <div class="text-sm">${vp.approvedDrafts.map(d => `${d.subject}: ${d.pattern}`).join('<br>')}</div>
    </div>
    <div class="card">
      <div class="text-label mb-2">Corrections history</div>
      <div class="text-sm">"Cam on da nhan" &ne; reply thuc chat (05/07 #T08)</div>
      <div class="text-sm mt-2">"Khi nao co the call?" la cau hoi moi, can de y (04/07 #T22)</div>
    </div>
  `;
}

function renderGoiY() {
  const suggestions = SUGGESTIONS;
  return `<div class="text-sm text-muted mb-3">${suggestions.length} de xuat tu Operating Memory — dang cho xac nhan</div>
    ${suggestions.map(s => `
      <div class="card mb-2" style="${accepted.has(s.id) ? 'opacity:0.6' : ''}">
        <div class="flex items-center justify-between">
          <div>
            <span class="font-semibold text-sm">💡 ${s.text}</span><br>
            <span class="text-meta text-muted">${s.reason}</span>
          </div>
          <div class="flex gap-2">
            ${!accepted.has(s.id) ? `
              <button class="btn btn-sm btn-primary" onclick="App.suggestionAction('${s.id}','accept')">✅</button>
              <button class="btn btn-sm btn-ghost" onclick="App.suggestionAction('${s.id}','reject')">❌</button>
            ` : '<span class="text-sm text-muted">✅ Da xu ly</span>'}
          </div>
        </div>
      </div>
    `).join('')}
  `;
}

export function setTab(idx) {
  save('memoryTab', idx);
  render();
}

export function suggestionAction(id, action) {
  if (action === 'accept') {
    accepted.add(id);
    toast('✅ Da xac nhan de xuat');
  } else {
    rejected.add(id);
    toast('❌ Da bac de xuat');
  }
  render();
}