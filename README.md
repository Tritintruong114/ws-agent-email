# ws-agent-email

Email Agent workspace for exploring a **responsibility queue**: an agent that reads email threads, detects follow-up risk, drafts replies, and keeps humans in approval/control.

The repo is a design/prototype artifact, not a production app contract. It keeps product docs, a static mockup source, and a throwaway Vite prototype that can be deployed on Vercel.

## Live URLs

- App root: <https://ws-agent-email.vercel.app>
- Mockup source viewer: <https://ws-agent-email.vercel.app/mockups.html>
- Prototype: <https://ws-agent-email.vercel.app/prototype.html>
- Mockup data: <https://ws-agent-email.vercel.app/mockups.data.js>

## What this is

Core product idea: **Email Revenue Follow-through / Responsibility Queue**.

Instead of showing a raw inbox, the agent turns email into a short list of decisions/actions:

- Which email has money, reputation, commitment, meeting, or delivery risk?
- Who is waiting on whom?
- What thread needs human action today?
- What can be safely ignored, snoozed, closed, or monitored?
- What draft is ready for human approval?

Important guardrail: **draft + approve, not auto-send**.


## System maps

### Agent Flow → User Flow

```mermaid
flowchart LR
  subgraph A[Agent Flow]
    A1[Connect Gmail with minimal scopes]
    A2[Scan recent threads]
    A3[Classify thread state]
    A4[Score risk and priority]
    A5[Decide next action]
    A6[Surface responsibility queue]
    A7[Generate draft or recommendation]
    A8[Track outcome and update Operating Memory]
  end

  subgraph U[User Flow]
    U1[Review consent and data policy]
    U2[Confirm Risk Profile Draft]
    U3[Open Việc cần xử lý]
    U4[Inspect why/evidence when needed]
    U5[Approve draft, reply manually, snooze, ignore, or close]
    U6[Correct the agent when it is wrong]
    U7[Tune cadence, excludes, and memory suggestions]
  end

  A1 --> U1
  U1 --> A2
  A2 --> A3 --> A4 --> A5 --> A6
  A6 --> U3
  U3 --> U4
  U3 --> U5
  A5 --> A7
  A7 --> U5
  U5 --> A8
  U6 --> A8
  A8 --> U7
  U7 --> A3
```

### Core Loop

The product is not an inbox UI. The core loop is: **detect responsibility → reduce to decisions → get human approval → track outcome → learn safer operating rules**.

```mermaid
flowchart TD
  L1[Detect<br/>Read new/recent email threads] --> L2[Understand<br/>Who is waiting on whom?]
  L2 --> L3[Prioritize<br/>Money, reputation, commitment, meeting, delivery risk]
  L3 --> L4[Dispatch<br/>Queue only what needs human attention]
  L4 --> L5{Human decision}
  L5 -->|Approve draft| L6[Send approved follow-up]
  L5 -->|Reply manually| L7[Open Gmail / mark awaiting user]
  L5 -->|Snooze| L8[Track until due date]
  L5 -->|Ignore / close| L9[Close or deprioritize]
  L6 --> L10[Track reply]
  L7 --> L10
  L8 --> L10
  L9 --> L10
  L10 --> L11[Outcome feedback<br/>won/lost/replied/no response/correction]
  L11 --> L12[Operating Memory<br/>rules, cadence, examples, preferences]
  L12 --> L1
```

### Core vs Meta Layers

The core is the thing the user hires the agent to do. Meta layers are the control systems that make the agent trustworthy, useful, and company-owned over time.

```mermaid
flowchart TB
  Core[Core<br/>Email Revenue Follow-through<br/>Find money/responsibility stuck in email and move it forward]

  subgraph Domain[Domain Layers]
    D1[Lead / Opportunity<br/>quotes, proposals, payments, orders]
    D2[Sales Conversation<br/>asks, objections, commitments, next steps]
    D3[Follow-through<br/>cadence, due dates, waiting_on, aging]
    D4[Trust & Approval<br/>draft + approve, no auto-send]
  end

  subgraph Meta[Meta Layers]
    M1[Risk Profile<br/>what matters most to this user/company]
    M2[Operating Memory<br/>approved examples, customer memory, playbook rules]
    M3[Evidence Policy<br/>Level B default, Level C on click]
    M4[Governance<br/>scopes, retention, purge, excludes, audit]
    M5[Training Loop<br/>corrections and outcomes improve rules, not shared model fine-tune]
  end

  Core --> D1
  Core --> D2
  Core --> D3
  Core --> D4

  M1 --> Core
  M2 --> Core
  M3 --> D4
  M4 --> D4
  M5 --> M2
  D1 --> M5
  D2 --> M5
  D3 --> M5
```

### How Core and Meta work together

```mermaid
sequenceDiagram
  participant Gmail
  participant Agent
  participant Memory as Operating Memory
  participant User

  Gmail->>Agent: New/recent threads
  Agent->>Memory: Load risk profile, cadence, excludes, approved examples
  Agent->>Agent: Classify waiting_on, value_type, confidence, next_action_hint
  Agent->>User: Show responsibility queue, not raw inbox
  User->>Agent: Open why/evidence or thread detail
  Agent->>User: Show Level B evidence by default
  User->>Agent: Approve draft / reply manually / snooze / close / correct
  Agent->>Gmail: Send only if user approved
  Agent->>Memory: Store correction/outcome as rule, example, or preference
  Memory->>Agent: Improve future prioritization and drafts
```

## Product model in one line

```mermaid
flowchart LR
  Email[Raw email threads] --> Agent[Agent decision system]
  Agent --> Queue[Responsibility queue]
  Queue --> Human[Human approval / correction]
  Human --> Outcome[Tracked outcome]
  Outcome --> Memory[Company-owned Operating Memory]
  Memory --> Agent
```

## Source of truth order

When changing UX/content, follow this order:

1. `mockups.data.js` / `mockups.html` — primary screen/state source for visual review.
2. `screens-brief.md` — screen requirements and required states/CTA.
3. Product/domain docs — context and rationale.
4. `prototype/` — throwaway implementation after mockup states are correct.

Do **not** invent onboarding or decision flow directly in the prototype if the mockup/brief already defines it.

## Key files

| Path | Purpose |
| --- | --- |
| `00-START-HERE.md` | Entry point / how to read the workspace. |
| `01-PRODUCT-MAP.md` | Product map and framing. |
| `Agent-Domain-Spec.md` | Domain model, agent behavior, decision system. |
| `screens-brief.md` | Required screens, states, CTA, and interaction brief. |
| `mockups.html` | Static renderer/shell for the mockup. Content should not be inlined here. |
| `mockups.data.js` | Mockup content/state source via `window.WIREFRAME`. |
| `design-system-tokens.css` | OpenClaw-style design tokens used by mockup/prototype. |
| `prototype/` | Vite prototype source. |
| `prototype.html` | Built prototype entry deployed at `/prototype.html`. |
| `prototype-assets/` | Built prototype assets. |
| `appendix/` | Research, target user, MVP/core-loop, dossier, supporting docs. |

## Mockup states currently covered

The mockup data is organized under `window.WIREFRAME.screens`.

### S1 — Kết nối Gmail

Must show onboarding/consent before any queue:

- `first` — first-run connect screen.
- `loading` — OAuth + “quét lịch sử & học giọng”.
- `error` — missing Gmail scope / permission problem.
- `done` — connected handoff.

Required policy copy:

- minimal Gmail scopes,
- reads email to perform the task,
- drafts require approval,
- does not auto-send,
- does not train/fine-tune shared models,
- 90-day retention,
- purge on disconnect.

### S2 — Việc cần xử lý

Responsibility queue / command center:

- `done` — 80 emails processed → 9 decisions left.
- `why` — “Vì sao nổi?” evidence view.
- `memory` — Operating Memory suggestion present.
- `allSafe` — no urgent actions.
- `firstRun` — first queue build.
- `loading` — classification/dispatch in progress.
- `error` — Gmail scan failure.

Key buckets:

- Mail bị trả lại.
- Cần bạn trả lời.
- Đã có reply.
- Cần follow-up.
- Có thể bỏ qua / deprioritized threads.

### S3 — Soạn follow-up

Thread detail / draft / closure actions:

- `draft` — draft ready with guardrails.
- `draftGenerating` — draft regeneration, send locked.
- `needsReply` — human must reply manually.
- `confirmClose` — agent proposes close, human confirms.
- `bounced` — delivery failure / pipeline blocked.
- `loading` — generating summary + draft.
- `error` — send/draft failure.
- `done` — follow-up sent and tracking resumes.

### S4 — Cài đặt nhắc

Cadence, excludes, operating memory, risk profile:

- `settings` — cadence + excludes + delete learned voice data.
- `memory` — Risk Profile Draft and Operating Memory suggestions.
- `deepEvidence` — full evidence drill-down, only after click.
- `empty` — no excludes yet.
- `saved` — settings/profile saved.
- `error` — save failure.

## Evidence / privacy rule

Default evidence should be **Level B**:

- pattern,
- lightly masked subject/snippet,
- high-level signals.

Full thread / deeper evidence is **Level C** and should only appear when the user explicitly clicks deeper evidence. The default UI should not feel like it exposes the entire inbox.

## Prototype rules

The prototype is intentionally disposable.

- Static only.
- No backend.
- No auth.
- No database.
- No production frontend contract.
- Build output must stay deployable as:
  - `prototype.html`
  - `prototype-assets/`

Prototype UI should import/follow `design-system-tokens.css` and use `--cw-*` tokens where applicable.

## Local workflow

Review mockup:

```bash
# Open mockups.html in a browser, or use the deployed URL.
# Content comes from mockups.data.js via window.WIREFRAME.
```

Check mockup syntax:

```bash
node --check mockups.data.js
```

Build prototype:

```bash
cd prototype
npm install
npm run build
```

The Vite config is expected to emit static assets back to the repo root as `prototype.html` and `prototype-assets/`.

## Deployment

The repo is connected to Vercel. Pushing to `main` deploys the static files.

Before pushing, verify:

```bash
git status --short --branch
node --check mockups.data.js
```

If prototype files changed, also verify the Vite build.
