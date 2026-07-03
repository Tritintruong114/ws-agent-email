# 01 · Product Map — `ws-email-agent` ("Email Agent — theo dõi & nhắc follow-up")

> Không viết chung chung. Mỗi dòng phải trả lời được: người dùng thuê agent này để làm việc gì
> **ĐAU và LẶP LẠI**? Ô nào không trỏ về được một nguồn cụ thể là một giả định — ghi rõ, đừng laundering thành fact.

## Chuỗi giá trị — pain → moat

| Bước | Nội dung | Nguồn |
|---|---|---|
| **Pain** | Deal chết âm thầm vì một thread đã gửi bị quên: 80% deal B2B cần 5+ lần follow-up nhưng 44–48% bị bỏ sau 1 lần nhắc / không bao giờ nhắc | `appendix/Boi-Canh-Va-Van-De.md §2-3` |
| **User** | Solopreneur (freelancer, consultant, coach, agency-1-người) vận hành business gần như hoàn toàn qua email, vừa quyết định vừa trả tiền vừa dùng | `appendix/Target-User-email-agent.md §1` |
| **Workflow hôm nay** | Global: dựa Gmail Nudges (free, sporadic, không kiểm soát) hoặc Boomerang ($4.98/mo, phải tự đặt nhắc lúc gửi, không AI draft). VN bán-online-nội-địa: Zalo/FB chat + trí nhớ (thắng ở phân khúc này, loại khỏi v0) | `appendix/MR-email-agent-Problem-Solution.md §4` |
| **Agent job** | "Người dùng thuê agent này để không bao giờ để một thread đang chờ trả lời trôi khỏi trí nhớ, và không phải đối mặt ô compose trắng mỗi lần cần nhắc" | `Agent-Domain-Spec.md §1 Domain thesis` |
| **Giá trị kinh doanh** | Cứu một deal thất thoát là bù đủ phí công cụ cả năm; người trả tiền = chính solopreneur (buyer=user=admin) | `appendix/Target-User-email-agent.md §6` |
| **Moat** | Không tool nào dưới $20/mo, hướng solo, làm đủ cả 3: detect chủ động thread bị quên + tóm tắt/AI draft theo giọng + UX đơn giản không-CRM. Superhuman gần nhất nhưng $30/mo + bắt đổi email client; SaneBox có detect nhưng không draft | `appendix/dossier.md §5` |

## Core loop + agent hoạt động thế nào

- **Core loop (vòng giá trị lặp lại):** Detect (quét sent/threads, phát hiện đã gửi quá ngưỡng X ngày chưa reply thực chất) → Surface (nổi vào "Cần follow-up hôm nay" kèm tóm tắt) → Draft (AI draft theo giọng user, sẵn để dùng) → Approve & Send (user đọc/sửa/duyệt/gửi hoặc snooze — không auto-send) → Track (theo reply: đủ để đóng → đóng; có ask mới → nổi "cần bạn trả lời"; chưa → hẹn nổi lại đúng cadence) → ↺ — vận hành bởi 3 động từ nghiệp vụ **Phân loại → Quản lý → Điều phối** (Agent-Domain-Spec, mục "Agent Business Logic"), không phải một job quét-và-nhắc đơn giản.
- **Agent actions (v0):** **Phân loại** thread (đang chờ đối tác / đối tác trả lời thật cần đóng / đối tác trả lời nhưng cần bạn trả lời tiếp / auto-OOO-NDR / thấp giá trị) → **Quản lý** trạng thái sống của từng thread (Agent-Domain-Spec §3-§4) → **Điều phối** thành một kế hoạch hôm nay theo nhóm hành động, không liệt kê phẳng (Agent-Domain-Spec §8); áp cadence/exclude rule đã đặt; alert khi mail bị trả lại (NDR); im/giữ monitoring khi confidence thấp thay vì hành động mù
- **Human approval points:** gửi follow-up (luôn cần người bấm "Duyệt và gửi" — đối ngoại, khó thu hồi); đóng thread khi có reply (cần người xác nhận — đóng nhầm = mất lead); hoãn theo out-of-office (cần xác nhận ngày); thêm/xóa exclude rule (cần người chủ động). **Auto-send bị CẤM ở v0**
- **Guardrails:** rate limit gửi theo thread + cooldown giữa các lần nhắc; bind đúng thread/người trước khi gửi (validate `to == original_recipient`, không tạo thread mới); human-in-the-loop bắt buộc cho mọi hành động đối ngoại/kết-thúc-vòng; data minimization (chỉ lưu UserVoiceProfile + Thread state, không lưu nguyên văn email, purge sau 90 ngày không hoạt động hoặc khi user revoke); trust boundary chống prompt injection từ nội dung email (nhãn "untrusted data", tool call chỉ phát sinh từ agent-logic layer, không từ output LLM trực tiếp)
- **Success metrics:** false negative (thread đáng nhắc nhưng không nổi) thấp; false positive (nổi sai) thấp; reply-classification accuracy cao (rủi ro #1); approval rate (% draft được duyệt gửi gần như nguyên) cao; edit distance draft giảm dần theo thời gian; close-confirm rate cao

## KHÔNG build ở V0 (chặn scope creep)

- Auto-send (gửi không cần người duyệt) — hoãn vì trust chưa đủ và ngưỡng lỗi của gửi email ra ngoài cực thấp — nguồn: `appendix/MVP-Coreloop.md §5`
- Tích hợp Zalo/FB (và phân khúc VN bán-online-nội-địa dùng Zalo là kênh chính) — hoãn vì Zalo thắng ở phân khúc đó, ngoài scope email-centric v0 — nguồn: `Agent-Domain-Spec.md §19`, `appendix/dossier.md §8`
- Outlook/Microsoft Graph — hoãn, đường compliance thứ 2, chỉ để không thiết kế chặn đường mở rộng sau — nguồn: `appendix/MVP-Coreloop.md §5`
- Sequence/bulk outreach kiểu sales engagement — hoãn vì ngoài phạm vi "cứu thread bị quên", không phải cold outreach — nguồn: `appendix/MVP-Coreloop.md §5`
- Dashboard analytics, quản lý team/nhiều người dùng — hoãn vì v0 là solo-first, một người dùng — nguồn: `appendix/MVP-Coreloop.md §5`

## Rủi ro lớn nhất cần người quyết định tiếp

Ngưỡng phân biệt "reply thực chất" vs out-of-office / trả lời một phần / NDR (bounce) chưa được định nghĩa rõ (GAP-1). Sai ở điểm này khiến agent đề xuất đóng nhầm thread (mất lead) hoặc tạo noise (bào mòn trust) — đúng vào pain lõi mà sản phẩm hứa giải quyết. Rủi ro được giảm nhẹ vì user luôn là người xác nhận đóng cuối cùng, nhưng vẫn cần đo và tinh chỉnh sớm ở pilot. Nguồn: `Agent-Domain-Spec.md §19`.
