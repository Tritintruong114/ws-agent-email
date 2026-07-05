import { state, save, toast } from '../state.js';
import { SETTINGS } from '../../data/mock.js';

const TABS = ['Cadence', 'Exclude', 'Thông báo', 'Riêng tư'];

export function render() {
  if (!state.settingsTab) save('settingsTab', 0);
  if (!state.settings) save('settings', SETTINGS);
  const tab = state.settingsTab || 0;
  const s = state.settings || SETTINGS;
  
  document.getElementById('page-s7').innerHTML = `
    <h2 style="font-size:var(--cw-fs-h2);font-weight:650;margin-bottom:4px">Cài đặt</h2>
    <p style="font-size:var(--cw-fs-sm);color:var(--cw-ink-2);margin-bottom:16px">
      Điều chỉnh cách agent theo dõi và xử lý email
    </p>
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
      <div class="mb-4">
        <div class="flex items-center justify-between mb-1">
          <div>
            <div class="font-semibold text-sm">Ngưỡng ngày</div>
            <div style="font-size:var(--cw-fs-meta);color:var(--cw-ink-2)">Bao nhiêu ngày không reply thì bắt đầu để ý</div>
          </div>
          <span style="font-size:var(--cw-fs-sm);font-weight:600">${c.thresholdDays} ngày</span>
        </div>
        <input type="range" min="1" max="14" value="${c.thresholdDays}" oninput="App.updateCadence('thresholdDays',this.value)" style="width:100%" />
      </div>
      <div class="mb-4">
        <div class="flex items-center justify-between mb-1">
          <div>
            <div class="font-semibold text-sm">Giới hạn mỗi thread</div>
            <div style="font-size:var(--cw-fs-meta);color:var(--cw-ink-2)">Tối đa follow-up cho 1 thread</div>
          </div>
          <span style="font-size:var(--cw-fs-sm);font-weight:600">${c.capPerThread} lần</span>
        </div>
        <input type="range" min="1" max="10" value="${c.capPerThread}" oninput="App.updateCadence('capPerThread',this.value)" style="width:100%" />
      </div>
      <div class="mb-4">
        <div class="flex items-center justify-between mb-1">
          <div>
            <div class="font-semibold text-sm">Giới hạn VIP</div>
            <div style="font-size:var(--cw-fs-meta);color:var(--cw-ink-2)">Riêng cho contact VIP</div>
          </div>
          <span style="font-size:var(--cw-fs-sm);font-weight:600">${c.capVIP} lần</span>
        </div>
        <input type="range" min="1" max="10" value="${c.capVIP}" oninput="App.updateCadence('capVIP',this.value)" style="width:100%" />
      </div>
      <div class="flex items-center justify-between mb-3">
        <div class="font-semibold text-sm">Giờ làm việc</div>
        <span style="font-size:var(--cw-fs-sm)">${c.workStart} - ${c.workEnd}</span>
      </div>
      <div class="flex items-center justify-between">
        <div class="font-semibold text-sm">Ngày làm việc</div>
        <span style="font-size:var(--cw-fs-sm)">${c.workDays}</span>
      </div>
    </div>
  `;
}

function renderExclude(s) {
  const e = s.exclude;
  return `
    <div class="card">
      <div class="text-label mb-2">Danh sách loại trừ</div>
      <div class="font-semibold text-sm mb-2">Contacts</div>
      ${e.contacts.map(c => `
        <div class="flex items-center justify-between text-sm" style="margin-bottom:8px;padding:6px 0;border-bottom:1px solid var(--cw-border)">
          <span>${c.email}</span>
          <span style="font-size:var(--cw-fs-meta);color:var(--cw-ink-2)">${c.note}</span>
          <span style="cursor:pointer;color:#dc2626;font-size:var(--cw-fs-sm)" onclick="App.removeExclude('contact','${c.id}')">Xoá</span>
        </div>
      `).join('')}
      <div class="font-semibold text-sm mb-2 mt-3">Domains</div>
      ${e.domains.map(d => `
        <div class="flex items-center justify-between text-sm" style="margin-bottom:8px;padding:6px 0;border-bottom:1px solid var(--cw-border)">
          <span>${d.domain}</span>
          <span style="cursor:pointer;color:#dc2626;font-size:var(--cw-fs-sm)" onclick="App.removeExclude('domain','${d.id}')">Xoá</span>
        </div>
      `).join('')}
      <button class="btn btn-outline btn-sm mt-3" onclick="toast('Thêm contact (simulated)')">+ Thêm contact</button>
    </div>
  `;
}

function renderNotif(s) {
  const n = s.notifications;
  return `
    <div class="card">
      ${[
        { key: 'digestMorning', label: 'Digest sáng (07:00)' },
        { key: 'digestAfternoon', label: 'Digest chiều' },
        { key: 'alertBounce', label: 'Alert NDR / bounced (real-time)' },
        { key: 'alertNewDetection', label: 'Alert phát hiện mới' },
        { key: 'pushDesktop', label: 'Push desktop' }
      ].map(item => `
        <div class="flex items-center justify-between mb-3" style="padding:6px 0;border-bottom:1px solid var(--cw-border)">
          <span style="font-size:var(--cw-fs-sm);${!n[item.key] ? 'color:var(--cw-ink-2)' : ''}">${item.label}</span>
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
      <div class="flex items-center justify-between mb-4" style="padding:8px 0;border-bottom:1px solid var(--cw-border)">
        <div>
          <div class="font-semibold text-sm">Xoá giọng đã học</div>
          <div style="font-size:var(--cw-fs-meta);color:var(--cw-ink-2)">Draft sẽ về mặc định</div>
        </div>
        <button class="btn btn-outline btn-sm" style="color:#dc2626;border-color:#dc2626" onclick="toast('Đã xoá giọng đã học (simulated)')">Xoá</button>
      </div>
      <div class="flex items-center justify-between mb-4" style="padding:8px 0;border-bottom:1px solid var(--cw-border)">
        <div>
          <div class="font-semibold text-sm">Xoá lịch sử corrections</div>
          <div style="font-size:var(--cw-fs-meta);color:var(--cw-ink-2)">Mất pattern đã sửa</div>
        </div>
        <button class="btn btn-outline btn-sm" style="color:#dc2626;border-color:#dc2626" onclick="toast('Đã xoá corrections (simulated)')">Xoá</button>
      </div>
      <div class="flex items-center justify-between mb-4" style="padding:8px 0;border-bottom:1px solid var(--cw-border)">
        <div>
          <div class="font-semibold text-sm">Xuất dữ liệu</div>
          <div style="font-size:var(--cw-fs-meta);color:var(--cw-ink-2)">Download JSON: threads, memory, settings</div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="toast('Xuất dữ liệu (simulated)')">Export</button>
      </div>
      <div class="flex items-center justify-between" style="padding:12px 0 0;border-top:1px solid var(--cw-border)">
        <div>
          <div class="font-semibold text-sm" style="color:#dc2626">Xoá toàn bộ & ngắt kết nối</div>
          <div style="font-size:var(--cw-fs-meta);color:var(--cw-ink-2)">Không thể undo. Phải kết nối lại từ đầu.</div>
        </div>
        <button class="btn btn-sm" style="background:#dc2626;color:#fff" onclick="window.App.resetAll()">Xoá toàn bộ</button>
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
  save('settings', s);
  render();
}

export function toggleNotif(key) {
  const s = state.settings;
  s.notifications[key] = !s.notifications[key];
  save('settings', s);
  render();
}

export function removeExclude(type, id) {
  const s = state.settings;
  const arr = type === 'contact' ? s.exclude.contacts : s.exclude.domains;
  s.exclude[type === 'contact' ? 'contacts' : 'domains'] = arr.filter(x => x.id !== id);
  save('settings', s);
  render();
  toast('Đã xoá');
}
