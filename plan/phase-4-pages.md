# Phase 4 — All Pages & Screen Components

## Steps: 7–11
## Status: Not started

---

## Step 7 — Configuration Page

**Concept to explain:**
- Separate form logic into a custom hook (keeps the page component clean)
- Validation gates the submit button

**Files:**
- Create `src/components/config/useConfigForm.ts`
- Build out `src/app/page.tsx`

**Form fields:**
| Field | Type | Notes |
|-------|------|-------|
| operations | multi-select toggle | at least 1 required |
| questionCount | number input | |
| operandCount | number input | |
| minNumber | number input | |
| maxNumber | number input | must be > minNumber |
| allowNegativeResults | Toggle | |
| allowDivisionRemainder | Toggle | |
| timerMode | select | 4 options |
| timerDuration | number input | only shown when countdown mode selected |

**Validation rules:**
- At least 1 operation selected
- maxNumber > minNumber
- timerDuration required & > 0 when countdown mode selected

**On valid submit:**
1. Call `startSession(config)` from Zustand store
2. Navigate to `/question` with `router.push('/question')`

**Confirmation:** All fields render, validation errors show, "Mulai" button disabled until valid

---

## Step 8 — Numpad Component

**Concept to explain:**
- Custom keyboard: purely presentational, holds no state
- Why custom: suppresses native mobile keyboard (which shifts layout)
- `type="button"` on all buttons: prevents accidental form submission

**File to create:** `src/components/question/Numpad.tsx`

**Buttons:** 0–9, Backspace (←), Jawab (submit)

**Props:**
```
onDigit(digit: string): void
onBackspace(): void
onSubmit(): void
showMinus?: boolean
```

**Confirmation:** Numpad renders visually correct

---

## Step 9 — Timer Hook

**Concept to explain:**
- useEffect + setInterval: how to run code on a schedule in React
- Cleanup function: why you must clear interval on unmount
- 4 timer modes behave differently

**File to create:** `src/lib/useTimer.ts`

**Hook signature:**
```
useTimer(mode: TimerMode, duration?: number, onExpire?: () => void)
  returns: { elapsed: number, display: string, reset: () => void }
```

**Mode behaviors:**
| Mode | display shows | onExpire fires? |
|------|---------------|-----------------|
| none | nothing | no |
| stopwatch | elapsed time | no |
| countdown | remaining time | yes, when 0 |
| perQuestion | remaining time | yes, when 0 |

**Confirmation:** No TypeScript errors

---

## Step 10 — Question Screen

**Concept to explain:**
- Most complex screen: combines timer hook + numpad + Zustand store + navigation
- Redirect guard: if no session in store, redirect to `/`
- Hidden input trick: suppresses native mobile keyboard

**File to create:** `src/app/question/page.tsx`

**Key behaviors:**
- Check store on mount — redirect to `/` if `session` is null
- Local `input` state built digit-by-digit via numpad callbacks
- Hidden `<input inputMode="none">` to suppress native mobile keyboard
- Responsive layout: `flex-col` on mobile (numpad bottom), `md:flex-row` on desktop (numpad right)
- On submit: call `answerQuestion()`, reset input, check if last question → navigate to `/result`
- Per-question countdown: call `timer.reset()` when index changes

**Confirmation:** Numpad works, answers advance through questions, navigates to `/result` at end

---

## Step 11 — Result Screen

**Concept to explain:**
- Read-only view: just reads from Zustand store, no mutations except on button clicks
- Utility functions belong in `lib/`, not in components

**Files:**
- Create `src/lib/format.ts`
- Create `src/app/result/page.tsx`

**format.ts utilities:**
```
formatDuration(seconds: number): string  →  "mm:ss"

OPERATOR_SYMBOL = {
  add: '+',
  subtract: '−',
  multiply: '×',
  divide: '÷'
}
```

**Result page displays:**
- Correct count
- Wrong count
- Total session time
- Review table: each question, user's answer, correct/wrong indicator, time spent

**Action buttons:**
- "Ulangi" → call `startSession(config)` with same config → navigate to `/question`
- "Konfigurasi Baru" → call `reset()` → navigate to `/`

**Confirmation:** All data shows correctly, both buttons work
