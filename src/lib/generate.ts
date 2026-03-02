import { Operation, Question, SessionConfig } from "./types";

type EvaluateResult = {
  result: number;
  fixedOperands: number[];
  fixedOperators: Operation[];
};

function evaluate(operands: number[], operators: Operation[], config: SessionConfig): EvaluateResult {
  const fixedOperands = [...operands];
  const fixedOperators = [...operators];
  const ops = [...operands];
  const ots = [...operators];

  const originalOperatorIndexes = operators.map((_, index) => index);
  const originalOperandIndexes = operands.map((_, index) => index);
  while (ots.length > 0) {
    const opIndex = ots.findIndex(op => op === "multiply" || op === "divide");
    if (opIndex > -1) {
      const left = ops[opIndex];
      let right = ops[opIndex + 1];
      let op = ots[opIndex];

      if (op === "divide" && (right === 0 || left % right !== 0)) {
        const safeDivisor = divisor(left, config);
        if (safeDivisor !== null) {
          right = safeDivisor;
          fixedOperands[originalOperandIndexes[opIndex + 1]] = right;
        } else {
          op = "multiply";
          fixedOperators[originalOperatorIndexes[opIndex]] = op;
        }
      }

      ops[opIndex] = op === "multiply" ? left * right : left / right;
      ops.splice(opIndex + 1, 1);
      ots.splice(opIndex, 1);
      originalOperandIndexes.splice(opIndex + 1, 1);
      originalOperatorIndexes.splice(opIndex, 1);
    } else {
      const left = ops[0];
      const right = ops[1];
      const op = ots[0];

      ops[0] = op === "add" ? left + right : left - right;
      ops.splice(1, 1);
      ots.splice(0, 1);
    }
  }

  return {
    result: ops[0],
    fixedOperands,
    fixedOperators
  };
}

function divisor(n: number, config: SessionConfig): number | null {
  const validDivisors = [];
  const minDivisor = Math.max(1, config.minNumber);
  const maxDivisor = Math.min(n, config.maxNumber);

  for (let i = minDivisor; i <= maxDivisor; i++) {
    if (n % i === 0) {
      validDivisors.push(i);
    }
  }
  if (validDivisors.length === 0) {
    return null;
  }

  return validDivisors[Math.floor(Math.random() * validDivisors.length)];
}

export function generateQuestions(config: SessionConfig): Question[] {

  return Array.from({ length: config.questionCount }, (): Question => {

    let operators: Operation[] = [];
    let operands: number[] = [];
    let result = 0;
    let attempts = 0;
    const MAX_ATTEMPTS = 100;

    do {
      operators = Array.from({ length: config.operandCount - 1 }, () =>
        config.operations[Math.floor(Math.random() * config.operations.length)]);

      const ops = Array.from({ length: config.operandCount }, () =>
        Math.floor(Math.random() * (config.maxNumber - config.minNumber + 1)) + config.minNumber);

      const { result: rs, fixedOperands: fixOps, fixedOperators: fixOts } = evaluate(ops, operators, config);
      operands = fixOps;
      operators = fixOts;
      result = rs;

      attempts++;
      if (attempts > MAX_ATTEMPTS) {
        throw new Error("Tidak dapat membuat soal yang valid setelah banyak percobaan. Silakan periksa konfigurasi Anda.");
      }
    } while (result < 0 && !config.allowNegativeResults);

    return {
      operators,
      operands,
      correctAnswer: result
    };
  }) as Question[];
}