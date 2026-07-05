import { state, save, toast } from '../state.js';
import { VOICE_PROFILE, SUGGESTIONS } from '../../data/mock.js';

const TABS = ['Cơ bản', 'Nâng cao', 'Gợi ý'];
let accepted = new Set();
let rejected = new Set();

export function render() {
  if (!state.memoryTab) save('memoryTab', 0);
  const tab = state.memoryTab || 0;
  const vp = VOICE_PROFILE;
  
  document.getElementById('page-s5').innerHTML = `
    <h2 style="font-size:var(--cw-fs-h2);font-weight:650;margin-bottom:4px">Operating Memory</h2>
    <p style="font-size:var(--cw-fs-sm);color:var(--cw-ink-2);margin-bottom:16px">
      Agent ghi nhớ giọng văn, khách hàng và quy tắc từ các lần bạn sửa
    </p>
    <div class="tabs">
      ${TABS.map((t,i) => `<span class="tab ${i === tab ? 'active' : ''}" onclick="App.memoryTab(${i})">${t}</span>`).join('')}
    </div>
    ${tab === 0 ? renderCoBan(vp) : tab === 1 ? renderNangCao(vp) : renderGoiY()}
  `;
}

function renderCoBan(vp) {
  return `
    <div class="card mb-3">
      <div class="text-label mb-2">Hồ sơ người dùng</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:var(--cw-fs-sm)">
        <span class="text-muted">Việc chính</span><span>Tư vấn B2B</span>
        <span class="text-muted">Khách hàng</span><span>Startup gọi vốn + Agency nhỏ</span>
        <span class="text-muted">Giọng văn</span><span>Trang trọng, có số liệu</span>
        <span class="text-muted">Giờ làm</span><span>Sáng - 22h, reply tối muộn</span>
      </div>
    </div>
    <div class="card">
      <div class="text-label mb-2">Giọng văn đã học</div>
      <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:12px">
        ${vp.samples.map(s => `<div style="padding:8px;background:var(--cw-card-2);border-radius:6px;font-size:var(--cw-fs-sm)">${s}</div>`).join('')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:var(--cw-fs-sm)">
        <span class="text-muted">Tránh:</span>
        ${vp.avoided.map(a => `<span class="badge badge-gray" style="cursor:pointer" onclick="toast('Đã bỏ: ${a}')">${a}</span>`).join(' ')}
      </div>
    </div>
  `;
}

function renderNangCao(vp) {
  const tb = vp.toneByRelationship;
  return `
    <div class="card mb-3">
      <div class="text-label mb-2">Giọng theo quan hệ</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:var(--cw-fs-sm)">
        <span class="text-muted">Khách mới</span><span>${tb.new}</span>
        <span class="text-muted">Khách cũ</span><span>${tb.existing}</span>
        <span class="text-muted">Đối tác</span><span>${tb.partner}</span>
      </div>
    </div>
    <div class="card mb-3">
      <div class="text-label mb-2">Draft mẫu đã duyệt</div>
      <div style="font-size:var(--cw-fs-sm)">${vp.approvedDrafts.map(d => `${d.subject}: ${d.pattern}`).join('<br>')}</div>
    </div>
    <div class="card">
      <div class="text-label mb-2">Lịch sử sửa</div>
      <div style="font-size:var(--cw-fs-sm)">"Cảm ơn đã nhận" # reply thực chất (05/07 #T08)</div>
      <div style="font-size:var(--cw-fs-sm);margin-top:6px">"Khi nào có thể call?" là câu hỏi mới, cần để ý (04/07 #T22)</div>
    </div>
  `;
}

function renderGoiY() {
  return `
    <p style="font-size:var(--cw-fs-sm);color:var(--cw-ink-2);margin-bottom:12px">${SUGGESTIONS.length} đề xuất từ Operating Memory</p>
    ${SUGGESTIONS.map(s => `
      <div class="card mb-2" style="${accepted.has(s.id) ? 'opacity:0.6' : ''}">
        <div class="flex items-center justify-between">
          <div>
            <span class="font-semibold text-sm">${s.text}</span><br>
            <span style="font-size:var(--cw-fs-meta);color:var(--cw-ink-2)">${s.reason}</span>
          </div>
          <div class="flex gap-2" style="flex-shrink:0">
            ${!accepted.has(s.id) ? `
              <button class="btn btn-sm btn-primary" onclick="App.suggestionAction('${s.id}','accept')">Chấp nhận</button>
              <button class="btn btn-sm btn-ghost" onclick="App.suggestionAction('${s.id}','reject')">Bỏ qua</button>
            ` : '<span style="font-size:var(--cw-fs-sm);color:var(--cw-ink-2)">Đã xử lý</span>'}
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
    toast('Đã chấp nhận đề xuất');
  } else {
    rejected.add(id);
    toast('Đã bỏ qua đề xuất');
  }
  render();
}
