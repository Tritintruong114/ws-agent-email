// Mock data — simulated agent processing results

export const THREADS = [
  {
    id: 'T12',
    subject: 'Báo giá dịch vụ tư vấn Q2/2026',
    sender: 'Anh Tuấn - Company A',
    email: 'tuan@companyA.com',
    bucket: 'can_followup',
    state: 'awaiting_review',
    waitingOn: 'user',
    daysSince: 5,
    followUpCount: 1,
    maxFollowUp: 3,
    confidence: 'CAO',
    snippet: 'Gửi báo giá 25/6. Khách hỏi timeline. Cần follow-up để không mất deal.',
    draft: 'Chào anh Tuấn, em follow-up về báo giá tuần trước. Anh cần thêm thông tin gì về timeline không ạ?',
    draftRationale: 'Anh hay viết đi thẳng + câu hỏi. Tránh "thân ái" (đã học từ correction)',
    valueType: 'quote_pending',
    lastUserSent: '25/06',
    lastMeaningfulSnippet: 'Khách: "Anh cho em hỏi timeline triển khai thế nào ạ?"'
  },
  {
    id: 'T15',
    subject: 'RE: Hợp đồng partner - Beta LLC',
    sender: 'Beta LLC',
    email: 'info@betallc.com',
    bucket: 'bounced',
    state: 'bounced',
    waitingOn: 'user',
    daysSince: 0,
    followUpCount: 0,
    maxFollowUp: 3,
    confidence: 'CAO',
    snippet: 'Mail bị trả lại - NDR: 550 5.1.1 The email account does not exist',
    draft: '',
    draftRationale: '',
    valueType: 'bounce',
    lastUserSent: '03/07',
    lastMeaningfulSnippet: 'NDR: address not found'
  },
  {
    id: 'T08',
    subject: 'Phản hồi từ Công ty B về đề xuất hợp tác',
    sender: 'Ms. Lan - Công ty B',
    email: 'lan@congtyb.com',
    bucket: 'needs_reply',
    state: 'awaits_user_reply',
    waitingOn: 'user',
    daysSince: 2,
    followUpCount: 0,
    maxFollowUp: 3,
    confidence: 'TRUNG_BINH',
    snippet: 'Ms. Lan: "Bên em đã nhận được proposal, sẽ phản hồi trong tuần này. Cảm ơn anh."',
    draft: '',
    draftRationale: 'Đây là xác nhận đã nhận, chưa cần follow-up',
    valueType: 'informational_ack',
    lastUserSent: '30/06',
    lastMeaningfulSnippet: '"Cảm ơn, đã nhận được. Sẽ phản hồi sau."'
  },
  {
    id: 'T05',
    subject: 'Follow-up proposal marketing Q3',
    sender: 'Dịch vụ C',
    email: 'info@dichvuc.com',
    bucket: 'has_reply',
    state: 'reply_proposed_close',
    waitingOn: 'user',
    daysSince: 1,
    followUpCount: 2,
    maxFollowUp: 3,
    confidence: 'CAO',
    snippet: 'Khách: "Cảm ơn, bên anh đã duyệt. Gửi PO nhé." - Agent đề xuất đóng',
    draft: '',
    draftRationale: 'Phát hiện reply thực chất: không phải OOO, có cụm từ xác nhận, không có ask mới',
    valueType: 'deal_won',
    lastUserSent: '28/06',
    lastMeaningfulSnippet: '"Cảm ơn, bên anh đã duyệt. Gửi PO nhé."'
  },
  {
    id: 'T18',
    subject: 'Chào giá - Proposal H',
    sender: 'Proposal H Co., Ltd',
    email: 'contact@proposalh.com',
    bucket: 'can_followup',
    state: 'awaiting_review',
    waitingOn: 'user',
    daysSince: 7,
    followUpCount: 2,
    maxFollowUp: 3,
    confidence: 'CAO',
    snippet: 'Đã gửi follow-up lần 2. Hết 1 lần nữa. Cần quyết định: bỏ qua hay tăng cap.',
    draft: 'Chào anh/chị bên Proposal H, em xin phép follow-up lần cuối về báo giá đã gửi. Anh/chị cần thêm gì không ạ?',
    draftRationale: 'Follow-up lần cuối (2/3). Đề xuất tăng cap lên 5 nếu thường xuyên có reply.',
    valueType: 'quote_pending',
    lastUserSent: '28/06',
    lastMeaningfulSnippet: 'Chưa có phản hồi sau 2 lần follow-up'
  },
  {
    id: 'T22',
    subject: 'Tư vấn strategy Q3',
    sender: 'Freelancer E',
    email: 'e@freelancer.com',
    bucket: 'has_reply',
    state: 'reply_needs_action',
    waitingOn: 'user',
    daysSince: 1,
    followUpCount: 1,
    maxFollowUp: 3,
    confidence: 'TRUNG_BINH',
    snippet: 'Freelancer E: "OK, khi nào mình có thể call để bàn chi tiết?" - Có câu hỏi mới',
    draft: '',
    draftRationale: 'Có câu hỏi mới: cần user trả lời bằng Gmail, draft không đủ.',
    valueType: 'new_inquiry',
    lastUserSent: '01/07',
    lastMeaningfulSnippet: '"OK, khi nào mình có thể call để bàn chi tiết?"'
  },
  {
    id: 'T03',
    subject: 'Cập nhật hợp đồng G',
    sender: 'Hợp đồng G Corp',
    email: 'legal@hopdongg.com',
    bucket: 'can_followup',
    state: 'awaiting_review',
    waitingOn: 'user',
    daysSince: 4,
    followUpCount: 1,
    maxFollowUp: 3,
    confidence: 'CAO',
    snippet: 'Đã gửi bản hợp đồng. Đợi bên G ký lại. Cần follow-up.',
    draft: 'Chào Hợp đồng G, em follow-up về bản hợp đồng đã gửi tuần trước. Bên mình đã ký xong chưa ạ?',
    draftRationale: 'Hợp đồng: giọng trang trọng, cảm ơn, đề nghị xác nhận.',
    valueType: 'contract',
    lastUserSent: '01/07',
    lastMeaningfulSnippet: 'Đã gửi bản hợp đồng'
  },
  {
    id: 'T01',
    subject: 'Thông báo sự kiện nghề',
    sender: 'Newsletter Nghe',
    email: 'events@nghe.io',
    bucket: 'deprioritized',
    state: 'deprioritized',
    waitingOn: 'none',
    daysSince: 10,
    followUpCount: 2,
    maxFollowUp: 3,
    confidence: 'THAP',
    snippet: 'Thông báo sự kiện - đã dismiss 2 lần. Đề nghị exclude domain.',
    draft: '',
    draftRationale: 'Pattern: hay bị dismiss. Đề nghị hạ cap xuống 1 lần hoặc exclude.',
    valueType: 'event',
    lastUserSent: '25/06',
    lastMeaningfulSnippet: 'Đã dismiss 2 lần'
  }
];

export const EVENTS = [
  { time: '10:23', type: 'classify', id: 'T12', detail: '5 ngày, có "báo giá" => awaiting_review', thought: 'Agent nghĩ: "Thread #T12: last_actor=user, days_since=5, confidence=cao (subject có "báo giá")"', signals: '{last_actor:user, days_since:5, deal_signal:true}', memory: null, outcome: 'success' },
  { time: '10:24', type: 'draft', id: 'T12', detail: 'Giọng trang trọng, ngắn, có câu hỏi', thought: 'Soạn draft dựa trên VoiceProfile: trang trọng, signature chuẩn', signals: null, memory: null, outcome: 'success' },
  { time: '10:25', type: 'user_approve', id: 'T12', detail: 'Đã duyệt và gửi (không sửa)', thought: null, signals: null, memory: 'Draft được approve nguyên => VoiceProfile giữ nguyên', outcome: 'success' },
  { time: '14:00', type: 'detect_reply', id: 'T12', detail: 'Phát hiện reply => Đề xuất đóng', thought: 'Phát hiện reply thực chất: "Cảm ơn, đã duyệt" không phải OOO, không có ask mới', signals: '{contains_new_request:false, has_closing_language:true}', memory: 'Ghi nhận pattern: "Cảm ơn, đã duyệt" = reply thực chất', outcome: 'success' },
  { time: '14:01', type: 'user_confirm_close', id: 'T12', detail: 'User xác nhận đóng', thought: null, signals: null, memory: 'Ghi nhận pattern close vào FollowUpPlaybook', outcome: 'success' },
  { time: '09:00', type: 'bounced', id: 'T15', detail: 'Beta LLC - NDR: account not found', thought: 'Mail bị trả lại: 550 5.1.1. Cần báo user.', signals: '{ndr_code:550, reason:account_not_found}', memory: null, outcome: 'failed' },
  { time: '15:30', type: 'user_correction', id: 'T08', detail: 'User bác phân loại: "cảm ơn đã nhận" != reply thực chất', thought: null, signals: null, memory: 'Ghi nhận correction: "Cảm ơn đã nhận" KHÔNG phải reply thực chất => update FollowUpPlaybook.reply_classification_corrections', outcome: 'corrected' },
  { time: '11:00', type: 'scan', id: 'all', detail: 'Đã quét 80 email, 15 thread mới theo dõi', thought: 'Phát hiện 15 thread cần theo dõi, tự động phân loại bucket', signals: null, memory: null, outcome: 'success' },
  { time: '08:30', type: 'memory_update', id: null, detail: 'Gợi ý exclude domain newsletter.io', thought: '3 thread từ domain này đều bị dismiss sau follow-up => đề nghị exclude', signals: '{domain:newsletter.io, dismiss_count:3}', memory: 'Đề xuất exclude => chờ user xác nhận', outcome: 'pending' }
];

export const ONBOARDING = {
  connected: false,
  loadingComplete: false,
  identitySummary: {
    businessType: 'Tư vấn B2B',
    clientType: 'Startup gọi vốn + Agency nhỏ',
    writingStyle: 'Trang trọng, có số liệu',
    workingHours: 'Sáng - 22h, reply tối muộn',
    language: 'Tiếng Việt + English (50/50)'
  }
};

export const VOICE_PROFILE = {
  samples: [
    '"Cảm ơn anh đã quan tâm. Bên em xin gửi báo giá chi tiết như đính kèm."',
    '"Follow-up về proposal tuần trước. Anh cần thêm thông tin gì không ạ?"'
  ],
  avoided: ['Thân ái', 'Rất mong sớm nhận được phản hồi'],
  toneByRelationship: {
    new: '"Kính gửi anh/chị..."',
    existing: '"Chào anh..."',
    partner: '"Anh ơi, vụ bên A ?"'
  },
  approvedDrafts: [
    { subject: 'Báo giá', pattern: '1 đoạn + đính kèm PDF/link Drive' },
    { subject: 'Xác nhận lịch', pattern: '2 câu, không cần file' }
  ]
};

export const SETTINGS = {
  cadence: { thresholdDays: 3, capPerThread: 3, capVIP: 5, workStart: '08:00', workEnd: '22:00', workDays: 'T2-CN', minGapDays: 2 },
  exclude: {
    contacts: [
      { email: 'hr@internal.com', note: 'Nội bộ', id: 'c1' },
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
  { id: 's1', text: 'Ưu tiên VIP: contact@companyA.com', reason: '5/5 lần duyệt nhanh, chưa bao giờ dismiss', type: 'vip' },
  { id: 's2', text: 'Exclude domain: newsletter.io', reason: '3 thread từ domain này đều bị dismiss', type: 'exclude' },
  { id: 's3', text: 'Hạ cap thread "thông báo" xuống 1 lần', reason: 'Pattern: hay bị dismiss sau lần 2', type: 'cadence' },
  { id: 's4', text: 'Tăng cap cho domain companyB.com', reason: 'Thường xuyên cần 4-5 lần follow-up mới có reply', type: 'cadence' }
];

export const DASHBOARD = {
  scanned: 80,
  monitored: 15,
  resolved: 12,
  approvalRate: '87%',
  avgResponse: '4.2h',
  trend: [3, 5, 8, 4, 7, 2, 6],
  alerts: [
    { severity: 'high', text: '3 thread >2 tuần sắp nguội' },
    { severity: 'medium', text: '5 deal chờ báo giá' },
    { severity: 'high', text: '2 mail bounce' }
  ]
};

