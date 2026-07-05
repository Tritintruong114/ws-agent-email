import { state, save, persist, navigate, toast } from '../state.js';

export function render() {
  const el = document.getElementById('page-s1');
  if (!state.onboarding.connected) {
    el.innerHTML = `
      <div class="card" style="max-width:560px;margin:40px auto;text-align:center">
        <div style="font-size:48px;margin-bottom:16px">📨</div>
        <h1 style="font-size:var(--cw-fs-h1);font-weight:650;margin-bottom:8px">Ket noi Gmail</h1>
        <p class="text-muted" style="font-size:var(--cw-fs-title);margin-bottom:24px">De em hieu anh va bat dau lam viec</p>
        <button class="btn btn-primary btn-lg w-full" id="btn-connect" style="justify-content:center">🔗 Ket noi Gmail</button>
        <div class="text-sm text-muted" style="margin-top:12px;background:var(--cw-card-2);padding:12px;border-radius:var(--cw-r-sm)">
          Doc email de tim thread can follow-up &middot; Hoc giong viet tu sent history<br>
          <strong>KHONG gui neu chua anh duyet</strong> &middot; KHONG train model chung
        </div>
      </div>`;
    document.getElementById('btn-connect').onclick = () => {
      save('onboarding', { ...state.onboarding, connected: true });
      render();
    };
  } else if (!state.onboarding.loadingComplete) {
    el.innerHTML = `
      <div class="card" style="max-width:560px;margin:40px auto;text-align:center">
        <div style="font-size:48px;margin-bottom:16px">🔍</div>
        <h2 style="font-size:var(--cw-fs-h2);margin-bottom:8px">Dang quet &amp; hoc giong...</h2>
        <div class="spinner" style="margin:16px auto"></div>
        <div class="text-sm text-muted">Da doc 186 email &middot; 15 thread dang cho phan hoi</div>
        <div style="margin-top:16px;height:6px;background:var(--cw-card-2);border-radius:3px;overflow:hidden">
          <div id="load-bar" style="height:100%;background:var(--cw-accent);border-radius:3px;width:0%;transition:width 0.3s"></div>
        </div>
      </div>`;
    let pct = 0;
    const bar = document.getElementById('load-bar');
    const iv = setInterval(() => {
      pct += Math.random() * 25 + 5;
      if (pct > 100) pct = 100;
      if (bar) bar.style.width = pct + '%';
      if (pct >= 100) {
        clearInterval(iv);
        save('onboarding', { ...state.onboarding, loadingComplete: true });
        render();
      }
    }, 400);
  } else if (!state.onboarding.confirmed) {
    el.innerHTML = `
      <div class="card" style="max-width:560px;margin:40px auto;text-align:center">
        <div style="font-size:48px;margin-bottom:16px">🎯</div>
        <h2 style="font-size:var(--cw-fs-h2);margin-bottom:12px">Em da hieu so bo ve anh</h2>
        <div style="text-align:left;background:var(--cw-card-2);padding:16px;border-radius:var(--cw-r-md);margin-bottom:20px">
          <div class="flex items-center gap-2 mb-2" style="margin-bottom:8px"><span>💼</span> <strong>Viec chinh:</strong> Tu van B2B</div>
          <div class="flex items-center gap-2 mb-2" style="margin-bottom:8px"><span>👥</span> <strong>Khach:</strong> Startup goi von + Agency nho</div>
          <div class="flex items-center gap-2 mb-2" style="margin-bottom:8px"><span>🗣️</span> <strong>Giong:</strong> Trang trong, co so lieu</div>
          <div class="flex items-center gap-2"><span>⏰</span> <strong>Gio lam:</strong> Sang - 22h, reply toi muon</div>
        </div>
        <div class="flex gap-3" style="justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" id="btn-start">✅ Giu vay, Bat dau</button>
          <button class="btn btn-outline" id="btn-edit">✏️ Chinh giong</button>
          <button class="btn btn-ghost" id="btn-rescan">🔄 Quet lai</button>
        </div>
      </div>`;
    document.getElementById('btn-start').onclick = () => {
      persist('onboarding', { ...state.onboarding, confirmed: true });
      navigate('s4');
      window.App.renderCurrent();
      toast('🎉 Da san sang! Agent Workforce bat dau lam viec.');
    };
    document.getElementById('btn-edit').onclick = () => toast('Mo modal chinh giong... (simulated)');
    document.getElementById('btn-rescan').onclick = () => {
      save('onboarding', { ...state.onboarding, loadingComplete: false });
      render();
    };
  }
}

export function onMount() { render(); }