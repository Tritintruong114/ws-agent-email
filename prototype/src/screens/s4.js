import { navigate } from '../state.js';
import { DASHBOARD } from '../../data/mock.js';

export function render() {
  const d = DASHBOARD;
  document.getElementById('page-s4').innerHTML = `
    <div class="flex items-center justify-between mb-4">
      <h2 style="font-size:var(--cw-fs-h2);font-weight:650">Tong quan</h2>
      <div class="flex gap-2">
        <span class="badge badge-gray" onclick="App.navFilter('s4','hom_nay')" style="cursor:pointer">Hom nay</span>
        <span class="badge badge-gray" onclick="App.navFilter('s4','tuan_nay')" style="cursor:pointer;background:var(--cw-accent-soft);color:var(--cw-ink)">Tuan nay</span>
        <span class="badge badge-gray" onclick="App.navFilter('s4','thang')" style="cursor:pointer">Thang</span>
      </div>
    </div>
    <div class="flex gap-3 mb-4 flex-wrap">
      <div class="card" style="flex:1;min-width:130px"><div class="text-label">Da quet</div><div class="font-semibold" style="font-size:24px">${d.scanned}</div></div>
      <div class="card" style="flex:1;min-width:130px;border-left:3px solid var(--cw-teal)" onclick="App.nav('s2')"><div class="text-label" style="cursor:pointer">Theo doi</div><div class="font-semibold" style="font-size:24px;cursor:pointer">${d.monitored}</div></div>
      <div class="card" style="flex:1;min-width:130px;border-left:3px solid var(--cw-green)"><div class="text-label">Da xu ly</div><div class="font-semibold" style="font-size:24px">${d.resolved}</div></div>
      <div class="card" style="flex:1;min-width:130px"><div class="text-label">Ti le duyet</div><div class="font-semibold" style="font-size:24px">${d.approvalRate}</div></div>
      <div class="card" style="flex:1;min-width:130px"><div class="text-label">Phan hoi TB</div><div class="font-semibold" style="font-size:24px">${d.avgResponse}</div></div>
    </div>
    <div class="flex gap-3 flex-wrap">
      <div class="card" style="flex:2;min-width:280px">
        <div class="text-label mb-3">Xu huong xu ly (7 ngay)</div>
        <div style="display:flex;gap:4px;align-items:end;height:80px;padding:0 4px">
          ${d.trend.map(h => `<div style="flex:1;background:var(--cw-accent-soft);border-radius:6px 6px 0 0;height:${h * 10}px"></div>`).join('')}
        </div>
        <div style="display:flex;gap:4px;margin-top:4px">
          ${['T2','T3','T4','T5','T6','T7','CN'].map(d => `<span style="flex:1;text-align:center;font-size:10px;color:var(--cw-ink-3)">${d}</span>`).join('')}
        </div>
      </div>
      <div class="card" style="flex:1;min-width:220px">
        <div class="text-label mb-3">Can chu y</div>
        ${d.alerts.map(a => `
          <div class="flex items-center gap-2 text-sm" style="margin-bottom:8px;color:${a.severity === 'high' ? '#dc2626' : '#ca8a04'}">
            <span>${a.severity === 'high' ? '🚨' : '💰'}</span> ${a.text}
          </div>
        `).join('')}
      </div>
    </div>
    <div class="text-center mt-4">
      <button class="btn btn-outline" onclick="App.nav('s2')">Xem Queue &rarr;</button>
      <button class="btn btn-ghost" onclick="App.nav('s6')">Xem Activity Log &rarr;</button>
    </div>
  `;
}