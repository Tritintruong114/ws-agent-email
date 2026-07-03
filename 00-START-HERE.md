# 00 · Start Here — `ws-email-agent` ("Email Agent — theo dõi & nhắc follow-up")

> Đọc file này TRƯỚC bất kỳ file nào khác trong thư mục này.

## Verdict

**Narrow** · Confidence: **Medium–High** · Cập nhật lần cuối `2026-07-03` bởi `brief-to-html` (render xong `mockups.html` + `mockups.data.js` từ `screens-brief.md` — verdict không đổi)

## Tóm tắt (5–10 dòng)

Agent trực inbox của solopreneur (freelancer, consultant, coach, agency-1-người): phát hiện thread đã gửi mà chưa được trả lời thực chất, soạn sẵn follow-up đúng giọng để user duyệt-gửi, và theo dõi reply để đóng/hẹn lại — sao cho không lead nào chết vì bị quên. Đối tượng: người vừa quyết định, vừa trả tiền, vừa dùng, vận hành business gần như hoàn toàn qua email. Đau: 80% deal B2B cần 5+ lần follow-up nhưng 44–48% bị bỏ sau 1 lần nhắc hoặc không bao giờ nhắc — deal không chết vì sản phẩm dở mà chết âm thầm vì một thread bị quên. Vì sao cần AGENT (không phải rule-based reminder như Boomerang/Nudges): lõi việc là phán đoán thread nào thật sự đang chờ mình, tóm tắt ngữ cảnh xuyên thread, và soạn nội dung đúng giọng — cần hiểu ngôn ngữ tự nhiên, nhiều bước, và trí nhớ theo thời gian. Giá trị kinh doanh: một deal cứu được đã trả thừa phí cả năm công cụ; khe trống <$20/mo hướng solo làm đủ detect-chủ-động + AI draft chưa ai chiếm. Nghiệp vụ lõi không dừng ở "nhắc + soạn draft" (dễ đọc thành Gmail plugin thông minh) — agent thực sự **phân loại** từng thread, **quản lý** trạng thái sống của nó, và **điều phối** thành một kế hoạch hành động mỗi ngày (chi tiết: `Agent-Domain-Spec.md`, mục "Agent Business Logic").

## Vì sao verdict này

Agent-fit mạnh (6/6 trục Yes) và pain/khe đều thật, nên không Pivot/Kill. Nhưng buyer/market ban đầu ("VN + Global solopreneurs") gộp hai bài toán channel-reality khác nhau: solo global/VN-bill-quốc-tế coi email LÀ kênh deal (khe thật, substitute không thắng) — còn solo VN bán-online-nội-địa dùng Zalo là kênh chính và Zalo THẮNG ở đó (không có pain email vì không có email). Đây đúng nghĩa "Narrow vì SCOPE", không phải vì WTP chưa kiểm.

**Rủi ro lớn nhất chưa giải quyết:** WTP $9–20/mo còn là giả định, và Gmail Nudges (free) + Boomerang ($4.98/mo) neo kỳ vọng giá thấp dù không thắng về chức năng — chi tiết ở `appendix/dossier.md` §7–§8.

## Đọc tiếp theo — theo vai trò

| Vai trò | Đọc gì | Để làm gì |
|---|---|---|
| **Product / người quyết định** | `01-PRODUCT-MAP.md` | pain → user → workflow → agent job → giá trị → moat, core loop, và scope V0 — trong một trang |
| **Builder / agent engineer** | `Agent-Domain-Spec.md` → `screens-brief.md` → `mockups.html` (double-click, kèm `mockups.data.js`) | nghiệp vụ agent-hoá trên OpenClaw → bộ màn đã biện minh → prototype HTML để duyệt mắt (`appendix/mockups.md` ASCII chỉ để coverage-check, đừng dùng làm nguồn hình) |
| **Cần verify một claim / xem bằng chứng thô** | `appendix/` | dossier, 4 doc research, ASCII coverage gate — bằng chứng phụ trợ, KHÔNG phải quyết định |

## Trạng thái pipeline (cập nhật mỗi stage)

- [x] `run` — verdict + evidence sẵn sàng (`appendix/dossier.md` + 4 doc research)
- [x] `agent-domain-spec` — `Agent-Domain-Spec.md` + `01-PRODUCT-MAP.md` xong
- [x] `grill-to-brief` — `screens-brief.md` xong
- [x] `design-a-screen` + `brief-to-html` — ASCII coverage-check xong (`appendix/mockups.md`, lưu ý layout 3-section cũ chưa vẽ lại — xem TODO trong file); **HTML prototype xong** (`mockups.html` + `mockups.data.js`, render từ brief 4-section ĐÃ CHỐT, không phải từ ASCII cũ).

> Mục nào chưa tick = file tương ứng CHƯA tồn tại trong workspace này. Đừng suy diễn nội dung của nó.

## Scope

- ✓ Đã có tới đây: verdict + evidence (`run`) → nghiệp vụ agent-hoá (`agent-domain-spec`) → bộ màn justified (`grill-to-brief`) → prototype HTML tương tác (`brief-to-html`, `mockups.html`).
- ✗ KHÔNG backend, KHÔNG FE↔BE contract — mọi artifact ở đây là wireframe/spec design-time, không phải code production (Phase-2, ngoài plugin này). `mockups.html` không gọi API, không wire dữ liệu thật, không dùng framework.
- ✗ WTP / urgency / switching là **giả thuyết chưa verify** (xem Decision Gate, `appendix/dossier.md` §8) — không phải dữ kiện.
- ✗ Auto-send, tích hợp Zalo/FB/Outlook, sequence/bulk outreach, phân khúc VN bán-online-nội-địa — ngoài v0 (chi tiết `01-PRODUCT-MAP.md`).
- ✗ Chưa có Prototype tương tác đầy đủ (`new-design/`, rung `/to-prototype`) — `mockups.html` là breadth-lock (states/copy/layout), không phải depth (flow/animation thật). Bucket-order 4-section (Mail bị trả lại → Cần bạn trả lời → Đã có reply → Cần follow-up) khoá ở đây; sticky/collapse trong `mockups.html` chỉ là style tĩnh, chưa phải hành vi cuộn thật.

## Bước kế — chọn theo người nhận

- **Non-tech review (product/stakeholder):** mở `mockups.html` (double-click, cùng thư mục với `mockups.data.js` — hai file không tách rời được) → duyệt từng tab (S1–S4 + Digest) × từng state (nút tròn góc dưới phải) → chấm đúng/sai copy, đủ/thiếu state, thứ tự 4-section S2.
- **Upload lên web-app khác để xem cùng người khác:** zip/gửi kèm CẢ HAI file `mockups.html` + `mockups.data.js` (một mình `.html` mở ra trắng trang).
- **Phase-2 FE build (use-case-renderers):** dùng `screens-brief.md` làm spec + `mockups.html`/`mockups.data.js` làm tham chiếu layout/copy — KHÔNG port code JS/CSS của wireframe vào Renderer, đây là engine tĩnh double-click, không phải seed code.

## Design system đã dùng

`OpenClaw Design System (Openclaw_Design_System.html, bundled demo) — tokens auto-extract qua scripts/extract-design-tokens.sh (88 token, light+dark, --cw-*), map thủ công vào token block của mockups.html (--canvas/--card/--ink/--accent/--ok/--shadow/--radius/--sans từ cw-* tương ứng). Bổ sung bespoke ngoài DS (spec §19, palette-gap #1/#2/#10 trong appendix/mockups.md): 3 mức aging --age-warn/--age-high/--age-crit (vàng/cam/đỏ, cố định ở cả 2 theme — không mượn accent vì accent light-theme gần đen), cộng primitive .qrow/.section-h/.quote/.recipient/.alert-danger/.disabled-reason/.skeleton cho các UI-shape DS chưa có (rich-text editor vẫn tạm dùng textarea per gap #3).`
