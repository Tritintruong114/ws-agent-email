# Mockups — `ws-email-agent` ("Email Agent — theo dõi & nhắc follow-up")

> **Phase: wireframe (ASCII).** Nguồn: `screens-brief.md` (projection của `Agent-Domain-Spec.md`). Design system: OpenClaw DS (`design-system-tokens.css`).
> Feed: `/usecase-factory:brief-to-html` render HTML **từ brief + design system** (KHÔNG render từ ASCII này — ASCII chỉ là bản đồ + coverage gate).
> Phương án chốt: **A (3 section dọc) làm xương sống** + ghép **C (action đúng-loại + pill tự-khai/row)** + **B (badge đếm/section)** + sticky/collapse. Đồng thuận 3 bản: master-detail; S3 = một khung detail morph (draft/confirm-close/bounced-alert) header có `To:`.
> **Cập nhật 2026-07-02 (ĐÃ CHỐT):** thứ tự 4 section cuối cùng là Mail bị trả lại → Cần bạn trả lời (`reply_needs_action`) → Đã có reply → Cần follow-up; "Có thể bỏ qua" (`value_type=deprioritized` — KHÔNG dùng chữ "giá trị thấp") là tag/thu gọn BÊN TRONG "Cần follow-up", không phải section riêng. **ASCII box bên dưới còn vẽ layout 3-section cũ (thiếu "Cần bạn trả lời", và có nhầm "Ít giá trị" như section riêng) — cần vẽ lại ở lượt `design-a-screen` kế tiếp.** Bảng ánh xạ ngay dưới đã đúng theo quyết định cuối.

## Quyết định IA (chốt)

- **Shell:** master-detail một tầng, không tab bar. Home = S2. Topbar: brand · email đang nối · `⚙ Cài đặt` (drawer S4) · toggle sáng/tối.
- **S2 (master, ~34 cols):** một cột queue, **3 section xếp dọc theo độ khẩn hành động**: `⚠ Mail bị trả lại` → `✓ Đã có reply` → `○ Cần follow-up`. Mỗi section: header + badge đếm, **sticky khi cuộn, auto-collapse khi rỗng/ít-khẩn**. Mỗi row **tự khai loại** (pill + aging) + **action đúng-loại** (an toàn gửi).
- **S3 (detail, ~66 cols):** một khung morph theo state thread đang chọn — draft / confirm-close / bounced-alert. Header bất biến (tên thread + `To:`/Đối tác + status chip); chỉ đổi khối giữa + action bar.
- **S4:** drawer trượt phải (Nhịp nhắc · Loại trừ · Dữ liệu), overlay scrim, không rời S2.
- **S1:** full-screen gate one-time, ngoài shell.
- **Off-dashboard:** digest sáng → deep-link S2; NDR → deep-link section "Mail bị trả lại".
- **Responsive:** <1024px sập single-pane (master → chọn row → detail push, `← Quay lại queue`).

Ánh xạ loại → row action → detail view:

**Thứ tự 4 section (ĐÃ CHỐT, khẩn cấp giảm dần):**

| # | Section (bucket) | Pill / aging | Row action | S3 view |
|---|---|---|---|---|
| 1 | Mail bị trả lại (bounced) | `⚠` danger | Xử lý địa chỉ | bounced-alert: Cập nhật & gửi lại / Bỏ qua |
| 2 | **Cần bạn trả lời** (`reply_needs_action`) | `↩` blue/info | Xem & mở Gmail | needs-reply: trích reply + "Mở trong Gmail để trả lời" (không có ô soạn) |
| 3 | Đã có reply (reply_proposed_close) | `✓` green | Xem & đóng | confirm-close: Đóng thread / Chưa phải reply |
| 4 | Cần follow-up (awaiting) — trong đó thread `value_type=deprioritized` gắn tag **"Có thể bỏ qua"**, thu gọn cuối danh sách (KHÔNG phải section riêng) | `●` aging màu · tag "Có thể bỏ qua" = `○` muted | Mở · Hẹn lại | draft: Duyệt và gửi / Viết lại / Hẹn lại |

Bucket #2 xếp trên #3 vì "Cần bạn trả lời" nghĩa là chính user đang là điểm nghẽn trên một deal còn sống — chi phí trễ cao hơn một quyết định đóng-hay-không một chạm.

---

## S2 ⊕ S3 — Home (3 section dọc) · detail = draft view

> **TODO — BẮT BUỘC redraw ở lượt `/usecase-factory:design-a-screen` kế tiếp.** ASCII dưới đây còn vẽ layout 3-section CŨ (thiếu section "Cần bạn trả lời"; không có tag "Có thể bỏ qua" bên trong "Cần follow-up"). **KHÔNG dùng ASCII này làm nguồn dựng UI/HTML.** Thứ tự bucket ĐÃ CHỐT là 4 (xem bảng "Thứ tự 4 section" ở trên): Mail bị trả lại → Cần bạn trả lời → Đã có reply → Cần follow-up.

```
┌─ Email Agent ───────────────────────────────────────────────────  tintt@…   [⚙ Cài đặt]  [◐] ┐
├───────────────────────────────────┬────────────────────────────────────────────────────────────┤
│ S2 · Cần follow-up                │ S3 · Soạn follow-up                                        │
│ 6 cần nhắc · 2 đã trả lời         │ ┌────────────────────────────────────────────────────────┐ │
│ ─────────────────────────────     │ │ Acme Corp — Báo giá gói Pro                  ● chờ 5d   │ │ ← header (bất biến)
│ ╔═ ⚠ Mail bị trả lại        (1) ═╗│ │ To: [ Lan Nguyen · lan@acme.co ]        [đổi]          │ │ ← §14 To: bind (palette-gap)
│ ║ ⚠ Beta LLC · quote v2         ║│ ├────────────────────────────────────────────────────────┤ │
│ ║   mail@beta.llc không tồn tại ║│ │ Tóm tắt hội thoại                                      │ │ ← h2 (summary block, gap)
│ ║              [ Xử lý địa chỉ ▸]║│ │ • 25/06 Bạn gửi báo giá gói Pro (3 seat).             │ │
│ ╚════════════════════════════════╝│ │ • Lan hỏi chiết khấu năm, chưa chốt. Chờ 5 ngày.      │ │
│ ╔═ ✓ Đã có reply            (2) ═╗│ ├────────────────────────────────────────────────────────┤ │
│ ║ ✓ Cara Studio · Hợp tác Q3    ║│ │ Bản nháp follow-up            ✎ sửa inline · giọng bạn │ │ ← h2 (rich-text, gap)
│ ║   "Đã nhận, cảm ơn bạn!"      ║│ │ ┌──────────────────────────────────────────────────┐  │ │
│ ║              [ Xem & đóng ▸ ] ║│ │ │ Chào Lan,                                        │  │ │
│ ╚════════════════════════════════╝│ │ │ Về chiết khấu năm cho gói Pro, bên mình áp dụng  │  │ │
│ ╔═ ○ Cần follow-up          (6) ═╗│ │ │ 15% nếu ký annual. Chị xem giúp và cho mình biết │  │ │
│ ║ ● Acme Corp · Báo giá   🔴5d ◀║│ │ │ bước tiếp theo nhé.                            ▌ │  │ │
│ ║   Lan hỏi chiết khấu, chưa chốt║│ │ └──────────────────────────────────────────────────┘  │ │
│ ║          [ Mở ▸ ] [ Hẹn lại ] ║│ │ [↻ Viết lại]                        bản nháp · chưa gửi │ │
│ ║ ● Nova Inc · demo       🟠4d  ║│ ├────────────────────────────────────────────────────────┤ │
│ ║   "Tuần này rảnh buổi nào?"   ║│ │            [ Hẹn lại ]        [ ✓ Duyệt và gửi ]       │ │ ← primary (gmail.send)
│ ║          [ Mở ▸ ] [ Hẹn lại ] ║│ │ ⓘ Gửi tới lan@acme.co · không tự gửi, cần bạn duyệt.   │ │
│ ║ ● Orbit Co · gia hạn    🟡3d  ║│ └────────────────────────────────────────────────────────┘ │
│ ║          [ Mở ▸ ] [ Hẹn lại ] ║│                                                              │
│ ╚════════════════════════════════╝│                                                              │
│   ⋮ cuộn — section header sticky   │                                                              │
└───────────────────────────────────┴────────────────────────────────────────────────────────────┘
  🔴≥5d 🟠4d 🟡3d = aging token (PALETTE-GAP: DS chưa có warn/danger)
```

- **3 section theo độ khẩn:** bounced (mail hỏng, phải sửa) → đã reply (xác nhận đóng, nhanh) → cần follow-up (soạn, tốn công). Bounced pin đầu, không bao giờ chìm.
- **Section header sticky + badge đếm `(n)`;** section rỗng auto-collapse còn 1 dòng.
- **Row tự-khai + action đúng-loại (từ C):** bounced→"Xử lý địa chỉ" · reply→"Xem & đóng" (KHÔNG có Gửi) · awaiting→"Mở"+"Hẹn lại"(+Bỏ qua). Ép đúng lối đi hợp lệ → an toàn gửi.
- **Đếm tổng "X cần nhắc · Y đã trả lời"** ở đỉnh (must-show brief S2).
- KHÔNG "nhắc nhanh" — mở S3 mới gửi được (draft+approve).

## S3 — view confirm-close (chọn row "Đã có reply")

```
                                    ┌────────────────────────────────────────────────────────┐
                                    │ Cara Studio — Hợp tác Q3                    ✓ đã trả lời │ ← status chip
                                    │ Đối tác: Cara · cara@carastudio.vn                       │
                                    ├────────────────────────────────────────────────────────┤
                                    │ Tóm tắt hội thoại                                       │
                                    │ • 22/06 Bạn đề xuất hợp tác nội dung Q3. Đang chờ reply.│
                                    ├────────────────────────────────────────────────────────┤
                                    │ Đối tác đã trả lời              Track phát hiện · tin cao │ ← thay khối draft
                                    │ ❝ Đã nhận đề xuất, bên mình đồng ý hướng này. Cảm ơn!   │   (summary reply, gap)
                                    │   Tuần sau ta chốt lịch nhé. ❞      — Cara, 29/06 14:20 │
                                    ├────────────────────────────────────────────────────────┤
                                    │ Đối tác đã phản hồi — đóng thread để agent ngừng nhắc?  │
                                    │      [ Đóng thread ]        [ Chưa phải reply ]         │ ← §11 đóng = người xác nhận
                                    │       → closed              → monitoring (reset cờ)     │
                                    └────────────────────────────────────────────────────────┘
```
Không có `To:`, không editor, không "Duyệt và gửi" — action của loại này là *đóng*, không phải *soạn*.

## S3 — view bounced-alert (chọn row "Mail bị trả lại")

```
                                    ┌────────────────────────────────────────────────────────┐
                                    │ Beta LLC — quote v2                         ⚠ bị trả lại│ ← danger chip (gap)
                                    │ Địa chỉ hỏng: mail@beta.llc  ·  NDR 550 không tồn tại   │
                                    ├────────────────────────────────────────────────────────┤
                                    │ ⚠ Mail bị trả lại                                       │ ← alert/callout (gap: danger tone)
                                    │ Không gửi được tới mail@beta.llc (hộp thư không tồn tại)│
                                    │ Sửa địa chỉ rồi gửi lại, hoặc bỏ qua thread này.        │
                                    ├────────────────────────────────────────────────────────┤
                                    │ To: [ ____________________ ]  (kiểm tra chính tả domain)│ ← field sửa địa chỉ
                                    │      [ Bỏ qua ]        [ Cập nhật & gửi lại ]           │
                                    │       → dismissed       → sent_pending_reply (rebind To)│
                                    └────────────────────────────────────────────────────────┘
```
Không "Đóng"/"Viết lại" — nội dung draft giữ nguyên, chỉ sai người nhận. Nút gửi khoá tới khi sửa địa chỉ (disabled+tooltip, gap).

## S2 — empty (đã nối, không thread nào)

```
┌─ Email Agent ─────────────────────────────────────────────  tintt@…   [⚙ Cài đặt]  [◐] ┐
├───────────────────────────────────┬──────────────────────────────────────────────────────┤
│ S2 · 0 cần nhắc · 0 đã trả lời    │                     ✓                                 │
│ ─────────────────────────────     │      Hiện không có thread nào đang chờ bạn trả lời.   │
│         (list rỗng)               │  Agent đang âm thầm theo dõi 14 thread. Khi ai đó im  │
│                                   │  quá nhịp, chậm phản hồi, hay mail bị trả lại — nó    │
│                                   │  nổi lên đây và báo bạn buổi sáng.                    │
│                                   │        [ Chỉnh nhịp nhắc ]  (→ S4)                    │
└───────────────────────────────────┴──────────────────────────────────────────────────────┘
```
first-run loading (S1→S2): master = skeleton rows "Đang dựng hàng đợi…", detail = "Đang quét lịch sử & học giọng".

## S1 — Kết nối & Consent (full-screen gate)

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                  Kết nối Gmail                                        │ ← h1
│           Cấp quyền tối thiểu để agent đọc inbox và soạn follow-up, không tự gửi.     │ ← subtitle
│   ┌─ Quyền truy cập ───────────────────────┐  ┌─ Cách dùng dữ liệu ─────────────────┐ │
│   │ • Đọc inbox để tìm thread đang chờ     │  │ • Đọc email để làm việc — KHÔNG dùng │ │
│   │                                         │  │   để train model dùng chung          │ │
│   │ • Soạn bản nháp follow-up theo giọng   │  │ • Thu hồi quyền bất cứ lúc nào      │ │
│   │ • KHÔNG tự gửi — mọi mail cần bạn duyệt │  │ • Lưu tối đa 90 ngày · xóa khi ngắt │ │ ← §14 retention
│   └────────────────────────────────────────┘  └─────────────────────────────────────┘ │
│                        [        Kết nối Gmail        ]                                │ ← primary
│              Ngưỡng nhắc mặc định 3 ngày — chỉnh sau trong Cài đặt.                   │
└────────────────────────────────────────────────────────────────────────────────────┘
   error (từ chối/thiếu scope) → banner "Cần cấp đủ quyền để bật agent." [Thử lại]
```

## S4 — Cài đặt (drawer trượt phải)

```
                                              ╔══════════════════════════════════════╗
                                              ║ Cài đặt nhắc                    [✕]  ║
                                              ║ ── Nhịp nhắc ──────────────────────  ║
                                              ║ Ngưỡng chờ trước khi nhắc: [ 3 ] ngày ║
                                              ║ Tối đa số lần nhắc/thread:  [ 3 ]    ║
                                              ║ ── Loại trừ ───────────────────────  ║
                                              ║ • sep@acme.com            [Xóa]      ║
                                              ║ • @noi-bo-cty.com         [Xóa]      ║
                                              ║ [ Thêm loại trừ ]                    ║
                                              ║ ── Dữ liệu ────────────────────────  ║
                                              ║ [ Xóa dữ liệu học giọng ]            ║ ← §14 PDPD
                                              ║            [ Lưu cài đặt ]           ║
                                              ╚══════════════════════════════════════╝
```

---

## Palette-gaps (FLAG cho brief-to-html — nặng nhất trước)

> Cả 3 sub-agent độc lập đều chỉ ra cùng gap #1/#2. Đây là chặn-chất-lượng-v0.

1. **Token cảnh báo warn/danger/aging — DS OpenClaw THIẾU HẲN.** `--cw-*` chỉ có green + teal + accent mono (light theme accent ≈ đen `#1c1c1e`, không đọc ra "nguy"). Cần chốt trước HTML: `--cw-age-warn` (vàng 3d) · `--cw-age-high` (cam 4d) · `--cw-age-crit` (đỏ ≥5d) · `--cw-danger` + mỗi cái `-soft`. Dùng cho: aging chip mỗi row, badge/section "Mail bị trả lại", banner bounced-alert. **Không mượn dark-accent đỏ** (lệch nghĩa + mất ở light).
2. **Status pill đa loại (semantic variant + icon):** pill/badge có sẵn nhưng thiếu bản đồ màu ngữ nghĩa 3 trạng thái (danger ⚠ / aging ● / success ✓). Là linh hồn "row tự-khai" — phải chuẩn hóa.
3. **Rich-text editor** (draft sửa inline + toolbar) — DS chỉ có field 1 dòng → **bespoke** (spec §17). Tạm: textarea (mất định dạng).
4. **Summary block** (tóm tắt hội thoại + reply-quote ❝❞) — cần card read-only kiểu quote; dựng từ `card`+`card-2` tạm được, thiếu kiểu quote.
5. **Selected-row treatment** (master-detail) — list-row chưa có state "đang chọn" đủ mạnh; cần token viền/nền selected (left-rail accent).
6. **Section header sticky + collapse + badge đếm** — dựng header từ list-row + pill; sticky/collapse là hành vi (logic), badge đếm nhấn cần token.
7. **Disabled-with-reason (tooltip)** — nút khoá khi `draft_generating` / bounce chưa sửa To: cần lý do; DS thiếu tooltip pattern.
8. **Long-task progress / skeleton** — S1 loading (quét+học giọng), S3 loading (sinh draft) — DS thiếu progress/skeleton.
9. **To:/recipient field hiển thị (locked)** — cần "recipient chip" read-emphasis; dựng từ field disabled + pill tạm.
10. **Pill "info" (`↩` xanh dương) cho `reply_needs_action` + tông "muted" cho tag "Có thể bỏ qua"** — DS hiện chỉ có success/danger rõ, thiếu biến thể info/neutral-thu-gọn.

Không gap: S4 drawer (field+list+toggle đủ), S1 form (card+button đủ).

## Digest sáng (off-dashboard notification) — ĐÃ CHỐT 2026-07-02

```
┌─ Thông báo · Email Agent ──────────────────────────────────────┐
│ 80 email mới từ hôm qua                                        │
│ 9 việc cần anh xử lý hôm nay                                   │
│                                                                  │
│ 1  Bounced — Beta LLC gửi quote bị lỗi địa chỉ                 │
│ 3  Cần bạn trả lời — khách đang chờ quyết định/thông tin        │
│ 2  Đã có reply — có phản hồi thật, đề xuất đóng hoặc snooze     │
│ 3  Cần follow-up — đã tới hạn, draft agent đã soạn sẵn          │
│ 71 Có thể bỏ qua — đã hạ ưu tiên, không cần xem                 │
│                                          [ Mở hàng đợi ▸ ]      │
└──────────────────────────────────────────────────────────────┘
```
Headline 2 dòng tách khối lượng đã xử lý (80) khỏi số việc cần quyết (9 = 1+3+2+3, KHÔNG cộng 71). Hiệu ứng đúng: "agent đã lọc hộ 80 email, chỉ còn 9 quyết định làm phiền anh" — không phải "còn 80 email chưa đọc". "Có thể bỏ qua" luôn hiện số (71) để minh bạch nhưng không cộng vào 9. Breakdown dùng đúng tên 4 bucket + tag, khớp 1:1 với S2 (Agent-Domain-Spec §8 Điều phối).

## Layout đã loại (audit trail)

- **A — 3 section dọc:** **CHỌN làm xương sống** — must-show "thấy X cần nhắc · Y đã trả lời" một liếc + bounced pin đầu không bao giờ chìm. Vá điểm yếu queue-dài bằng sticky header + auto-collapse.
- **B — Segmented filter:** loại làm spine vì **ẩn 2 loại mặc định** → bounced dễ bỏ sót (sai hướng khi bounced phải luôn thấy). **Giữ lại:** badge đếm trên section header.
- **C — Unified priority inbox:** không làm spine vì priority engine thành điểm-tin-cậy-duy-nhất + yếu khi >30 thread. **Giữ lại (quan trọng):** action đúng-loại + pill tự-khai mỗi row — reply không lộ Gửi, bounced không lộ Đóng (an toàn gửi, khớp ngưỡng-lỗi-cực-thấp).
