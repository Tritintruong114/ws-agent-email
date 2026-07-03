import { COPY } from '../copy.js';
import { buckets, metrics } from '../fixtures.js';
import { Button, Card, Kpi, Pill } from './bits.jsx';

function Field({ label, value }) { return <div className="field"><span>{label}</span><b>{value}</b></div>; }

export default function Queue({ state, setState, openWhy, goDraft, openSettings }) {
  if (!state.profileConfirmed) return <Card className="empty"><div className="big">✉️</div><h2>Queue chưa mở</h2><p>Xác nhận Risk Profile Draft trong onboarding trước. Queue này là output của calibration, không phải inbox thô.</p></Card>;
  const due = state.threads.filter(t => t.value !== 'deprioritized').length;
  return <div className="queue-layout">
    <div className="main-col">
      <Card className="digest">
        <div className="between"><Pill tone="ok">Agent đã lọc inbox</Pill><div className="actions tight"><Button onClick={openWhy}>Xem coverage</Button><Button onClick={openSettings}>Cài đặt nhắc</Button></div></div>
        <h2>80 email mới · chỉ còn {due || 9} việc cần anh xử lý hôm nay.</h2>
        <p>Đây không phải inbox. Đây là phần trách nhiệm còn lại sau khi agent đã phân loại, theo dõi và bỏ qua an toàn phần còn lại.</p>
        <div className="kpi-grid tri">{metrics(state).map(m => <Kpi key={m.label} {...m} />)}</div>
      </Card>
      <Card className="memory"><div className="between"><b>Agent học được 2 pattern từ cách anh xử lý tuần này</b><Button onClick={openSettings}>Xem đề xuất</Button></div><div className="chiprow"><Pill tone="info">Anh thường bỏ qua thread FYI một lần</Pill><Pill tone="info">Khách ACME nên ưu tiên cao hơn</Pill></div><p className="note">Chỉ surface để anh biết; agent KHÔNG tự áp rule tại đây — mở “Cài đặt nhắc” để xác nhận từng đề xuất.</p></Card>
      {buckets(state.threads).map(bucket => <Card key={bucket.id} className="bucket">
        <h3>{bucket.title} <span className="num">{bucket.items.length}</span></h3>
        {bucket.items.length === 0 ? <p className="muted">Không có mục nào.</p> : bucket.items.map(t => <div key={t.id} className={`thread ${t.tone} ${state.selectedId === t.id ? 'selected' : ''}`} onClick={() => setState(s => ({ ...s, selectedId: t.id }))}>
          <div className="between"><b>{t.subject}</b><Pill tone={t.tone}>{t.pill}</Pill></div>
          <p>{t.detail}</p>
          <div className="field-grid">
            <Field label="waiting_on" value={t.waitingOn} /><Field label="value_type" value={t.valueType} /><Field label="confidence" value={t.confidence} /><Field label="next_action" value={t.nextAction} />
          </div>
          <div className="snippet">{t.loop} · {t.snippet}</div>
          <div className="row-actions">
            <Button variant="primary" onClick={(e) => { e.stopPropagation(); setState(s => ({ ...s, selectedId: t.id })); goDraft(); }}>{bucket.id === 'bounced' ? 'Mở thread' : bucket.id === 'needsReply' ? 'Mở Gmail để trả lời' : bucket.id === 'replied' ? 'Xác nhận đóng' : 'Mở thread'}</Button>
            {(bucket.id === 'needsReply' || bucket.id === 'followup') && <Button onClick={(e)=>e.stopPropagation()}>Hẹn lại</Button>}
            {bucket.id === 'followup' && <Button onClick={(e)=>e.stopPropagation()}>Bỏ qua</Button>}
            <Button onClick={(e) => { e.stopPropagation(); openWhy(); }}>{COPY.actions.why}</Button>
          </div>
        </div>)}
        {bucket.id === 'followup' && <div className="locked">Có thể bỏ qua · <b>71</b> thread deprioritized đã thu gọn: newsletter, FYI, auto-ack, tracking chưa tới hạn. (KHÔNG tính vào {due || 9} việc cần quyết.)</div>}
      </Card>)}
    </div>
    <aside className="side card">
      <h3>Agent work trace</h3>
      {['Đã scan 80 email mới','Đã check deal/payment/order','Đã check commitment/promises','Đã check meeting trong 48h','Đã check bounced/failed delivery'].map(x => <div className="trace" key={x}>✓ {x}</div>)}
      <p className="note">{COPY.trust.evidenceB}</p>
    </aside>
  </div>
}
