import { COPY } from '../copy.js';
import { RISK_OPTIONS, RISK_PROFILE, SAMPLE_THREADS } from '../fixtures.js';
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
    setState(s => ({ ...s, connected: true, onboardingStep: 'scan', loading: true, scanProgress: 16, scanLabel: 'OAuth đã cấp quyền · đang đọc metadata/thread cần thiết...' }));
    setTimeout(() => setState(s => ({ ...s, scanProgress: 42, scanLabel: 'Đang quét sent/replies 30–90 ngày và nhận diện thread đang chờ...' })), 250);
    setTimeout(() => setState(s => ({ ...s, scanProgress: 71, scanLabel: 'Đang học giọng/cadence từ hành vi duyệt-sửa-bỏ qua, không train model chung...' })), 560);
    setTimeout(() => setState(s => ({ ...s, loading: false, scanned: true, scanProgress: 100, scanLabel: 'Đã dựng xong Risk Profile Draft', onboardingStep: 'profile', memorySuggestion: true, threads: SAMPLE_THREADS, selectedId: 'awaiting-proposal' })), 920);
  }

  function confirmProfile() {
    setState(s => ({ ...s, profileConfirmed: true, onboardingStep: 'done' }));
    goQueue();
  }

  return <div className="onboarding">
    <Card className="onboarding-head">
      <div className="between"><div><Pill tone="info">S1 · OAuth gate</Pill><h2>Trước khi agent làm gì, user phải thấy rõ nó đọc gì, gửi gì, lưu gì.</h2></div><Pill tone="ok">draft + approve</Pill></div>
      <Stepper step={step} />
    </Card>

    {step === 'connect' && <div className="s1-connect">
      <Card className="s1-main">
        <Pill tone="info">Kết nối inbox</Pill>
        <h2>{COPY.onboarding.connectTitle}</h2>
        <p>{COPY.onboarding.connectBody}</p>
        <div className="connect-preview">
          <div><b>Agent sẽ làm sau khi nối</b><span>OAuth → quét lịch sử & học giọng → dựng Risk Profile Draft → anh xác nhận → mới mở queue.</span></div>
          <div><b>Không phải inbox reader thô</b><span>Mục tiêu là tìm phần trách nhiệm còn lại: mail nào có tiền, đang kẹt ở đâu, hôm nay cần xử gì.</span></div>
        </div>
        <div className="actions"><Button variant="primary" onClick={connect}>{COPY.actions.connect}</Button><Button onClick={() => setState(s => ({ ...s, onboardingStep: 'intent' }))}>Chọn rủi ro trước</Button></div>
        <p className="note">{COPY.trust.retention}</p>
      </Card>

      <Card>
        <h3>Quyền truy cập tối thiểu</h3>
        <div className="scope"><b>✓</b><div><strong>Đọc thread Gmail</strong><span>Để phân loại awaiting / replied / bounced / safe wait.</span></div></div>
        <div className="scope"><b>✓</b><div><strong>Tạo draft follow-up</strong><span>Chuẩn bị bản nháp đúng ngữ cảnh để anh duyệt.</span></div></div>
        <div className="scope"><b>✓</b><div><strong>Gửi email đã duyệt</strong><span>Chỉ sau khi anh bấm Duyệt và gửi, bind đúng người nhận/thread.</span></div></div>
        <div className="scope"><b>✕</b><div><strong>Không auto-send</strong><span>{COPY.trust.noAutoSend}</span></div></div>
      </Card>

      <Card className="s1-policy">
        <h3>Cách dùng dữ liệu</h3>
        <p>Agent đọc email của anh để tìm thread cần follow-up và soạn draft đúng ngữ cảnh — đó là cách nó làm việc.</p>
        <div className="scope"><b>✕</b><div><strong>Không train/fine-tune model dùng chung</strong><span>Email của anh không dùng để train bất kỳ model chung nào.</span></div></div>
        <div className="scope"><b>✓</b><div><strong>Chỉ lưu operating memory riêng</strong><span>Giọng viết, cadence, loại thread hay bỏ qua, preference follow-up.</span></div></div>
        <div className="scope"><b>✓</b><div><strong>Thu hồi & xoá được</strong><span>Disconnect Gmail thì purge dữ liệu; retention mặc định 90 ngày.</span></div></div>
      </Card>
    </div>}

    {step === 'intent' && <div className="connect-grid">
      <Card>
        <Pill tone="info">Tùy chọn · 1 câu hỏi</Pill>
        <h2>{COPY.onboarding.intentTitle}</h2>
        <p>{COPY.onboarding.intentBody}</p>
        <div className="risk-options">
          {RISK_OPTIONS.map(opt => <button key={opt.id} className={`risk-option ${state.selectedRisks.includes(opt.id) ? 'selected' : ''}`} onClick={() => toggleRisk(opt.id)}>
            <b>{opt.label}</b><span>{opt.hint}</span>
          </button>)}
        </div>
        <div className="actions"><Button variant="primary" onClick={connect}>{COPY.actions.connect}</Button><Button onClick={() => setState(s => ({ ...s, onboardingStep: 'connect' }))}>Quay lại màn kết nối</Button></div>
      </Card>
      <Card>
        <h3>Vì sao chỉ hỏi ít?</h3>
        <div className="scope"><b>✓</b><div><strong>Giữ agent magic</strong><span>Không bắt user khai form dài.</span></div></div>
        <div className="scope"><b>✓</b><div><strong>Email calibration</strong><span>Pattern thật đến từ lịch sử 30–90 ngày.</span></div></div>
        <div className="scope"><b>✓</b><div><strong>Confirm sau scan</strong><span>User sửa Risk Profile Draft thay vì tự cấu hình từ đầu.</span></div></div>
      </Card>
    </div>}

    {step === 'scan' && <div className="connect-grid">
      <Card className="hero">
        <Pill tone="info">S1.loading</Pill>
        <h2>{COPY.onboarding.scanTitle}</h2>
        <p>{COPY.onboarding.scanBody}</p>
        <div className="progress"><i style={{ width: `${state.scanProgress}%` }} /></div>
        <p className="note">{state.scanLabel}</p>
      </Card>
      <Card>
        <h3>Agent đang tìm gì?</h3>
        {['Thread đang chờ đối tác vs đang chờ anh', 'Mail bị trả lại / NDR', 'Draft follow-up cần duyệt', 'Pattern giọng viết và cadence riêng'].map(x => <div className="trace" key={x}>✓ {x}</div>)}
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
