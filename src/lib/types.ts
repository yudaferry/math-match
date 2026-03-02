export type Operation = "add" | "subtract" | "multiply" | "divide";

export type TimerMode = "none" | "stopwatch" | "countdown" | "perQuestion";

export type SessionConfig = {
  operations: Operation[];
  questionCount: number;
  operandCount: number;
  minNumber: number;
  maxNumber: number;
  allowNegativeResults: boolean;
  allowDivisionRemainder: boolean;
  timerMode: TimerMode;
  timerDuration?: number;
};

export interface Question {
  operands: number[];
  operators: Operation[];
  correctAnswer: number;
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
