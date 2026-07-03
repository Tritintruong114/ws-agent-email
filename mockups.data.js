window.WIREFRAME = {
  meta: {
    title: "ws-email-agent",
    subtitle: "Email Agent · responsibility queue prototype",
    source: "screens-brief.md",
    styleRef: "design-system-tokens.css · OpenClaw Design System",
    avatar: "✉️"
  },
  tabs: [
    { id: "s1", label: "Kết nối Gmail" },
    { id: "s2", label: "Việc cần xử lý" },
    { id: "s3", label: "Soạn follow-up" },
    { id: "s4", label: "Cài đặt nhắc" }
  ],
  screens: {
    s1: {
      states: [
        { id: "first", label: "first-run" },
        { id: "loading", label: "loading" },
        { id: "error", label: "error" }
      ],
      html: {
        first: `
          <style>
            .hero{max-width:980px;margin:12px auto 0;display:grid;grid-template-columns:1.1fr .9fr;gap:14px;align-items:stretch}.heroTitle{font-size:34px;line-height:1.05;letter-spacing:-.04em;margin:0 0 10px}.scopeList{display:grid;gap:8px}.scopeItem{display:flex;gap:10px;padding:10px 12px;border:.5px solid var(--border);border-radius:12px;background:var(--card-2)}.queueRow{padding:11px 0;border-bottom:.5px solid var(--border)}.queueRow:last-child{border:0}.riskGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.riskBox{padding:10px;border:.5px solid var(--border);border-radius:12px;background:var(--card-2)}.thread{border:.5px solid var(--border);border-radius:12px;background:var(--card);padding:12px;margin-bottom:8px}.thread.hot{box-shadow:inset 3px 0 0 var(--bad)}.thread.warn{box-shadow:inset 3px 0 0 var(--warn)}.thread.ok{box-shadow:inset 3px 0 0 var(--ok)}.thread.info{box-shadow:inset 3px 0 0 var(--info)}.evidence{background:var(--card-2);border:.5px solid var(--border);border-radius:12px;padding:10px;margin-top:8px}.mask{font-family:var(--mono);font-size:12px;color:var(--ink-2)}@media(max-width:850px){.hero,.grid2{grid-template-columns:1fr}.riskGrid,.grid3{grid-template-columns:1fr 1fr}}
          </style>
          <div class="hero">
            <div class="card">
              <span class="pill p-blue">draft + approve · không tự gửi</span>
              <h1 class="heroTitle">Kết nối Gmail để agent tìm phần trách nhiệm còn lại trong inbox.</h1>
              <p class="muted">Cấp quyền tối thiểu để agent đọc inbox và soạn follow-up, không tự gửi. Agent đọc email để làm nhiệm vụ trong workspace của anh, không dùng email để train/fine-tune model dùng chung.</p>
              <div class="gap"></div>
              <button class="btn pri big">Kết nối Gmail</button>
              <div class="note">Retention 90 ngày · purge khi disconnect · thu hồi quyền bất kỳ lúc nào.</div>
            </div>
            <div class="card">
              <h3>Quyền truy cập</h3>
              <div class="scopeList">
                <div class="scopeItem"><b>✓</b><div><b>Đọc thread</b><div class="small muted">Phân loại awaiting / replied / bounced / safe wait.</div></div></div>
                <div class="scopeItem"><b>✓</b><div><b>Soạn draft</b><div class="small muted">Tạo bản nháp follow-up để anh duyệt.</div></div></div>
                <div class="scopeItem"><b>✕</b><div><b>Không auto-send</b><div class="small muted">Gửi mail luôn cần anh bấm duyệt.</div></div></div>
              </div>
            </div>
          </div>`,
        loading: `
          <div class="card" style="max-width:760px;margin:40px auto">
            <h2 class="t">Đang quét lịch sử & dựng Risk Profile Draft</h2>
            <div class="progbar"><i style="width:68%"></i></div>
            <div class="step"><span class="mk">✓</span><span class="lb">Đã kết nối Gmail</span><span class="pill p-ok">xong</span></div>
            <div class="step"><span class="mk">◌</span><span class="lb">Đang phân loại 30–90 ngày gần nhất</span><span class="pill p-blue">đang chạy</span></div>
            <div class="step"><span class="mk">◌</span><span class="lb">Đang tìm pattern rủi ro: money / commitment / meeting / people</span><span class="pill p-warn">B mặc định</span></div>
            <div class="locked">Bằng chứng mặc định sẽ là pattern + subject được mask nhẹ (mức B). Full thread (mức C) chỉ mở khi anh bấm xem sâu.</div>
          </div>`,
        error: `
          <div class="modalbox"><div class="mh">Không đủ quyền Gmail <span>⚠️</span></div><div class="mb"><p>Agent chưa thể đọc thread để phân loại trách nhiệm hôm nay.</p><div class="locked">Cần quyền đọc thread và tạo draft. Không yêu cầu quyền auto-send.</div></div><div class="mf"><button class="btn">Để sau</button><button class="btn pri">Thử lại</button></div></div>`
      }
    },
    s2: {
      states: [
        { id: "done", label: "done · 9 decisions" },
        { id: "why", label: "Vì sao nổi?" },
        { id: "memory", label: "memory-suggestion-present" },
        { id: "allSafe", label: "all-safe" },
        { id: "firstRun", label: "first-run" },
        { id: "loading", label: "loading" },
        { id: "error", label: "error" }
      ],
      html: {
        done: `
          <style>.command{display:grid;grid-template-columns:1fr 320px;gap:14px}.digest{font-size:28px;letter-spacing:-.03em;line-height:1.08;margin:0}.bucket{margin-top:12px}.bucket h3{justify-content:space-between}.num{font-size:20px}.trace{display:grid;gap:8px}.trace div{padding:9px 10px;border:.5px solid var(--border);border-radius:12px;background:var(--card-2)}.miniTable{display:grid;gap:7px}.miniTable .between{padding:8px 0;border-bottom:.5px solid var(--border)}.membanner{background:var(--info-soft);border:.5px solid var(--border);border-radius:12px;padding:11px 13px;margin-bottom:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}@media(max-width:900px){.command{grid-template-columns:1fr}}</style>
          <div class="command">
            <div>
              <div class="card">
                <div class="between"><span class="pill p-ok">Agent đã lọc inbox</span><button class="btn soft">Xem coverage</button></div>
                <h1 class="digest">80 email mới · chỉ còn 9 việc cần anh xử lý hôm nay.</h1>
                <p class="muted">Đây không phải inbox. Đây là phần trách nhiệm còn lại sau khi agent đã phân loại, theo dõi và bỏ qua an toàn phần còn lại.</p>
                <div class="gap"></div>
                <div class="trace" style="grid-template-columns:repeat(3,1fr);display:grid">
                  <div><b>Phân loại</b><div class="small muted">80 thread đã đọc & gán loại</div></div>
                  <div><b>Quản lý</b><div class="small muted">24 thread đang sống, chờ an toàn</div></div>
                  <div><b>Điều phối</b><div class="small muted">9 việc cần anh xử hôm nay</div></div>
                </div>
              </div>
              <div class="card bucket">
                <h3>Mail bị trả lại <span class="num">1</span></h3>
                <div class="thread hot"><div class="between"><b>Proposal gửi cho acme*** bị bounce</b><span class="pill p-bad">pipeline dead-end</span></div><div class="small muted">Pipeline đang kẹt vì mail không tới · cần sửa địa chỉ hoặc gửi lại để deal không chết im.</div><div class="gap"></div><button class="btn pri">Mở thread</button> <button class="btn">Vì sao nổi?</button></div>
              </div>
              <div class="card bucket">
                <h3>Cần bạn trả lời <span class="num">3</span></h3>
                <div class="thread warn"><div class="between"><b>Lan hỏi chiết khấu năm, chưa chốt</b><span class="pill p-warn">money + commitment</span></div><div class="small muted">Bạn đang giữ bóng · reply có ask mới, agent không nên đóng thay anh · chờ đối tác 0 ngày · confidence cao.</div><div class="gap"></div><button class="btn pri">Mở Gmail để trả lời</button> <button class="btn">Hẹn lại</button></div>
                <div class="thread warn"><div class="between"><b>Meeting prep cho demo chiều nay</b><span class="pill p-warn">meeting &lt;48h</span></div><div class="small muted">Bạn đang giữ bóng · có tài liệu cần xem trước meeting trong 48h.</div></div>
              </div>
              <div class="card bucket">
                <h3>Đã có reply <span class="num">2</span></h3>
                <div class="thread ok"><div class="between"><b>Đối tác đã xác nhận nhận proposal</b><span class="pill p-ok">suggest close</span></div><div class="small muted">Agent đề xuất đóng, cần anh xác nhận · không có ask mới.</div><div class="gap"></div><button class="btn pri">Xác nhận đóng</button> <button class="btn">Chưa đóng</button></div>
                <div class="thread ok"><div class="between"><b>Khách cảm ơn báo giá tháng trước</b><span class="pill p-ok">suggest close</span></div><div class="small muted">Agent đề xuất đóng, cần anh xác nhận.</div></div>
              </div>
              <div class="card bucket">
                <h3>Cần follow-up <span class="num">3</span></h3>
                <div class="thread info"><div class="between"><b>Proposal gửi 5 ngày chưa reply</b><span class="pill p-blue">draft ready · money</span></div><div class="small muted">Chờ đối tác 5 ngày · draft follow-up sẵn · confidence cao · Duyệt để gửi.</div><div class="gap"></div><button class="btn pri">Mở thread</button> <button class="btn">Bỏ qua</button> <button class="btn ghost">Vì sao nổi?</button></div>
                <div class="locked">Có thể bỏ qua · <b>71</b> thread deprioritized đã thu gọn: newsletter, FYI, auto-ack, tracking chưa tới hạn. (KHÔNG tính vào 9 việc cần quyết.)</div>
              </div>
            </div>
            <aside class="card">
              <h3>Agent work trace</h3>
              <div class="trace"><div>✓ Đã scan 80 email mới</div><div>✓ Đã check deal/payment/order</div><div>✓ Đã check commitment/promises</div><div>✓ Đã check meeting trong 48h</div><div>✓ Đã check bounced/failed delivery</div></div>
              <div class="gap"></div>
              <div class="suggest"><b>Operating Memory</b><div class="small muted">Em thấy anh thường ưu tiên money risk trước reputation risk.</div><button class="btn soft" style="margin-top:8px">Xem đề xuất</button></div>
            </aside>
          </div>`,
        why: `
          <div class="grid2">
            <div class="card"><h2 class="t">Vì sao thread này nổi?</h2><div class="thread hot"><b>Proposal gửi cho acme*** bị bounce</b><div class="small muted">last meaningful message: proposal + quote sent · waiting_on: them · nhưng NDR báo không giao được.</div></div><div class="evidence"><b>Signals</b><div class="miniTable"><div class="between"><span>value_type</span><span class="pill p-bad">money</span></div><div class="between"><span>risk</span><span class="pill p-bad">pipeline blocked</span></div><div class="between"><span>confidence</span><span class="pill p-ok">high</span></div><div class="between"><span>next_action_hint</span><span>Sửa địa chỉ / gửi lại</span></div></div></div></div>
            <div class="card"><h3>Coverage phía sau summary</h3><div class="miniTable"><div class="between"><span>Spam/newsletter/system</span><b>31</b></div><div class="between"><span>FYI / no action</span><b>18</b></div><div class="between"><span>Waiting safely</span><b>9</b></div><div class="between"><span>Already handled</span><b>6</b></div><div class="between"><span>Tracking but not due</span><b>7</b></div></div><div class="note">Mục này tạo trust cho claim "80 email processed → 9 decisions left".</div></div>
          </div>`,
        memory: `
          <style>.membanner{background:var(--info-soft);border:.5px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:14px}.chiprow{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}</style>
          <div class="membanner">
            <div class="between"><b>Agent học được 2 pattern từ cách anh xử lý tuần này</b><button class="btn soft">Xem đề xuất</button></div>
            <div class="chiprow"><span class="pill p-blue">Anh thường bỏ qua thread FYI một lần</span><span class="pill p-blue">Khách ACME nên ưu tiên cao hơn</span></div>
            <div class="note">Chỉ surface để anh biết; agent KHÔNG tự áp rule tại đây — mở "Cài đặt nhắc" để xác nhận từng đề xuất.</div>
          </div>
          <div class="card bucket">
            <h3>Cần follow-up <span class="num">3</span></h3>
            <div class="thread info"><div class="between"><b>Proposal gửi 5 ngày chưa reply</b><span class="pill p-blue">draft ready</span></div><div class="small muted">Chờ đối tác 5 ngày · draft follow-up sẵn, cần anh duyệt.</div><div class="gap"></div><button class="btn pri">Mở thread</button> <button class="btn">Bỏ qua</button></div>
          </div>`,
        allSafe: `<div class="empty"><div class="big">✅</div><b>Không có việc cần anh xử lý</b><div class="muted small">Agent vẫn đang theo dõi 24 thread; 8 thread đang chờ an toàn, 16 thread chưa tới hạn.</div><div class="gap"></div><button class="btn soft">Xem coverage</button></div>`,
        firstRun: `
          <div class="card" style="max-width:760px;margin:24px auto">
            <h2 class="t">Đang dựng hàng đợi lần đầu</h2>
            <p class="muted">Agent đang phân loại inbox và học giọng + cadence ban đầu của anh. Lần đầu có thể mất vài phút.</p>
            <div class="progbar"><i style="width:52%"></i></div>
            <div class="step"><span class="mk">✓</span><span class="lb">Đã phân loại 80 thread gần nhất</span><span class="pill p-ok">xong</span></div>
            <div class="step"><span class="mk">◌</span><span class="lb">Đang học giọng viết từ mail đã gửi</span><span class="pill p-blue">đang chạy</span></div>
            <div class="step"><span class="mk">◌</span><span class="lb">Đang ước lượng cadence nhắc phù hợp</span><span class="pill p-warn">đang chạy</span></div>
          </div>`,
        loading: `<div class="card"><h2 class="t">Đang phân loại & điều phối</h2><div class="progbar"><i style="width:42%"></i></div><div class="grid3"><div class="kpi dim"><div class="lab">Mail bị trả lại</div><div class="val">—</div></div><div class="kpi dim"><div class="lab">Cần bạn trả lời</div><div class="val">—</div></div><div class="kpi dim"><div class="lab">Cần follow-up</div><div class="val">—</div></div></div></div>`,
        error: `
          <div class="loaderr">
            <h2>⚠ Không quét được Gmail</h2>
            <p class="muted">Agent không kết nối được inbox để dựng hàng đợi hôm nay.</p>
            <div class="locked" style="max-width:420px;margin:10px auto">Lần quét thành công gần nhất: hôm qua 08:12 · 9 việc cần xử lý khi đó.</div>
            <div class="gap"></div>
            <button class="btn pri">Thử quét lại</button> <button class="btn">Kiểm tra kết nối</button>
          </div>`
      }
    },
    s3: {
      states: [
        { id: "draft", label: "draft ready" },
        { id: "generating", label: "draft_generating" },
        { id: "needsReply", label: "needs-reply" },
        { id: "confirmClose", label: "confirm-close" },
        { id: "bounced", label: "bounced" },
        { id: "loading", label: "loading" },
        { id: "error", label: "error" },
        { id: "done", label: "done" }
      ],
      html: {
        draft: `<div class="grid2"><div class="card"><h2 class="t">Tóm tắt hội thoại</h2><div class="locked">Proposal đã gửi 5 ngày trước · khách chưa phản hồi thực chất · deal có giá trị cao · follow-up cadence tới hạn hôm nay.</div><div class="gap"></div><h3>To:</h3><div class="field"><input value="minh@client***.com"></div><h3>Bản nháp follow-up</h3><textarea>Chào anh Minh, em gửi lại proposal để anh tiện xem. Nếu anh cần em điều chỉnh phần scope hoặc timeline, anh nhắn em nhé.</textarea><div class="gap"></div><button class="btn pri">Duyệt và gửi</button> <button class="btn">Viết lại</button> <button class="btn">Hẹn lại</button></div><div class="card"><h3>Guardrails</h3><div class="step"><span class="mk">✓</span><span class="lb">Đúng người nhận</span></div><div class="step"><span class="mk">✓</span><span class="lb">Không tự gửi nếu chưa duyệt</span></div><div class="step"><span class="mk">✓</span><span class="lb">Không hứa discount / deadline mới</span></div></div></div>`,
        generating: `<div class="card" style="max-width:760px;margin:auto"><h2 class="t">Đang viết lại bản nháp</h2><div class="progbar"><i style="width:74%"></i></div><div class="locked">Nút gửi đang khóa để tránh gửi bản nháp chưa ổn định.</div><div class="gap"></div><button class="btn pri" disabled>Duyệt và gửi</button> <button class="btn">Dừng viết lại</button></div>`,
        needsReply: `<div class="card" style="max-width:820px;margin:auto"><h2 class="t">Reply cần anh xử lý</h2><div class="suggest"><b>Ask mới:</b> khách hỏi xác nhận giá và timeline trước thứ Sáu.</div><div class="bubbles"><div class="bub cust">Bên anh confirm giúp em giá cuối và ngày bắt đầu được không?</div></div><div class="locked">Đây là ask mới cần anh tự trả lời — agent không soạn hộ reply mới trong v0.</div><div class="gap"></div><button class="btn pri">Mở trong Gmail</button> <button class="btn">Hẹn lại</button></div>`,
        confirmClose: `<div class="modalbox"><div class="mh">Xác nhận đóng thread <span>✅</span></div><div class="mb"><p>Agent thấy đối tác đã reply nhưng không có ask mới. Có thể đóng thread hoặc tiếp tục theo dõi.</p><div class="locked">Đóng thread là hành động cần anh xác nhận, agent không tự đóng mặc định.</div></div><div class="mf"><button class="btn">Chưa phải reply</button><button class="btn pri">Đóng thread</button></div></div>`,
        bounced: `<div class="modalbox"><div class="mh">Mail bị trả lại <span>⚠️</span></div><div class="mb"><p>Email follow-up không giao được. Pipeline đang bị chặn trước khi người nhận thấy mail.</p><div class="field"><label>Địa chỉ hiện tại</label><input value="procurement@acme***.con"></div></div><div class="mf"><button class="btn">Mở Gmail</button><button class="btn pri">Sửa & gửi lại</button></div></div>`,
        loading: `<div class="card" style="max-width:760px;margin:auto"><h2 class="t">Đang sinh tóm tắt & bản nháp</h2><div class="progbar"><i style="width:60%"></i></div><div class="locked">Đang đọc toàn thread để tóm tắt ngữ cảnh và soạn draft theo giọng của anh. Nút gửi sẽ mở khi draft sẵn.</div></div>`,
        error: `<div class="modalbox"><div class="mh">Không gửi được <span>⚠️</span></div><div class="mb"><p>Bản nháp đã sẵn nhưng lần gửi vừa rồi lỗi. Chưa có mail nào được gửi đi.</p><div class="locked">Không có gì được gửi khi chưa thành công — anh có thể thử lại an toàn.</div></div><div class="mf"><button class="btn">Để sau</button><button class="btn pri">Gửi lại</button></div></div>`,
        done: `<div class="empty"><div class="big">📨</div><b>Đã gửi, agent đang theo reply</b><div class="muted small">Thread chuyển sang sent_pending_reply và sẽ quay lại queue nếu tới hạn hoặc có reply mới.</div></div>`
      }
    },
    s4: {
      states: [
        { id: "settings", label: "default" },
        { id: "memory", label: "Risk Profile · B (mặc định)" },
        { id: "deepEvidence", label: "C · evidence drill-down" },
        { id: "saved", label: "saved" },
        { id: "error", label: "error" }
      ],
      html: {
        settings: `<div class="grid2"><div class="card"><h2 class="t">Nhịp nhắc</h2><div class="field"><label>Nhắc sau</label><select><option>3 ngày</option><option>5 ngày</option><option>7 ngày</option></select></div><div class="togglebox"><div><b>Không nhắc quá gắt</b><div class="small muted">Cap follow-up để tránh spam.</div></div><div class="sw on"><i></i></div></div><button class="btn pri">Lưu cài đặt</button></div><div class="card"><h2 class="t">Loại trừ</h2><div class="kbrow"><span class="ic">🏷️</span><div class="tx">newsletter@***</div><button class="btn ghost">Xóa</button></div><div class="kbrow"><span class="ic">👤</span><div class="tx">noreply@***</div><button class="btn ghost">Xóa</button></div><button class="btn">Thêm loại trừ</button><div class="gap"></div><h3>Dữ liệu</h3><button class="btn warn">Xóa dữ liệu học giọng</button></div></div>`,
        memory: `<div class="card" style="max-width:960px;margin:auto"><div class="between"><span class="pill p-blue">Risk Profile Draft · B mặc định</span><button class="btn">Xem bằng chứng sâu</button></div><h2 class="t">Em sẽ ưu tiên inbox theo risk profile này</h2><div class="riskGrid"><div class="riskBox"><b>1. Money risk</b><div class="small muted">deal, payment, quote, order.</div></div><div class="riskBox"><b>2. Reputation</b><div class="small muted">lời hứa, deadline, commitment.</div></div><div class="riskBox"><b>3. Meeting</b><div class="small muted">context trước meeting 48h.</div></div><div class="riskBox"><b>4. Relationship</b><div class="small muted">VIP / important contacts.</div></div></div><div class="evidence"><b>Bằng chứng mặc định (mức B) — pattern + subject mask nhẹ</b><div class="mask">12 thread có pattern báo giá/payment · ví dụ: "Re: Proposal for *** project", "Payment confirmation — *** invoice"</div><div class="mask">7 thread có commitment phrase · ví dụ: "I'll send by Friday — *** deck", "Follow up on promised ***"</div></div><div class="gap"></div><h3>Đề xuất từ Operating Memory</h3><div class="grid3"><div class="riskBox"><b>Ưu tiên ACME</b><div class="small muted">Nâng priority_tier cho domain ACME.</div><div class="gap"></div><button class="btn soft">Xác nhận</button> <button class="btn ghost">Bỏ qua</button></div><div class="riskBox"><b>Loại trừ digest@***</b><div class="small muted">Hay bị dismiss → gợi ý ExcludeRule.</div><div class="gap"></div><button class="btn soft">Xác nhận</button> <button class="btn ghost">Bỏ qua</button></div><div class="riskBox"><b>Hạ cap thread FYI</b><div class="small muted">Hay soft-close → giảm số lần nhắc.</div><div class="gap"></div><button class="btn soft">Xác nhận</button> <button class="btn ghost">Bỏ qua</button></div></div><div class="gap"></div><button class="btn pri">Xác nhận profile</button> <button class="btn">Sửa ưu tiên</button> <button class="btn">Bỏ qua đề xuất</button></div>`,
        deepEvidence: `<div class="grid2"><div class="card"><h2 class="t">C · Full evidence drill-down</h2><p class="muted">Chỉ mở khi user click "Xem bằng chứng sâu"; KHÔNG show mặc định để tránh cảm giác bị soi quá mức.</p><table><tr><th>Risk</th><th>Thread</th><th>Signal</th></tr><tr><td>Money</td><td>Re: Proposal for ACME rollout</td><td>quote + no reply 5d</td></tr><tr><td>Commitment</td><td>Friday deck promise</td><td>user promised send by date</td></tr><tr><td>Meeting</td><td>Demo prep notes</td><td>meeting in 36h</td></tr></table></div><div class="card"><h3>Privacy stance</h3><div class="locked">B mặc định đủ trust cho skeptical buyer. C chỉ khi click sâu. Operating Memory cập nhật preference/rule, không tự nâng quyền auto-send.</div></div></div>`,
        saved: `<div class="empty"><div class="big">✅</div><b>Đã lưu Risk Profile</b><div class="muted small">Agent sẽ dùng profile này để ưu tiên queue, nhưng mọi gửi mail vẫn cần anh duyệt.</div></div>`,
        error: `<div class="modalbox"><div class="mh">Không lưu được cài đặt <span>⚠️</span></div><div class="mb"><p>Thay đổi cadence/loại trừ chưa lưu được. Cài đặt hiện tại vẫn giữ nguyên.</p></div><div class="mf"><button class="btn">Để sau</button><button class="btn pri">Lưu lại</button></div></div>`
      }
    }
  }
};
