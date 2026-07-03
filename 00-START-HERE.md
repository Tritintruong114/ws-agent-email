# 00 · Start Here — `ws-email-agent` ("Email Agent — theo dõi & nhắc follow-up")

> Đọc file này TRƯỚC bất kỳ file nào khác trong thư mục này.

## Verdict

**Narrow** · Confidence: **Medium–High** · Cập nhật lần cuối `2026-07-03` bởi `workspace-integrity-pass` (khôi phục `screens-brief.md`; đánh dấu HTML prototype là bước kế tiếp vì `mockups.html` + `mockups.data.js` chưa có trong repo — verdict không đổi)

## Tóm tắt (5–10 dòng)

Agent trực inbox của solopreneur (freelancer, consultant, coach, agency-1-người): phát hiện thread đã gửi mà chưa được trả lời thực chất, soạn sẵn follow-up đúng giọng để user duyệt-gửi, và theo dõi reply để đóng/hẹn lại — sao cho không lead nào chết vì bị quên. Đối tượng: người vừa quyết định, vừa trả tiền, vừa dùng, vận hành business gần như hoàn toàn qua email. Đau: 80% deal B2B cần 5+ lần follow-up nhưng 44–48% bị bỏ sau 1 lần nhắc hoặc không bao giờ nhắc — deal không chết vì sản phẩm dở mà chết âm thầm vì một thread bị quên. Vì sao cần AGENT (không phải rule-based reminder như Boomerang/Nudges): lõi việc là phán đoán thread nào thật sự đang chờ mình, tóm tắt ngữ cảnh xuyên thread, và soạn nội dung đúng giọng — cần hiểu ngôn ngữ tự nhiên, nhiều bước, và trí nhớ theo thời gian. Giá trị kinh doanh: một deal cứu được đã trả thừa phí cả năm công cụ; khe trống <$20/mo hướng solo làm đủ detect-chủ-động + AI draft chưa ai chiếm. Nghiệp vụ lõi không dừng ở "nhắc + soạn draft" (dễ đọc thành Gmail plugin thông minh) — agent thực sự **phân loại** từng thread, **quản lý** trạng thái sống của nó, và **điều phối** thành một kế hoạch hành động mỗi ngày (chi tiết: `Agent-Domain-Spec.md`, mục "Agent Business Logic").

## Vì sao verdict này

Agent-fit mạnh (6/6 trục Yes) và pain/khe đều thật, nên không Pivot/Kill. Nhưng buyer/market ban đầu ("VN + Global solopreneurs") gộp hai bài toán channel-reality khác nhau: solo global/VN-bill-quốc-tế coi email LÀ kênh deal (khe thật, substitute không thắng) — còn solo VN bán-online-nội-địa dùng Zalo là kênh chính và Zalo THẮNG ở đó (không có pain email vì không có email). Đây đúng nghĩa "Narrow vì SCOPE", không phải vì WTP chưa kiểm.

**Rủi ro lớn nhất chưa giải quyết:** WTP $9–20/mo còn là giả định, và Gmail Nudges (free) + Boomerang ($4.98/mo) neo kỳ vọng giá thấp dù không thắng về chức năng — chi tiết ở `appendix/dossier.md` §7–§8.

## Đọc tiếp theo — theo vai trò

| Vai trò | Đọc gì | Để làm gì |
|---|---|---|
| **Product / người quyết định** | `01-PRODUCT-MAP.md` | pain → user → workflow → agent job → giá trị → moat, core loop, và scope V0 — trong một trang |
| **Builder / agent engineer** | `Agent-Domain-Spec.md` → `screens-brief.md` → `appendix/mockups.md` | nghiệp vụ agent-hoá trên OpenClaw → bộ màn đã biện minh → ASCII coverage-check. HTML prototype là bước kế tiếp, chưa có file trong repo. |
| **Cần verify một claim / xem bằng chứng thô** | `appendix/` | dossier, 4 doc research, ASCII coverage gate — bằng chứng phụ trợ, KHÔNG phải quyết định |

## Trạng thái pipeline (cập nhật mỗi stage)

- [x] `run` — verdict + evidence sẵn sàng (`appendix/dossier.md` + 4 doc research)
- [x] `agent-domain-spec` — `Agent-Domain-Spec.md` + `01-PRODUCT-MAP.md` xong
- [x] `grill-to-brief` — `screens-brief.md` xong
- [x] `design-a-screen` — ASCII coverage-check có sẵn (`appendix/mockups.md`), nhưng file này tự ghi rõ layout 3-section cũ chưa vẽ lại — xem TODO trong file.
- [ ] `brief-to-html` — CHƯA có `mockups.html` + `mockups.data.js` trong repo; cần render lại từ `screens-brief.md` + `design-system-tokens.css`.

> Mục nào chưa tick = file tương ứng CHƯA tồn tại trong workspace này. Đừng suy diễn nội dung của nó.

## Scope

- ✓ Đã có tới đây: verdict + evidence (`run`) → nghiệp vụ agent-hoá (`agent-domain-spec`) → bộ màn justified (`grill-to-brief`) → ASCII coverage-check (`design-a-screen`, cần redraw theo TODO).
- ✗ KHÔNG backend, KHÔNG FE↔BE contract — mọi artifact ở đây là wireframe/spec design-time, không phải code production (Phase-2, ngoài plugin này).
- ✗ WTP / urgency / switching là **giả thuyết chưa verify** (xem Decision Gate, `appendix/dossier.md` §8) — không phải dữ kiện.
- ✗ Auto-send, tích hợp Zalo/FB/Outlook, sequence/bulk outreach, phân khúc VN bán-online-nội-địa — ngoài v0 (chi tiết `01-PRODUCT-MAP.md`).
- ✗ Chưa có HTML prototype trong repo (`mockups.html` + `mockups.data.js`) và chưa có Prototype tương tác đầy đủ (`new-design/`, run `/to-prototype`). Bucket-order 4-section (Mail bị trả lại → Cần bạn trả lời → Đã có reply → Cần follow-up) khoá trong `screens-brief.md`; ASCII hiện tại còn cần redraw.

## Bước kế — chọn theo người nhận

- **Product/stakeholder review:** đọc `01-PRODUCT-MAP.md` rồi `screens-brief.md`; chưa có HTML prototype để double-click.
- **Render review artifact:** chạy lại stage `brief-to-html` để tạo cặp `mockups.html` + `mockups.data.js` từ `screens-brief.md` và `design-system-tokens.css`.
- **Phase-2 FE build (use-case-renderers):** dùng `Agent-Domain-Spec.md` + `screens-brief.md` làm nguồn thật. `appendix/mockups.md` chỉ là coverage-check và còn TODO redraw, không port layout cũ vào Renderer.

## Design system đã dùng

`design-system-tokens.css` có sẵn trong repo (88 token, light+dark, `--cw-*`) để dùng cho bước render HTML tiếp theo. Khi render `mockups.html`, cần map token này vào engine và bổ sung các primitive còn thiếu cho aging/status/disabled reason như ghi trong `appendix/mockups.md`.
