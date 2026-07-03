export const RISK_PROFILE = [
  { id: 'money', rank: 1, title: 'Money risk', summary: 'deal, payment, quote, order.', tone: 'bad' },
  { id: 'commitment', rank: 2, title: 'Reputation', summary: 'lời hứa, deadline, commitment.', tone: 'warn' },
  { id: 'meeting', rank: 3, title: 'Meeting', summary: 'context trước meeting 48h.', tone: 'info' },
  { id: 'relationship', rank: 4, title: 'Relationship', summary: 'VIP / important contacts.', tone: 'ok' },
];

export const SAMPLE_THREADS = [
  {
    id: 'bounce-acme', bucket: 'bounced', company: 'ACME rollout', subject: 'Proposal gửi cho acme*** bị bounce',
    detail: 'Pipeline đang kẹt vì mail không tới · cần sửa địa chỉ hoặc gửi lại để deal không chết im.',
    pill: 'pipeline dead-end', tone: 'bad', aging: 'ngay', value: 'money', to: 'procurement@acme***.con',
    waitingOn: 'nobody · delivery failed', reason: 'NDR báo không giao được proposal có quote.', snippet: 'Delivery has failed to these recipients...', lastUserSentAt: 'hôm nay 09:12', suggestedNextDate: 'ngay bây giờ', confidence: 'high', valueType: 'money', nextAction: 'Sửa địa chỉ / gửi lại', loop: 'Detect → Surface'
  },
  {
    id: 'reply-lan', bucket: 'needsReply', company: 'Lan Nguyen', subject: 'Lan hỏi chiết khấu năm, chưa chốt',
    detail: 'Bạn đang giữ bóng · reply có ask mới, agent không nên đóng thay anh · chờ đối tác 0 ngày · confidence cao.',
    pill: 'money + commitment', tone: 'warn', aging: '0d', value: 'money', to: 'lan@client***.com',
    waitingOn: 'you', reason: 'Khách có ask mới về giá cuối và ngày bắt đầu.', snippet: 'Bên anh confirm giúp em giá cuối và ngày bắt đầu được không?', lastUserSentAt: '2 ngày trước', suggestedNextDate: 'hôm nay', confidence: 'high', valueType: 'money', nextAction: 'Mở Gmail để trả lời', loop: 'Surface → Human decision'
  },
  {
    id: 'meeting-demo', bucket: 'needsReply', company: 'Demo chiều nay', subject: 'Meeting prep cho demo chiều nay',
    detail: 'Bạn đang giữ bóng · có tài liệu cần xem trước meeting trong 48h.',
    pill: 'meeting <48h', tone: 'warn', aging: '36h', value: 'meeting', to: 'team@client***.com',
    waitingOn: 'you', reason: 'Meeting gần, thread có tài liệu cần xem.', snippet: 'Sharing agenda and prep notes before the demo...', lastUserSentAt: '5 ngày trước', suggestedNextDate: 'trước 15:00', confidence: 'medium', valueType: 'meeting', nextAction: 'Mở Gmail để trả lời', loop: 'Detect → Surface'
  },
  {
    id: 'confirmed-proposal', bucket: 'replied', company: 'Đối tác proposal', subject: 'Đối tác đã xác nhận nhận proposal',
    detail: 'Agent đề xuất đóng, cần anh xác nhận · không có ask mới.',
    pill: 'suggest close', tone: 'ok', aging: '1d', value: 'commitment', to: 'partner@client***.com',
    waitingOn: 'closed candidate', reason: 'Đã có reply xác nhận, không có ask mới.', snippet: 'Received, thanks. We will review internally.', lastUserSentAt: '3 ngày trước', suggestedNextDate: 'đóng hôm nay', confidence: 'high', valueType: 'commitment', nextAction: 'Xác nhận đóng', loop: 'Track reply → Closed/Snoozed'
  },
  {
    id: 'awaiting-proposal', bucket: 'followup', company: 'Minh Anh', subject: 'Proposal gửi 5 ngày chưa reply',
    detail: 'Chờ đối tác 5 ngày · draft follow-up sẵn · confidence cao · Duyệt để gửi.',
    pill: 'draft ready · money', tone: 'info', aging: '5d', value: 'money', to: 'minh@client***.com',
    waitingOn: 'them', reason: 'Proposal/quote đã gửi, quá cadence 5 ngày, chưa có reply thực chất.', snippet: 'Em gửi proposal bản cập nhật để anh/chị xem...', lastUserSentAt: '5 ngày trước', suggestedNextDate: 'hôm nay', confidence: 'high', valueType: 'money', nextAction: 'Duyệt draft follow-up', loop: 'Draft ready → Track reply'
  }
];

export const EMPTY_STATE = {
  onboardingStep: 'connect', connected: false, scanned: false, profileConfirmed: false, oauthError: false,
  loading: false, scanProgress: 0, scanLabel: '', settingsSaved: false, settingsError: false, cadence: '5 ngày',
  excludeCount: 2, threads: [], selectedId: null, sentCount: 0, closedCount: 0,
};

export const SAMPLE_STATE = {
  onboardingStep: 'profile', connected: true, scanned: true, profileConfirmed: false, oauthError: false,
  loading: false, scanProgress: 100, scanLabel: 'Đã dựng xong Risk Profile Draft', settingsSaved: false, settingsError: false, cadence: '5 ngày',
  excludeCount: 2, threads: SAMPLE_THREADS, selectedId: 'awaiting-proposal', sentCount: 0, closedCount: 0,
};

export function seedState(mode) {
  const src = mode === 'sample' ? SAMPLE_STATE : EMPTY_STATE;
  return typeof structuredClone === 'function' ? structuredClone(src) : JSON.parse(JSON.stringify(src));
}
export function buckets(threads) {
  return [
    { id: 'bounced', title: 'Mail bị trả lại', icon: '⚠', items: threads.filter(t => t.bucket === 'bounced') },
    { id: 'needsReply', title: 'Cần bạn trả lời', icon: '↩', items: threads.filter(t => t.bucket === 'needsReply') },
    { id: 'replied', title: 'Đã có reply', icon: '✓', items: threads.filter(t => t.bucket === 'replied') },
    { id: 'followup', title: 'Cần follow-up', icon: '○', items: threads.filter(t => t.bucket === 'followup') },
  ];
}
export function metrics(state) {
  return [
    { label: 'Phân loại', value: '80', sub: 'thread đã đọc & gán loại' },
    { label: 'Quản lý', value: '24', sub: 'thread đang sống, chờ an toàn' },
    { label: 'Điều phối', value: String(state.threads.filter(t => t.value !== 'deprioritized').length || 9), sub: 'việc cần anh xử hôm nay' },
  ];
}
export function selectedThread(state) {
  return state.threads.find(t => t.id === state.selectedId) || state.threads[0] || null;
}
