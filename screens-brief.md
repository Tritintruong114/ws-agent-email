# Screen Brief — ws-email-agent

> Phase: bridge (research → wireframe). Source: Boi-Canh-Va-Van-De · MR-email-agent-Problem-Solution · Target-User-email-agent · MVP-Coreloop
> Feeds: /usecase-factory:design-a-screen (ASCII) → /usecase-factory:brief-to-html (HTML) → prototype.
> This is a SPEC (justified screen set), NOT ASCII. No code, no layout.

## Design system (REQUIRED — skin source for every render)
- Location: ws-agent-email/design-system-tokens.css
- Tokens file: design-system-tokens.css (88 token, light+dark, --cw-*)
- Components file: TBD (previously mockups.html engine; to be resolved when brief-to-html runs)
- Buildable palette: TBD

## Target user lens (one line)
Solopreneur email-centric (consultant, coach, freelancer, agency-1-nguoi), desktop-first, tech-savvy (dung GenAI), buyer=user=admin, WTP $9-20/mo, nguong loi gui di cuc thap.

## Channel split (if any)
- Dashboard (S4) + Queue (S2) la man. Notification chi dung o 2 truong hop: (1) digest sang deep-link S2, (2) alert NDR/bounced real-time.
- Cai dat va Operating Memory la man (can browse + edit), khong phai chat.
- Activity Log la man (can search + filter), khong phai noti.

## Screens (v0)

### S1 — Ket noi & Onboarding
- Purpose (1 line): Cho phep agent truy cap Gmail, hieu identity + giong viet cua user, va confirm truoc khi bat dau lam viec.
- Serves: Precondition toan loop + Trust building
- User-day moment: Lan dau mo app — user vua tai/dang ky, tam ly de phong, muon biet agent se doc gi, lam gi, co an toan khong
- Must-show: Logo + ten app, Nut "Ket noi Gmail", Data policy ngan, Loading spinner, Identity Summary (business, client type, writing tone, working hours, thread count), Nut "Bat dau"
- Actions (each → its outcome): Ket noi Gmail → OAuth → S1.loading · Chinh thong tin / Chinh giong → S1.edit_profile (modal/inline) → S1.identity_summary (da cap nhat) · Khong dung, quet lai → S1.loading · Bat dau dung → S4 (Dashboard lan dau)
- States — display: pre_connect=<logo+nut+policy> · loading=<spinner+message> · identity_summary=<identity card+3 buttons> · edit_profile=<modal> · error=<thu lai>
- States — outcome: Bat dau → S4.first-run · Chinh → identity_summary (da cap nhat) · Quet lai → loading
- Why a screen (not chat/notification): User can can thay dong thoi nhieu thong tin (OAuth, identity summary, data policy, confirm) — chat khong lam duoc dieu nay.
- Palette-gap: none
- Copy (via step 7 — pending):
  - Page title: Ket noi Gmail
  - Subtitle: De em hieu anh va bat dau lam viec
  - Section headings: (khong co section — flow 1 trang)
  - Action labels: primary=Ket noi Gmail · secondary=Bat dau dung (sau identity_summary)
  - Empty-state: hay an "Ket noi Gmail" de bat dau

{ENDMARKER}

### S2 — Hang doi "Viec can xu ly hom nay"
- Purpose (1 line): Hoi dap cau hoi "Toi can xu ly cai gi?" — danh sach quyet dinh cuoi cung sau khi assistant da loc, phan loai, soan draft san.
- Serves: J1 (phat hien tu dong), J2 (mot man duy nhat), J4 (chi noi can hanh dong)
- User-day moment: Sang mo app sau digest, hoac bat ky luc nao muon check "co gi can toi quyet khong"
- Input (agent → S2): decisions_needed · total_processed · 4 buckets moi bucket co list thread + count · moi thread: subject, sender, waiting_on, value_type, confidence_label, next_action_hint, days_since_last_user_sent, last_meaningful_snippet, reason_summary
- Output (S2 → agent): Click thread → mo S3(thread_id) · Dismiss → thread→dismissed · Snooze(ngay) → thread→snoozed(snooze_until) · Expand "Co the bo qua" → hien deprioritized threads (ko state change) · Cac hanh dong gui/dong/tra loi deu o S3
- Actions (each → its outcome): primary=Click thread → S3(thread_id) · secondary=Dismiss → dismissed · Snooze → snoozed · Expand deprioritized → show tag threads
- States — display: loading · first_run (trong sau khi onboarding) · empty (khong co gi can xu ly) · queue (4 buckets) · error
- States — outcome: Dismiss → S2 updated (thread bien mat) · Snooze → S2 updated (thread bien mat den ngay) 
- Why a screen (not chat/notification): User can thay nhieu thread cung luc, so sanh, va quyet dinh — chat/noti khong lam duoc.
- Palette-gap: none

### S2 — Hang doi + Chi tiet (master-detail)
- Purpose (1 line): Hoi dap "Toi can xu ly cai gi?" — queue trai + chi tiet phai, navigate nhanh giua cac thread ma khong roi queue.
- Serves: J1, J2, J3, J4
- User-day moment: Sang mo app hoac bat ky luc nao — mo queue, click thread, quyet dinh, click thread tiep theo, ko can back.
- Layout: Sidebar trai = 4 buckets thread list (S2) · Content phai = chi tiet thread + draft + actions (S3)
- Input (agent → S2): decisions_needed · total_processed · 4 buckets · moi thread: subject, sender, waiting_on, value_type, confidence_label, next_action_hint, days_since, last_meaningful_snippet, reason_summary
- Output (S2 → agent): Click thread (trai) → hien chi tiet (phai) · Dismiss → thread→dismissed · Snooze(ngay) → thread→snoozed
- Input (agent → S3 phai): thread_id · thread_summary · draft · reason_summary · sender · subject · last_meaningful_snippet · next_action_hint
- Output (S3 phai → agent): Duyet va gui → sent_pending_reply · Viet lai → draft_generating · Xac nhan dong (khi reply_proposed_close) → closed · Bac — chua phai reply → monitoring (reset co) · Snooze(ngay) → snoozed · Dismiss → dismissed · Mo trong Gmail (khi reply_needs_action) → Gmail tab
- States — display (S2 trai): first_run · empty (khong co gi) · loading · queue_4_buckets · error
- States — display (S3 phai): draft_ready · draft_generating · reply_proposed_close (Da co reply, muon dong ko?) · reply_needs_action (Can ban tra loi thu cong) · bounced (Mail ko gui duoc) · done (da gui/dong) · error
- States — outcome: Click other thread → content phai doi sang thread khac · Duyet+gui → S3.done → thread bien khoi queue trai · Dismiss → S2 + S3 updated
- Why a screen (not chat/notification): User can thay nhieu thread cung luc, so sanh, so luot, va navigate nhanh — chat/noti khong lam duoc.
- Palette-gap: Master-detail layout (splits sidebar + content)

### S4 — Dashboard (Agent Performance & Business Insights)
- Purpose (1 line): Tra loi "Thue agent nay, business anh duoc gi?" — performance agent va insights tu email pipeline theo ngay/tuan/thang.
- Serves: Trust building, Renewal justification, Business value visibility
- User-day moment: Mo app lan dau trong ngay, hoac cuoi tuan muon review hieu qua
- Input (agent → S4): date_range (hom nay/tuan/thang) · email_scanned · threads_monitored · threads_resolved · draft_approval_rate · reply_detection_accuracy (close-confirm rate) · avg_response_time · follow_up_coverage · deal_pipeline_from_email · thread_aging (thread qua han) · top_contacts · bounce_rate · busiest_days · corrections_applied (Operating Memory updates)
- Output (S4 → agent): Click metric card → S2 (filter bucket) · Click date filter → reload S4 voi range moi · Click insight (vd thread aging) → S2 focus specific thread · Click xem chi tiet → S6 (Activity Log)
- States — display: loading · first_run (can 3 ngay de co insights) · dashboard (metrics + insights + date filter) · empty_range (khong co data trong range) · error
- States — outcome: Click date → dashboard reloaded · Click metric → S2 · Click insight → S2 or S6
- Why a screen (not chat/notification): User can thay nhieu metric + trend cung luc, so sanh tuan/thang — chat khong lam duoc.
- Palette-gap: Charts / bar charts (metric xu huong theo thoi gian)


### S6 — Activity Log (Audit Trail chi tiet)
- Purpose (1 line): Trace tung quyet dinh cua agent va user — agent nghi gi, lam gi, dua tren du lieu nao, va ket qua ra sao.
- Serves: Trust safety net, Debugging, Giai trinh khi co loi
- User-day moment: Khi nghi ngo agent lam sai, hoac muon xem lai lich su mot thread cu the, hoac cuoi tuan review hoat dong
- Input (agent → S6): Moi dong = mot event voi cau truc sau:

  **Event schema (moi event):**
  - timestamp: ISO datetime
  - event_type: scan | classify | draft | draft_regenerate | approve_send | reject_send | propose_close | confirm_close | reject_close | ndr_alert | snooze | dismiss | memory_update | human_correction | error
  - thread_id: link to thread (click → S2 focus)
  - actor: agent | user | system
  - action: hanh dong cu the (vd "De xuat gui follow-up lan 2 cho #T12")
  - **agent_thought** (MOI): Ly do agent quyet dinh the. Vi du: "Phat hien thread #T12 da 5 ngay khong reply, confidence cao (2 tin hieu: last_actor=user + subject chua gia), chua cap (1/3), thuoc bucket Cần follow-up"
  - **input_signals** (MOI): Tin hieu agent da dung de quyet dinh. Vi du: {last_actor: user, days_since: 5, reply_count: 0, follow_up_count: 1, confidence_label: cao, intent: awaiting_their_reply}
  - detail: Mo ta tu nhien (vd "Da soan draft: 'Chao anh Tuấn, em follow-up ve bao giá...'")
  - **user_action_detail** (MOI - neu actor=user): User da lam gi chinh xac. Vi du: "User bam Duyet va gui, khong sua draft" hoac "User bac de xuat dong, ghi chu: 'chua phai reply thuc chat, chi la xac nhan da nhan'"
  - outcome: success | failed | pending | dismissed
  - **state_change** (MOI): Thread state truoc → sau. Vi du: "awaiting_review → draft_ready" hoac "reply_proposed_close → monitoring (reset co)"
  - **memory_impact** (MOI - neu co): Operating Memory bi anh huong gi. Vi du: "User bac dong → agent ghi nhan pattern: reply co tu 'da nhan duoc' KHONG phai reply thuc chat → update FollowUpPlaybook.reply_classification_corrections"

- Example events (de hinh dung):
  ```
  05/07 10:23:15 | classify | #T12 | agent
  → Agent nghi: "Thread #T12: last_actor=user, last_sent=30/06, reply_count=0, confidence=cao (subject co 'bao gia' + nguoi gui la domain DN)"
  → Tin hieu: {days_since:5, deal_signal:true, repeat_contact:true, intent:awaiting_their_reply}
  → Hanh dong: Gan intent=awaiting_their_reply, lenh score=CAO, chuyen monitoring→awaiting_review
  → Ket qua: Thread #T12 vao bucket "Can follow-up"
  ```
  ```
  05/07 14:00:12 | approve_send | #T12 | user
  → User: Bam "Duyet va gui", khong sua draft
  → State: draft_ready → sent_pending_reply
  → Memory: draft duoc approve nguyen → VoiceProfile giu nguyen
  ```
  ```
  05/07 14:00:12 | propose_close | #T12 | agent
  → Agent nghi: "Phat hien reply tu khach: 'Cam on, ben anh da duyet. Gui PO nhe' — confidence=cao (reply thuc chat: khong phai OOO, co cam tu xac nhan, khong co ask moi)"
  → Tin hieu: {contains_new_request:false, has_closing_language:true, sender!=user}
  → Hanh dong: De xuat dong, chuyen thread→reply_proposed_close
  → Memory: Ghi nhan pattern nay → cai thien phan loai reply lan sau
  ```

- Output (S6 → agent):
  | User action | Output |
  |---|---|
  | Filter by event_type | S6 filtered |
  | Filter by date range | S6 filtered |
  | Search thread_id / subject | S6 filtered |
  | Click thread_id link | → S2 master-detail, focus thread |
  | Export log | Download CSV/JSON |
  | Expand event (MOI) | Show/hide chi tiet agent_thought, input_signals, memory_impact |

- States — display: first_run (chua co event) · activity_log (danh sach event co expand/collapse) · filtered · empty_filter · event_detail_expanded · error
- States — outcome: Filter → list filtered · Click event → expand detail · Click link → S2
- Why a screen (not chat/notification): User can search, filter, browse lich su events — chat/noti khong lam duoc voi so luong event lon va can filter cross-reference.
- Palette-gap: Expandable row component
### S5 — Operating Memory (Agent nghi gi ve anh va khach hang)
- Purpose (1 line): Thay toan bo nhung gi agent da hoc duoc ve user, ve khach hang, va ve cach agent dang giao tiep — de user xac nhan, chinh sua, hoac bac bo truoc khi agent ap dung.
- Serves: Trust building (minh bach tuyet doi ve hoc tap), User control, Sales Operating Memory kiem soat duoc
- User-day moment:
  - Lan dau: sau onboading, xac nhan identity + giong
  - Hang ngay: sau khi sua draft, muon cap nhat avoided_phrases
  - Hang tuan: review de xuat tu Operating Memory (uu tien contact, exclude, pattern moi)
  - Dinh ky: muon xem agent dang "nghi" gi ve business cua minh

- Layout: 3 tabs (Co ban / Nang cao / Goi y) + summary card o tren cung

---

#### Tab 1 — CO BAN (Agent hieu gi ve anh)

**Input (agent → S5):**

1. **Identity Summary** (gioi thieu agent "nghi" ve user):
   - Business type: "Anh lam consulting marketing B2B"
   - Client type: "Chu yeu startup goi von + agency nho"
   - Writing style: "Trang trong, co so lieu, signature chuan"
   - Working hours: "Sang la chinh, hay reply toi muon"
   - Language: "Tieng Viet + English (50/50)"
   - Source: tu OAuth quet + Identity Summary tu S1
   - **User action:** Xac nhan dung / Chinh inline / "Khong dung, quet lai"

2. **Voice Profile** (giong viet cu the):
   - **Sample phrases** — 3-5 cau trich tu sent history ma agent cho la dai dien cho giong user:
     *"Cam on anh da quan tam. Ben em xin gui bao gia chi tiet nhu dinh kem."*
     *"Follow-up ve proposal tuan truoc. Anh can them thong tin gi khong a?"*
     *(hien thi duoi dang quote, co the edit/delete tung cau)*
   - **Avoided phrases** — cum tu agent thay user hay xoa (Edit distance tracking):
     *"Than ai"*, *"Rat mong som nhan duoc phan hoi"* → User action: Confirm / Unconfirm tung cai
   - **Tone default:** Trang trong nhe / Than mat / Chuyen nghiep (tu dong phat hien)
     - User action: Confirm hoac chuyen sang tone khac (override)
   - **Length default:** Ngan (2-3 cau) / Trung binh (1 doan) / Dai (2+ doan)
     - User action: Chon mac dinh

3. **Cadence hien tai** (tom tat — chi tiet o S7):
   - Threshold: 3 ngay
   - Cap per thread: 3 lan
   - Quiet hours: 22:00-08:00
   - **User action:** Click "Cai dat" → S7

4. **Exclude summary** (tom tat — chi tiet o S7):
   - Excluded contacts: 2 (noi bo)
   - Excluded domains: 1 (newsletter)
   - **User action:** Click "Cai dat" → S7

---

#### Tab 2 — NANG CAO (Cach agent dang nhap tin voi khach hang)

**Input (agent → S5):**

1. **Tone by Relationship** — agent phat hien user viet khac nhau tuy moi quan he:
   - **Khach moi** (is_repeat_contact=false): Trang trong, co xung ho day du
     *"Kinh gui anh/chị…"*
   - **Khach cu** (is_repeat_contact=true): Than mat hon, xung ho gan gui
     *"Chao anh, em follow-up ve…"*
   - **Doi tac lau nam** (N follow-up da gui): Rut gon, di thang vao van de
     *"Anh oi, vu ben A ?"*
   - **User action:** Confirm tung pattern / Chinh inline / Xoa pattern

2. **Approved Draft Library** — nhung draft da duoc user duyet gui gan nhu nguyen van:
   - Moi dong: subject thread · trich draft · tone setting · result (co duoc reply khong)
   - **User action:** Pin/Unpin lam mau · Delete khoi thu vien · "Dung mau nay cho lan sau"

3. **Draft Patterns** — agent hieu khi nao nen viet ngan/dai, khi nao nen kem link/tai lieu:
   - *"Cac thread ve bao gia: hay viet 1 doan + dinh kem PDF / link Drive"*
   - *"Cac thread xac nhan lich: viet 2 cau, khong can file"*
   - **User action:** Xac nhan / Chinh / Xoa

4. **Reply Classification Corrections** — cac lan user bac/sua phan loai cua agent:
   - *"05/07 #T12: Agent phan loai la 'reply thuc chat, de xuat dong' → User bac 'chua phai reply thuc chat' → Agent ghi nhan pattern: 'Cam on da nhan' KHONG phai reply thuc chat"*
   - *"04/07 #T08: Agent phan loai la 'partial_ack' → User sua thanh 'co ask moi' → Agent ghi nhan pattern: 'khi nao co the call?' la cau hoi, can de y"*
   - **User action:** Xem chi tiet (mo S6 event) / Xoa correction / "Dung pattern nay"

5. **Soft Close Patterns** — cac thread hay bi dismiss sau N lan follow-up:
   - *"Cac thread tu mien 'thong bao su kien': thuong bi dismiss sau 1-2 lan follow-up → De xuat ha cap xuong 1"*
   - **User action:** Accept de xuat (cap→1) / Bac / Snooze de xuat

---

#### Tab 3 — GOI Y (Suggestions tu Operating Memory)

**Input (agent → S5):**

| De xuat | Ly do | User action |
|---------|-------|-------------|
| Uu tien contact: contact@companyA.com | "5/5 lan duyet nhanh, chua bao gio dismiss" | Xac nhan (→VIP) / Bac |
| Exclude domain: newsletter.io | "3 thread tu domain nay deu bi dismiss sau follow-up" | Xac nhan (→ExcludeRule) / Bac |
| Ha cap thread kieu 'thong bao' xuong 1 | "Pattern: hay bi dismiss sau lan 2" | Xac nhan (→cap=1) / Bac / Dieu chinh |
| Tang cap cho domain companyB.com | "Thuong xuyen can 4-5 lan follow-up moi co reply" | Xac nhan (→cap=5) / Bac |
| Ghi nhan 'tone_by_relationship' hien tai | "Phat hien su khac biet giong giua khach moi va khach cu" | Xac nhan / Chinh / Bac |

---

**Output (S5 → agent):**

| User action | Output |
|-------------|--------|
| Xac nhan Identity Summary | Confirm — dung cho S1 va cac tooltip |
| Chinh Voice Profile (tone, avoided_phrases, sample) | Update UserVoiceProfile → draft lan sau sat hon |
| Xac nhan tone_by_relationship | Confirm → ap dung tu thread tiep theo |
| Pin/Unpin draft mau | Update ApprovedDraftLibrary |
| Xac nhan Correction pattern | Update FollowUpPlaybook.reply_classification_corrections |
| Xac nhan/Chinh Draft Pattern | Update FollowUpPlaybook.draft_patterns |
| Xac nhan ContactPreference | priority_tier→confirmed=true → anh huong S2 sorting |
| Accept/Bac de xuat (exclude/uu tien/ha cap) | Update FollowUpPlaybook + co the anh huong ExcludeRule, CadenceRule |
| "Xoa du lieu hoc giong" | Purge UserVoiceProfile + FollowUpPlaybook → reset ve mac dinh |
| "Xoa toan bo du lieu" | Ngat OAuth + Purge toan bo |

**States — display:**
- first_run: "Chua du du lieu — agent can it nhat 5-10 thread de hoc giong"
- tab_co_ban: identity_summary + voice_profile + cadence/exclude summary
- tab_nang_cao: tone_by_relationship + draft_library + draft_patterns + corrections_history + soft_close_patterns
- tab_goi_y: suggestions_list (pending confirm decisions)
- empty (chua co gi de hien thi)
- error

**States — outcome:**
- Xac nhan / Chinh / Bac → tab reload voi data da cap nhat
- Xoa du lieu hoc giong → S5.first_run

**Why a screen (not chat/notification):**
- User can browse + edit 3 tab cung luc
- So sanh tone_by_relationship side by side
- Review suggestion list va quyet dinh hang loat
- Chat khong lam duoc voi so luong correction + suggestion lon + can compare

**Palette-gap:**
- 3-tab layout component
- Expandable correction items (gioi thieu cu the pattern tu event)

### S7 — Cai dat (Kiem soat agent hoat dong)
- Purpose (1 line): Kiem soat cach agent lam viec — cadence, exclude, data governance, notification — de agent khong bao gio lam dieu minh khong muon.
- Serves: J5 (khong muon CRM rieng nhung can kiem soat), Trust safety, Data governance
- User-day moment: Khi moi bat dau (cai dat lan dau), khi muon chinh threshold/cap, khi can exclude contact, khi nghi ngo ve data

- Layout: 4 tabs (Cadence / Exclude / Thong bao / Du lieu & Bao mat)

---

#### Tab 1 — CADENCE (Khi nao agent nhac)

**Input (settings):**

| Cai dat | Mac dinh | Giai thich |
|---------|----------|------------|
| **Nguong ngay** (threshold_days) | 3 | Bao nhieu ngay khong reply thi agent bat dau de y |
| **Cap moi thread** (cap_per_thread) | 3 | Toi da bao nhieu lan follow-up cho 1 thread |
| **Cap moi thread VIP** | 5 | Rieng cho contact da duoc danh VIP (neu co) |
| **Gio lam viec** | 08:00-22:00 | Ngoai gio nay, chi luu log, khong gui notification |
| **Ngay lam viec** | Thu 2 - Thu 7 | Co the bo chu nhat neu khong muon bi lam phien cuoi tuan |
| **Khoang cach giua cac follow-up** (min_gap_days) | 2 | Toi thieu bao nhieu ngay giua 2 lan follow-up lien tiep |
| **Tu dong huy follow-up sau N lan vo nghia** (auto_stop_after) | Co (3 lan vo nghia) | Neu thread lien tuc bi dismiss, tu dong stop de khong spam |

**User action:** Dieu chinh slider / nhap so → tu luu (autosave)
**State change:** CadenceRule updated → ap dung tu thread tiep theo

---

#### Tab 2 — EXCLUDE (Ai/topic gi agent khong dong vao)

**Input (settings):**

**Excluded contacts:**
- List: email · ten · ly do exclude (tu them hoac tu Operating Memory de xuat)
- Theem: nhap email hoac paste list
- Xoa: swipe/click X

**Excluded domains:**
- List: domain · ly do (newsletter, internal, no-reply)
- Action: Them / Xoa

**Excluded keywords/subjects:**
- List: tu khoa trong subject (vd "bao cao thang", "invoice", "meeting note")
- Action: Them / Xoa

**Thread-level exclude:**
- Da exclude tu S2 (dismiss) → hien o day: thread_id + subject + ly do
- User action: 
### S7 — Cai dat (Kiem soat agent hoat dong)
- Purpose (1 line): Kiem soat cach agent lam viec — cadence, exclude, data governance, notification — de agent khong bao gio lam dieu minh khong muon.
- Serves: J5 (khong muon CRM rieng nhung can kiem soat), Trust safety, Data governance
- User-day moment: Khi moi bat dau (cai dat lan dau), khi muon chinh threshold/cap, khi can exclude contact, khi nghi ngo ve data

- Layout: 4 tabs (Cadence / Exclude / Thong bao / Du lieu & Bao mat)

#### Tab 1 — CADENCE (Khi nao agent nhac)

**Input (settings):**

| Cai dat | Mac dinh | Giai thich |
|---------|----------|------------|
| Nguong ngay (threshold_days) | 3 | Bao nhieu ngay khong reply thi agent bat dau de y |
| Cap moi thread (cap_per_thread) | 3 | Toi da bao nhieu lan follow-up cho 1 thread |
| Cap moi thread VIP | 5 | Rieng cho contact da duoc danh VIP |
| Gio lam viec | 08:00-22:00 | Ngoai gio nay, chi luu log, khong gui notification |
| Ngay lam viec | Thu 2 - Thu 7 | Co the bo chu nhat |
| Khoang cach giua cac follow-up (min_gap_days) | 2 | Toi thieu bao nhieu ngay giua 2 lan follow-up |
| Tu dong huy follow-up sau N lan vo nghia | Co (3 lan) | Thread lien tuc bi dismiss → stop de khong spam |

**User action:** Dieu chinh slider/nhap so → autosave
**State change:** CadenceRule updated → ap dung tu thread tiep theo

#### Tab 2 — EXCLUDE (Agent khong dong vao ai)

**Excluded contacts:**
- List: email · ten · ly do exclude
- Action: Them (nhap/paste email) · Xoa (click X) · Import (paste list)

**Excluded domains:**
- List: domain · ly do
- Action: Them · Xoa

**Excluded keywords:**
- List: tu khoa trong subject (vd "bao cao", "invoice", "meeting")
- Action: Them · Xoa

**Thread-level exclude da thuc hien tu S2:**
- List: thread_id · subject · ngay dismiss
- Action: Undo (bo exclude) · Xoa khoi danh sach

**State change:** ExcludeRule updated → ap dung cho lan quet tiep theo

#### Tab 3 — THONG BAO (Khi nao bi lam phien)

**Input (settings):**

| Cai dat | Mac dinh |
|---------|----------|
| Digest sang | Co (07:00) |
| Digest chieu | Khong |
| Real-time alert NDR/bounced | Co |
| Real-time alert moi phat hien | Khong (chi trong digest) |
| Push notification desktop | Co |
| Email notification (gui den chinh minh) | Khong |

**User action:** Toggle tung cai
**State change:** UserNotificationPreference updated

#### Tab 4 — DU LIEU & BAO MAT

**Input (settings):**

| Muc | Hanh dong | Canh bao |
|-----|-----------|----------|
| Xoa du lieu hoc giong (Voice Profile) | Nut "Xoa giong da hoc" → confirm → purge | Draft se ve mac dinh, khong mat thread data |
| Xoa lich su corrections | Nut "Xoa corrections" → confirm → purge | Mat pattern da sua, agent hoc lai |
| Xoa toan bo du lieu + ngat ket noi | Nut "Xoa toan bo & Ngat" → confirm 2 lan → OAuth revoke + purge | Khong the undo. Phai ket noi lai tu S1 |
| Export du lieu cua toi | Nut "Export" → download JSON/CSV | Gom: threads, memory, corrections, settings |
| Thoi gian luu du lieu | Hien thi: "Du lieu se duoc xoa sau 90 ngay khong hoat dong" | Policy cam ket o S1 |

**State change:** Purge → reset ve first-run state

**Output (S7 → agent):**

| User action | Output |
|-------------|--------|
| Dieu chinh cadence | CadenceRule updated → ap dung thread tiep theo |
| Them/Xoa exclude | ExcludeRule updated → ap dung lan quet sau |
| Toggle notification | UserNotificationPreference updated |
| Xoa giong da hoc | Purge UserVoiceProfile + FollowUpPlaybook → draft ve default |
| Xoa corrections | Purge FollowUpPlaybook.reply_classification_corrections |
| Xoa toan bo & ngat | Revoke OAuth + Purge all → redirect S1 |
| Export | Generate + download file |

**States — display:**
- first_run (chua co cai dat gi) · tab_cadence · tab_exclude · tab_notification · tab_privacy · confirm_dialog (truoc khi xoa) · error

**States — outcome:**
- Thay doi setting → S7 updated (tu luu) · Xoa → confirm → S7 reload hoac S1

**Why a screen (not chat/notification):**
- Nhieu setting can nhin cung luc + slider/slider theme + exclude list can browse/edit
- Confirm dialog cho hanh dong nguy hiem (xoa du lieu) can UI ro rang
- Chat/khopi khong lam duoc voi so luong setting nay

**Palette-gap:**
- Tab layout (4 tabs)
- Slider component (threshold ngay, cap per thread)
- Confirm dialog (xoa du lieu)
- List + search (exclude list)

## ASCII Mockups
- File: mockups-ascii.md (7 man, all states, generated 2026-07-05 from grill-to-brief session)
- Layout: Topnav horizontal (Tong quan | Queue | Memory | Log | Cai dat)
