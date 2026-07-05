import { state, save, toast } from '../state.js';
import { THREADS } from '../../data/mock.js';

const BUCKETS = [
  { key: 'bounced', label: 'Bounced', color: '#dc2626', icon: '🔴', badgeClass: 'badge-red' },
  { key: 'needs_reply', label: 'Can tra loi', color: '#ea580c', icon: '🟠', badgeClass: 'badge-orange' },
  { key: 'has_reply', label: 'Da co reply', color: '#ca8a04', icon: '🟡', badgeClass: 'badge-yellow' },
  { key: 'can_followup', label: 'Can follow-up', color: '#16a34a', icon: '🟢', badgeClass: 'badge-green' },
  { key: 'deprioritized', label: 'Co the bo qua', color: 'var(--cw-ink-3)', icon: '⚪', badgeClass: 'badge-gray' }
];

function renderThreads(bucketKey) {
  return THREADS.filter(t => t.bucket === bucketKey);
}

function renderDetail(thread) {
  if (!thread) return `<div class="flex items-center justify-center" style="height:200px;color:var(--cw-ink-2)">Chon thread ben trai</div>`;
  const bucket = BUCKETS.find(b => b.key === thread.bucket);
  return `
    <div class="flex items-center justify-between mb-3">
      <div>
        <span class="text-meta text-muted">Tu: </span>
        <span class="font-semibold">${thread.sender}</span>
        <span class="text-meta text-muted"> &lt;${thread.email}&gt;</span>
      </div>
      <div class="flex gap-2">
        <span class="badge ${bucket ? bucket.badgeClass : 'badge-gray'}">Da cho ${thread.daysSince} ngay</span>
        <span class="badge badge-gray">Follow-up ${thread.followUpCount}/${thread.maxFollowUp}</span>
      </div>
    </div>
    <div class="mb-3 text-sm">
      <span class="text-label">${thread.subject}</span>
    </div>
    <div class="card" style="background:var(--cw-card-2);margin-bottom:12px">
      <div class="text-sm text-muted mb-1">Tom tat thread</div>
      <div class="text-sm">${thread.snippet}</div>
      <div class="text-meta text-muted mt-2" style="padding:8px;background:var(--cw-card);border-radius:6px">
        <span class="text-label">Tin hieu cuoi cung: </span>
        ${thread.lastMeaningfulSnippet}
      </div>
    </div>
    ${thread.draft ? `
      <div class="card" style="background:var(--cw-accent-soft);margin-bottom:12px">
        <div class="text-label mb-1">Draft</div>
        <div class="text-sm">"${thread.draft}"</div>
        <div class="text-meta text-muted mt-2" style="padding:8px 0 0;border-top:1px solid var(--cw-border)">
          Tai sao? ${thread.draftRationale}
        </div>
      </div>
    ` : ''}
    <div style="border-top:1px solid var(--cw-border);padding-top:12px">
      <div class="flex gap-2 flex-wrap">
        ${thread.draft ? `<button class="btn btn-sm btn-primary" onclick="App.threadAction('${thread.id}','approve')">✅ Duyet &amp; gui</button>` : ''}
        ${thread.draft ? `<button class="btn btn-sm btn-outline" onclick="App.threadAction('${thread.id}','edit')">✏️ Viet lai</button>` : ''}
        <button class="btn btn-sm btn-ghost" onclick="App.threadAction('${thread.id}','snooze')">😴 Snooze</button>
        <button class="btn btn-sm btn-ghost" onclick="App.threadAction('${thread.id}','dismiss')">❌ Bo qua</button>
        ${thread.bucket === 'has_reply' ? `<button class="btn btn-sm btn-green" onclick="App.threadAction('${thread.id}','close')">🔒 Dong</button>` : ''}
        <button class="btn btn-sm btn-ghost ml-auto">Mo Gmail</button>
      </div>
    </div>
  `;
}

function bucketCounts() {
  const counts = {};
  THREADS.forEach(t => { counts[t.bucket] = (counts[t.bucket] || 0) + 1; });
  BUCKETS.forEach(b => { if (!counts[b.key]) counts[b.key] = 0; });
  return counts;
}

export function render() {
  const counts = bucketCounts();
  const allThreads = THREADS.filter(t => t.bucket !== 'deprioritized');
  const selected = state.selectedThread ? THREADS.find(t => t.id === state.selectedThread) : allThreads[0];
  if (selected) save('selectedThread', selected.id);

  document.getElementById('page-s2').innerHTML = `
    <div class="flex items-center justify-between mb-4">
      <h2 style="font-size:var(--cw-fs-h2);font-weight:650">Queue — ${allThreads.length} viec can quyet dinh</h2>
      <span class="text-sm text-muted">${THREADS.length} thread dang theo doi</span>
    </div>
    <div class="flex gap-3">
      <div style="width:310px;min-width:260px">
        ${BUCKETS.filter(b => b.key !== 'deprioritized').map(b => `
          <div class="card bucket-card ${selected && selected.bucket === b.key ? 'selected' : ''}" 
               style="border-left-color:${b.color}" 
               onclick="App.selectBucket('${b.key}')">
            <div class="flex items-center gap-2 mb-1">
              <span class="badge ${b.badgeClass}">${counts[b.key] || 0}</span>
              <span class="font-semibold text-sm">${b.label}</span>
            </div>
            <div class="text-sm text-muted">
              ${renderThreads(b.key).map(t => t.subject).join(' &middot; ')}
            </div>
          </div>
        `).join('')}
        <details class="mt-2">
          <summary class="text-sm text-muted" style="cursor:pointer;padding:8px 12px">
            ${counts.deprioritized || 0} Co the bo qua &darr;
          </summary>
          <div class="text-sm text-muted" style="padding:4px 12px">
            ${renderThreads('deprioritized').map(t => t.subject).join(', ')}
          </div>
        </details>
      </div>
      <div class="card" style="flex:1;min-width:0">
        ${renderDetail(selected)}
      </div>
    </div>
  `;
}

export function selectBucket(key) {
  const threads = THREADS.filter(t => t.bucket === key);
  if (threads.length) {
    save('selectedThread', threads[0].id);
  }
  render();
}

export function threadAction(id, action) {
  const thread = THREADS.find(t => t.id === id);
  if (!thread) return;
  const actions = {
    approve: () => { toast('✅ Da gui: ' + thread.subject); thread.state = 'sent'; thread.draft = ''; },
    edit: () => toast('✏️ Mo modal chinh sua draft... (simulated)'),
    snooze: () => { toast('😴 Da snooze ' + thread.subject + ' den ngay mai'); },
    dismiss: () => { toast('❌ Da bo qua ' + thread.subject); thread.bucket = 'deprioritized'; thread.state = 'deprioritized'; },
    close: () => { toast('🔒 Da dong ' + thread.subject); thread.bucket = 'deprioritized'; thread.state = 'closed'; }
  };
  (actions[action] || (() => {}))();
  render();
}