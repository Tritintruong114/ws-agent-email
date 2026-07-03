# Research Dossier: `email-agent`

> **Tầng research → quyết định.** Source of truth cho 4 doc output VÀ cho kết luận Proceed/Pivot/Narrow/Kill.
> Engine: web (5 worker agents, WebSearch + WebFetch). Không có `brief.md` seed (greenfield). Kết bằng **Decision Gate** + **Handoff Recommendation**.

## 0. Input

- **Slug:** `email-agent`
- **Original idea:** "Email Agent App" — AI agent giúp solopreneurs quản lý email, lõi là **theo dõi & nhắc follow-up** (phát hiện thread đang chờ trả lời, nổi mail bị trôi, soạn + nhắc follow-up để không mất lead/deal).
- **Target user/buyer:** solopreneurs (freelancer, consultant độc lập, coach, agency-1-người, người bán online nhỏ) — tự trả tiền.
- **Target market:** Việt Nam + Global (English) — cả hai.
- **Pain hypothesis:** quên follow-up, mail trôi, mất deal/lead.
- **Existing brief:** không có. Core loop ở MVP-Coreloop được suy ra từ research (quyết định sản phẩm nội bộ), không phải web.
- **Research date:** 2026-06-29

## 1. Agent Fit Check

**Vì sao AI Agent (không phải SaaS / automation / chatbot / VA / thủ công)?** Vấn đề lõi không phải "đặt nhắc nhở" (rule cứng — Boomerang/Gmail Nudges đã làm) mà là **phán đoán thread nào thật sự đang chờ mình, tóm tắt ngữ cảnh, và soạn nội dung follow-up đúng giọng** — đây là việc cần hiểu ngôn ngữ tự nhiên + nhiều bước + trí nhớ xuyên thread. Đó là khe agent thật, nằm trên các tool reminder thủ công.

| Trục fit | Có? | Bằng chứng / lý do |
|---|---|---|
| Cần **phán đoán** | **Yes** | Phân biệt "đã trả lời thực chất" vs "đang chờ mình"; chọn thread đáng nhắc — không phải rule cứng. Gmail Nudges dùng ML cho đúng việc này nhưng "sporadic/unreliable" (E20) → còn dư địa phán đoán tốt hơn |
| Cần **multi-step tool use** | **Yes** | Quét inbox → phát hiện awaiting-reply → tóm tắt thread → draft nudge → schedule/track reply |
| Cần **trí nhớ / ngữ cảnh** | **Yes** | Nhớ thread nào pending, lịch sử hội thoại, ai đã reply, cadence đã nhắc |
| Xử lý **NL lộn xộn** | **Yes** | Email là NL tự do; hiểu nội dung để biết "đã được trả lời chưa" + soạn draft theo giọng user |
| Cần **chủ động follow-up** | **Yes (lõi)** | Chủ động nổi thread bị quên mà user không cần hỏi — đúng failure mode "quên hẳn" mà Boomerang/Nudges KHÔNG phục vụ (E21, E22) |
| Hưởng lợi **human-in-the-loop** | **Yes** | 44% sợ AI hành động tự ý (E33); draft+approve là bắt buộc để vượt ngưỡng tin cậy |

- **Phán quyết fit:** **Strong agent fit.** 6/6 trục Yes. Khe agent thật = "forgot-entirely" mode + AI draft theo ngữ cảnh, là chỗ các reminder tool thủ công không với tới.
- **Nếu yếu:** không áp dụng — fit mạnh.

## 2. Sweep Log

| Agent | Scope | Queries (góc chính) | Sources fetched | Status |
|---|---|---|---|---|
| A | Market sizing & context | freelancer/solo count, AI email market TAM, Gmail API/CASA, PDPD/GDPR/CAN-SPAM | ~24 | Coverage tốt; VN solo count = GAP |
| B | JTBD / pain | forum/review pain, follow-up stats, workflow, workaround | ~8 fetch + nhiều search | Pain xác nhận; first-person quote trực tiếp = GAP |
| C1 | Competitor + substitute (VN) | Zalo/FB/Sheets/VA, local CRM (Pancake, DooPage, Getfly, SlimCRM, Bizfly) | ~11 | **Phát hiện then chốt: email KHÔNG phải kênh follow-up chính ở VN** |
| C2 | Competitor + substitute (Global) | Superhuman, Boomerang, Gmail Nudges, Shortwave, Fyxer, SaneBox, CRM, VA | ~4 fetch + 30 search | Map đầy đủ; "Nudges+Boomerang tồn tại nhưng KHÔNG thắng" |
| D | Persona / WTP | demographics, WTP proxy, buying channel, trust barrier | ~16 | WTP $9–20/mo (assumption); trust barrier là ràng buộc thiết kế |

## 3. Evidence Table

| ID | Claim | Lớp | Source URL | Source type | Date | Verify | Maps to | Notes |
|---|---|---|---|---|---|---|---|---|
| E1 | ~1.57 tỷ freelancer toàn cầu (46.7% lực lượng lao động) | must-cite | https://www.demandsage.com/freelance-statistics/ | aggregator | 2026 | single | Boi-Canh §2, Target §3 | TAM thô, gồm cả lao động phi chính thức — KHÔNG dùng làm SAM |
| E2 | 76.4M freelancer Mỹ; World Bank 154–435M freelancer số toàn cầu | must-cite | https://www.demandsage.com/freelance-statistics/ | aggregator (cite World Bank) | 2026 | single | Target §3 | Mỏ neo SAM phòng thủ được |
| E3 | Proxy SAM ~27.7M solo email-active (154M × ~60% dùng email × ~30% có pain) | infer | — | suy luận, multiplier không nguồn | — | — | Boi-Canh §2 | Multiplier = infer; ghi rõ |
| E4 | VN: 51.3–51.4M lao động (2023–24); freelance tăng >35%/năm | must-cite | https://www.jobbers.io/freelancing-in-vietnam-thailand-complete-southeast-asia-guide/ | gov + blog | 2024 | single | Target §3 | Số solo VN riêng = GAP |
| E5 | Thị trường AI Email Assistant: $810M–$1.74B (2024), CAGR 10.4–25.8% | must-cite | https://www.precedenceresearch.com/ai-email-assistant-market | analyst (×3 firm) | 2025-26 | ✓ (3 nguồn, lệch base) | Boi-Canh §2 | Dùng dải, không dùng 1 số |
| E6 | Sales engagement software: $8.95–9.6B (2024) | must-cite | https://www.verifiedmarketresearch.com/product/sales-engagement-software-market/ | analyst (×2) | 2024 | ✓ | Boi-Canh §2 | Thị trường kề |
| E7 | Superhuman ARR ~$35M (6/2025); bị Grammarly mua 7/2025; tổng vốn $108M | must-cite | https://sacra.com/c/superhuman/ | financial intel | 2025 | single | Boi-Canh §2 | Tín hiệu category validation + growth stage |
| E8 | Tân binh: Extra $9.5M; Mixus $2.6M; email startup gọi >$450M vốn 2025 | must-cite | https://www.upstartsmedia.com/p/extra-consumer-ai-email-app-launches | media | 2025 | single | Boi-Canh §2 | Growth stage |
| E9 | 80% deal B2B cần 5+ follow-up; 44–48% bỏ sau 1 lần/không bao giờ | must-cite | https://martal.ca/sales-follow-up-statistics-lb/ | stats roundup | 2025 | single | Boi-Canh §2, MR §1 | Cấu trúc pain; số gốc không độc lập kiểm |
| E10 | "only 2% sales close lần tiếp xúc đầu"; 95% lead chốt ở lần thứ 6 | must-cite | https://ircsalessolutions.com/insights/sales-follow-up-statistics/ | practitioner blog | 2024 | single | Boi-Canh §2 | Tần suất follow-up |
| E11 | "Even one lost email can mean the next big project goes to someone else"; freelancer dùng "sticky notes and endless spreadsheets" | must-cite | https://jetpackcrm.com/improving-client-follow-up-crm-tactics-for-freelance-writers/ | CRM vendor blog | 2024 | single | Boi-Canh §2, MR §1 | Khung pain + workaround thủ công |
| E12 | "it's not uncommon for proposals to go unanswered" | must-cite | https://blog.yess.io/email-templates-for-following-up-on-unanswered-proposals/ | freelance tool blog | 2024 | single | MR §1 J1 | Proposal đi cold |
| E13 | Review Boomerang: "hard to keep up... getting back to candidates"; "manage email overload" | must-cite | https://www.capterra.com/p/174835/Boomerang/reviews/ | user review | 2018-19 | single | Boi-Canh §2, MR §1 | Người dùng workaround lộ pain nền |
| E14 | SaneBox tiết kiệm 1–2h/ngày; định vị "sweet spot for solopreneurs/freelancers" | must-cite | https://solopreneurtools.io/online-business-tools/sanebox-review-2025 | review blog | 2025 | single | MR §1 | Tín hiệu WTP cho lớp này |
| E15 | Zalo 78.3M MAU; 85% người Việt dùng; messaging dùng ở công việc 95% vs email 87% | must-cite | https://vietnamnet.vn/en/zalo-used-by-85-of-vietnamese-surpassing-global-apps-2406688.html | news + Q&Me | 2024 | single (Q&Me 2019 — cũ) | MR §4, dossier §5 | **Email KHÔNG phải kênh follow-up chính ở VN** |
| E16 | 63% email công việc VN là Gmail/Yahoo free | must-cite | https://qandme.net/en/report/survey-vietnam-biz-communications.html | survey | 2019 | single (cũ) | Target §3 | Tư thế email nhẹ, phi chính thức |
| E17 | Local SaaS VN (Pancake, DooPage, Getfly, SlimCRM, Bizfly) Zalo/FB-first; không có theo dõi email thông minh; DooPage email "đang phát triển" | must-cite | https://doopage.com/en/features/ | vendor | 2025 | verified | MR §4, dossier §5 | Khe email bị bỏ ngỏ ở VN |
| E18 | SlimCRM rẻ nhất 1.5tr VND/tháng + cam kết 12 tháng; Getfly Free 5 user / $12/user/mo; BizCRM tối thiểu ~$77/6 tháng | must-cite | http://slimcrm.vn/bang-gia | vendor (live) | 2025 | verified | MR §4 | CRM VN quá đắt/nặng cho solo thật |
| E19 | 45% SME VN coi chi phí là rào cản CRM; thị trường CRM VN ~$120M | must-cite | https://omn1solution.com/en/news/what-are-smes-why-98-of-vietnamese-businesses-are-racing-to-adopt-crm-for-growth | report | 2024 | single | MR §4 | Rào cản giá cao |
| E20 | Gmail Nudges miễn phí + built-in nhưng "sporadic, inconsistent, unreliable", không kiểm soát, không draft | must-cite | https://www.eesel.ai/blog/gmail-nudges-and-follow-up-reminders | editorial + forum | 2025 | ✓ (forum corroborate) | dossier §5, MR §4 | "Tồn tại nhưng KHÔNG thắng" |
| E21 | Boomerang Personal $4.98/mo; reply-detection; nhưng thủ công từng mail, không quét chủ động, không AI draft | must-cite | https://www.boomeranggmail.com/subscriptions.html | vendor (fetched) | 2025 | verified | dossier §5, MR §4 | Workaround thói quen mạnh nhất (global) |
| E22 | SaneBox SaneNoReplies chủ động nổi mail chưa được trả lời; $7/mo; nhưng không AI draft | must-cite | https://www.sanebox.com/pricing | vendor | 2025 | single | dossier §5, MR §4 | Tool rẻ duy nhất chia sẻ cơ chế detect — thiếu draft |
| E23 | Superhuman Auto Reminders (mọi plan 4/2025) + Auto Drafts (Business); từ $30/mo (Starter) / $12/mo Suite annual | must-cite | https://superhuman.com/plans | vendor (fetched) | 2026 | verified | MR §4 | Gần agentic nhất nhưng đắt + phải đổi cả email client |
| E24 | Shortwave $14/mo annual: reminder + Ghostwriter draft theo giọng | must-cite | https://www.shortwave.com/pricing/ | vendor | 2025 | single | MR §4 | Đối thủ mid-price đáng gờm |
| E25 | Fyxer $30/mo cá nhân: triage + draft, "follow-up intelligence" | single | https://www.fyxer.com/pricing | vendor + review | 2025 | single | MR §4 | $30 cao cho solo |
| E26 | VA: offshore $5–17/h, US $20–55/h; part-time ~$400–1,200/mo | must-cite | https://www.upwork.com/hire/virtual-assistants/cost/ | marketplace (×2) | 2025 | ✓ | dossier §5 | AI rẻ hơn VA 10–40× |
| E27 | Gmail scopes readonly/modify/metadata = RESTRICTED → cần CASA; gmail.send = SENSITIVE | must-cite | https://developers.google.com/workspace/gmail/api/auth/scopes | Google docs | 2025 | ✓ | MVP §4, §7 | Ràng buộc build |
| E28 | CASA Tier 2 ~$540–1,800/năm; <100 user → miễn verification | must-cite | https://deepstrike.io/blog/google-casa-security-assessment-2025 | security vendor | 2025 | single | MVP §4, §7 | MVP <100 user né được chi phí |
| E29 | VN PDPD: cần consent rõ; phản hồi 72h; cấm bán dữ liệu | must-cite | https://fpf.org/blog/vietnams-personal-data-protection-decree-overview-key-takeaways-and-context/ | FPF | 2023-24 | ✓ | MVP §7 | Tuân thủ VN bắt buộc |
| E30 | CAN-SPAM (gửi thay user): header chuẩn + địa chỉ + opt-out; phạt tới $53,088/email | must-cite | https://optizmo.com/the-can-spam-act-of-2003-a-2024-overview/ | compliance vendor | 2024 | ✓ | MVP §7 | Ràng buộc tính năng gửi-thay |
| E31 | Solo: avg $39,273/năm; 36% <$25K; 20% kiếm $100–300K không nhân sự; 84% tự góp vốn | must-cite | https://founderreports.com/solopreneur-statistics/ | aggregator | 2026 | single | Target §1,2 | Phân khúc 20% high-earner = early adopter giá trị nhất |
| E32 | 81% lo AI truy cập dữ liệu riêng tư; 84% bỏ công ty không giải thích rõ cách dùng dữ liệu | must-cite | https://www.relyance.ai/consumer-ai-trust-survey-2025 | survey | 2025 | single | Target §7 | Rào cản inbox access |
| E33 | 44% sợ AI hành động tự ý; 51% muốn giới hạn tính năng AVÀ tự chủ | must-cite | https://www.androidheadlines.com/2026/03/ai-consumer-usage-survey-2026-control-trust.html | survey report | 2026 | single | Target §7, MVP | → draft+approve mặc định |
| E34 | Giá tham chiếu WTP: Boomerang Pro $14.98, SaneBox Lunch $12, OnePageCRM $9.95, Superhuman $30 | must-cite | https://get-alfred.ai/blog/sanebox-pricing | review tổng hợp | 2026 | ✓ (nhiều nguồn) | Target §6 | Mỏ neo giá thị trường |
| E35 | Stack SaaS solo điển hình ~$45–150/mo; budget-conscious $0–30 | must-cite | https://mrreviewai.com/best-saas-tools-solopreneurs-2026/ | aggregator | 2026 | ✓ | Target §6 | Ngân sách phần mềm |
| E36 | WTP cho CHÍNH sản phẩm này ~$9–20/mo | assumption | — | suy từ E34, không primary | — | — | Target §6, §8 | Cờ rủi ro #1 |
| E37 | VN solo bill nội địa VND có trần WTP ~½ global (~<150–200k VND/mo); bill quốc tế USD ≈ global | assumption | — | suy từ thu nhập VN ~$300/mo | — | — | Target §6, §8 | Cơ sở narrow theo phân khúc |
| E38 | VN mobile-first (80% traffic mobile); kênh tin cậy = peer trong group FB/Zalo | must-cite | https://hashmeta.com/blog/social-media-landscape-vietnam-complete-guide-for-marketers/ | marketing report | 2024-25 | single | Target §4, §7 | Ràng buộc kênh + thiết bị VN |
| E39 | Kênh mua global: Product Hunt, IndieHackers, AppSumo (LTD $29–117), Reddit, Chrome/Workspace Marketplace | must-cite | https://f3fundit.com/appsumo-lifetime-deals-worth-it-or-revenue-killer/ | analysis | 2024-25 | single | Target §7 | Đường ra thị trường |

## 4. Evidence Strength

- **Multi-source (✓):** E5 (3 firm), E6, E9-adjacent, E20 (editorial + forum), E26, E27, E30, E32-adjacent, E34, E35. Chắc nhất: cấu trúc cạnh tranh + pricing (đa số fetch trực tiếp vendor page), ràng buộc pháp lý/API.
- **Single-source (single):** E1, E2, E4, E7, E8, E15 (lõi VN — news mạnh nhưng Q&Me 2019 cũ), E18, E19, E22-E25, E31, E32, E33, E38, E39. Cần verify thêm: số freelancer VN, traction đối thủ nhỏ.
- **Inferred (suy luận):** E3 (multiplier SAM), hình dạng workflow, device desktop-first global / mobile-first VN.
- **Assumptions (chưa kiểm):** E36 (WTP sản phẩm), E37 (trần WTP VN), tỉ lệ bật auto-send, mức độ chấp nhận AI draft thay mặt.
- **Contradictions:** (1) AI Email market size lệch 2.1× giữa các firm ($810M–$1.74B) → dùng dải. (2) Số self-employed Mỹ 9.82M/15.1M/76.4M = 3 định nghĩa khác nhau. (3) Superhuman đặt tên plan trước/sau M&A gây nhiễu ($30 monthly vs $12 annual). (4) Pain thừa nhận rộng (blog/stats) nhưng THIẾU quote first-person solo trực tiếp → ghi GAP.

## 5. Substitute / Workaround Map

| Loại thay thế | Dùng? | Giải vấn đề thế nào | Chi phí | Mạnh | Yếu (khe ta chen) | Nguồn / nhãn |
|---|---|---|---|---|---|---|
| Gmail Nudges (built-in, GLOBAL) | Có, mặc định | ML nổi mail cũ chờ reply lên đầu inbox | Free | Zero-friction, đã bật sẵn, thói quen | Sporadic/unreliable, không kiểm soát, **không draft**, bỏ sót | [E20](https://www.eesel.ai/blog/gmail-nudges-and-follow-up-reminders) |
| Boomerang for Gmail (GLOBAL) | Có | Set "remind if no reply" khi gửi; reply-detection hủy | $4.98/mo | Rẻ, brand quen, reply-detection | **Thủ công từng mail**, không quét chủ động thread đã quên, **không AI draft** | [E21](https://www.boomeranggmail.com/subscriptions.html) |
| SaneBox SaneNoReplies | Có | Folder chủ động nổi mail gửi chưa được trả lời | $7/mo | Tool rẻ DUY NHẤT có detect chủ động | Không AI draft, UX folder thô | [E22](https://www.sanebox.com/pricing) |
| Superhuman / Shortwave / Fyxer | Có | AI email client, Auto Reminders + draft theo giọng | $14–30/mo | Gần agentic nhất, polished | Đắt với solo; phải đổi cả email client (lock-in); Fyxer/Superhuman ≥$30 | [E23](https://superhuman.com/plans), [E24](https://www.shortwave.com/pricing/) |
| Sales CRM (HubSpot/Pipedrive/Streak/Mixmax) | Một phần | Pipeline + sequence | Free–$49+/mo | Mạnh cho deal nặng | Overkill, setup + learning curve cho solo; sequence tự động bị khóa free | C2 |
| **Zalo personal chat + memory (VN)** | **Có (chính)** | Pin/scroll-back chat, nhắc bằng trí nhớ | Free | **Luôn mở, khách đã ở đó, zero switching** | Không detect "đang chờ reply", không cross-channel, vỡ khi volume tăng | [E15](https://vietnamnet.vn/en/zalo-used-by-85-of-vietnamese-surpassing-global-apps-2406688.html) |
| Facebook Messenger / fanpage (VN) | Có | Unread/starred làm cờ nhắc | Free | FB penetration cao, khách initiate ở đó | Nhắc thô sơ, không AI, không draft | C1 |
| Local SaaS VN (Pancake/DooPage/Getfly/SlimCRM) | Một phần | Unified inbox Zalo/FB + pipeline | Free–1.5tr VND/mo | VN-native, đa kênh | **Zalo/FB-first, email yếu/thiếu**, hướng team, đắt cho solo | [E17](https://doopage.com/en/features/), [E18](http://slimcrm.vn/bang-gia) |
| Google Sheets / Excel | Có | Tự log lead + ngày follow-up | Free | Linh hoạt, không phí | Thủ công 100%, vỡ khi volume >20 thread, không AI | infer (C1/C2) |
| Thuê VA / freelancer | Một phần | VA canh inbox, nhắc, draft | $400–1,200/mo | Phán đoán người, đa kênh | Đắt 10–40× AI; overhead quản lý; lo trust | [E26](https://www.upwork.com/hire/virtual-assistants/cost/) |
| "Không làm gì" (do nothing) | Có | Dựa trí nhớ, chấp nhận mất lead | $0 trực tiếp | Zero effort | Chi phí ẩn cao: 40%+ bỏ sau 1 follow-up → chảy máu doanh thu âm thầm | [E9](https://martal.ca/sales-follow-up-statistics-lb/) |

- **Workaround mạnh nhất (GLOBAL):** Gmail Nudges + Boomerang — rẻ/free + thói quen → gây kháng giá cao nhất. **NHƯNG không thắng:** cả hai đều thủ công/bị động, **không phục vụ failure mode "quên hẳn thread", không AI draft**. Người đã trượt 1 thread thì cả hai đều vô dụng.
- **Workaround mạnh nhất (VN):** Zalo personal chat + memory — với phân khúc bán-online/dịch-vụ-nội-địa, **Zalo THẮNG và sẽ không rời**: không có pain email vì không có email. Đây là tín hiệu loại phân khúc này khỏi sản phẩm email-only.
- **Khe trống thật:** Không tool nào dưới $20/mo, hướng solo, làm đủ 3: (1) **detect chủ động** thread bị trôi mà không cần user tag trước; (2) **tóm tắt ngữ cảnh + AI draft** follow-up đúng giọng; (3) **UX đơn giản, không-CRM**. Superhuman gần nhất nhưng $30 + đổi client. SaneBox có (1) thiếu (2). Khe = phục vụ mode "tôi quên hẳn", không chỉ "tôi nhớ đặt nhắc".

## 6. Output Mapping

| Output | Đủ converge? | Evidence (ID) | Trụ còn dựa giả định |
|---|---|---|---|
| `Boi-Canh-Va-Van-De.md` | ✓ | E1-E3, E5-E14, E20-E22 | Định lượng pain $ mất/thread = GAP |
| `MR-email-agent-Problem-Solution.md` | ✓ | E9-E25 (JTBD + cạnh tranh) | WTP, mức ưu tiên job thật = assumption |
| `Target-User-email-agent.md` | ✓ | E2,E4,E15,E16,E31-E39 | WTP, device split solo-specific = GAP/assumption |
| `MVP-Coreloop.md` | ✓ (suy từ research, không brief) | E20-E23, E27-E30, E33 | Auto-send adoption, cadence chấp nhận = assumption |

## 7. Assumptions and Risks

| Giả định / gap | Lớp | Nếu sai thì sao | Cách kiểm chứng |
|---|---|---|---|
| WTP $9–20/mo cho solo email-centric | assumption (E36) | Nếu trần thật ~$5 (= Boomerang) thì biên mỏng, khó nuôi | Van Westendorp / phỏng vấn 15–20 solo |
| Solo sẽ bật/duyệt AI draft thay mình | assumption | Nếu trust quá thấp, draft+approve cũng bị bỏ | Pilot, đo tỉ lệ approve→send |
| Phân khúc VN email-centric (bill quốc tế/corporate) đủ lớn | assumption (E37) | Nếu quá nhỏ, VN không đáng làm riêng | Khảo sát group freelancer VN |
| Số solopreneur VN | GAP (E4) | Sizing VN không chốt được | Khảo sát lao động VN / TopCV/TopDev |
| Quote pain first-person solo trực tiếp | GAP | Pain mới ở mức "thừa nhận ngành", chưa "đã kiểm chứng" | Post r/freelance, r/solopreneur; phỏng vấn |
| Định lượng $ mất/thread bị quên | GAP | ROI pitch thiếu số cứng | Phỏng vấn + tính theo deal value |
| Email volume + device split của solo | GAP | Quyết định surface (desktop/mobile) thiếu cơ sở | Khảo sát |

- **Questions for human:** Phân khúc đầu tiên là email-centric global (US/EN) hay VN-international-billing? Giá ra mắt subscription hay AppSumo LTD? Gmail-only hay cả Outlook (E27 → 2 đường compliance)?
- **Biggest unresolved risk:** **WTP + kháng giá từ Gmail Nudges (free) + Boomerang ($5).** Sản phẩm phải chứng minh giá trị "detect mode quên-hẳn + AI draft" đáng $12–20 khi tồn tại lựa chọn free/rẻ — dù chúng không thắng về chức năng, chúng neo kỳ vọng giá.

## 8. Decision Gate

Chấm theo cây (Step 7):
1. Agent-fit yếu? → **Không** (6/6 Yes, §1).
2. Pain không đáng trả / không khe? → **Không** (pain thật E9-E14; khe thật §5: detect-quên-hẳn + AI draft <$20, chưa ai chiếm).
3. Substitute RÕ RÀNG thắng? → **Không (global)** — Nudges+Boomerang tồn tại nhưng không thắng (E20-E22). **CÓ (VN bán-online/nội-địa)** — Zalo thắng (E15), nhưng đó là vấn đề phân khúc, không phải cả thị trường.
4. **Buyer/market quá rộng để grill?** → **CÓ.** "VN + Global solopreneurs" gộp **hai bài toán khác nhau**: (a) solo global/quốc-tế email-centric — email LÀ kênh deal, khe thật, WTP $12–20; (b) solo VN nội-địa — **email không phải kênh follow-up**, Zalo thắng, trần WTP ~$6. Đây đúng định nghĩa "narrow vì SCOPE" (như "solo broker vs marketplace là hai vấn đề").
5. (không tới)

- **Quyết định:** **Narrow buyer/market** → thu về **solopreneurs email-centric**: (i) global English-market (US/EU/quốc tế) + (ii) freelancer/consultant VN phục vụ khách corporate/quốc tế (nơi email LÀ kênh deal bắt buộc). **Loại** phân khúc VN bán-online/dịch-vụ-nội-địa Zalo-first khỏi v0 (chỉ là expansion tương lai nếu thêm tích hợp Zalo).
- **Rationale:** Fit mạnh + pain thật + khe thật (detect-quên-hẳn + AI draft <$20) → KHÔNG Pivot/Kill. Nhưng scope như đặt ban đầu trộn 2 channel-reality đối nghịch; grill sẽ loãng nếu không tách. Narrow vì scope, KHÔNG vì WTP chưa kiểm (WTP là cờ rủi ro mang sang grill, không phải lý do hạ).
- **Confidence:** **Medium–High.** Mạnh ở: split kênh VN (E15-E17), khe cạnh tranh (E20-E25). Yếu ở: WTP + sizing VN là assumption/GAP.
- **Top evidence IDs:** E15, E17 (split kênh VN) · E20, E21, E22 (substitute không thắng) · E23 (Superhuman đắt) · E9, E11 (pain) · E36 (WTP assumption).
- **Biggest unresolved risk:** WTP + kháng giá Nudges-free/Boomerang-$5 (§7).
- **Nếu Narrow:** Buyer v0 = solo email-centric, đề xuất khởi đầu **global English-market** (kênh phân phối rõ: Product Hunt/AppSumo/Chrome Store, WTP cao hơn, compliance Gmail thẳng) — VN-international-billing là phân khúc thứ 2 cùng cấu trúc; VN-domestic là tương lai.
- **Quyết định user (2026-06-29):** chốt grill **cả hai song song** = (A) Global EN + (B) VN bill quốc tế/corporate, coi như **một bài toán email-centric duy nhất**; hoãn chọn thị trường ưu tiên sang sau. **VN-domestic Zalo-first vẫn loại khỏi v0.** → grill sẽ chất vấn chung trên scope email-centric này.

## 9. Handoff Recommendation

- **Trạng thái:** Đủ 4 input + dossier sẵn sàng. Quyết định = **Narrow** → **KHÔNG hand off thẳng sang grill**; trình quyết định + hướng thu hẹp cho user chốt phân khúc trước.
- **`/grill-to-brief` được phép:** reject · kill · narrow · pivot — không mặc định convert thành screen-brief.
- **Grill phải chất vấn trước (theo thứ tự rủi ro):**
  - [ ] Buyer rõ: chốt phân khúc v0 (global EN vs VN-international-billing)?
  - [ ] Pain đủ mạnh: nâng từ "thừa nhận ngành" lên "đã kiểm chứng" bằng phỏng vấn?
  - [ ] WTP: $12–20/mo có tín hiệu thật khi đối mặt Nudges-free/Boomerang-$5?
  - [ ] Agent fit: detect-quên-hẳn + AI draft có là khác biệt đủ để trả tiền?
  - [ ] Data/integration: Gmail CASA (<100 user né được), draft+approve, gửi-thay (CAN-SPAM)?
  - [ ] GTM: Product Hunt/AppSumo/Chrome Store?
  - [ ] Substitute: SaneBox (detect) hoặc Superhuman (hạ giá) có thể nuốt khe không?
- **Chạy tiếp:** chỉ sau khi user chốt phân khúc narrow → khi đó `/grill-to-brief email-agent`.
