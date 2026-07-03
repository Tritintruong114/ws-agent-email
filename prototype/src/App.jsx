import { useEffect, useState } from 'react';
import { COPY } from './copy.js';
import { seedState } from './fixtures.js';
import Connect from './components/Connect.jsx';
import Queue from './components/Queue.jsx';
import Draft from './components/Draft.jsx';
import Settings from './components/Settings.jsx';
import { EvidenceModal, SandboxModal } from './components/Modal.jsx';

export default function App() {
  const [mode, setMode] = useState('sample');
  const [state, setState] = useState(() => seedState('sample'));
  const [tab, setTab] = useState('queue');
  const [evidence, setEvidence] = useState(false);
  const [sandbox, setSandbox] = useState(false);
  useEffect(() => setState(seedState(mode)), [mode]);

  return <main className="app-shell">
    <header className="topbar">
      <div className="brand"><div className="avatar">✉️</div><div><p className="eyebrow">{COPY.app.eyebrow}</p><h1>{COPY.app.title}</h1><p>{COPY.app.subtitle}</p></div></div>
      <div className="segmented"><span>{COPY.demo.label}</span><button className={mode==='empty'?'active':''} onClick={()=>{setMode('empty');setTab('connect')}}>{COPY.demo.empty}</button><button className={mode==='sample'?'active':''} onClick={()=>{setMode('sample');setTab('queue')}}>{COPY.demo.sample}</button></div>
    </header>
    <nav className="tabs">
      <button className={tab==='queue'?'active':''} onClick={()=>setTab('queue')}>{COPY.tabs.queue}</button>
      <button className={tab==='connect'?'active':''} onClick={()=>setTab('connect')}>{COPY.tabs.connect}</button>
      <button className={tab==='draft'?'active':''} onClick={()=>setTab('draft')}>{COPY.tabs.draft}</button>
      <button className={tab==='settings'?'active':''} onClick={()=>setTab('settings')}>{COPY.tabs.settings}</button>
    </nav>
    {tab === 'connect' && <Connect state={state} setState={setState} goQueue={()=>setTab('queue')} />}
    {tab === 'queue' && <Queue state={state} setState={setState} openWhy={()=>setEvidence(true)} goDraft={()=>setTab('draft')} />}
    {tab === 'draft' && <Draft state={state} setState={setState} openSandbox={()=>setSandbox(true)} />}
    {tab === 'settings' && <Settings state={state} setState={setState} openWhy={()=>setEvidence(true)} />}
    {evidence && <EvidenceModal onClose={()=>setEvidence(false)} />}
    {sandbox && <SandboxModal onClose={()=>setSandbox(false)} />}
  </main>
}
