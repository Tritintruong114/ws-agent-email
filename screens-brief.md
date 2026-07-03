# Screen Brief — `ws-email-agent` ("Email Agent — theo dõi & nhắc follow-up")

> Phase: bridge (Agent Domain Spec → wireframe). Source: **Agent-Domain-Spec.md** (input chính) · Boi-Canh · MR/JTBD · Target-User · MVP-Coreloop.
> Feeds: /usecase-factory:design-a-screen (ASCII) → /usecase-factory:brief-to-html (HTML) → prototype.
> This is a SPEC (justified screen set), NOT ASCII. Mỗi màn là **projection của một lát Agent-Domain-Spec** (object/state §3-4, decision/approval §8/§11, job §16).

## Design system (REQUIRED — skin source)

- **Location:** OpenClaw Design System (bundled demo) — `~/.claude/plugins/cache/clawexperts/usecase-factory/0.3.0/design-system/Openclaw_Design_System.html`
- **Tokens file:** `design-system-tokens.css` (88 token, light+dark, `--cw-*`; auto-extract từ HTML trên)
- **Components file:** `Openclaw_Design_System.html` (component shapes trong cùng file đóng gói)
- **Buildable palette:** OpenClaw component set (card, button, pill/badge, list-row, drawer, field, toggle) — design-a-screen chấm palette-gap theo bộ này.

## Target user lens (one line)

Solopreneur email-centric (buyer=user=admin), rành công nghệ (quen OAuth/extension), **desktop-first** soạn/review — mobile chỉ triage; **ngưỡng lỗi mail gửi đi cực thấp** → draft+approve, không auto-send; nhạy giá, neo ROI "cứu mấy deal/tháng".

## Channel split (phản biện mặc định)

- **Chạy nền (không phải màn):** Detect (quét awaiting-reply) + Track (phát hiện reply/OOO/NDR) — Agent-Domain-Spec §16.
- **Off-dashboard notification:** digest mỗi sáng — 2 dòng đầu tách khối lượng đã xử lý khỏi số việc cần quyết ("80 email mới · 9 việc cần anh xử lý hôm nay"), rồi breakdown 5 dòng đúng tên bucket + số + 1 câu ngữ cảnh, khớp 1:1 tên với S2 (Agent-Domain-Spec §8 Điều phối, template ĐÃ CHỐT 2026-07-02) → deep-link S2; **NDR "mail bị trả lại" → noti riêng** + row `bounced` trong S2 (§16).
- **On-dashboard (mới, do spec bắt):** xác nhận đóng thread khi có reply (`reply_proposed_close`) sống trong S2 (nhóm riêng) + S3 (confirm view) — vì cần *đọc ngữ cảnh reply* trước khi đóng, chat/noti không đủ. **Bổ sung 2026-07-02:** reply có ask mới (`reply_needs_action`, Agent-Domain-Spec §5/§8 D12) là một nhóm RIÊNG, KHÔNG trộn vào confirm-close — vì hành động đúng là mở Gmail để trả lời, không phải đóng.

## Screens (v0)

### S1 — Kết nối & Consent

- **Projects (spec):** §2 checkpoint OAuth · §14 data-minimization + "Xóa dữ liệu học giọng" · §11 OAuth consent.
- **Purpose (1 dòng):** Bật agent bằng cách nối Gmail và thấy rõ nó đụng/không đụng gì vào dữ liệu — để yên tâm trao quyền inbox.
- **Serves:** cổng bật loop + rào cản tin cậy (E32/E33). Không map J# trực tiếp — gate.
- **User-day moment:** lần đầu dùng, one-time.
- **Must-show:** nút Nối Gmail · scope tối thiểu · chính sách dữ liệu plain-language (đọc email để làm nhiệm vụ — không giấu việc này — nhưng KHÔNG dùng để train/fine-tune model dùng chung; thu hồi được, xóa theo yêu cầu; **retention 90 ngày / purge khi disconnect** — spec §14/§15) · nêu rõ "draft+approve, không tự gửi" trước khi cấp quyền.
- **Actions (mỗi cái → outcome):** primary = Nối Gmail → OAuth → loading "quét lịch sử & học giọng" → `S2.first-run` · (từ chối/thiếu scope) → error.
- **States — display:** empty/first-run = chưa nối · loading = OAuth + quét/học giọng · error = từ chối/thiếu scope · done → S2.
- **States — outcome:** cấp quyền → S2.first-run · từ chối → error (thử lại).
- **Why a screen (not chat/noti):** đọc chính sách + OAuth cần trang đứng yên trước khi trao quyền. Gate bắt buộc.
- **Palette-gap:** none (form + copy blocks).
- **Copy:**
  - Page title: Kết nối Gmail
  - Subtitle: Cấp quyền tối thiểu để agent đọc inbox và soạn follow-up, không tự gửi.
  - Section headings: Quyền truy cập · Cách dùng dữ liệu
  - Action labels: primary = "Kết nối Gmail"
  - Empty-state: Kết nối Gmail để agent bắt đầu tìm thread đang chờ trả lời.

### S2 — Today responsibility queue

- **Projects (spec):** §3 Thread fields (`waiting_on`, `reason_summary`, `last_meaningful_snippet`, `suggested_next_date`, `value_type`, `confidence_label`, `next_action_hint`) · §4 `awaiting_review` + `reply_needs_action` + `reply_proposed_close` + `bounced` · §8 D1/D4/D6/D12/D13 + điều phối hàng ngày · §9 priority/value · §15 Operating Memory signals · §16 digest/NDR notify.
- **Purpose (1 dòng):** Biến inbox đã được agent xử lý thành phần trách nhiệm còn lại hôm nay — ai cần mình trả lời, ai cần mình nhắc, cái gì bị trả lại, cái gì có thể đóng hoặc bỏ qua.
- **Serves:** J1 (Cao) + J2 (Cao) + J4 (Cao–TB). Bước Surface của loop → non-negotiable v0; đồng thời là màn duy nhất user thấy agent đã **Phân loại → Quản lý → Điều phối** trước khi đẩy sang S3.
- **User-day moment:** mỗi sáng lướt "ai chưa trả lời / ai vừa trả lời"; và khi được nhắc.
- **Must-show:** **header 2 dòng, ĐÃ CHỐT 2026-07-02** — "{total_processed} email đã xử lý · {decisions_needed} việc cần anh xử lý hôm nay" (hiệu ứng "agent đã lọc hộ", không phải "còn bao nhiêu email chưa đọc" — Agent-Domain-Spec §8 Điều phối). Ngay dưới header phải có **Agent work trace** 3 nhịp: **Phân loại** `{classified_count}` thread → **Quản lý** `{tracking_count}` thread đang sống (`monitoring`/`sent_pending_reply`/`snoozed`, không hiện trong queue) → **Điều phối** `{decisions_needed}` việc cần người xử lý hôm nay. Trace này là reassurance: agent vẫn đang theo dõi phần không hiện, không phải bỏ sót. Bên dưới là 4 nhóm theo thứ tự khẩn cấp — **`bounced`** (mail bị trả lại, ghim đầu) → **`reply_needs_action`** ("Cần bạn trả lời" — đối tác hỏi thêm, bạn là điểm nghẽn, KHÔNG phải đóng) → **`reply_proposed_close`** ("Đã có reply — xác nhận đóng") → **`awaiting_review`/`draft_ready`** ("Cần follow-up", thread đang chờ đối tác + đã chờ bao lâu + lý do nổi). Trong nhóm "Cần follow-up", thread `value_type=deprioritized` gắn tag **"Có thể bỏ qua"** và thu gọn — KHÔNG phải nhóm thứ 5; **LUÔN hiện số lượng** (vd "71") ngay trên tag để minh bạch, nhưng KHÔNG cộng vào `decisions_needed`. Đây là 4 bucket UI cuối cùng ánh xạ từ 13+ state backend — không hiển thị raw inbox/state nào khác ngoài 4 bucket này.
- **Per-row must-show:** mỗi row không chỉ có subject/sender; bắt buộc hiển thị `waiting_on`, `reason_summary`, `last_meaningful_snippet`, `last_user_sent_at`/aging, `suggested_next_date`, `confidence_label`, `value_type`, và `next_action_hint`. Ví dụ row đúng tinh thần: "Lan hỏi chiết khấu năm, chưa chốt · chờ đối tác 5 ngày · draft sẵn · confidence cao · money". Row `reply_needs_action` phải nói rõ "Bạn đang giữ bóng"; row `reply_proposed_close` phải nói rõ "agent đề xuất đóng, cần anh xác nhận"; row `bounced` phải nói rõ "pipeline đang kẹt vì mail không tới". Nếu không show các field này, màn chỉ là list reminder, chưa phải agent điều phối.
- **Core-loop visibility:** mỗi bucket/row cần gắn nhãn nhỏ cho bước loop hiện tại: `Detect` (mới phát hiện) · `Surface` (đang nổi hôm nay) · `Draft ready` (đã soạn, mở S3 để duyệt) · `Track reply` (đã có reply/ask/bounce) · `Closed/Snoozed` (outcome sau action). Đây là nhãn trạng thái nội bộ, không phải nav; mục tiêu là giúp user hiểu agent đang chạy vòng `Detect → Surface → Draft → Approve & Send → Track`.
- **Meta-core surface trên S2:** khi Operating Memory có đề xuất chờ xác nhận, S2 hiện một banner nhẹ phía trên nhóm bucket: "Agent học được 2 pattern từ cách anh xử lý tuần này" với 1–2 chip có thể xem nhanh, ví dụ `Anh thường bỏ qua thread FYI một lần` hoặc `Khách ACME nên ưu tiên cao hơn`. CTA: "Xem đề xuất" → mở S4 đúng khối "Đề xuất từ Operating Memory". Không áp rule tại S2, không làm S2 thành settings; chỉ surface để meta-core không bị chôn trong drawer.
- **Actions (mỗi cái → outcome):** mở thread cần nhắc → `S3` (draft) · mở thread "đã có reply" → `S3.confirm-close` · mở thread "cần bạn trả lời" → `S3.needs-reply` (xem reply + "Mở trong Gmail") · snooze → rời queue, hẹn lại (§4 snoozed) · dismiss → **rời queue 1 lần** (`dismissed`, KHÔNG ghi exclude — spec §11) và ghi signal cho Operating Memory (chỉ đề xuất pattern, không tự exclude) · mở row bounced → `S3` cảnh báo bounced · mở "Vì sao nổi?" → inline explanation từ `reason_summary` + signals §6/§9 · mở meta-core banner → `S4.memory-suggestions`.
- **States — display:** empty = không thread nào cần quyết nhưng vẫn hiện "Agent đang theo dõi N thread, M thread đang chờ an toàn" · first-run = đang dựng hàng đợi + đang học giọng/cadence ban đầu · loading = skeleton 4 bucket + trace "đang phân loại/điều phối" · error = không quét được Gmail, nêu last successful scan · done = thread xử xong rời nhóm và counts giảm · **memory-suggestion-present** = có banner Operating Memory phía trên bucket · **all-safe** = không có `decisions_needed`, chỉ reassurance "không có thread rủi ro cao bị bỏ quên".
- **States — outcome:** mở → S3 (draft hoặc confirm-close hoặc needs-reply hoặc bounced-alert) · snooze → row rời queue, `snoozed`, trace chuyển sang "đang chờ an toàn" · dismiss → `dismissed` 1 lần + ghi memory signal · bounced → S3 alert · xem đề xuất memory → S4.memory-suggestions · done-all → `all-safe`.
- **Why a screen (not chat/noti):** cần thấy nhiều thread + so sánh độ trễ + phân nhóm + hiểu vì sao agent nổi từng việc + reassurance rằng phần còn lại đang được theo dõi. Chat/noti chỉ đẩy digest; nó không cho user audit được pipeline điều phối, cũng không surface được meta-core suggestion một cách có kiểm soát.
- **Palette-gap:** aging indicator theo ngưỡng ngày (cần token màu cảnh báo — spec §14/§19); nhóm-phân-loại trong list; **agent work trace** compact stepper; row explanation drawer/inline "Vì sao nổi?"; banner Operating Memory suggestion; confidence/value chips; collapsed "Có thể bỏ qua" group.
- **Copy:**
  - Page title: Việc cần xử lý
  - Subtitle: Agent đã lọc inbox; đây là phần còn cần anh quyết.
  - Section headings (thứ tự hiển thị): Mail bị trả lại · Cần bạn trả lời · Đã có reply · Cần follow-up
  - Action labels: primary = "Mở thread" · secondary = "Hẹn lại" · "Bỏ qua" · "Vì sao nổi?" · "Xem đề xuất"
  - Empty-state: Không có việc cần anh xử lý; agent vẫn đang theo dõi các thread còn lại.

### S3 — Chi tiết thread + Draft + Duyệt (+ To:, + confirm-close, + bounced alert)

- **Projects (spec):** §4 `draft_ready`/`draft_generating`/`reply_proposed_close`/`bounced` · §8 D2/D3/D4/D6 · §11 send (Cần duyệt) + đóng (Cần duyệt) · §12 `To:` bind · §13 draft policy · §14 gửi-đúng-người + khoá-gửi.
- **Purpose (1 dòng):** Đọc tóm tắt ngữ cảnh rồi chỉnh bản nháp và gửi (hoặc xác nhận đóng khi đối tác đã trả lời) — không phải đối mặt ô compose trắng.
- **Serves:** J3 (Cao). Bước Draft + Approve&Send của loop → non-negotiable v0.
- **User-day moment:** ngay sau khi mở 1 thread từ S2.
- **Must-show:** tóm tắt hội thoại · **`To: [tên đối tác]`** (spec §14 chống gửi nhầm) · AI draft theo giọng, sửa inline · nút Duyệt và gửi. *(Chế độ confirm-close: thay draft bằng "Đối tác đã trả lời: [tóm tắt reply]" + Đóng / Chưa phải reply.)* *(Chế độ needs-reply, MỚI: thay draft bằng "Đối tác hỏi thêm: [trích reply]" + nút "Mở trong Gmail để trả lời" — KHÔNG có ô soạn, vì soạn-hộ-reply-mới ngoài v0.)*
- **Actions (mỗi cái → outcome):** primary = Duyệt và gửi → `gmail.send` (bind `To`) → `sent_pending_reply` → S2 · Viết lại → `draft_generating` (khoá gửi) → draft mới · Sửa inline → draft cập nhật · Snooze → snoozed · **Đóng (confirm-close)** → `closed` (người xác nhận) → S2 · **Chưa phải reply** → về monitoring (reset cờ) · **Mở trong Gmail (needs-reply)** → thread rời queue tạm, quay lại `monitoring` khi agent quét thấy user đã tự trả lời.
- **States — display:** loading = sinh tóm tắt+draft · **draft_generating = đang viết lại, nút gửi KHOÁ** (spec DP-5) · error = không sinh được/gửi lỗi · done = đã gửi ("đang theo reply") · **confirm-close = view xác nhận đóng** · **needs-reply = view hiển thị ask mới + nút mở Gmail** · **bounced = cảnh báo mail trả lại + hướng xử**.
- **States — outcome:** gửi → sent_pending_reply → S2 · viết lại → draft mới · đóng → closed → S2 · chưa-phải-reply → monitoring · gửi lỗi → error.
- **Why a screen (not chat/noti):** đọc tóm tắt dài + chỉnh draft + xác nhận To: trước khi gửi; đọc ngữ cảnh reply trước khi đóng. Không thể là noti.
- **Palette-gap:** rich-text editor + summary block (spec §17 bespoke); confirm-close view; `To:` field hiển thị; khoá-gửi có lý do (disabled + tooltip).
- **Copy:**
  - Page title: Soạn follow-up
  - Subtitle: Đọc tóm tắt hội thoại và chỉnh bản nháp trước khi gửi.
  - Section headings: Tóm tắt hội thoại · Bản nháp follow-up
  - Action labels: primary = "Duyệt và gửi" · secondary = "Viết lại" · "Hẹn lại" · confirm-close: "Đóng thread" · "Chưa phải reply"
  - Empty-state: không có (luôn mở từ một thread).

### S4 — Cài đặt cadence & loại trừ (drawer)

- **Projects (spec):** CadenceRule/ExcludeRule §3 · §11 exclude (Cần duyệt) · §14 (cap chống spam) · §14 "Xóa dữ liệu học giọng".
- **Purpose (1 dòng):** Đặt nhịp nhắc và loại trừ người không nên bị nhắc — để agent tôn trọng cadence, không thành spam.
- **Serves:** J5 một phần + guardrail tin cậy. Config, không HIGH job trực tiếp.
- **User-day moment:** hiếm — lúc đầu, hoặc khi agent nhắc sai nhịp/nhầm người.
- **Must-show:** ngưỡng ngày (mặc định 3) · cap số lần nhắc/thread · danh sách loại trừ (thêm/xóa) · **control "Xóa dữ liệu học giọng"** (spec §14 PDPD) · **(mới) khối "Đề xuất từ Operating Memory"** (spec §11/§15 Meta-core) — hiện TỐI ĐA 3 loại đề xuất, mỗi cái chờ xác nhận riêng, KHÔNG tự áp: (a) ưu tiên contact/domain (`ContactPreference.priority_tier`), (b) loại trừ contact hay bị dismiss (`FollowUpPlaybook.dismiss_patterns` → gợi ý ExcludeRule), (c) hạ cap/đóng sớm cho loại thread hay bị soft-close (`FollowUpPlaybook.soft_close_patterns`).
- **Actions (mỗi cái → outcome):** Lưu → áp cadence · thêm exclude → contact rời mọi queue (`excluded`) · xóa exclude → contact theo dõi lại (`excluded → untracked`, spec §4) · Xóa dữ liệu giọng → purge UserVoiceProfile · **Xác nhận đề xuất (ưu tiên/loại trừ/hạ cap)** → áp vào `ContactPreference.confirmed=true` / tạo `ExcludeRule` mới / cập nhật `FollowUpPlaybook` tương ứng (spec §9/§11) · **Bỏ qua đề xuất** → discard, KHÔNG tự áp, có thể xuất hiện lại nếu pattern tiếp diễn.
- **States — display:** default (3 ngày, cap, chưa exclude) · saved · error · **có đề xuất chờ xác nhận** (badge đếm trên khối Meta-core).
- **States — outcome:** Lưu → confirm+áp · thêm/xóa exclude → list cập nhật · xác nhận đề xuất → áp dụng + rời khối đề xuất · bỏ qua đề xuất → rời khối, giữ nguyên hệ thống.
- **Why a screen:** browse/edit danh sách exclude + nhiều tham số — list-edit chat/noti làm kém. Drawer, không nav lớn.
- **Palette-gap:** none (field + list + toggle có trong palette).
- **Copy:**
  - Page title: Cài đặt nhắc
  - Subtitle: Chỉnh nhịp nhắc và loại trừ người không muốn agent theo dõi.
  - Section headings: Nhịp nhắc · Loại trừ · Dữ liệu
  - Action labels: primary = "Lưu cài đặt" · secondary = "Thêm loại trừ" · "Xóa dữ liệu học giọng"
  - Empty-state: Chưa loại trừ ai; thêm người hoặc tên miền agent nên bỏ qua.

## Coverage check

| Job / Spec surface | Ưu tiên | Phủ bởi | Ghi chú |
| --- | --- | --- | --- |
| J1 detect cold | Cao | S2 (+ nền Detect §16) | |
| J2 single view chờ | Cao | S2 | |
| J3 draft + context | Cao | S3 | |
| J4 chỉ nổi việc hôm nay | Cao–TB | S2 (priority §9) | |
| J5 sống trong email | TB | hình dạng sản phẩm + S4 | gián tiếp |
| J6 re-engage | TB | (defer) | ngoài v0 (spec §1) |
| §4 reply_proposed_close | — (spec) | S2 nhóm "Đã có reply" + S3 confirm | mới, đóng finding #3/#13 |
| §5/§8 D12 reply_needs_action | — (spec) | S2 nhóm "Cần bạn trả lời" + S3 needs-reply | đóng gap "Phân loại" (substantive_reply lẫn 2 nhánh); GAP-13 heuristic đã chốt |
| §8 D13 value_type=deprioritized | — (spec) | S2 tag "Có thể bỏ qua" trong nhóm "Cần follow-up" (KHÔNG phải nhóm riêng) | đóng gap "Not Worth Following"; GAP-12 heuristic đã chốt |
| §5 NDR / bounced | — (spec) | noti + row bounced S2 + S3 alert | mới, đóng finding #15 |
| §11 send approval + To: | — (spec) | S3 (To: + Duyệt và gửi) | đóng finding #8 |
| §11/§15 Meta-core suggestions (ưu tiên/loại trừ/hạ cap) | — (spec) | S2 banner "Agent học được pattern" → S4 khối "Đề xuất từ Operating Memory" | meta-core không bị chôn trong settings; S2 chỉ surface, S4 mới xác nhận/áp rule |

- **Uncovered HIGH jobs:** không có.
- **Orphan screens:** không có (S1 gate, S4 config — justified).
- **Dead-end CTAs:** không có — mọi action có outcome/route (xem Flows).

## MVP cut line

- **v0 (ship the loop):** S1 (gate) · S2 (Surface + agent work trace + reply-confirm + bounced + memory surface) · S3 (Draft+Approve + confirm-close + To:) · S4 (config tối thiểu + memory confirmation).
- **Off-dashboard (v0):** digest noti → S2; NDR noti; reply-tracking nền.
- **Deferred:** J6 re-engage · analytics · team · auto-send (hard defer) · Outlook.

## Flows (state-transition chains)

- **Onboarding:** `S1.first-run → Nối Gmail → S1.loading (quét+học giọng) → S2.first-run`
- **Core nudge (J1+J2+J3):** `noti sáng → S2 agent work trace → mở thread → S3 → (Viết lại/Sửa) → Duyệt và gửi (To: bind) → S3.done → S2 (sent_pending_reply)`
- **Reply → xác nhận đóng (spec §4):** `Track nền phát hiện reply (conf cao) → S2 nhóm "Đã có reply" → S3.confirm-close → (Đóng) → closed → S2` · nhánh: `(Chưa phải reply) → monitoring`
- **NDR (spec §5/§16):** `Track phát hiện bounce → noti + S2 row bounced → S3 alert → (user sửa địa chỉ) → monitoring | (Bỏ qua) → dismissed`
- **Track nền:** `có reply conf thấp → giữ monitoring (gắn cờ)` · `quá cadence, chưa cap → awaiting_review` · `đạt cap → capped`
- **Snooze:** `S2/S3 → Snooze → snoozed → (đến hạn) → monitoring/awaiting_review`
- **Guardrail nhắc nhầm:** `S2 dismiss (1 lần)` hoặc `S4 → thêm exclude → excluded`
- **Cần bạn trả lời (spec §4/§5 D12):** `Track nền phát hiện reply có ask mới, conf cao/mơ hồ → S2 nhóm "Cần bạn trả lời" → S3.needs-reply → (Mở trong Gmail) → thread rời queue tạm → Track quét thấy user đã tự trả lời → quay lại monitoring`
- **Meta-core suggestion confirm (spec §11/§15):** `S2 banner "Agent học được pattern" → Xem đề xuất → S4 khối "Đề xuất" → (Xác nhận) → áp vào ContactPreference/ExcludeRule/FollowUpPlaybook` · nhánh: `(Bỏ qua) → discard, giữ nguyên hệ thống`

Mọi HIGH job trace qua ≥1 flow. Không dead-end.

## Navigation shape (light)

Lần đầu: chỉ S1 (full-screen gate). Sau khi nối: **S2 là home** (master), tên hiển thị **"Việc cần xử lý"**, mở bằng agent work trace rồi phân **4 nhóm theo thứ tự** Mail bị trả lại → Cần bạn trả lời → Đã có reply → Cần follow-up (+ tag "Có thể bỏ qua" thu gọn bên trong nhóm cuối) — xem Agent-Domain-Spec §8 Điều phối. Khi có memory suggestion, S2 hiện banner nhẹ nhưng không áp rule tại chỗ. **S3** master-detail từ S2 (draft / confirm-close / needs-reply / bounced-alert view tùy state thread). **S4** drawer từ S2 để chỉnh cadence và xác nhận Operating Memory. Noti (digest/NDR) deep-link S2.

## Nav & headings spec (for external generator — pencil…)

> Khối paste-được cho generator ngoài (Pencil…) **kèm design system, KHÔNG kèm ASCII** — cho ý định nav + nhãn, tránh anchoring.

- **Top/shell nav:** master-detail; home = S2. Không tab bar nhiều mục. Access: S4 = drawer (icon Cài đặt); S1 = one-time gate ngoài shell.
- **Per-screen headings:**

| Screen | Page title | Section headings (h2) |
|---|---|---|
| S1 | Kết nối Gmail | Quyền truy cập · Cách dùng dữ liệu |
| S2 | Việc cần xử lý | Mail bị trả lại · Cần bạn trả lời · Đã có reply · Cần follow-up (+ tag "Có thể bỏ qua" thu gọn bên trong) |
| S3 | Soạn follow-up | Tóm tắt hội thoại · Bản nháp follow-up |
| S4 | Cài đặt nhắc | Nhịp nhắc · Loại trừ · Dữ liệu |

## Open questions for /usecase-factory:design-a-screen

- S3: một khung cho 4 view (draft / confirm-close / needs-reply / bounced-alert) hay tách route? Master-detail hai cột giữ queue?
- S3: rich-text editor + summary block — palette OpenClaw có editor chưa hay bespoke?
- Token màu aging (đỏ ≥5d / cam 4d / vàng 3d) + status chip — chưa có trong DS, cần chốt (spec §19).
- S1.loading (quét+học giọng) có thể lâu — progress/skeleton thế nào.
- **ĐÃ CHỐT 2026-07-02** (trước là open question): S2 dùng đúng 4 section dọc theo thứ tự Mail bị trả lại → Cần bạn trả lời → Đã có reply → Cần follow-up; "Có thể bỏ qua" là tag/thu gọn BÊN TRONG "Cần follow-up", không phải section riêng. ASCII hiện tại ở `mockups.md` còn vẽ theo layout 3-section cũ — cần vẽ lại ở lượt `design-a-screen` kế tiếp.
- S4: khối "Đề xuất từ Operating Memory" hiển thị thế nào khi CÓ đề xuất chờ — banner nổi trên cùng S4, hay list riêng dưới "Loại trừ"? **Chốt hướng S2:** S2 có banner nhẹ để surface meta-core, nhưng chỉ deep-link sang S4; không áp rule tại S2.
