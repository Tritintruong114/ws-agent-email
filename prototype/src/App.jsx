import { useEffect, useState } from 'react';
import { COPY } from './copy.js';
import { seedState } from './fixtures.js';
import Onboarding from './components/Onboarding.jsx';
import Queue from './components/Queue.jsx';
import Draft from './components/Draft.jsx';
import Settings from './components/Settings.jsx';
import { EvidenceModal, SandboxModal } from './components/Modal.jsx';

export default function App() {
  const [mode, setMode] = useState('empty');
  const [state, setState] = useState(() => seedState('empty'));
  const [tab, setTab] = useState('onboarding');
  const [evidence, setEvidence] = useState(false);
  const [sandbox, setSandbox] = useState(false);

  useEffect(() => {
    const next = seedState(mode);
    setState(next);
    setTab('onboarding');
  }, [mode]);

  const canUseApp = state.profileConfirmed || state.onboardingStep === 'done';

  return <main className="app-shell">
    <header className="topbar">
      <div className="brand"><div className="avatar">✉️</div><div><p className="eyebrow">{COPY.app.eyebrow}</p><h1>{COPY.app.title}</h1><p>{COPY.app.subtitle}</p></div></div>
      <div className="segmented"><span>{COPY.demo.label}</span><button className={mode==='empty'?'active':''} onClick={()=>setMode('empty')}>{COPY.demo.empty}</button><button className={mode==='sample'?'active':''} onClick={()=>setMode('sample')}>{COPY.demo.sample}</button></div>
    </header>
    <nav className="tabs">
      <button className={tab==='onboarding'?'active':''} onClick={()=>setTab('onboarding')}>{COPY.tabs.onboarding}</button>
      <button className={tab==='queue'?'active':''} onClick={()=>setTab('queue')} disabled={!canUseApp}>{COPY.tabs.queue}</button>
      <button className={tab==='draft'?'active':''} onClick={()=>setTab('draft')} disabled={!canUseApp}>{COPY.tabs.draft}</button>
      <button className={tab==='settings'?'active':''} onClick={()=>setTab('settings')} disabled={!canUseApp}>{COPY.tabs.settings}</button>
    </nav>
    {tab === 'onboarding' && <Onboarding state={state} setState={setState} openEvidence={()=>setEvidence(true)} goQueue={()=>setTab('queue')} />}
    {tab === 'queue' && <Queue state={state} setState={setState} openWhy={()=>setEvidence(true)} goDraft={()=>setTab('draft')} openSettings={()=>setTab('settings')} />}
    {tab === 'draft' && <Draft state={state} setState={setState} openSandbox={()=>setSandbox(true)} />}
    {tab === 'settings' && <Settings state={state} setState={setState} openWhy={()=>setEvidence(true)} />}
    {evidence && <EvidenceModal onClose={()=>setEvidence(false)} />}
    {sandbox && <SandboxModal onClose={()=>setSandbox(false)} />}
  </main>
}
