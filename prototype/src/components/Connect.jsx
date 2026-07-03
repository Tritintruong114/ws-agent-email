import { COPY } from '../copy.js';
import { SAMPLE_THREADS } from '../fixtures.js';
import { Button, Card, Pill } from './bits.jsx';

export default function Connect({ state, setState, goQueue }) {
  function connect() {
    setState(s => ({ ...s, connected: true, loading: true, scanProgress: 68 }));
    setTimeout(() => setState(s => ({ ...s, loading: false, scanned: true, scanProgress: 100, memorySuggestion: true, threads: SAMPLE_THREADS, selectedId: 'awaiting-proposal' })), 650);
  }
  return <div className="connect-grid">
    <Card className="hero">
      <Pill tone={state.connected ? 'ok' : 'info'}>{state.connected ? COPY.app.connected : 'draft + approve · không tự gửi'}</Pill>
      <h2>{state.loading ? 'Đang quét lịch sử & dựng Risk Profile Draft' : COPY.empty.title}</h2>
      <p>{state.loading ? 'Đang phân loại 30–90 ngày gần nhất và tìm pattern rủi ro: money / commitment / meeting / people.' : COPY.empty.body}</p>
      {state.loading && <div className="progress"><i style={{ width: `${state.scanProgress}%` }} /></div>}
      <div className="actions">
        <Button variant="primary" onClick={state.scanned ? goQueue : connect}>{state.scanned ? 'Xem queue' : COPY.actions.connect}</Button>
        {state.connected && !state.scanned && <Button onClick={connect}>{COPY.actions.scan}</Button>}
      </div>
      <p className="note">{COPY.trust.retention}</p>
    </Card>
    <Card>
      <h3>Quyền truy cập</h3>
      <div className="scope"><b>✓</b><div><strong>Đọc thread</strong><span>Phân loại awaiting / replied / bounced / safe wait.</span></div></div>
      <div className="scope"><b>✓</b><div><strong>Soạn draft</strong><span>Tạo bản nháp follow-up để anh duyệt.</span></div></div>
      <div className="scope"><b>✕</b><div><strong>Không auto-send</strong><span>Gửi mail luôn cần anh bấm duyệt.</span></div></div>
    </Card>
  </div>
}
