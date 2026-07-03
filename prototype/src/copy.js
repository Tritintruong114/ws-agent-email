export const COPY = {
  app: {
    eyebrow: 'Email Revenue Follow-through Agent',
    title: 'ws-email-agent',
    subtitle: 'Agent biến inbox thành hàng đợi trách nhiệm: mail nào có tiền, đang kẹt ở đâu, hôm nay cần xử gì.',
    connected: 'Gmail đã nối',
    disconnected: 'Chưa nối Gmail'
  },
  tabs: {
    queue: 'Việc cần xử lý',
    connect: 'Kết nối Gmail',
    draft: 'Soạn follow-up',
    settings: 'Cài đặt nhắc'
  },
  demo: { label: 'Demo data', empty: 'Trống', sample: 'Có dữ liệu' },
  actions: {
    connect: 'Kết nối Gmail', scan: 'Quét inbox', why: 'Vì sao nổi?', open: 'Mở thread', snooze: 'Hẹn lại', approveSend: 'Duyệt và gửi', rewrite: 'Viết lại', close: 'Đóng thread', notClosed: 'Chưa đóng', fixAddress: 'Sửa & gửi lại', save: 'Lưu cài đặt', deepEvidence: 'Xem bằng chứng sâu'
  },
  trust: {
    noAutoSend: 'Không auto-send. Mọi email gửi đi đều cần anh duyệt.',
    retention: 'Retention 90 ngày · purge khi disconnect · thu hồi quyền bất kỳ lúc nào.',
    evidenceB: 'B mặc định: pattern + subject mask nhẹ. C chỉ mở khi anh bấm xem sâu.'
  },
  empty: {
    title: 'Kết nối Gmail để agent tìm phần trách nhiệm còn lại trong inbox.',
    body: 'Cấp quyền tối thiểu để đọc thread và tạo draft follow-up. Agent không tự gửi và không dùng email để train model dùng chung.'
  },
  sandbox: {
    title: 'Draft follow-up sandbox',
    placeholder: 'Nhập instruction sửa draft...',
    send: 'Gửi',
    note: 'Prototype sandbox — không gửi email thật.',
    reply: 'Đã chỉnh draft ngắn hơn, mềm hơn, vẫn giữ CTA xác nhận bước tiếp theo.'
  }
};
