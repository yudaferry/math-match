# Security Issues — Math Match

Last audited: 2026-03-02
Scope: `src/lib/types.ts`, `src/lib/generate.ts`

---

## Status Legend
- ✅ Fixed
- ⚠️ Partially fixed
- ❌ Still present
- 🆕 New finding
- 📅 Deferred (planned fix in later step)

---

## Finding 1 — CRITICAL: Division by zero
**Status:** ✅ Fixed
**Location:** `src/lib/generate.ts` — `evaluate()`, `divisor()`
**Description:** When `right = 0`, `left % 0 = NaN` bypassed the remainder check. Fixed by adding explicit `right === 0` guard on line 24, and `Math.max(1, config.minNumber)` in `divisor()` ensures divisors are always >= 1. If no safe divisor found, operator changes to `multiply`.

---

## Finding 2 — CRITICAL: DoS via large `maxNumber` in `divisor()` loop
**Status:** ⚠️ Partially fixed
**Location:** `src/lib/generate.ts` — `divisor()`
**Description:** `divisor()` loops from `minDivisor` to `Math.min(n, config.maxNumber)`. Upper bound is now clamped to `n`, which helps when `n` is small. However if both `n` and `maxNumber` are large (e.g. 2 billion), the loop still runs billions of iterations, blocking the event loop.
**Fix:** Add runtime validation on `maxNumber` in config form (Step 7).

---

## Finding 3 — HIGH: No upper bound on `questionCount` / `operandCount`
**Status:** 📅 Deferred → Step 7
**Location:** `src/lib/types.ts` — `SessionConfig`
**Description:** No upper bounds defined. Setting either to a very large number causes memory exhaustion in `Array.from`.
**Fix:** Enforce max values in config form validation (Step 7).

---

## Finding 4 — HIGH: Unhandled throw when valid questions are impossible
**Status:** ⚠️ Partially fixed
**Location:** `src/lib/generate.ts` — `generateQuestions()`
**Description:** `MAX_ATTEMPTS = 100` prevents infinite loop, but the `throw` inside `Array.from` is uncaught. Impossible configs (e.g. subtract-only with large numbers and `allowNegativeResults: false`) will reliably crash the app with a raw error message.
**Fix:** Wrap `generateQuestions()` in try/catch in the Question screen (Step 10).

---

## Finding 5 — HIGH: No runtime validation on `SessionConfig`
**Status:** 📅 Deferred → Step 7
**Location:** `src/lib/types.ts`, `src/lib/generate.ts`
**Description:** TypeScript types are compile-time only. At runtime, any value can be passed in — missing fields, wrong types, malicious values (`minNumber: -Infinity`). No Zod, no manual checks.
**Fix:** Add full runtime validation in config form (Step 7).

---

## Finding 6 — MEDIUM: Floating-point precision errors
**Status:** 📅 Deferred → Step 10
**Location:** `src/lib/generate.ts` — `evaluate()`
**Description:** Chained arithmetic can produce floating-point artifacts (e.g. `7 / 3 * 3 = 6.999...`). `correctAnswer` carries imprecision, causing correct user answers to be marked wrong if compared with strict equality.
**Fix:** Round `correctAnswer` to a safe integer in Step 10, or use epsilon-based comparison when grading.

---

## Finding 7 — MEDIUM: `divisor()` fallback of `1` bypasses config range
**Status:** ✅ Fixed
**Location:** `src/lib/generate.ts` — `divisor()`
**Description:** Previously returned hardcoded `1` when no valid divisor found, which could be outside `[minNumber, maxNumber]`. Now returns `null` and caller changes operator to `multiply` instead.

---

## Finding 8 — MEDIUM: `fixedOperands` index mismatch after splice
**Status:** ✅ Fixed
**Location:** `src/lib/generate.ts` — `evaluate()`
**Description:** After each `splice`, array indices shift. Previously used `opIndex` directly on `fixedOperands`, producing incorrect positions. Fixed by adding `originalOperandIndexes` and `originalOperatorIndexes` trackers that are spliced in parallel, mapping back to original positions correctly.

---

## Finding 9 — MEDIUM: `correctAnswer` exposed client-side
**Status:** By design — acceptable
**Location:** `src/lib/types.ts` — `Question` interface
**Description:** All answers are present in client-side memory and visible in browser DevTools. Acceptable for a children's practice app with no grading or competitive context.

---

## Finding 10 — LOW: `Math.random()` not cryptographically secure
**Status:** By design — acceptable
**Location:** `src/lib/generate.ts`
**Description:** `Math.random()` is predictable. Only matters in competitive/graded contexts. Acceptable for this app.

---

## Finding 11 — LOW: `minNumber > maxNumber` produces out-of-range operands
**Status:** 📅 Deferred → Step 7
**Location:** `src/lib/generate.ts` — `generateQuestions()`
**Description:** No guard against `minNumber > maxNumber`. The operand formula produces values outside both bounds. Also causes `divisor()` loop to never execute, forcing all divisions to `multiply`.
**Fix:** Enforce `minNumber < maxNumber` in config form validation (Step 7).

---

## Finding 12 — MEDIUM (NEW): Operator fallback to `multiply` silently violates config 🆕
**Status:** ❌ Still present
**Location:** `src/lib/generate.ts` — `evaluate()` line 29-31
**Description:** When `divisor()` returns `null`, operator is silently changed from `divide` to `multiply`. If user configured `operations: ["divide"]` only, generated questions will contain `multiply` operators — violating the config contract with no warning or feedback.
**Fix:** To be determined. Options: reject and regenerate, or log a warning.

---

## Finding 13 — MEDIUM (NEW): Negative operands make `divisor()` always return `null` 🆕
**Status:** ❌ Still present
**Location:** `src/lib/generate.ts` — `divisor()`
**Description:** When `n` is negative, `maxDivisor = Math.min(n, config.maxNumber)` is negative. Since `minDivisor >= 1`, loop never runs, always returns `null`. Division is silently unavailable for negative dividends — all divisions become multiplications.
**Fix:** Handle negative `n` explicitly — either take `Math.abs(n)` before finding divisors, or reject the operand and regenerate.

---

## Finding 14 — LOW (NEW): `add`/`subtract` branch skips original index tracking 🆕
**Status:** Latent defect — acceptable for now
**Location:** `src/lib/generate.ts` — `evaluate()` else branch (lines 41-48)
**Description:** The `else` branch doesn't splice `originalOperandIndexes` or `originalOperatorIndexes`. Currently harmless since `fixedOperands`/`fixedOperators` are only written in the `multiply`/`divide` branch. If the else branch is ever extended, index mismatch (Finding 8) will silently reappear.
**Fix:** Add matching splices to the else branch as a precaution.

---

## Finding 15 — LOW (NEW): Empty `operations` array causes silent incorrect behavior 🆕
**Status:** 📅 Deferred → Step 7
**Location:** `src/lib/generate.ts` — `generateQuestions()` line 87
**Description:** `config.operations = []` causes `config.operations[0]` = `undefined`. Operators array fills with `undefined`. In `evaluate()`, `undefined` is neither `"multiply"` nor `"divide"`, so all go to the else branch and treated as subtraction (since `op === "add"` is false). Silent incorrect behavior instead of a clear error.
**Fix:** Validate `operations.length >= 1` in config form (Step 7).

---

## Fix Roadmap

| Step | Findings resolved |
|------|-------------------|
| Now (in `generate.ts`) | 12, 13, 14 |
| Step 7 — Config form validation | 2, 3, 5, 11, 15 |
| Step 10 — Question screen | 4, 6 |
| By design | 9, 10 |
