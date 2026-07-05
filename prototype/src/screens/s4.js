import { DASHBOARD } from '../../data/mock.js';

export function render() {
  const d = DASHBOARD;
  const alertColors = { high: '#dc2626', medium: '#ea580c', low: '#ca8a04' };

  document.getElementById('page-s4').innerHTML = `
    <div class="flex items-center justify-between mb-4">
      <h2 style="font-size:var(--cw-fs-h2);font-weight:650">Tổng quan</h2>
      <span style="font-size:var(--cw-fs-meta);color:var(--cw-ink-3)">Đã cập nhật hôm nay 10:30</span>
    </div>

    <!-- Metric cards -->
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:var(--cw-sp-3);margin-bottom:24px">
      ${[
        { label: 'Email đã quét', value: d.scanned, detail: 'Hôm nay' },
        { label: 'Đang theo dõi', value: d.monitored, detail: 'Cần xử lý' },
        { label: 'Đã xử lý', value: d.resolved, detail: 'Tuần này' },
        { label: 'Tỉ lệ duyệt', value: d.approvalRate, detail: 'Draft' },
        { label: 'Phản hồi TB', value: d.avgResponse, detail: 'Thời gian' }
      ].map(c => `
        <div class="card" style="text-align:center">
          <div style="font-size:var(--cw-fs-sm);color:var(--cw-ink-2);margin-bottom:4px">${c.label}</div>
          <div style="font-size:28px;font-weight:650">${c.value}</div>
          <div style="font-size:var(--cw-fs-micro);color:var(--cw-ink-3)">${c.detail}</div>
        </div>
      `).join('')}
    </div>

    <div style="display:grid;grid-template-columns:2fr 1fr;gap:var(--cw-sp-4)">
      <!-- Chart -->
      <div class="card">
        <div class="font-semibold text-sm mb-3">Xu hướng 7 ngày</div>
        <div style="display:flex;align-items:end;gap:8px;height:120px">
          ${d.trend.map((v, i) => `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
              <span style="font-size:var(--cw-fs-micro);color:var(--cw-ink-3)">${v}</span>
              <div style="width:100%;background:var(--cw-accent-soft);border-radius:4px 4px 0 0;height:${Math.max(v * 14, 8)}px;transition:var(--cw-dur) var(--cw-ease)"></div>
              <span style="font-size:var(--cw-fs-micro);color:var(--cw-ink-3)">${['T2','T3','T4','T5','T6','T7','CN'][i]}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Alerts -->
      <div class="card">
        <div class="font-semibold text-sm mb-3">Cảnh báo</div>
        ${d.alerts.map(a => `
          <div style="display:flex;align-items:start;gap:8px;margin-bottom:10px;font-size:var(--cw-fs-sm)">
            <span style="width:8px;height:8px;border-radius:50%;background:${alertColors[a.severity] || '#6b6469'};margin-top:5px;flex-shrink:0"></span>
            <span>${a.text}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
