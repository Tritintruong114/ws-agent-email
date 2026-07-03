import { COPY } from '../copy.js';
import { Button } from './bits.jsx';
import { useState } from 'react';

export function EvidenceModal({ onClose }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><b>C · Full evidence drill-down</b><button onClick={onClose}>×</button></div><div className="modal-body"><p>Chỉ mở khi user click “Xem bằng chứng sâu”; không show mặc định để tránh cảm giác bị soi quá mức.</p><table><tbody><tr><th>Risk</th><th>Thread</th><th>Signal</th></tr><tr><td>Money</td><td>Re: Proposal for ACME rollout</td><td>quote + no reply 5d</td></tr><tr><td>Commitment</td><td>Friday deck promise</td><td>user promised send by date</td></tr><tr><td>Meeting</td><td>Demo prep notes</td><td>meeting in 36h</td></tr></tbody></table></div></div></div>
}

export function SandboxModal({ onClose }) {
  const [messages, setMessages] = useState([{ who:'agent', text:'Draft hiện tại hơi dài. Anh muốn em chỉnh giọng thế nào?' }]);
  const [draft, setDraft] = useState('');
  function send(){ const text=draft.trim(); if(!text) return; setDraft(''); setMessages(m=>[...m,{who:'user',text},{who:'agent',text:COPY.sandbox.reply}]); }
  return <div className="modal-backdrop" onClick={onClose}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><b>{COPY.sandbox.title}</b><button onClick={onClose}>×</button></div><div className="chat-log">{messages.map((m,i)=><div key={i} className={`bubble ${m.who}`}>{m.text}</div>)}</div><div className="composer"><input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder={COPY.sandbox.placeholder}/><Button variant="primary" onClick={send}>{COPY.sandbox.send}</Button></div><p className="note modal-note">{COPY.sandbox.note}</p></div></div>
}
