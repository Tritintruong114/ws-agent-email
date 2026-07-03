import { COPY } from '../copy.js';
import { Button, Card, Pill } from './bits.jsx';

export default function Settings({ state, setState, openWhy }) {
  return <div className="detail-grid">
    <Card>
      <h2>Nhịp nhắc</h2>
      <label>Nhắc sau</label>
      <select value={state.cadence} onChange={e => setState(s => ({ ...s, cadence: e.target.value }))}><option>3 ngày</option><option>5 ngày</option><option>7 ngày</option></select>
      <div className="togglebox"><div><b>Không nhắc quá gắt</b><span>Cap follow-up để tránh spam.</span></div><i /></div>
      <Button variant="primary" onClick={() => setState(s => ({ ...s, settingsSaved: true }))}>{COPY.actions.save}</Button>
      {state.settingsSaved && <p className="saved">Đã lưu cadence {state.cadence}</p>}
    </Card>
    <Card>
      <div className="between"><Pill tone="info">Risk Profile Draft · B mặc định</Pill><Button onClick={openWhy}>{COPY.actions.deepEvidence}</Button></div>
      <h2>Agent sẽ ưu tiên inbox theo risk profile này</h2>
      <div className="risk-grid">{['Money risk','Reputation','Meeting','Relationship'].map((x,i)=><div className="risk" key={x}><b>{i+1}. {x}</b><span>{['deal, payment, quote, order','lời hứa, deadline, commitment','context trước meeting 48h','VIP / important contacts'][i]}</span></div>)}</div>
      <p className="note">{COPY.trust.evidenceB}</p>
    </Card>
  </div>
}
