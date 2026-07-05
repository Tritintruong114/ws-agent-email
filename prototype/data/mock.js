// Mock data — simulated agent processing results

const NOW = Date.now();
const DAY = 86400000;

export const THREADS = [
  {
    id: 'T12',
    subject: 'Bao gia dich vu tu van Q2/2026',
    sender: 'Anh Tuan — Company A',
    email: 'tuan@companyA.com',
    bucket: 'can_followup',
    state: 'awaiting_review',
    waitingOn: 'user',
    daysSince: 5,
    followUpCount: 1,
    maxFollowUp: 3,
    confidence: 'CAO',
    snippet: 'Gui bao gia 25/6. Khach hoi timeline. Can follow-up de khong mat deal.',
    draft: 'Chao anh Tuan, em follow-up ve bao gia tuan truoc. Anh can them thong tin gi ve timeline khong a?',
    draftRationale: 'Anh hay viet di thang + cau hoi. Tranh "than ai" (da hoc tu correction)',
    valueType: 'quote_pending',
    lastUserSent: '25/06',
    lastMeaningfulSnippet: 'Khach: "Anh cho em hoi timeline trien khai the nao a?"'
  },
  {
    id: 'T15',
    subject: 'RE: Hop dong partner — Beta LLC',
    sender: 'Beta LLC',
    email: 'info@betallc.com',
    bucket: 'bounced',
    state: 'bounced',
    waitingOn: 'user',
    daysSince: 0,
    followUpCount: 0,
    maxFollowUp: 3,
    confidence: 'CAO',
    snippet: 'Mail bi tra lai — NDR: 550 5.1.1 The email account does not exist',
    draft: '',
    draftRationale: '',
    valueType: 'bounce',
    lastUserSent: '03/07',
    lastMeaningfulSnippet: 'NDR: address not found'
  },
  {
    id: 'T08',
    subject: 'Phan hoi tu Cong ty B ve de xuat hop tac',
    sender: 'Ms. Lan — Cong ty B',
    email: 'lan@congtyb.com',
    bucket: 'needs_reply',
    state: 'awaits_user_reply',
    waitingOn: 'user',
    daysSince: 2,
    followUpCount: 0,
    maxFollowUp: 3,
    confidence: 'TRUNG_BINH',
    snippet: 'Ms. Lan: "Ben em da nhan duoc proposal, se phan hoi trong tuan nay. Cam on anh."',
    draft: '',
    draftRationale: 'Day la xac nhan da nhan, chua can follow-up',
    valueType: 'informational_ack',
    lastUserSent: '30/06',
    lastMeaningfulSnippet: '"Cam on, da nhan duoc. Se phan hoi sau."'
  },
  {
    id: 'T05',
    subject: 'Follow-up proposal marketing Q3',
    sender: 'Dich vu C',
    email: 'info@dichvuc.com',
    bucket: 'has_reply',
    state: 'reply_proposed_close',
    waitingOn: 'user',
    daysSince: 1,
    followUpCount: 2,
    maxFollowUp: 3,
    confidence: 'CAO',
    snippet: 'Khach: "Cam on, ben anh da duyet. Gui PO nhe." — Agent de xuat dong',
    draft: '',
    draftRationale: 'Phat hien reply thuc chat: khong phai OOO, co cam tu xac nhan, khong co ask moi',
    valueType: 'deal_won',
    lastUserSent: '28/06',
    lastMeaningfulSnippet: '"Cam on, ben anh da duyet. Gui PO nhe."'
  },
  {
    id: 'T18',
    subject: 'Chao gia — Proposal H',
    sender: 'Proposal H Co., Ltd',
    email: 'contact@proposalh.com',
    bucket: 'can_followup',
    state: 'awaiting_review',
    waitingOn: 'user',
    daysSince: 7,
    followUpCount: 2,
    maxFollowUp: 3,
    confidence: 'CAO',
    snippet: 'Da gui follow-up lan 2. Het 1 lan nua. Can quyet dinh: bo qua hay tang cap.',
    draft: 'Chao anh/chi ben Proposal H, em xin phep follow-up lan cuoi ve bao gia da gui. Anh/chi can them gi khong a?',
    draftRationale: 'Follow-up lan cuoi (2/3). De xuat tang cap len 5 neu thuong xuyen co reply.',
    valueType: 'quote_pending',
    lastUserSent: '28/06',
    lastMeaningfulSnippet: 'Chua co phan hoi sau 2 lan follow-up'
  },
  {
    id: 'T22',
    subject: 'Tu van strategy Q3',
    sender: 'Freelancer E',
    email: 'e@freelancer.com',
    bucket: 'has_reply',
    state: 'reply_needs_action',
    waitingOn: 'user',
    daysSince: 1,
    followUpCount: 1,
    maxFollowUp: 3,
    confidence: 'TRUNG_BINH',
    snippet: 'Freelancer E: "OK, khi nao minh co the call de ban chi tiet?" — Co cau hoi moi',
    draft: '',
    draftRationale: 'Co cau hoi moi: can user tra loi bang Gmail, draft khong du.',
    valueType: 'new_inquiry',
    lastUserSent: '01/07',
    lastMeaningfulSnippet: '"OK, khi nao minh co the call de ban chi tiet?"'
  },
  {
    id: 'T03',
    subject: 'Cap nhat hop dong G',
    sender: 'Hop dong G Corp',
    email: 'legal@hopdongg.com',
    bucket: 'can_followup',
    state: 'awaiting_review',
    waitingOn: 'user',
    daysSince: 4,
    followUpCount: 1,
    maxFollowUp: 3,
    confidence: 'CAO',
    snippet: 'Da gui ban hop dong. Doi ben G ky lai. Can follow-up.',
    draft: 'Chao Hop dong G, em follow-up ve ban hop dong da gui tuan truoc. Ben minh da ky xong chua a?',
    draftRationale: 'Hop dong: giong trang trong, cam on, de nghi xac nhan.',
    valueType: 'contract',
    lastUserSent: '01/07',
    lastMeaningfulSnippet: 'Da gui ban hop dong'
  },
  {
    id: 'T01',
    subject: 'Thong bao su kien nghe',
    sender: 'Newsletter Nghe',
    email: 'events@nghe.io',
    bucket: 'deprioritized',
    state: 'deprioritized',
    waitingOn: 'none',
    daysSince: 10,
    followUpCount: 2,
    maxFollowUp: 3,
    confidence: 'THAP',
    snippet: 'Thong bao su kien — da dismiss 2 lan. De nghi exclude domain.',
    draft: '',
    draftRationale: 'Pattern: hay bi dismiss. De nghi ha cap xuong 1 lan hoac exclude.',
    valueType: 'event',
    lastUserSent: '25/06',
    lastMeaningfulSnippet: 'Da dismiss 2 lan'
  }
];

export const EVENTS = [
  { time: '10:23', type: 'classify', id: 'T12', detail: '5 ngay, co "bao gia" &rarr; awaiting_review', thought: 'Agent nghi: "Thread #T12: last_actor=user, days_since=5, confidence=cao (subject co "bao gia")"', signals: '{last_actor:user, days_since:5, deal_signal:true}', memory: null, outcome: 'success' },
  { time: '10:24', type: 'draft', id: 'T12', detail: 'Giong trang trong, ngan, co cau hoi', thought: 'Soan draft dua tren VoiceProfile: trang trong, signature chuan', signals: null, memory: null, outcome: 'success' },
  { time: '10:25', type: 'user_approve', id: 'T12', detail: 'Da duyet va gui (khong sua)', thought: null, signals: null, memory: 'Draft duoc approve nguyen &rarr; VoiceProfile giu nguyen', outcome: 'success' },
  { time: '14:00', type: 'detect_reply', id: 'T12', detail: 'Phat hien reply &rarr; De xuat dong', thought: 'Phat hien reply thuc chat: "Cam on, da duyet" khong phai OOO, khong co ask moi', signals: '{contains_new_request:false, has_closing_language:true}', memory: 'Ghi nhan pattern: "Cam on, da duyet" = reply thuc chat', outcome: 'success' },
  { time: '14:01', type: 'user_confirm_close', id: 'T12', detail: 'User xac nhan dong', thought: null, signals: null, memory: 'Ghi nhan pattern close vao FollowUpPlaybook', outcome: 'success' },
  { time: '09:00', type: 'bounced', id: 'T15', detail: 'Beta LLC — NDR: account not found', thought: 'Mail bi tra lai: 550 5.1.1. Can bao user.', signals: '{ndr_code:550, reason:account_not_found}', memory: null, outcome: 'failed' },
  { time: '15:30', type: 'user_correction', id: 'T08', detail: 'User bac phan loai: "cam on da nhan" &ne; reply thuc chat', thought: null, signals: null, memory: 'Ghi nhan correction: "Cam on da nhan" KHONG phai reply thuc chat &rarr; update FollowUpPlaybook.reply_classification_corrections', outcome: 'corrected' },
  { time: '11:00', type: 'scan', id: 'all', detail: 'Da quet 80 email, 15 thread moi theo doi', thought: 'Phat hien 15 thread can theo doi, tu dong phan loai bucket', signals: null, memory: null, outcome: 'success' },
  { time: '08:30', type: 'memory_update', id: null, detail: 'Goi y exclude domain newsletter.io', thought: '3 thread tu domain nay deu bi dismiss sau follow-up &rarr; de nghi exclude', signals: '{domain:newsletter.io, dismiss_count:3}', memory: 'De xuat exclude &rarr; cho user xac nhan', outcome: 'pending' }
];

export const ONBOARDING = {
  connected: false,
  loadingComplete: false,
  identitySummary: {
    businessType: 'Tu van B2B',
    clientType: 'Startup goi von + Agency nho',
    writingStyle: 'Trang trong, co so lieu',
    workingHours: 'Sang - 22h, reply toi muon',
    language: 'Tieng Viet + English (50/50)'
  }
};

export const VOICE_PROFILE = {
  samples: [
    '"Cam on anh da quan tam. Ben em xin gui bao gia chi tiet nhu dinh kem."',
    '"Follow-up ve proposal tuan truoc. Anh can them thong tin gi khong a?"'
  ],
  avoided: ['Than ai', 'Rat mong som nhan duoc phan hoi'],
  toneByRelationship: {
    new: '"Kinh gui anh/chi..."',
    existing: '"Chao anh..."',
    partner: '"Anh oi, vu ben A ?"'
  },
  approvedDrafts: [
    { subject: 'Bao gia', pattern: '1 doan + dinh kem PDF/link Drive' },
    { subject: 'Xac nhan lich', pattern: '2 cau, khong can file' }
  ]
};

export const SETTINGS = {
  cadence: { thresholdDays: 3, capPerThread: 3, capVIP: 5, workStart: '08:00', workEnd: '22:00', workDays: 'T2-CN', minGapDays: 2 },
  exclude: {
    contacts: [
      { email: 'hr@internal.com', note: 'Noi bo', id: 'c1' },
      { email: 'no-reply@newsletter.com', note: 'Newsletter', id: 'c2' }
    ],
    domains: [
      { domain: '*.internal-group.com', id: 'd1' },
      { domain: '*.newsletter.io', id: 'd2' }
    ]
  },
  notifications: {
    digestMorning: true,
    digestAfternoon: false,
    alertBounce: true,
    alertNewDetection: false,
    pushDesktop: true
  }
};

export const SUGGESTIONS = [
  { id: 's1', text: 'Uu tien VIP: contact@companyA.com', reason: '5/5 lan duyet nhanh, chua bao gio dismiss', type: 'vip' },
  { id: 's2', text: 'Exclude domain: newsletter.io', reason: '3 thread tu domain nay deu bi dismiss', type: 'exclude' },
  { id: 's3', text: 'Ha cap thread "thong bao" xuong 1 lan', reason: 'Pattern: hay bi dismiss sau lan 2', type: 'cadence' },
  { id: 's4', text: 'Tang cap cho domain companyB.com', reason: 'Thuong xuyen can 4-5 lan follow-up moi co reply', type: 'cadence' }
];

export const DASHBOARD = {
  scanned: 80,
  monitored: 15,
  resolved: 12,
  approvalRate: '87%',
  avgResponse: '4.2h',
  trend: [3, 5, 8, 4, 7, 2, 6],
  alerts: [
    { severity: 'high', text: '3 thread >2 tuan sap nguoi' },
    { severity: 'medium', text: '5 deal cho bao gia' },
    { severity: 'high', text: '2 mail bounce' }
  ]
};

export function randomToast() {
  const msgs = [
    '✅ Agent da quet xong!',
    '📨 Co email moi tu Company A',
    '🧠 Agent hoc xong correction tu #T08',
    '📊 Da cap nhat Dashboard',
    '🔔 Phat hien thread #T24 can follow-up'
  ];
  return msgs[Math.floor(Math.random() * msgs.length)];
}