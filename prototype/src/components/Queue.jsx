import { COPY } from '../copy.js';
import { buckets, metrics } from '../fixtures.js';
import { Button, Card, Kpi, Pill } from './bits.jsx';

export default function Queue({ state, setState, openWhy, goDraft }) {
  if (!state.scanned) return <Card className="empty"><div className="big">✉️</div><h2>Chưa có queue</h2><p>Kết nối Gmail và quét inbox để dựng hàng đợi trách nhiệm.</p></Card>;
  const due = state.threads.filter(t => t.value !== 'deprioritized').length;
  return <div className="queue-layout">
    <div className="main-col">
      <Card className="digest">
        <div className="between"><Pill tone="ok">Agent đã lọc inbox</Pill><Button onClick={openWhy}>Xem coverage</Button></div>
        <h2>80 email mới · chỉ còn {due} việc cần anh xử lý hôm nay.</h2>
        <p>Đây không phải inbox. Đây là phần trách nhiệm còn lại sau khi agent đã phân loại, theo dõi và bỏ qua an toàn phần còn lại.</p>
        <div className="kpi-grid">{metrics(state).map(m => <Kpi key={m.label} {...m} />)}</div>
      </Card>
      {state.memorySuggestion && <Card className="memory"><div className="between"><b>Agent học được 2 pattern từ cách anh xử lý tuần này</b><Button onClick={() => setState(s => ({ ...s, memorySuggestion: false }))}>Đã hiểu</Button></div><p>Ưu tiên money risk trước reputation risk; ACME nên nằm priority cao hơn.</p></Card>}
      {buckets(state.threads).map(bucket => <Card key={bucket.id} className="bucket">
        <h3>{bucket.icon} {bucket.title} <span>{bucket.items.length}</span></h3>
        {bucket.items.length === 0 ? <p className="muted">Không có mục nào.</p> : bucket.items.map(t => <div key={t.id} className={`thread ${t.tone} ${state.selectedId === t.id ? 'selected' : ''}`} onClick={() => setState(s => ({ ...s, selectedId: t.id }))}>
          <div className="between"><b>{t.subject}</b><Pill tone={t.tone}>{t.pill}</Pill></div>
          <p>{t.detail}</p>
          <div className="row-actions"><Button variant="primary" onClick={(e) => { e.stopPropagation(); setState(s => ({ ...s, selectedId: t.id })); goDraft(); }}>{bucket.id === 'bounced' ? 'Xử lý địa chỉ' : bucket.id === 'needsReply' ? 'Mở Gmail' : bucket.id === 'replied' ? 'Xem & đóng' : 'Mở'}</Button><Button onClick={(e) => { e.stopPropagation(); openWhy(); }}>{COPY.actions.why}</Button></div>
        </div>)}
      </Card>)}
    </div>
    <aside className="side card">
      <h3>Agent work trace</h3>
      {['Đã scan 80 email mới','Đã check deal/payment/order','Đã check commitment/promises','Đã check meeting trong 48h','Đã check bounced/failed delivery'].map(x => <div className="trace" key={x}>✓ {x}</div>)}
      <p className="note">{COPY.trust.evidenceB}</p>
    </aside>
  </div>
}
