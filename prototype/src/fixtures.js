export const SAMPLE_THREADS = [
  { id: 'bounce-acme', bucket: 'bounced', company: 'ACME rollout', subject: 'Proposal gửi cho acme*** bị bounce', detail: 'Pipeline đang kẹt vì email không tới người nhận.', pill: 'pipeline dead-end', tone: 'bad', aging: 'ngay', value: 'money', to: 'procurement@acme***.con' },
  { id: 'reply-lan', bucket: 'needsReply', company: 'Lan Nguyen', subject: 'Lan hỏi chiết khấu năm, chưa chốt', detail: 'Bạn đang giữ bóng · reply có ask mới · agent không nên đóng thay anh.', pill: 'money + commitment', tone: 'warn', aging: '0d', value: 'money', to: 'lan@client***.com' },
  { id: 'meeting-demo', bucket: 'needsReply', company: 'Demo chiều nay', subject: 'Meeting prep cho demo chiều nay', detail: 'Có tài liệu cần xem trước meeting trong 48h.', pill: 'meeting <48h', tone: 'warn', aging: '36h', value: 'meeting', to: 'team@client***.com' },
  { id: 'confirmed-proposal', bucket: 'replied', company: 'Đối tác proposal', subject: 'Đối tác đã xác nhận nhận proposal', detail: 'Không có ask mới · agent đề xuất đóng thread.', pill: 'suggest close', tone: 'ok', aging: '1d', value: 'commitment', to: 'partner@client***.com' },
  { id: 'awaiting-proposal', bucket: 'followup', company: 'Minh Anh', subject: 'Proposal gửi 5 ngày chưa reply', detail: 'Draft follow-up sẵn · chờ đối tác 5 ngày · confidence cao.', pill: 'draft ready · money', tone: 'info', aging: '5d', value: 'money', to: 'minh@client***.com' },
  { id: 'safe-fyi', bucket: 'followup', company: 'FYI digest', subject: 'Newsletter nội bộ', detail: 'Có thể bỏ qua · deprioritized, không tính vào 9 việc cần quyết.', pill: 'có thể bỏ qua', tone: 'muted', aging: '7d', value: 'deprioritized', to: 'digest@***.com' }
];

export const EMPTY_STATE = {
  connected: false,
  scanned: false,
  loading: false,
  scanProgress: 0,
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
  connected: true,
  scanned: true,
  loading: false,
  scanProgress: 100,
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
    { id: 'needsReply', title: 'Cần bạn trả lời', icon: '↩', items: threads.filter(t => t.bucket === 'needsReply') },
    { id: 'replied', title: 'Đã có reply', icon: '✓', items: threads.filter(t => t.bucket === 'replied') },
    { id: 'followup', title: 'Cần follow-up', icon: '○', items: threads.filter(t => t.bucket === 'followup') },
  ];
}

export function metrics(state) {
  const live = state.threads.length;
  return [
    { label: 'Email mới đã lọc', value: state.scanned ? '80' : '—' },
    { label: 'Việc cần quyết', value: state.scanned ? String(state.threads.filter(t => t.value !== 'deprioritized').length) : '—' },
    { label: 'Thread đang sống', value: state.scanned ? String(live + 18) : '—' },
    { label: 'Đã xử trong prototype', value: String(state.sentCount + state.closedCount) },
  ];
}

export function selectedThread(state) {
  return state.threads.find(t => t.id === state.selectedId) || state.threads[0] || null;
}
