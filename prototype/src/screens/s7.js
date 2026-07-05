import { state, save, toast, persist } from '../state.js';
import { SETTINGS } from '../../data/mock.js';

const TABS = ['Cadence', 'Exclude', 'Thong bao', 'Rieng tu'];

export function render() {
  if (!state.settingsTab) save('settingsTab', 0);
  if (!state.settings) save('settings', SETTINGS);
  const tab = state.settingsTab || 0;
  const s = state.settings || SETTINGS;
  
  document.getElementById('page-s7').innerHTML = `
    <h2 style="font-size:var(--cw-fs-h2);font-weight:650;margin-bottom:4px">Cai dat</h2>
    <div class="tabs">
      ${TABS.map((t,i) => `<span class="tab ${i === tab ? 'active' : ''}" onclick="App.settingsTab(${i})">${t}</span>`).join('')}
    </div>
    ${tab === 0 ? renderCadence(s) : tab === 1 ? renderExclude(s) : tab === 2 ? renderNotif(s) : renderPrivacy()}
  `;
}

function renderCadence(s) {
  const c = s.cadence;
  return `
    <div class="card">
      <div class="mb-3">
        <div class="flex items-center justify-between mb-1">
          <div><span class="font-semibold text-sm">Nguong ngay</span><br><span class="text-meta text-muted">Bao nhieu ngay khong reply thi bat dau de y</span></div>
          <span class="text-sm">${c.thresholdDays} ngay</span>
        </div>
        <input type="range" min="1" max="14" value="${c.thresholdDays}" oninput="App.updateCadence('thresholdDays',this.value)" style="width:100%" />
      </div>
      <div class="mb-3">
        <div class="flex items-center justify-between mb-1">
          <div><span class="font-semibold text-sm">Cap moi thread</span><br><span class="text-meta text-muted">Toi da follow-up cho 1 thread</span></div>
          <span class="text-sm">${c.capPerThread} lan</span>
        </div>
        <input type="range" min="1" max="10" value="${c.capPerThread}" oninput="App.updateCadence('capPerThread',this.value)" style="width:100%" />
      </div>
      <div class="mb-3">
        <div class="flex items-center justify-between mb-1">
          <div><span class="font-semibold text-sm">Cap VIP</span><br><span class="text-meta text-muted">Rieng cho contact VIP</span></div>
          <span class="text-sm">${c.capVIP} lan</span>
        </div>
        <input type="range" min="1" max="10" value="${c.capVIP}" oninput="App.updateCadence('capVIP',this.value)" style="width:100%" />
      </div>
      <div class="flex items-center justify-between mb-3">
        <div><span class="font-semibold text-sm">Gio lam viec</span></div>
        <span class="text-sm">${c.workStart} - ${c.workEnd}</span>
      </div>
      <div class="flex items-center justify-between">
        <div><span class="font-semibold text-sm">Ngay lam viec</span></div>
        <span class="text-sm">${c.workDays}</span>
      </div>
    </div>
  `;
}

function renderExclude(s) {
  const e = s.exclude;
  return `
    <div class="card">
      <div class="text-label mb-2">Excluded contacts</div>
      ${e.contacts.map(c => `
        <div class="flex items-center justify-between text-sm" style="margin-bottom:8px">
          <span>${c.email}</span>
          <span class="text-muted text-meta">${c.note}</span>
          <span style="cursor:pointer;color:#dc2626" onclick="App.removeExclude('contact','${c.id}')">✕</span>
        </div>
      `).join('')}
      <div class="text-label mb-2 mt-3">Excluded domains</div>
      ${e.domains.map(d => `
        <div class="flex items-center justify-between text-sm" style="margin-bottom:8px">
          <span>${d.domain}</span>
          <span style="cursor:pointer;color:#dc2626" onclick="App.removeExclude('domain','${d.id}')">✕</span>
        </div>
      `).join('')}
      <button class="btn btn-outline btn-sm mt-3" onclick="toast('Them contact (simulated)')">+ Them contact</button>
    </div>
  `;
}

function renderNotif(s) {
  const n = s.notifications;
  return `
    <div class="card">
      ${[
        { key: 'digestMorning', label: 'Digest sang (07:00)' },
        { key: 'digestAfternoon', label: 'Digest chieu' },
        { key: 'alertBounce', label: 'Alert NDR / bounced (real-time)' },
        { key: 'alertNewDetection', label: 'Alert phat hien moi' },
        { key: 'pushDesktop', label: 'Push desktop' }
      ].map(item => `
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm ${!n[item.key] ? 'text-muted' : ''}">${item.label}</span>
          <div class="toggle ${n[item.key] ? 'on' : 'off'}" onclick="App.toggleNotif('${item.key}')">
            <span class="toggle-knob"></span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderPrivacy() {
  return `
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <div><span class="font-semibold text-sm">🗑️ Xoa giong da hoc</span><br><span class="text-meta text-muted">Draft se ve mac dinh</span></div>
        <button class="btn btn-outline btn-sm" style="color:#dc2626;border-color:#dc2626" onclick="toast('Da xoa giong da hoc (simulated)')">Xoa</button>
      </div>
      <div class="flex items-center justify-between mb-4">
        <div><span class="font-semibold text-sm">🗑️ Xoa lich su corrections</span><br><span class="text-meta text-muted">Mat pattern da sua</span></div>
        <button class="btn btn-outline btn-sm" style="color:#dc2626;border-color:#dc2626" onclick="toast('Da xoa corrections (simulated)')">Xoa</button>
      </div>
      <div class="flex items-center justify-between mb-4">
        <div><span class="font-semibold text-sm">📥 Export du lieu</span><br><span class="text-meta text-muted">Download JSON gom threads, memory, settings</span></div>
        <button class="btn btn-outline btn-sm" onclick="toast('📥 Export du lieu (simulated)')">Export</button>
      </div>
      <div class="flex items-center justify-between" style="border-top:1px solid var(--cw-border);padding-top:16px">
        <div><span class="font-semibold text-sm" style="color:#dc2626">⛔ Xoa toan bo &amp; Ngat ket noi</span><br><span class="text-meta text-muted">Khong the undo. Phai ket noi lai tu dau.</span></div>
        <button class="btn btn-sm" style="background:#dc2626;color:#fff" onclick="window.App.resetAll()">Xoa toan bo</button>
      </div>
    </div>
  `;
}

export function setTab(idx) {
  save('settingsTab', idx);
  render();
}

export function updateCadence(key, val) {
  const s = state.settings;
  s.cadence[key] = parseInt(val);
  persist('settings', s);
  render();
}

export function toggleNotif(key) {
  const s = state.settings;
  s.notifications[key] = !s.notifications[key];
  persist('settings', s);
  render();
}

export function removeExclude(type, id) {
  const s = state.settings;
  const arr = type === 'contact' ? s.exclude.contacts : s.exclude.domains;
  s.exclude[type === 'contact' ? 'contacts' : 'domains'] = arr.filter(x => x.id !== id);
  persist('settings', s);
  render();
  toast('✅ Da xoa');
}