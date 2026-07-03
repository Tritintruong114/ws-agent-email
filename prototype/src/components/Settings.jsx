import { COPY } from '../copy.js';
import { Button, Card, Pill } from './bits.jsx';

export default function Settings({ state, setState, openWhy }) {
  if (state.settingsSaved) return <Card className="empty"><div className="big">✅</div><h2>Đã lưu Risk Profile</h2><p>Agent sẽ dùng profile này để ưu tiên queue, nhưng mọi gửi mail vẫn cần anh duyệt.</p><Button onClick={()=>setState(s=>({...s,settingsSaved:false}))}>Quay lại cài đặt</Button></Card>;
  if (state.settingsError) return <div className="modalbox in-flow"><div className="mh">Không lưu được cài đặt <span>⚠️</span></div><div className="mb"><p>Thay đổi cadence/loại trừ chưa lưu được. Cài đặt hiện tại vẫn giữ nguyên.</p></div><div className="mf"><Button onClick={()=>setState(s=>({...s,settingsError:false}))}>Để sau</Button><Button variant="primary" onClick={()=>setState(s=>({...s,settingsError:false,settingsSaved:true}))}>Lưu lại</Button></div></div>;
  return <div className="settings-grid">
    <Card>
      <h2>Nhịp nhắc</h2>
      <label>Nhắc sau</label>
      <select value={state.cadence} onChange={e => setState(s => ({ ...s, cadence: e.target.value }))}><option>3 ngày</option><option>5 ngày</option><option>7 ngày</option></select>
      <div className="togglebox"><div><b>Không nhắc quá gắt</b><span>Cap follow-up để tránh spam.</span></div><i /></div>
      <div className="actions"><Button variant="primary" onClick={() => setState(s => ({ ...s, settingsSaved: true }))}>{COPY.actions.save}</Button><Button onClick={()=>setState(s=>({...s,settingsError:true}))}>Mô phỏng lỗi lưu</Button></div>
    </Card>
    <Card>
      <h2>Loại trừ</h2>
      {['newsletter@***','noreply@***'].map(x => <div className="kbrow" key={x}><span className="ic">🏷️</span><div className="tx">{x}</div><Button>Xóa</Button></div>)}
      <Button>Thêm loại trừ</Button>
      <div className="gap"></div><h3>Dữ liệu</h3><Button variant="secondary">Xóa dữ liệu học giọng</Button>
    </Card>
    <Card className="settings-wide">
      <div className="between"><Pill tone="info">Risk Profile Draft · B mặc định</Pill><Button onClick={openWhy}>{COPY.actions.deepEvidence}</Button></div>
      <h2>Em sẽ ưu tiên inbox theo risk profile này</h2>
      <div className="risk-grid">{['Money risk','Reputation','Meeting','Relationship'].map((x,i)=><div className="risk" key={x}><b>{i+1}. {x}</b><span>{['deal, payment, quote, order','lời hứa, deadline, commitment','context trước meeting 48h','VIP / important contacts'][i]}</span></div>)}</div>
      <div className="evidence"><b>Bằng chứng mặc định (mức B) — pattern + subject mask nhẹ</b><div className="mask">12 thread có pattern báo giá/payment · ví dụ: “Re: Proposal for *** project”, “Payment confirmation — *** invoice”</div><div className="mask">7 thread có commitment phrase · ví dụ: “I'll send by Friday — *** deck”, “Follow up on promised ***”</div></div>
      <h3>Đề xuất từ Operating Memory</h3>
      <div className="suggestion-grid">
        {[
          ['Ưu tiên ACME','Nâng priority_tier cho domain ACME.'],['Loại trừ digest@***','Hay bị dismiss → gợi ý ExcludeRule.'],['Hạ cap thread FYI','Hay soft-close → giảm số lần nhắc.']
        ].map(([a,b]) => <div className="riskBox" key={a}><b>{a}</b><span>{b}</span><div className="actions"><Button>Xác nhận</Button><Button>Bỏ qua</Button></div></div>)}
      </div>
      <div className="actions"><Button variant="primary" onClick={()=>setState(s=>({...s,settingsSaved:true}))}>Xác nhận profile</Button><Button>Sửa ưu tiên</Button><Button>Bỏ qua đề xuất</Button></div>
    </Card>
  </div>
}
