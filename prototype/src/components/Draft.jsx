import { COPY } from '../copy.js';
import { selectedThread } from '../fixtures.js';
import { Button, Card, Pill } from './bits.jsx';

export default function Draft({ state, setState, openSandbox }) {
  const t = selectedThread(state);
  if (!t) return <Card className="empty"><h2>Chọn một thread từ queue</h2></Card>;
  const isBounce = t.bucket === 'bounced';
  const isNeedsReply = t.bucket === 'needsReply';
  const isClose = t.bucket === 'replied';

  function removeThread(kind) {
    setState(s => ({ ...s, threads: s.threads.filter(x => x.id !== t.id), selectedId: s.threads.find(x => x.id !== t.id)?.id || null, sentCount: kind === 'sent' ? s.sentCount + 1 : s.sentCount, closedCount: kind === 'closed' ? s.closedCount + 1 : s.closedCount }));
  }

  return <div className="detail-grid">
    <Card>
      <div className="between"><div><Pill tone={t.tone}>{t.pill}</Pill><h2>{t.subject}</h2></div><span className="muted">{t.aging}</span></div>
      <label>To:</label><input value={t.to} readOnly />
      {isBounce ? <><h3>Mail bị trả lại</h3><p>Pipeline đang bị chặn trước khi người nhận thấy mail. Sửa địa chỉ hoặc gửi lại từ Gmail.</p><input defaultValue={t.to.replace('.con','.com')} /><div className="actions"><Button variant="primary" onClick={() => removeThread('sent')}>{COPY.actions.fixAddress}</Button><Button onClick={() => removeThread('closed')}>Bỏ qua</Button></div></> :
       isNeedsReply ? <><h3>Reply cần anh xử lý</h3><div className="quote">“Bên anh confirm giúp em giá cuối và ngày bắt đầu được không?”</div><p>Đây là ask mới cần anh tự trả lời — agent không soạn hộ reply mới trong v0.</p><Button variant="primary">Mở trong Gmail</Button></> :
       isClose ? <><h3>Xác nhận đóng thread</h3><p>Agent thấy đối tác đã reply nhưng không có ask mới. Có thể đóng thread hoặc tiếp tục theo dõi.</p><div className="actions"><Button onClick={() => removeThread('closed')} variant="primary">{COPY.actions.close}</Button><Button>{COPY.actions.notClosed}</Button></div></> :
       <><h3>Tóm tắt hội thoại</h3><p>Proposal đã gửi 5 ngày trước · khách chưa phản hồi thực chất · deal có giá trị cao · follow-up cadence tới hạn hôm nay.</p><h3>Bản nháp follow-up</h3><textarea defaultValue={'Chào anh Minh, em gửi lại proposal để anh tiện xem. Nếu anh cần em điều chỉnh phần scope hoặc timeline, anh nhắn em nhé.'}/><div className="actions"><Button onClick={openSandbox}>{COPY.actions.rewrite}</Button><Button>{COPY.actions.snooze}</Button><Button variant="primary" onClick={() => removeThread('sent')}>{COPY.actions.approveSend}</Button></div></>}
    </Card>
    <Card>
      <h3>Guardrails</h3>
      <div className="scope"><b>✓</b><div><strong>Đúng người nhận</strong><span>Email được mask nhẹ trong prototype.</span></div></div>
      <div className="scope"><b>✓</b><div><strong>Không tự gửi nếu chưa duyệt</strong><span>{COPY.trust.noAutoSend}</span></div></div>
      <div className="scope"><b>✓</b><div><strong>Không hứa discount/deadline mới</strong><span>Draft chỉ follow-up, không đổi deal terms.</span></div></div>
    </Card>
  </div>
}
