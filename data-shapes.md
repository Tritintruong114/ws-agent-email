# Data Shapes — ws-email-agent

> Formal TypeScript types + data flow for agent-layer development.
> Source: Agent-Domain-Spec.md (§3–§16) + screens-brief.md + mockups-ascii.md
> Generated: 2026-07-05

---

## 1. Core Enums & Literal Types

```typescript
// ─── Thread State Machine ───
// Terminal: closed | dismissed | capped | excluded
type ThreadState =
  | 'untracked'
  | 'monitoring'
  | 'awaiting_review'
  | 'draft_generating'
  | 'draft_ready'
  | 'sent_pending_reply'
  | 'reply_proposed_close'
  | 'reply_needs_action'
  | 'snoozed'
  | 'bounced'
  | 'closed'
  | 'dismissed'
  | 'capped'
  | 'excluded'

// ─── Intent Taxonomy (from §5) ───
type ThreadIntent =
  | 'awaiting_their_reply'
  | 'substantive_reply'
  | 'reply_needs_my_action'
  | 'reply_ambiguous'
  | 'out_of_office'
  | 'delivery_failure'
  | 'declined_or_rejected'
  | 'partial_ack'
  | 'awaiting_my_reply'
  | 'excluded_contact'
  | 'unclear'

// ─── Priority ───
type ValueType = 'money' | 'relationship' | 'admin' | 'deprioritized'
type ConfidenceLabel = 'cao' | 'trung_binh' | 'thap'
type BucketType = 'bounced' | 'needs_reply' | 'awaiting_confirm' | 'follow_up_due'

// ─── Event Types (S6 Activity Log) ───
type EventType =
  | 'scan' | 'classify' | 'draft' | 'draft_regenerate'
  | 'approve_send' | 'reject_send'
  | 'propose_close' | 'confirm_close' | 'reject_close'
  | 'ndr_alert' | 'snooze' | 'dismiss'
  | 'memory_update' | 'human_correction' | 'error'

type EventActor = 'agent' | 'user' | 'system'
type EventOutcome = 'success' | 'failed' | 'pending' | 'dismissed'
```

---

## 2. Core Object Interfaces

```typescript
// ─── Thread (from §3) ───
interface Thread {
  id: string                            // Gmail thread ID
  gmail_thread_id: string

  // Identity
  sender: string                        // From address
  recipients: string[]                  // To addresses
  original_recipient: string            // Anti-misdelivery
  subject: string

  // State
  state: ThreadState
  intent: ThreadIntent
  value_type: ValueType
  confidence_label: ConfidenceLabel
  next_action_hint: string              // e.g. "Draft san, cho duyet"
  reason_summary: string                // 1-line why needs action
  waiting_on: 'doi_tac' | 'ban' | 'he_thong'

  // Timing
  last_user_sent_at: string             // ISO datetime
  last_reply_at: string | null
  suggested_next_date: string | null
  snooze_until: string | null

  // Tracking
  reply_count: number
  follow_up_count: number
  proposed_close_count: number
  proposed_close_rejected: boolean
  ndr_flag: boolean

  // Content snapshots
  last_meaningful_snippet: string
  thread_summary: string                // Full summary for S3

  // Classification
  is_excluded: boolean
  bucket: BucketType                    // Computed on read

  // Meta
  created_at: string
  updated_at: string
}

// ─── Draft ───
interface Draft {
  id: string
  thread_id: string
  version: number
  body: string
  tone_setting: 'trang_trong_nhe' | 'than_mat' | 'chuyen_nghiep'
  length_setting: 'ngan' | 'trung_binh' | 'dai'
  tone_by_relationship: 'khach_moi' | 'khach_cu' | 'doi_tac_lau_nam'
  status: 'generating' | 'ready' | 'editing' | 'locked' | 'sent' | 'discarded'
  generated_at: string

  // Why this draft? (S3 "Tai sao em viet the nay?")
  rationale: {
    tone_reason: string
    length_reason: string
    pattern_reason: string
    avoided_phrases: string[]
  }

  approved_as_is: boolean
  edit_distance: number | null
}

// ─── UserVoiceProfile (from §3, §15) ───
interface UserVoiceProfile {
  user_id: string

  // Identity (S1 scan)
  business_type: string
  client_type: string
  writing_style: string
  working_hours: { start: string; end: string }
  language: { viet: number; eng: number }

  // Voice
  sample_phrases: string[]
  avoided_phrases: string[]
  tone_default: 'trang_trong_nhe' | 'than_mat' | 'chuyen_nghiep'
  length_default: 'ngan' | 'trung_binh' | 'dai'

  // Relationship-based variation (from §15)
  tone_by_relationship: {
    khach_moi: ToneSettings
    khach_cu: ToneSettings
    doi_tac_lau_nam: ToneSettings
  }

  last_updated: string
}

interface ToneSettings {
  formality: 'cao' | 'trung_binh' | 'thap'
  greeting_pattern: string
  signature_pattern: string
  avg_length: number
}

// ─── FollowUpPlaybook (from §3, §15) ───
interface FollowUpPlaybook {
  user_id: string
  tone_default_override: Partial<ToneSettings> | null

  // Corrections: agent misclassified, user corrected
  reply_classification_corrections: Array<{
    thread_id: string
    agent_classification: string
    user_correction: string
    detected_pattern: string
    created_at: string
  }>

  // Patterns: user keeps dismissing these
  dismiss_patterns: Array<{
    pattern: string
    dismiss_count: number
    suggested_action: string
    applied: boolean
  }>

  // Soft close: dismissed after N follow-ups
  soft_close_patterns: Array<{
    description: string
    typical_follow_up_count: number
    suggested_cap: number
    applied: boolean
  }>

  // Approved draft examples
  approved_examples: Array<{
    thread_id: string
    draft_body: string
    tone_setting: string
    length_setting: string
    result: string | null
    pinned: boolean
  }>

  last_updated: string
}

// ─── ContactPreference (from §3, §15) ───
interface ContactPreference {
  contact_email: string
  contact_domain: string
  priority_tier: 'vip' | 'normal' | 'thap'
  inferred_from: string
  confirmed: boolean                     // Default false — only applies after confirm
  approval_rate: number                  // 0-1
  avg_response_time_hours: number | null
  total_interactions: number
  last_updated: string
}

// ─── TrackedEvent (S6 Activity Log) ───
interface TrackedEvent {
  id: string
  timestamp: string
  event_type: EventType
  thread_id: string
  actor: EventActor

  action: string                         // "De xuat gui follow-up lan 2 cho #T12"
  detail: string
  agent_thought: string | null           // "Phat hien #T12 da 5 ngay..."
  input_signals: Record<string, unknown> | null
  user_action_detail: string | null      // "User bam Duyet va gui, khong sua"

  state_change: { from: ThreadState; to: ThreadState }
  memory_impact: string | null
  outcome: EventOutcome
}

// ─── Settings ───
interface CadenceRule {
  threshold_days: number                 // Default: 3
  cap_per_thread: number                 // Default: 3
  cap_per_thread_vip: number             // Default: 5
  min_gap_days: number                   // Default: 2
  working_hours: { start: string; end: string }
  working_days: number[]                 // 1-7 (Mon-Sun)
  auto_stop_after: number | null         // Default: 3 useless follow-ups
}

interface ExcludeRule {
  id: string
  type: 'contact' | 'domain' | 'keyword'
  value: string
  reason: string
  source: 'user' | 'agent_suggestion' | 'dismiss'
  created_at: string
}

interface NotificationPreference {
  digest_morning: boolean
  digest_morning_time: string            // "07:00"
  digest_afternoon: boolean
  alert_bounced: boolean
  alert_new_thread: boolean
  push_desktop: boolean
  email_notification: boolean
}

interface OAuthConnection {
  user_id: string
  gmail_address: string
  scope_granted: string[]
  connected_at: string
  revoked_at: string | null
  is_active: boolean
}
```

---

## 3. Data Flow — Layer Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    UI LAYER (S1-S7)                        │
│  Reads projections of domain state                         │
│  • S4: Thread[] → aggregate metrics                        │
│  • S2: Thread[] → bucket & display                         │
│  • S3: Thread + Draft → detail + rationale                 │
│  • S5: UserVoiceProfile + FollowUpPlaybook                 │
│  • S6: TrackedEvent[] → filter & display                   │
│  • S7: CadenceRule, ExcludeRule, NotificationPreference    │
└──────────────────────────┬─────────────────────────────────┘
                           │ dispatch user actions
                           v
┌────────────────────────────────────────────────────────────┐
│                  AGENT LAYER (Core Logic)                   │
│  Pure functions + state machine + decision engine           │
│                                                             │
│  SCAN & CLASSIFY (cron):                                    │
│    scanInbox() → classifyIntent() → Thread.state           │
│                                                             │
│  DETECT & DRAFT (on user open):                             │
│    summarizeThread() → generateDraft(VoiceProfile)         │
│                                                             │
│  DECIDE (user action -> state transition):                  │
│    applyDecision(threadId, action) -> Thread.state         │
│    trackEvent(event) -> S6                                  │
│                                                             │
│  OPERATING MEMORY (post-action):                            │
│    learnFromAction(event) -> VoiceProfile | Playbook        │
└──────────────────────────┬─────────────────────────────────┘
                           │ read/write
                           v
┌────────────────────────────────────────────────────────────┐
│                  STORAGE LAYER                              │
│  Key-value store (SQLite / JSON / workspace state)          │
│                                                             │
│  state/      Thread state machine records                  │
│  memory/     UserVoiceProfile, FollowUpPlaybook             │
│  settings/   CadenceRule, ExcludeRule, NotificationPref     │
│  events/     TrackedEvent log (append-only)                │
│  drafts/     Draft body + version history                  │
└──────────────────────────┬─────────────────────────────────┘
                           | Gmail + LLM
                           v
┌────────────────────────────────────────────────────────────┐
│                  EXTERNAL LAYER                             │
│  Gmail API (readonly + send) + LLM API                     │
```

---

## 4. Agent Core Loop (Pseudocode)

```typescript
// 4a. Background Scan (cron — every N minutes)
async function backgroundScan(conn: OAuthConnection, rules: CadenceRule) {
  const rawThreads = await gmail.listSentThreads(conn)

  for (const raw of rawThreads) {
    // Dedup — skip already tracked threads
    if (storage.hasThread(raw.id)) continue

    const intent = await classifyIntent(raw)

    if (intent === 'excluded_contact') {
      storage.saveThread(createThread(raw, 'excluded', intent))
      continue
    }

    if (intent === 'awaiting_their_reply') {
      const state = 'monitoring'
      storage.saveThread(createThread(raw, state, intent))
      trackEvent('scan', raw.id, 'agent', {
        action: 'Phat hien thread moi, dang theo doi',
        state_change: { from: 'untracked', to: 'monitoring' }
      })
    }
  }
}

// 4b. Threshold Check (cron — every morning)
function checkThresholds(rules: CadenceRule) {
  const monitoring = storage.getThreadsByState('monitoring')

  for (const thread of monitoring) {
    const daysSince = daysBetween(now, thread.last_user_sent_at)

    if (daysSince >= rules.threshold_days && thread.follow_up_count < rules.cap_per_thread) {
      thread.state = 'awaiting_review'
      thread.bucket = computeBucket(thread)
      storage.saveThread(thread)

      trackEvent('classify', thread.id, 'agent', {
        action: 'Vuot nguong ' + daysSince + ' ngay -> awaiting_review',
        agent_thought: 'Threshold met, chua cap, dua vao doi cho'
      })
    }
  }
}

// 4c. Draft Generation (when user opens thread from S2)
async function generateDraft(thread: Thread, voice: UserVoiceProfile): Promise<Draft> {
  const summary = await summarizeThread(thread)
  thread.thread_summary = summary

  const draft = await llm.generate({
    thread: summary,
    tone: voice.tone_default,
    length: voice.length_default,
    avoided: voice.avoided_phrases,
    relationship: getRelationshipTone(voice, thread)
  })

  const draftRecord: Draft = {
    id: uuid(),
    thread_id: thread.id,
    version: 1,
    body: draft.body,
    tone_setting: voice.tone_default,
    length_setting: voice.length_default,
    status: 'ready',
    generated_at: now(),
    rationale: draft.rationale   // Why this draft?
  }

  thread.state = 'draft_ready'
  storage.saveThread(thread)
  storage.saveDraft(draftRecord)

  trackEvent('draft', thread.id, 'agent', {
    action: 'Sinh draft',
    agent_thought: draft.rationale.tone_reason
  })

  return draftRecord
}

// 4d. User Decision Handler
function handleUserDecision(threadId: string, action: UserAction) {
  const thread = storage.getThread(threadId)
  const draft = storage.getCurrentDraft(threadId)

  switch (action.type) {
    case 'approve_send':
      thread.state = 'sent_pending_reply'
      draft.status = 'sent'
      draft.approved_as_is = true
      gmail.send(draft.body, thread.original_recipient, thread.gmail_thread_id)
      trackEvent('approve_send', threadId, 'user', {
        user_action_detail: 'User bam Duyet va gui, khong sua',
        state_change: { from: 'draft_ready', to: 'sent_pending_reply' }
      })
      break

    case 'confirm_close':
      thread.state = 'closed'
      trackEvent('confirm_close', threadId, 'user', {
        state_change: { from: 'reply_proposed_close', to: 'closed' }
      })
      break

    case 'reject_close':
    case 'reject_close':
      thread.proposed_close_rejected = true
      thread.proposed_close_count++
      thread.state = 'monitoring'
      trackEvent('reject_close', threadId, 'user', {
        user_action_detail: 'User bac de xuat dong',
        state_change: { from: 'reply_proposed_close', to: 'monitoring' },
        memory_impact: 'Ghi nhan pattern nay cho classification'
      })
      break

    case 'dismiss':
      thread.state = 'dismissed'
      trackEvent('dismiss', threadId, 'user', {
        state_change: { from: thread.state, to: 'dismissed' }
      })
      break

    case 'snooze':
      thread.state = 'snoozed'
      thread.snooze_until = action.until
      trackEvent('snooze', threadId, 'user')
      break

    case 'write':
      thread.state = 'draft_generating'
      draft.status = 'discarded'
      trackEvent('draft_regenerate', threadId, 'user')
      // trigger generateDraft() again with user notes
      break
  }

  storage.saveThread(thread)
  storage.saveDraft(draft)
}

// 4e. Reply Detection (polling or webhook)
async function detectReply(thread: Thread): Promise<void> {
  const latestEmails = await gmail.getThreadMessages(thread.gmail_thread_id)
  const lastEmail = latestEmails[latestEmails.length - 1]

  if (lastEmail.from !== thread.sender) return  // Not from them

  const intent = await classifyReplyIntent(lastEmail)

  switch (intent) {
    case 'substantive_reply':
      thread.state = 'reply_proposed_close'
      trackEvent('propose_close', thread.id, 'agent', {
        agent_thought: 'Phat hien reply thuc chat -> de xuat dong',
        state_change: { from: thread.state, to: 'reply_proposed_close' }
      })
      break

    case 'reply_needs_my_action':
      thread.state = 'reply_needs_action'
      trackEvent('classify', thread.id, 'agent', {
        agent_thought: 'Reply co ask moi -> can ban tra loi',
        state_change: { from: thread.state, to: 'reply_needs_action' }
      })
      break

    case 'out_of_office':
      thread.state = 'monitoring'  // reset clock, don't close
      break

    case 'partial_ack':
      // Stay in current state, reset clock
      thread.last_reply_at = now()
      break
  }

  storage.saveThread(thread)
}

// 4f. Operating Memory Loop (post-action, async)
async function learnFromAction(event: TrackedEvent, playbook: FollowUpPlaybook) {
  if (event.event_type === 'reject_close') {
    // Extract pattern from misclassification
    const correction = {
      thread_id: event.thread_id,
      agent_classification: event.state_change.from,
      user_correction: event.user_action_detail || '',
      detected_pattern: await extractPattern(event.thread_id),
      created_at: now()
    }
    playbook.reply_classification_corrections.push(correction)
  }

  if (event.event_type === 'approve_send') {
    const draft = storage.getCurrentDraft(event.thread_id)
    if (draft.approved_as_is) {
      playbook.approved_examples.push({
        thread_id: event.thread_id,
        draft_body: draft.body,
        tone_setting: draft.tone_setting,
        length_setting: draft.length_setting,
        result: null,
        pinned: false
      })
    }
  }

  storage.savePlaybook(playbook)
}

// ─── Bucket Computation (S2 display) ───
function computeBucket(thread: Thread): BucketType {
  if (thread.state === 'bounced') return 'bounced'
  if (thread.state === 'reply_needs_action') return 'needs_reply'
  if (thread.state === 'reply_proposed_close') return 'awaiting_confirm'
  if (['awaiting_review', 'draft_generating', 'draft_ready'].includes(thread.state)) {
    return 'follow_up_due'
  }
  throw new Error('Invalid state for bucket: ' + thread.state)
}

// ─── Dashboard Metrics (S4) ───
interface DashboardMetrics {
  date_range: { from: string; to: string }

  // Agent performance
  email_scanned: number
  threads_monitored: number
  threads_resolved: number
  draft_approval_rate: number                // % approved without edits
  reply_detection_accuracy: number           // close-confirm rate
  avg_response_time_hours: number
  follow_up_coverage: number                 // % overdue threads caught
  corrections_applied: number                // OM updates this week

  // Business insights
  deal_pipeline: {
    active_deals: number
    pending_quotes: number
    closed_won: number
  }
  thread_aging: Array<{ thread_id: string; days: number }>
  top_contacts: Array<{ email: string; approval_rate: number }>
  bounce_rate: number
  busiest_days: number[]                     // Day-of-week distribution
}
