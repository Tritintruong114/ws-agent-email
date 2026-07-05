import { state, navigate } from '../state.js';
import { ONBOARDING } from '../../data/mock.js';

export function render() {
  if (ONBOARDING.connected) {
    renderConnected();
    return;
  }
  document.getElementById('page-s1').innerHTML = `
    <div style="max-width:520px;margin:40px auto;text-align:center">
      <div style="width:64px;height:64px;background:var(--cw-card-2);border-radius:var(--cw-r-lg);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
      </div>
      <h1 style="font-size:var(--cw-fs-h1);margin-bottom:8px">Kết nối Gmail</h1>
      <p style="color:var(--cw-ink-2);margin-bottom:24px;font-size:var(--cw-fs-sm)">
        Agent sẽ quét lịch sử email và học giọng viết của bạn.
      </p>

      <button class="btn btn-primary btn-lg" onclick="App.navFilter('s1','connect')" style="width:100%;justify-content:center">
        Kết nối Gmail
      </button>

      <div style="margin-top:32px;text-align:left;background:var(--cw-card);border:1px solid var(--cw-border);border-radius:var(--cw-r-md);padding:16px">
        <div style="font-size:var(--cw-fs-label);text-transform:uppercase;letter-spacing:0.06em;color:var(--cw-ink-3);font-weight:600;margin-bottom:12px">Cam kết dữ liệu</div>
        <ul style="list-style:none;font-size:var(--cw-fs-sm);color:var(--cw-ink-2);line-height:1.8">
          <li>Đọc email để thực hiện nhiệm vụ</li>
          <li>Không tự động gửi — mọi draft cần bạn duyệt</li>
          <li>Dữ liệu giữ 90 ngày, xoá khi ngắt kết nối</li>
          <li>Không train model chung</li>
        </ul>
      </div>
    </div>
  `;
}

function renderConnected() {
  document.getElementById('page-s1').innerHTML = `
    <div style="max-width:520px;margin:40px auto;text-align:center">
      <div style="width:64px;height:64px;background:var(--cw-card-2);border-radius:var(--cw-r-lg);display:flex;align-items:center;justify-content:center;margin:0 auto 20px">
        <div class="spinner"></div>
      </div>
      <h1 style="font-size:var(--cw-fs-h1);margin-bottom:8px">Đang kết nối Gmail...</h1>
      <p style="color:var(--cw-ink-2);margin-bottom:24px;font-size:var(--cw-fs-sm)">
        Quét lịch sử và học giọng viết của bạn.
      </p>

      <div style="background:var(--cw-card);border:1px solid var(--cw-border);border-radius:var(--cw-r-md);padding:16px;text-align:left;margin-bottom:24px">
        <div style="font-size:var(--cw-fs-label);text-transform:uppercase;letter-spacing:0.06em;color:var(--cw-ink-3);font-weight:600;margin-bottom:8px">Đã phát hiện</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:var(--cw-fs-sm)">
          <span style="color:var(--cw-ink-2)">Hình thức kinh doanh</span>
          <span>${ONBOARDING.identitySummary.businessType}</span>
          <span style="color:var(--cw-ink-2)">Loại khách hàng</span>
          <span>${ONBOARDING.identitySummary.clientType}</span>
          <span style="color:var(--cw-ink-2)">Phong cách viết</span>
          <span>${ONBOARDING.identitySummary.writingStyle}</span>
          <span style="color:var(--cw-ink-2)">Giờ làm việc</span>
          <span>${ONBOARDING.identitySummary.workingHours}</span>
        </div>
      </div>

      <button class="btn btn-primary btn-lg" onclick="App.loadDone()" style="width:100%;justify-content:center">
        Vào Queue
      </button>
    </div>
  `;
}

export function onConnect() {
  ONBOARDING.connected = true;
  render();
}

export function onLoadDone() {
  navigate('s2');
}