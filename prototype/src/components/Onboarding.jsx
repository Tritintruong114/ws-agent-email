import { COPY } from '../copy.js';
import { RISK_OPTIONS, RISK_PROFILE, SAMPLE_THREADS } from '../fixtures.js';
import { Button, Card, Pill } from './bits.jsx';

function Stepper({ step }) {
  const steps = [
    ['intent', '1 câu hỏi'],
    ['connect', 'Kết nối'],
    ['scan', 'Scan'],
    ['profile', 'Risk Draft'],
  ];
  const activeIndex = steps.findIndex(([id]) => id === step);
  return <div className="stepper">
    {steps.map(([id, label], i) => <div key={id} className={`step ${i <= activeIndex ? 'active' : ''}`}><i>{i + 1}</i><span>{label}</span></div>)}
  </div>;
}

export default function Onboarding({ state, setState, openEvidence, goQueue }) {
  const step = state.onboardingStep;

  function toggleRisk(id) {
    setState(s => {
      const has = s.selectedRisks.includes(id);
      const next = has ? s.selectedRisks.filter(x => x !== id) : [...s.selectedRisks, id].slice(0, 3);
      return { ...s, selectedRisks: next.length ? next : s.selectedRisks };
    });
  }

  function connect() {
    setState(s => ({ ...s, connected: true, onboardingStep: 'scan', loading: true, scanProgress: 16, scanLabel: 'Đang xin quyền đọc thread...' }));
    setTimeout(() => setState(s => ({ ...s, scanProgress: 42, scanLabel: 'Đang nhận diện money / quote / payment...' })), 250);
    setTimeout(() => setState(s => ({ ...s, scanProgress: 71, scanLabel: 'Đang tìm commitment, meeting, bounced mail...' })), 520);
    setTimeout(() => setState(s => ({ ...s, loading: false, scanned: true, scanProgress: 100, scanLabel: 'Đã quét 90 ngày gần nhất', onboardingStep: 'profile', memorySuggestion: true, threads: SAMPLE_THREADS, selectedId: 'awaiting-proposal' })), 850);
  }

  function confirmProfile() {
    setState(s => ({ ...s, profileConfirmed: true, onboardingStep: 'done' }));
    goQueue();
  }

  return <div className="onboarding">
    <Card className="onboarding-head">
      <div className="between"><div><Pill tone="info">Onboarding intelligence</Pill><h2>Không setup dài. Agent hỏi ít, đọc lịch sử, rồi đưa Risk Profile Draft để anh sửa.</h2></div><Pill tone="ok">1–3 câu max</Pill></div>
      <Stepper step={step === 'done' ? 'profile' : step} />
    </Card>

    {step === 'intent' && <div className="connect-grid">
      <Card>
        <Pill tone="info">Câu hỏi duy nhất</Pill>
        <h2>{COPY.onboarding.intentTitle}</h2>
        <p>{COPY.onboarding.intentBody}</p>
        <div className="risk-options">
          {RISK_OPTIONS.map(opt => <button key={opt.id} className={`risk-option ${state.selectedRisks.includes(opt.id) ? 'selected' : ''}`} onClick={() => toggleRisk(opt.id)}>
            <b>{opt.label}</b><span>{opt.hint}</span>
          </button>)}
        </div>
        <div className="actions"><Button variant="primary" onClick={() => setState(s => ({ ...s, onboardingStep: 'connect' }))}>{COPY.actions.continue}</Button></div>
      </Card>
      <Card>
        <h3>Vì sao chỉ hỏi ít?</h3>
        <div className="scope"><b>✓</b><div><strong>Giữ agent magic</strong><span>Không bắt user khai form dài.</span></div></div>
        <div className="scope"><b>✓</b><div><strong>Email calibration</strong><span>Pattern thật đến từ lịch sử 30–90 ngày.</span></div></div>
        <div className="scope"><b>✓</b><div><strong>Confirm sau scan</strong><span>User sửa Risk Profile Draft thay vì tự cấu hình từ đầu.</span></div></div>
      </Card>
    </div>}

    {step === 'connect' && <div className="connect-grid">
      <Card className="hero">
        <Pill tone="ok">draft + approve · không tự gửi</Pill>
        <h2>{COPY.onboarding.connectTitle}</h2>
        <p>{COPY.onboarding.connectBody}</p>
        <div className="actions"><Button variant="primary" onClick={connect}>{COPY.actions.connect}</Button><Button onClick={() => setState(s => ({ ...s, onboardingStep: 'intent' }))}>Đổi rủi ro</Button></div>
        <p className="note">{COPY.trust.retention}</p>
      </Card>
      <Card>
        <h3>Quyền truy cập</h3>
        <div className="scope"><b>✓</b><div><strong>Đọc thread</strong><span>Phân loại awaiting / replied / bounced / safe wait.</span></div></div>
        <div className="scope"><b>✓</b><div><strong>Tạo draft</strong><span>Chuẩn bị follow-up để anh duyệt.</span></div></div>
        <div className="scope"><b>✕</b><div><strong>Không auto-send</strong><span>{COPY.trust.noAutoSend}</span></div></div>
        <div className="scope"><b>✕</b><div><strong>Không shared training</strong><span>{COPY.trust.noSharedTraining}</span></div></div>
      </Card>
    </div>}

    {step === 'scan' && <div className="connect-grid">
      <Card className="hero">
        <Pill tone="info">Scanning 30–90 days</Pill>
        <h2>{COPY.onboarding.scanTitle}</h2>
        <p>{COPY.onboarding.scanBody}</p>
        <div className="progress"><i style={{ width: `${state.scanProgress}%` }} /></div>
        <p className="note">{state.scanLabel}</p>
      </Card>
      <Card>
        <h3>Agent đang tìm gì?</h3>
        {['Email nào có tiền trong đó', 'Tiền đang kẹt ở bước nào', 'Hôm nay cần làm gì để tiền chạy tiếp', 'Khi nào không nên hành động'].map(x => <div className="trace" key={x}>✓ {x}</div>)}
      </Card>
    </div>}

    {step === 'profile' && <div className="profile-grid">
      <Card>
        <div className="between"><div><Pill tone="info">Risk Profile Draft</Pill><h2>{COPY.onboarding.profileTitle}</h2></div><Button onClick={openEvidence}>{COPY.actions.deepEvidence}</Button></div>
        <p>{COPY.onboarding.profileBody}</p>
        <div className="profile-list">
          {RISK_PROFILE.map(r => <div className={`profile-item ${r.tone}`} key={r.id}>
            <div className="rank">{r.rank}</div>
            <div><div className="between"><h3>{r.title}</h3><Pill tone={r.tone}>priority {r.rank}</Pill></div><p>{r.summary}</p><ul>{r.evidence.slice(0,2).map(e => <li key={e}>{e}</li>)}</ul></div>
          </div>)}
        </div>
        <div className="actions"><Button variant="primary" onClick={confirmProfile}>{COPY.actions.confirmProfile}</Button><Button>{COPY.actions.adjustProfile}</Button><Button>{COPY.actions.ignoreType}</Button></div>
        <p className="note">{COPY.trust.evidenceB}</p>
      </Card>
      <Card>
        <h3>Queue preview sau khi xác nhận</h3>
        <p>Agent sẽ không đưa raw inbox cho anh. Nó chỉ đưa các việc còn trách nhiệm người quyết định.</p>
        <div className="trace">✓ 80 email đã xử lý</div>
        <div className="trace">✓ 5 quyết định cần anh</div>
        <div className="trace">✓ 1 bounced mail đang chặn pipeline</div>
        <div className="trace">✓ 1 draft follow-up sẵn để duyệt</div>
        <p className="note">{COPY.onboarding.queueReady}</p>
      </Card>
    </div>}
  </div>;
}
