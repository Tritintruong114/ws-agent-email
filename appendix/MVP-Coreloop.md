---
title: MVP & Core Loop — Email Agent (theo dõi & nhắc follow-up)
type: mvp-coreloop
tags: [mvp, core-loop, scope, email, follow-up]
categories: [Index]
date: 2026-06-29
status: draft
---

# MVP & Core Loop — Email Agent

> Input #4 của `/grill-to-brief` (cùng bộ với Context · MR · Target-User).
> Khoá **scope v0** + **core loop**; màn nằm trên loop = non-negotiable v0.
> Không có `brief.md` → core loop dưới đây **suy ra từ research** (quyết định sản phẩm nội bộ, không phải web). Cần grill xác nhận.

## 1. Tóm tắt scope một câu

v0 ship trọn một việc: **tự phát hiện email/đề nghị đã gửi mà chưa được trả lời → tóm tắt ngữ cảnh + soạn sẵn follow-up đúng giọng → user duyệt-gửi**. KHÔNG ship: email client thay thế, tích hợp Zalo/FB, tính năng team, sequence/bulk outreach, analytics, auto-send.

## 2. Core loop (vòng lặp giá trị)

```
Detect → Surface → Draft → Approve & Send → Track → ↺

  1. Detect (nền)        Agent quét sent/threads, phát hiện "đã gửi, quá ngưỡng X ngày chưa có reply thực chất"
  2. Surface (trigger)   Đẩy vào màn "Cần follow-up hôm nay" + tóm tắt thread + đã chờ bao lâu
  3. Draft (payoff)      Hiện AI draft follow-up theo giọng user, sẵn để dùng (không phải ô trắng)
  4. Approve & Send      User đọc → sửa/duyệt/gửi hoặc snooze (human-in-the-loop, KHÔNG auto-send)
  5. Track (return)      Agent theo reply: reply đủ để đóng → đóng thread; reply có ask mới → nổi "Cần bạn trả lời" (không tự đóng); chưa có reply → hẹn nổi lại đúng cadence → quay lại bước 1

  Lực kéo quay lại (pull):  yên tâm "không lead nào rơi" + mỗi sáng có sẵn danh sách "X thread cần nhắc, draft đã viết hộ"
```

## 3. Phạm vi MVP

### A. Hành vi (chạy nền — KHÔNG phải màn)

| # | Hành vi | Chốt |
|---|---|---|
| A1 | Kết nối Gmail qua OAuth **scope tối thiểu** | gmail.readonly/modify = RESTRICTED → cần CASA khi >100 user; v0 <100 user né được ([nguồn](https://deepstrike.io/blog/google-casa-security-assessment-2025)) |
| A2 | Quét + phát hiện "awaiting-reply quá ngưỡng" mà không cần user tag trước | Đây là khác biệt lõi vs Boomerang/Nudges |
| A3 | Sinh AI draft follow-up theo giọng user + tóm tắt thread | Không train trên dữ liệu user; nêu rõ ở privacy |
| A4 | Theo dõi reply để đóng/hẹn lại thread | reply-detection hủy nhắc |
| A5 (MỚI 2026-07-02) | Phân loại reply: đủ để đóng vs còn ask mới cần bạn trả lời; gộp digest theo nhóm hành động thay vì đếm phẳng | Agent-Domain-Spec §5 D12, §8 Điều phối — tránh sản phẩm bị đọc như "Gmail plugin thông minh" |

### B. Màn v0

| Màn | Vai trò trong loop |
|---|---|
| **S1 — Kết nối & Consent** | Cổng bật loop: OAuth, chọn scope tối thiểu, chính sách dữ liệu plain-language (rào cản tin cậy — [Relyance](https://www.relyance.ai/consumer-ai-trust-survey-2025)) |
| **S2 — Hàng đợi "Cần follow-up hôm nay"** | Bước 2 (Surface): list thread chờ + đã chờ bao lâu (phục vụ J1, J2, J4) |
| **S3 — Chi tiết thread + Draft** | Bước 3–4: tóm tắt hội thoại + AI draft + sửa/duyệt/gửi/snooze (phục vụ J3) |
| **S4 — Cài đặt cadence & loại trừ** | Đặt ngưỡng ngày, cap số lần nhắc, exclude contact/domain (tôn trọng cadence freelancer ≠ spam) |

## 4. Cổng / điều kiện kích hoạt

| Trạng thái | Hệ thống làm gì |
|---|---|
| Chưa kết nối | Chỉ hiện S1; loop chưa chạy |
| Đã kết nối, đang học | Quét lịch sử gần, dựng hàng đợi đầu tiên + học giọng viết |
| Đang chạy | Loop Detect→Track chạy nền; mỗi sáng làm mới hàng đợi |

**Sàn tối thiểu để bật:** kết nối Gmail + đặt ngưỡng ngày mặc định (vd 3 ngày). KHÔNG đòi setup CRM/nhập liệu.

## 5. Ngoài phạm vi MVP (defer)

- **Màn riêng:** dashboard analytics; quản lý team/nhiều người dùng.
- **Trong màn:** auto-send (mặc định OFF v0 — chỉ mở sau khi build được trust); sequence/bulk outreach kiểu sales engagement.
- **Hành vi:** tích hợp Zalo/FB (chỉ là expansion sau khi thắng khe email); Outlook/Microsoft Graph (đường compliance thứ 2 — [nguồn](https://developers.google.com/workspace/gmail/api/auth/scopes)); gửi-thay tự động (CAN-SPAM: header/địa-chỉ/opt-out — [nguồn](https://optizmo.com/the-can-spam-act-of-2003-a-2024-overview/)).

## 6. Màn gánh "lực kéo" của loop (non-negotiable v0)

- **Trên loop (bắt buộc):** S2 (Surface) + S3 (Draft + Approve) — đây là nơi giá trị "cứu thread bị quên + không ô trắng" được giao.
- **Điều kiện bật loop (bắt buộc):** S1 (Kết nối & Consent).
- **Đường cắt:** mọi thứ ở §5 nằm ngoài v0. Màn mới grill đề xuất phải trace về một bước loop §2 hoặc cổng §4, không thì cắt. **auto-send là defer cứng** — vi phạm ràng buộc trust (E33) nếu đưa vào v0.

## 7. Related

- [[Boi-Canh-Va-Van-De]] · [[MR-email-agent-Problem-Solution]] · [[Target-User-email-agent]]
