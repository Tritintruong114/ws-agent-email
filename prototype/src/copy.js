export const COPY = {
  app: {
    eyebrow: 'Email Revenue Follow-through Agent',
    title: 'ws-email-agent',
    subtitle: 'Agent biến inbox thành hàng đợi trách nhiệm: mail nào có tiền, đang kẹt ở đâu, hôm nay cần xử gì.',
    connected: 'Gmail đã nối',
    disconnected: 'Chưa nối Gmail'
  },
  tabs: {
    onboarding: 'Onboarding',
    queue: 'Việc cần xử lý',
    draft: 'Soạn follow-up',
    settings: 'Cài đặt nhắc'
  },
  demo: { label: 'Demo flow', empty: 'S1 Connect', sample: 'Risk Draft' },
  actions: {
    connect: 'Kết nối Gmail', scan: 'Quét 30–90 ngày', why: 'Vì sao nổi?', open: 'Mở thread', snooze: 'Hẹn lại', approveSend: 'Duyệt và gửi', rewrite: 'Viết lại', close: 'Đóng thread', notClosed: 'Chưa đóng', fixAddress: 'Sửa & gửi lại', save: 'Lưu cài đặt', deepEvidence: 'Xem bằng chứng sâu', continue: 'Tiếp tục', confirmProfile: 'Đúng rồi, bắt đầu theo dõi', adjustProfile: 'Sửa ưu tiên', ignoreType: 'Đừng nhắc loại này'
  },
  trust: {
    noAutoSend: 'Không auto-send. Mọi email gửi đi đều cần anh duyệt.',
    retention: 'Retention 90 ngày · purge khi disconnect · thu hồi quyền bất kỳ lúc nào.',
    evidenceB: 'Mặc định chỉ show pattern + subject mask nhẹ. Full evidence chỉ mở khi anh bấm xem sâu.',
    noSharedTraining: 'Đây là operating memory riêng của workspace, không phải fine-tune hay train model dùng chung bằng email của anh.'
  },
  onboarding: {
    intentTitle: 'Điều gì trong email làm anh mất tiền nhất nếu bỏ sót?',
    intentBody: 'Chọn 1–3 rủi ro chính. Phần còn lại agent sẽ tự suy ra sau khi đọc lịch sử email gần đây.',
    connectTitle: 'Kết nối Gmail',
    connectBody: 'Kết nối inbox để agent bắt đầu tìm thread đang chờ trả lời, quét lịch sử gần đây và dựng Risk Profile Draft.',
    scanTitle: 'Đang quét 30–90 ngày gần nhất',
    scanBody: 'Agent đang tìm pattern doanh thu, lời hứa, meeting gần, bounced mail, và khách quan trọng — không chỉ đếm unread.',
    profileTitle: 'Risk Profile Draft',
    profileBody: 'Em sẽ theo dõi inbox của anh theo thứ tự rủi ro này. Anh xác nhận hoặc sửa trước khi agent tạo queue hằng ngày.',
    queueReady: 'Risk Profile đã xác nhận. Queue bên dưới là phần trách nhiệm còn lại, không phải inbox thô.'
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
