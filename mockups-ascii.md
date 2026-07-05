# ASCII Mockups — ws-email-agent

> Generated 2026-07-05 from grill-to-brief session.
> Design system: `design-system-tokens.css` (88 tokens, light+dark, --cw-*).
> Layout: Topnav horizontal.

---

## S1 — Onboarding

```
┌─────────────────────────────────────────────────────────────┐
│ 📨 Agent Workforce  │  📊 Tong quan  📋 Queue  🧠 Memory  │
│                      │  📜 Log  ⚙️ Cai dat                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   👋 Chao anh, em la tro ly email cua anh                  │
│   De bat dau, em can ket noi Gmail, hoc cach anh viet      │
│   email, va hieu business cua anh.                         │
│                                                             │
│   🔗  Ket noi Gmail                                       │
│      Doc email de tim thread can follow-up                 │
│      Hoc giong viet tu sent history                        │
│      KHONG gui neu chua anh duyet                          │
│      KHONG train model chung                               │
│                                                             │
│ [Loading] ████████░░░░ 72% — Dang quet & hoc giong...      │
│ Da doc 186 email · 15 thread dang cho phan hoi            │
│                                                             │
│ 🎯 Em da hieu so bo ve anh:                               │
│ • Viec chinh: Tu van B2B                                   │
│ • Khach: Startup goi von + Agency nho                      │
│ • Giong: Trang trong, co so lieu                           │
│ • Gio lam: Sang - 22h - reply toi muon                    │
│                                                             │
│ [✅ Giu vay, Bat dau] [✏️ Chinh giong] [🔄 Quet lai]     │
└─────────────────────────────────────────────────────────────┘
```

---

## S4 — Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ 📨 Agent Workforce │ 📊 📋 📜 🧠 ⚙️                        │
├─────────────────────────────────────────────────────────────┤
│ 📊 Tong quan   [Hom nay ▼] [Tuan nay] [Thang]              │
│                                                             │
│ 📨80 quet  🎯15 theo doi  ✅12 xu ly  📝87% duyet          │
│ ⏱4.2h phan hoi TB                                           │
│                                                             │
│ 📈 Xu huong x ly (7 ngay)   🚨 3 thread >2 tuan sap nguoi │
│ ██░░ 3 can xu ly            💰 5 deal cho bao gia          │
│ ████ 5 da xu ly             🔴 2 mail bounce              │
│ T2 T3 T4 T5 T6 T7 CN                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## S2+S3 — Queue + Detail

```
┌─────────────────────────────────────────────────────────────┐
│ 📨 Agent Workforce │ 📊 📋 📜 🧠 ⚙️                        │
├─────────────────────────────────────────────────────────────┤
│ Hom nay — 9 viec can quyet dinh   (80 email da xu ly)     │
│                                                             │
│ 🔴 1 Bounced       ← mail bi tra lai                       │
│ 🟠 2 Can tra loi   Company A · Cong ty B                   │
│ 🟡 2 Da co reply   Dich vu C · Doi tac D · Freelancer E    │
│ 🟢 4 Can follow-up Bao gia F · Hop dong G · Proposal H     │
│ ┌─ 1 Co the bo qua ─┐                                      │
│ │ Tu van N  ∨       │                                      │
│ └───────────────────┘                                      │
│                                                             │
│ >>> Click thread -> panel detail:                           │
│ ◀ Quay lai   Tu: Anh Tuan · Company A                     │
│ Da cho: 5 ngay · Follow-up 1/3                             │
│ Tom tat: Gui bao gia 25/6. Khach hoi timeline.            │
│                                                             │
| Draft: "Chao anh Tuan, em follow-up ve bao gia tuan truoc.│
| Anh can them thong tin gi ve timeline khong a?"           │
│                                                             │
│ Tai sao? → Anh hay viet di thang + cau hoi. Tranh "than ai"│
│                                                             │
│ [✅ Duyet & gui] [✏️ Viet lai] [😴 Snooze] [❌ Bo qua]   │
└─────────────────────────────────────────────────────────────┘
```

---

## S5 — Operating Memory (3 tabs)

```
┌─────────────────────────────────────────────────────────────┐
│ 🧠 Operating Memory   [Co ban ▼] [Nang cao] [Goi y]       │
├─────────────────────────────────────────────────────────────┤
│ Tab Co ban: | Tab Nang cao:         | Tab Goi y:          │
│ 🎯 Identity  | 👥 Giong theo q.he   | 💡 Uu tien VIP?    │
│ • Tu van B2B |   Moi: "Kinh gui..."  | contactA.com?     │
│ • Startup+Ag |   Cu: "Chao anh..."   | [✅] [❌] [🔔]    │
│ • Trang trg  |   Doi tac: "Anh oi..."|                     │
│ 🗣️ Giong     | 📚 Draft mau duoc     | 💡 Loai domain    │
│ • Mau: follow|   duyet: Bao gia=doan | newsletter.io?    │
│ • Tone: nhe  |   +PDF, Lich=2 cau   | [✅] [❌] [🔔]    │
│ • Tranh: ai, | 🔄 Corrections history|                     │
│   rat mong   |   "cam on da nhan"    | 💡 Ha cap thong   │
│ ⏱ Cadence:  |   ≠ reply thuc chat  | bao con 1 lan?    │
│   3ng/3lan/  |                       | [✅] [❌] [🔔]    │
│   22h-8h yen |                       |                     │
└─────────────────────────────────────────────────────────────┘
```

---

## S6 — Activity Log

```
┌─────────────────────────────────────────────────────────────┐
│ 📜 Activity Log   [Tat ca ▼] [Hom nay] [Tuan nay] [🔍]     │
├─────────────────────────────────────────────────────────────┤
│ 10:23 📋 Phan loai #T12 5 ngay, co "bao gia"               │
│        → awaiting_review                                    │
│ 10:24 ✍️ Draft #T12 giong trang trong, ngan                │
│ 10:25 ✅ User duyet gui #T12 (khong sua)                   │
│ 14:00 📥 Phat hien reply #T12 → de xuat dong              │
│ 14:01 ✅ User xac nhan dong #T12                           │
│        → Memory: ghi pattern close                         │
│ 09:00 🔴 Bounced #T15 (Beta LLC, NDR)                      │
│ 15:30 ✏️ User bac phan loai #T08                            │
│        → Memory: "cam on da nhan" ≠ reply thuc chat       │
│                                                             │
│ [Xem them 32 su kien...]          [📥 Xuat CSV]            │
└─────────────────────────────────────────────────────────────┘
```

---

## S7 — Cai dat (4 tabs)

```
┌─────────────────────────────────────────────────────────────┐
│ ⚙️ Cai dat  [Cadence ▼] [Exclude] [Thong bao] [Rieng tu]   │
├─────────────────────────────────────────────────────────────┤
│ Tab Cadence: | Tab Exclude:          | Tab Tbao:  | Tab Prv│
│ Nguong: 3 ng | Contact: hr@internal  | Digest 7h  | Xoa    │
│ [──●────]    |          no-reply@n.. | [●]        | giong  │
│ Cap: 3 lan   | Domain: *.internal-g  | Digest c.  | Xoa    │
│ [───●───]    |          *.newsletter | [○]        | corr   │
│ Gio: 8-22h   | Tu khoa: "bao cao"    | Alert bnc  | Xuat   │
│ Ngay: T2-CN  | Thread dismiss: #T21  | [●]        | DL     │
│              | [↩️ Hoan tac]        | Desktop    | ⛔ Xoa  │
│              |                       | [●]        | TOAN BO│
└─────────────────────────────────────────────────────────────┘
```
