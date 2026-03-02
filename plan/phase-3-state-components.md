# Phase 3 — State & Shared Components

## Steps: 5–6
## Status: Not started

---

## Step 5 — Zustand Session Store

**Concept to explain:**
- Zustand vs React Context: no provider wrapper needed, cleaner API
- `create<State>()` from zustand creates a custom hook you call anywhere
- Why we keep session in memory (not localStorage): fresh start every time

**Install command:**
```bash
npm install zustand
```

**File to create:** `src/store/session.ts`

**Zustand v5 TypeScript pattern:**
```typescript
import { create } from 'zustand'

interface MyStore {
  // state fields
  // action methods
}

const useMyStore = create<MyStore>((set, get) => ({
  // initial state and action implementations
}))
```

**Store shape:**
```
state:
  session: SessionState | null

actions:
  startSession(config: SessionConfig): void   — generates questions, sets session
  answerQuestion(answer: number | null, duration: number): void  — records answer, advances index
  endSession(): void  — sets endTime
  reset(): void  — clears session back to null
```

**Key Zustand v5 notes:**
- Import: `import { create } from 'zustand'` (named import, not default)
- Always type your store: `create<StoreType>(...)`
- `set` replaces state: `set({ session: null })`
- `set` with function for derived updates: `set((state) => ({ ... }))`
- `get` reads current state inside actions without triggering re-renders

**Note:** No changes to `layout.tsx` needed (unlike Context approach — this is one of Zustand's key benefits)

**Confirmation:** App still runs, no TypeScript errors

---

## Step 6 — Shared UI Components

**Concept to explain:**
- Build smallest reusable pieces before full pages
- Separation of concerns: style logic stays in component, not in pages
- Tailwind v4: use standard utility classes as before — class names haven't changed, only the config method

**Files to create:**

### `src/components/shared/Button.tsx`
- Props: `variant` (primary | secondary), `disabled`, `onClick`, `children`, `type`
- Primary: solid colored, Secondary: outlined
- Disabled state: reduced opacity, `cursor-not-allowed`

### `src/components/shared/Toggle.tsx`
- Props: `checked`, `onChange`, `label`
- Accessibility: `role="switch"`, `aria-checked`
- Visually shows on/off state

**Confirmation:** No TypeScript errors in both files
