import { state, save, toast } from '../state.js';
import { THREADS } from '../../data/mock.js';

const BUCKETS = [
  { key: 'can_followup', label: 'Cần follow-up', color: '#ea580c', icon: '>' },
  { key: 'bounced', label: 'Mail trả lại', color: '#dc2626', icon: 'X' },
  { key: 'needs_reply', label: 'Cần bạn trả lời', color: '#ca8a04', icon: '<' },
  { key: 'has_reply', label: 'Đã có reply', color: '#16a34a', icon: 'R' },
  { key: 'deprioritized', label: 'Có thể bỏ qua', color: '#6b6469', icon: '-' }
];

let selectedThread = null;

export function render() {
  if (!state.bucket) save('bucket', 'can_followup');
  const bucket = state.bucket || 'can_followup';
  
  // Summary counts
  const counts = {};
  BUCKETS.forEach(b => counts[b.key] = THREADS.filter(t => t.bucket === b.key).length);

  document.getElementById('page-s2').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--cw-sp-5)">
      <div>
        <h2 style="font-size:var(--cw-fs-h2);font-weight:650;margin-bottom:12px">Queue</h2>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">
          ${BUCKETS.filter(b => b.key !== 'has_reply').map(b => `
            <button class="btn ${bucket === b.key ? 'btn-primary' : 'btn-outline'} btn-sm" 
                    onclick="App.selectBucket('${b.key}')">
              ${b.icon} ${b.label} (${counts[b.key] || 0})
            </button>
          `).join('')}
        </div>

        <div style="display:flex;flex-direction:column;gap:6px">
          ${THREADS.filter(t => t.bucket === bucket).map(t => `
            <div class="card bucket-card ${selectedThread === t.id ? 'selected' : ''}" 
                 onclick="App.selectThread('${t.id}')"
                 style="border-left:4px solid ${BUCKETS.find(b => b.key === t.bucket)?.color || 'transparent'};padding:12px">
              <div class="flex items-center justify-between mb-1">
                <span class="font-semibold text-sm" style="font-size:var(--cw-fs-sm)">${t.sender}</span>
                <span style="font-size:var(--cw-fs-micro);color:var(--cw-ink-3)">${t.daysSince} ngày</span>
              </div>
              <div style="font-size:var(--cw-fs-sm);margin-bottom:4px">${t.subject}</div>
              <div style="font-size:var(--cw-fs-meta);color:var(--cw-ink-2);line-height:1.4">${t.snippet}</div>
              <div class="flex gap-2 mt-2">
                <span class="badge ${t.confidence === 'CAO' ? 'badge-green' : t.confidence === 'THAP' ? 'badge-gray' : 'badge-yellow'}">
                  ${t.confidence === 'CAO' ? 'Cao' : t.confidence === 'TRUNG_BINH' ? 'Trung bình' : 'Thấp'}
                </span>
                <span class="badge badge-gray">${t.valueType}</span>
                ${t.followUpCount > 0 ? `<span class="badge badge-gray">FU ${t.followUpCount}/${t.maxFollowUp}</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        ${selectedThread ? renderDetail(selectedThread) : renderEmptyDetail()}
      </div>
    </div>
  `;
}

function renderEmptyDetail() {
  return `
    <div style="text-align:center;padding:40px;color:var(--cw-ink-3);font-size:var(--cw-fs-sm)">
      Chọn một thread để xem chi tiết
    </div>
  `;
}

function renderDetail(threadId) {
  const t = THREADS.find(x => x.id === threadId);
  if (!t) return renderEmptyDetail();
  const bucketInfo = BUCKETS.find(b => b.key === t.bucket);
  
  return `
    <div class="card">
      <div class="flex items-center justify-between mb-3">
        <span class="font-semibold">${t.subject}</span>
        <span class="badge" style="background:${bucketInfo?.color};color:#fff">${bucketInfo?.label || t.bucket}</span>
      </div>
      <div style="font-size:var(--cw-fs-sm);color:var(--cw-ink-2);margin-bottom:12px">
        ${t.sender} &lt;${t.email}&gt;
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:var(--cw-fs-sm);margin-bottom:16px">
        <span class="text-muted">Trạng thái</span>
        <span>${t.state}</span>
        <span class="text-muted">Chờ</span>
        <span>${t.waitingOn === 'user' ? 'Bạn' : 'Khách'}</span>
        <span class="text-muted">Số ngày</span>
        <span>${t.daysSince} ngày</span>
        <span class="text-muted">Follow-up</span>
        <span>${t.followUpCount}/${t.maxFollowUp}</span>
      </div>

      <div style="background:var(--cw-card-2);padding:12px;border-radius:var(--cw-r-sm);font-size:var(--cw-fs-sm);margin-bottom:16px">
        <div class="text-meta text-muted mb-1">Nội dung gần nhất</div>
        ${t.lastMeaningfulSnippet}
      </div>

      ${t.draft ? `
        <div style="border-top:1px solid var(--cw-border);padding-top:16px;margin-bottom:16px">
          <div class="font-semibold text-sm mb-2">Draft đề xuất</div>
          <div style="background:var(--cw-accent-soft);padding:12px;border-radius:var(--cw-r-sm);font-size:var(--cw-fs-sm);margin-bottom:8px">
            ${t.draft}
          </div>
          <div style="font-size:var(--cw-fs-meta);color:var(--cw-ink-2);background:var(--cw-card-2);padding:8px;border-radius:var(--cw-r-sm)">
            ${t.draftRationale}
          </div>
          <div class="flex gap-2 mt-3">
            <button class="btn btn-primary btn-sm" onclick="App.threadAction('${t.id}','approve')">
              Duyệt
            </button>
            <button class="btn btn-outline btn-sm" onclick="App.threadAction('${t.id}','edit')">
              Sửa
            </button>
            <button class="btn btn-ghost btn-sm" onclick="App.threadAction('${t.id}','skip')">
              Bỏ qua
            </button>
          </div>
        </div>
      ` : `
        <div style="background:var(--cw-card-2);padding:12px;border-radius:var(--cw-r-sm);font-size:var(--cw-fs-sm);margin-bottom:8px">
          <div class="font-semibold text-sm mb-1">Hành động</div>
          <div style="color:var(--cw-ink-2)">Không có draft tự động. Bạn trả lời trực tiếp trên Gmail.</div>
          <div class="flex gap-2 mt-3">
            <button class="btn btn-primary btn-sm" onclick="App.threadAction('${t.id}','close')">
              Đóng
            </button>
            <button class="btn btn-ghost btn-sm" onclick="App.threadAction('${t.id}','skip')">
              Bỏ qua
            </button>
          </div>
        </div>
      `}

      <div style="font-size:var(--cw-fs-micro);color:var(--cw-ink-3)">
        Người gửi cuối: ${t.lastUserSent}
      </div>
    </div>
  `;
}

// Make selectThread globally accessible
window.App.selectThread = function(id) {
  selectedThread = id;
  render();
};

export function selectBucket(key) {
  save('bucket', key);
  selectedThread = null;
  render();
}

export function threadAction(id, action) {
  const t = THREADS.find(x => x.id === id);
  if (action === 'approve') toast('Draft đã được gửi từ Gmail');
  else if (action === 'edit') toast('Mở Gmail để sửa draft');
  else if (action === 'close') toast('Thread đã đóng');
  else if (action === 'skip') toast('Đã bỏ qua thread này');
  selectedThread = null;
  render();
}
