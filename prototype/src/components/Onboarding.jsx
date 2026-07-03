import { COPY } from '../copy.js';
import { RISK_PROFILE, SAMPLE_THREADS } from '../fixtures.js';
import { Button, Card, Pill } from './bits.jsx';

function Stepper({ step }) {
  const steps = [
    ['connect', 'Kết nối Gmail'],
    ['scan', 'Quét + học giọng'],
    ['profile', 'Risk Draft'],
    ['done', 'Queue'],
  ];
  const activeIndex = Math.max(0, steps.findIndex(([id]) => id === step));
  return <div className="stepper">
    {steps.map(([id, label], i) => <div key={id} className={`step ${i <= activeIndex ? 'active' : ''}`}><i>{i + 1}</i><span>{label}</span></div>)}
  </div>;
}

function startScan(setState) {
  setState(s => ({ ...s, oauthError: false, connected: true, onboardingStep: 'scan', loading: true, scanProgress: 18, scanLabel: 'Đã kết nối Gmail' }));
  setTimeout(() => setState(s => ({ ...s, scanProgress: 45, scanLabel: 'Đang phân loại 30–90 ngày gần nhất' })), 260);
  setTimeout(() => setState(s => ({ ...s, scanProgress: 68, scanLabel: 'Đang học giọng viết từ mail đã gửi' })), 560);
  setTimeout(() => setState(s => ({ ...s, scanProgress: 82, scanLabel: 'Đang tìm pattern rủi ro: money / commitment / meeting / people' })), 820);
  setTimeout(() => setState(s => ({ ...s, loading: false, scanned: true, scanProgress: 100, scanLabel: 'Đã dựng xong Risk Profile Draft', onboardingStep: 'profile', memorySuggestion: true, threads: SAMPLE_THREADS, selectedId: 'awaiting-proposal' })), 1150);
}

export default function Onboarding({ state, setState, openEvidence, goQueue }) {
  const step = state.onboardingStep;

  function showError() {
    setState(s => ({ ...s, oauthError: true, onboardingStep: 'connect', connected: false, loading: false }));
  }

  function confirmProfile() {
    setState(s => ({ ...s, profileConfirmed: true, onboardingStep: 'done' }));
    goQueue();
  }

  return <div className="onboarding">
    <Card className="onboarding-head">
      <div className="between"><div><Pill tone="info">S1 · Kết nối & Consent</Pill><h2>Bật agent bằng cách nối Gmail và thấy rõ nó đụng/không đụng gì vào dữ liệu.</h2></div><Pill tone="ok">draft + approve · không tự gửi</Pill></div>
      <Stepper step={step} />
    </Card>

    {step === 'connect' && !state.oauthError && <div className="s1-connect mockup-first">
      <Card className="s1-main">
        <Pill tone="info">draft + approve · không tự gửi</Pill>
        <h1 className="hero-title">Kết nối Gmail để agent tìm phần trách nhiệm còn lại trong inbox.</h1>
        <p>{COPY.onboarding.connectBody}</p>
        <div className="actions cta-row">
          <Button variant="primary" onClick={() => startScan(setState)}>Kết nối Gmail</Button>
          <Button onClick={showError}>Mô phỏng thiếu quyền</Button>
        </div>
        <div className="note">Retention 90 ngày · purge khi disconnect · thu hồi quyền bất kỳ lúc nào.</div>
      </Card>

      <Card>
        <h3>Quyền truy cập</h3>
        <div className="scopeList">
          <div className="scopeItem"><b>✓</b><div><strong>Đọc thread</strong><span>Phân loại awaiting / replied / bounced / safe wait.</span></div></div>
          <div className="scopeItem"><b>✓</b><div><strong>Soạn draft</strong><span>Tạo bản nháp follow-up để anh duyệt.</span></div></div>
          <div className="scopeItem"><b>✕</b><div><strong>Không auto-send</strong><span>Gửi mail luôn cần anh bấm duyệt.</span></div></div>
        </div>
      </Card>

      <Card className="s1-policy">
        <h3>Cách dùng dữ liệu</h3>
        <div className="scopeList">
          <div className="scopeItem"><b>✓</b><div><strong>Đọc email để làm nhiệm vụ</strong><span>Không giấu việc này: agent cần đọc thread để tìm phần trách nhiệm còn lại.</span></div></div>
          <div className="scopeItem"><b>✕</b><div><strong>Không train/fine-tune model dùng chung</strong><span>Email của anh không dùng để train bất kỳ model chung nào.</span></div></div>
          <div className="scopeItem"><b>✓</b><div><strong>Thu hồi & xoá theo yêu cầu</strong><span>Lưu tối đa 90 ngày · xóa khi ngắt kết nối.</span></div></div>
        </div>
      </Card>
    </div>}

    {step === 'connect' && state.oauthError && <div className="modalbox in-flow"><div className="mh">Không đủ quyền Gmail <span>⚠️</span></div><div className="mb"><p>Agent chưa thể đọc thread để phân loại trách nhiệm hôm nay.</p><div className="locked">Cần quyền đọc thread và tạo draft. Không yêu cầu quyền auto-send.</div></div><div className="mf"><Button onClick={() => setState(s => ({ ...s, oauthError: false }))}>Để sau</Button><Button variant="primary" onClick={() => startScan(setState)}>Thử lại</Button></div></div>}

    {step === 'scan' && <Card className="scan-card">
      <h2>{COPY.onboarding.scanTitle}</h2>
      <div className="progress"><i style={{ width: `${state.scanProgress}%` }} /></div>
      <div className="step-row"><span className="mk">✓</span><span className="lb">Đã kết nối Gmail</span><Pill tone="ok">xong</Pill></div>
      <div className="step-row"><span className="mk">◌</span><span className="lb">Đang phân loại 30–90 ngày gần nhất</span><Pill tone="info">đang chạy</Pill></div>
      <div className="step-row"><span className="mk">◌</span><span className="lb">Đang tìm pattern rủi ro: money / commitment / meeting / people</span><Pill tone="warn">B mặc định</Pill></div>
      <div className="locked">Bằng chứng mặc định sẽ là pattern + subject được mask nhẹ (mức B). Full thread (mức C) chỉ mở khi anh bấm xem sâu.</div>
      <p className="note">{state.scanLabel}</p>
    </Card>}

    {step === 'profile' && <div className="profile-grid">
      <Card>
        <div className="between"><div><Pill tone="info">Risk Profile Draft · B mặc định</Pill><h2>Em sẽ ưu tiên inbox theo risk profile này</h2></div><Button onClick={openEvidence}>Xem bằng chứng sâu</Button></div>
        <div className="riskGrid">
          {RISK_PROFILE.map(r => <div className="riskBox" key={r.id}><b>{r.rank}. {r.title}</b><span>{r.summary}</span></div>)}
        </div>
        <div className="evidence"><b>Bằng chứng mặc định (mức B) — pattern + subject mask nhẹ</b><div className="mask">12 thread có pattern báo giá/payment · ví dụ: “Re: Proposal for *** project”, “Payment confirmation — *** invoice”</div><div className="mask">7 thread có commitment phrase · ví dụ: “I'll send by Friday — *** deck”, “Follow up on promised ***”</div></div>
        <h3>Đề xuất từ Operating Memory</h3>
        <div className="suggestion-grid">
          <div className="riskBox"><b>Ưu tiên ACME</b><span>Nâng priority_tier cho domain ACME.</span><div className="actions"><Button>Xác nhận</Button><Button>Bỏ qua</Button></div></div>
          <div className="riskBox"><b>Loại trừ digest@***</b><span>Hay bị dismiss → gợi ý ExcludeRule.</span><div className="actions"><Button>Xác nhận</Button><Button>Bỏ qua</Button></div></div>
          <div className="riskBox"><b>Hạ cap thread FYI</b><span>Hay soft-close → giảm số lần nhắc.</span><div className="actions"><Button>Xác nhận</Button><Button>Bỏ qua</Button></div></div>
        </div>
        <div className="actions"><Button variant="primary" onClick={confirmProfile}>Xác nhận profile</Button><Button>Sửa ưu tiên</Button><Button>Bỏ qua đề xuất</Button></div>
      </Card>
      <Card>
        <h3>Queue preview sau khi xác nhận</h3>
        <p>Agent sẽ không đưa raw inbox cho anh. Nó chỉ đưa các việc còn trách nhiệm người quyết định.</p>
        <div className="trace">✓ 80 email đã xử lý</div><div className="trace">✓ 5 quyết định cần anh</div><div className="trace">✓ 1 bounced mail đang chặn pipeline</div><div className="trace">✓ 1 draft follow-up sẵn để duyệt</div>
      </Card>
    </div>}
  </div>;
}
