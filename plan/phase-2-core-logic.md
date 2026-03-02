# Phase 2 — Core Logic

## Steps: 3–4
## Status: ✅ DONE

---

## ✅ Step 3 — TypeScript Types

**File created:** `src/lib/types.ts`

**Final types (as written by developer):**

```ts
export type Operation = "add" | "subtract" | "multiply" | "divide";

export type TimerMode = "none" | "stopwatch" | "countdown" | "perQuestion";

export type SessionConfig = {
  operations: Operation[];
  questionCount: number;
  operandCount: number;       // fixed number of operands per question
  minNumber: number;
  maxNumber: number;
  allowNegativeResults: boolean;
  allowDivisionRemainder: boolean;
  timerMode: TimerMode;
  timerDuration?: number;
};

export interface Question {
  operands: number[];         // length = operandCount
  operators: Operation[];     // length = operandCount - 1, can mix operations
  correctAnswer: number;      // evaluated with proper math order of operations
}

export interface QuestionResult {
  question: Question;
  userAnswer: number | null;
  isCorrect: boolean;
  durationSeconds: number;
}

export interface SessionState {
  config: SessionConfig;
  questions: Question[];
  currentQuestionIndex: number;
  results: QuestionResult[];
  startTime: number | null;
  endTime: number | null;
}
```

**Design decisions made:**
- Variable operands: `operands[]` + `operators[]` arrays (supports N operands)
- Mixed operations per question: yes, configurable
- Order of operations: standard math rules (× and ÷ before + and −)
- All names in English (UI text stays Indonesian)
- `TimerMode`: `"perQuestion"` in camelCase (not `"per-question"`)

**Confirmation:** No TypeScript errors ✅

---

## ✅ Step 4 — Question Generation Logic

**File:** `src/lib/generate.ts`

**Functions implemented:**

### `evaluate(operands, operators, config): EvaluateResult`
- Pure function — no side effects, never mutates inputs
- Returns `{ result: number, fixedOperands: number[], fixedOperators: Operation[] }`
- Pass 1: process `multiply` and `divide` left to right using `originalOperandIndexes` and `originalOperatorIndexes` to track original positions through splices
- Pass 2: process `add` and `subtract` left to right
- When `divide` has remainder or divisor is 0: calls `divisor()` to get a safe divisor
  - If valid divisor found: update `fixedOperands` at original index
  - If no valid divisor (`null`): change operator to `"multiply"`, update `fixedOperators` at original index

### `divisor(n, config): number | null`
- Finds all valid factors of `n` within `[Math.max(1, minNumber), Math.min(n, maxNumber)]`
- Returns a random factor from the valid list
- Returns `null` if no valid factors found (never returns `1` as a fallback — caller handles null)

### `generateQuestions(config): Question[]`
- Generates `questionCount` questions
- Per question: random `operandCount` operands, random `operandCount - 1` operators (each independently random from `config.operations`)
- Rejection loop for `allowNegativeResults = false` — max 100 attempts then throws
- Uses `fixedOperands` and `fixedOperators` from `evaluate` so displayed question always matches `correctAnswer`
- `allowDivisionRemainder = false` handled inside `evaluate`

**Security notes (deferred to later steps):**
- Findings 2, 3, 5, 11: resolved by config form validation in Step 7
- Finding 4: wrap in try/catch in Step 10 (Question screen)
- Finding 6: round `correctAnswer` in Step 10

**Confirmation:** No TypeScript errors ✅
