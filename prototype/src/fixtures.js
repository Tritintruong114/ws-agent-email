export const RISK_OPTIONS = [
  { id: 'lead', label: 'Lead mới / khách hỏi mua', hint: 'Có tiền trong inbox nhưng dễ bị trôi.' },
  { id: 'quote', label: 'Quote / proposal chờ phản hồi', hint: 'Đã gửi giá, cần follow-up đúng lúc.' },
  { id: 'order', label: 'Đơn hàng thiếu thông tin', hint: 'Khách muốn mua nhưng đang kẹt chi tiết.' },
  { id: 'payment', label: 'Payment / invoice', hint: 'Tiền đã gần về nhưng cần nhắc hoặc xác nhận.' },
  { id: 'meeting', label: 'Meeting / deadline gần', hint: 'Không quên context trước cuộc hẹn.' },
  { id: 'vip', label: 'VIP / khách cũ', hint: 'Không để relationship quan trọng bị lạnh.' },
];

export const RISK_PROFILE = [
  {
    id: 'money',
    rank: 1,
    title: 'Money risk',
    summary: 'Ưu tiên lead, quote, đơn hàng, payment — những thread có khả năng làm mất doanh thu nếu trễ.',
    evidence: [
      'Pattern: subject có quote/proposal/payment + chưa có reply thực chất sau 3–7 ngày.',
      'Ví dụ: “Proposal cho acme*** rollout” · “Invoice tháng 7 cho minh***”'
    ],
    tone: 'bad'
  },
  {
    id: 'commitment',
    rank: 2,
    title: 'Commitment / reputation risk',
    summary: 'Theo dõi lời hứa, deadline, tài liệu anh đã nói sẽ gửi để tránh mất uy tín.',
    evidence: [
      'Pattern: “em sẽ gửi”, “confirm giúp”, “chốt trước thứ Sáu” nhưng chưa có hành động đóng vòng.',
      'Ví dụ: “Deck demo cho lan***” · “Confirm scope trước thứ Sáu”'
    ],
    tone: 'warn'
  },
  {
    id: 'meeting',
    rank: 3,
    title: 'Meeting / context risk',
    summary: 'Nhắc thread có tài liệu hoặc context cần đọc trước meeting trong 48h.',
    evidence: [
      'Pattern: calendar language + attachment/link + thời gian gần.',
      'Ví dụ: “Agenda demo chiều nay” · “Notes before call with team***”'
    ],
    tone: 'info'
  },
  {
    id: 'relationship',
    rank: 4,
    title: 'Relationship / VIP risk',
    summary: 'Giữ ấm khách cũ, đối tác quan trọng, người hay mang cơ hội mới.',
    evidence: [
      'Pattern: người gửi lặp lại nhiều lần, thread dài, từng xuất hiện trong deal/meeting trước.',
      'Ví dụ: “Checking in từ anh nam***” · “Follow-up từ partner***”'
    ],
    tone: 'ok'
  },
];

export const SAMPLE_THREADS = [
  { id: 'bounce-acme', bucket: 'bounced', company: 'ACME rollout', subject: 'Proposal gửi cho acme*** bị bounce', detail: 'Pipeline đang kẹt vì email không tới người nhận.', pill: 'pipeline dead-end', tone: 'bad', aging: 'ngay', value: 'money', to: 'procurement@acme***.con' },
  { id: 'reply-lan', bucket: 'needsReply', company: 'Lan Nguyen', subject: 'Lan hỏi chiết khấu năm, chưa chốt', detail: 'Reply có ask mới · cần anh quyết định, agent không tự trả lời thay.', pill: 'money + commitment', tone: 'warn', aging: '0d', value: 'money', to: 'lan@client***.com' },
  { id: 'meeting-demo', bucket: 'needsReply', company: 'Demo chiều nay', subject: 'Meeting prep cho demo chiều nay', detail: 'Có tài liệu cần xem trước meeting trong 48h.', pill: 'meeting <48h', tone: 'warn', aging: '36h', value: 'meeting', to: 'team@client***.com' },
  { id: 'confirmed-proposal', bucket: 'replied', company: 'Đối tác proposal', subject: 'Đối tác đã xác nhận nhận proposal', detail: 'Không có ask mới · agent đề xuất đóng thread.', pill: 'suggest close', tone: 'ok', aging: '1d', value: 'commitment', to: 'partner@client***.com' },
  { id: 'awaiting-proposal', bucket: 'followup', company: 'Minh Anh', subject: 'Proposal gửi 5 ngày chưa reply', detail: 'Draft follow-up sẵn · chờ đối tác 5 ngày · confidence cao.', pill: 'draft ready · money', tone: 'info', aging: '5d', value: 'money', to: 'minh@client***.com' },
  { id: 'safe-fyi', bucket: 'followup', company: 'FYI digest', subject: 'Newsletter nội bộ', detail: 'Có thể bỏ qua · deprioritized, không tính vào việc cần quyết.', pill: 'có thể bỏ qua', tone: 'muted', aging: '7d', value: 'deprioritized', to: 'digest@***.com' }
];

export const EMPTY_STATE = {
  onboardingStep: 'connect',
  selectedRisks: ['quote'],
  connected: false,
  scanned: false,
  profileConfirmed: false,
  loading: false,
  oauthError: false,
  scanProgress: 0,
  scanLabel: '',
  memorySuggestion: false,
  settingsSaved: false,
  cadence: '5 ngày',
  excludeCount: 0,
  threads: [],
  selectedId: null,
  sentCount: 0,
  closedCount: 0,
};

export const SAMPLE_STATE = {
  onboardingStep: 'profile',
  selectedRisks: ['quote', 'lead', 'payment'],
  connected: true,
  scanned: true,
  profileConfirmed: false,
  loading: false,
  oauthError: false,
  scanProgress: 100,
  scanLabel: 'Đã quét 90 ngày gần nhất',
  memorySuggestion: true,
  settingsSaved: false,
  cadence: '5 ngày',
  excludeCount: 2,
  threads: SAMPLE_THREADS,
  selectedId: 'awaiting-proposal',
  sentCount: 0,
  closedCount: 0,
};

export function seedState(mode) {
  const src = mode === 'sample' ? SAMPLE_STATE : EMPTY_STATE;
  return typeof structuredClone === 'function' ? structuredClone(src) : JSON.parse(JSON.stringify(src));
}

export function buckets(threads) {
  return [
    { id: 'bounced', title: 'Mail bị trả lại', icon: '⚠', items: threads.filter(t => t.bucket === 'bounced') },
    { id: 'needsReply', title: 'Reply cần xử lý', icon: '↩', items: threads.filter(t => t.bucket === 'needsReply') },
    { id: 'replied', title: 'Reply có thể đóng', icon: '✓', items: threads.filter(t => t.bucket === 'replied') },
    { id: 'followup', title: 'Follow-up tới hạn', icon: '○', items: threads.filter(t => t.bucket === 'followup') },
  ];
}

export function metrics(state) {
  const live = state.threads.length;
  return [
    { label: 'Email đã xử lý', value: state.scanned ? '80' : '—' },
    { label: 'Quyết định cần anh', value: state.scanned ? String(state.threads.filter(t => t.value !== 'deprioritized').length) : '—' },
    { label: 'Thread đang sống', value: state.scanned ? String(live + 18) : '—' },
    { label: 'Đã xử trong prototype', value: String(state.sentCount + state.closedCount) },
  ];
}

export function selectedThread(state) {
  return state.threads.find(t => t.id === state.selectedId) || state.threads[0] || null;
}
